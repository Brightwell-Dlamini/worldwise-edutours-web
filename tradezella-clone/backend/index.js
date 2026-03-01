require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db', // Must be full "file:" URL string – matches your .env
});
const prisma = new PrismaClient({ adapter });
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // For image base64 uploads later

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GET all trades (for dashboard)
app.get('/trades', async (req, res) => {
  try {
    const trades = await prisma.trade.findMany({
      include: {
        images: true,
        tags: true,
        playbook: true,
      },
      orderBy: { entryTime: 'desc' },
    });
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

// POST new trade with auto rMultiple calc
app.post('/trades', async (req, res) => {
  try {
    let { direction, entryPrice, exitPrice, stopLoss, takeProfit, ...rest } =
      req.body;

    let rMultiple = null;
    if (exitPrice && stopLoss && entryPrice) {
      const risk =
        direction === 'LONG' ? entryPrice - stopLoss : stopLoss - entryPrice;

      const reward =
        direction === 'LONG' ? exitPrice - entryPrice : entryPrice - exitPrice;

      if (risk > 0) rMultiple = reward / risk;
    }

    const trade = await prisma.trade.create({
      data: {
        ...rest,
        direction: direction.toUpperCase(),
        entryPrice: parseFloat(entryPrice),
        exitPrice: exitPrice ? parseFloat(exitPrice) : null,
        stopLoss: stopLoss ? parseFloat(stopLoss) : null,
        takeProfit: takeProfit ? parseFloat(takeProfit) : null,
        rMultiple,
      },
      include: {
        images: true,
        tags: true,
      },
    });

    res.status(201).json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create trade' });
  }
});

const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' }); // Temp folder—create it manually or auto

// Ensure uploads folder
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// POST /import-csv
app.post('/import-csv', upload.single('csv'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No CSV uploaded' });

  const results = [];
  const errors = [];
  const importedTickets = new Set();

  try {
    await prisma.$transaction(async (tx) => {
      await new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path)
          .pipe(csvParser())
          .on('data', (row) => {
            // Clean column names (Exness varies: "Ticket", "Open Time", etc.)
            const cleanRow = {};
            Object.keys(row).forEach((key) => {
              cleanRow[key.trim()] = row[key].trim();
            });

            // Skip if no ticket or already imported
            const ticket = cleanRow['Ticket'];
            if (!ticket || importedTickets.has(ticket)) return;

            // Skip open trades (no Close Time or Close Price)
            if (!cleanRow['Close Time'] || !cleanRow['Close Price']) {
              errors.push(`Skipped open trade: ${ticket}`);
              return;
            }

            let direction = cleanRow['Type'] === 'Buy' ? 'LONG' : 'SHORT';
            if (cleanRow['Type'] !== 'Buy' && cleanRow['Type'] !== 'Sell') {
              errors.push(
                `Invalid type ${cleanRow['Type']} on ticket ${ticket}`
              );
              return;
            }

            // Guess instrument
            let instrument = 'FOREX';
            const symbol = cleanRow['Symbol'].toUpperCase();
            if (symbol.endsWith('USD') && !symbol.includes('.'))
              instrument = 'CRYPTO';
            else if (symbol.includes('.')) instrument = 'STOCK';

            let rMultiple = null;
            const entry = parseFloat(cleanRow['Open Price']);
            const exit = parseFloat(cleanRow['Close Price']);
            const sl = cleanRow['SL'] ? parseFloat(cleanRow['SL']) : null;

            if (sl && entry && exit) {
              const risk = direction === 'LONG' ? entry - sl : sl - entry;
              const reward = direction === 'LONG' ? exit - entry : entry - exit;
              if (risk > 0) rMultiple = reward / risk;
            }

            results.push({
              ticket,
              data: {
                instrument,
                symbol: cleanRow['Symbol'],
                direction,
                entryPrice: entry,
                exitPrice: exit,
                positionSize: parseFloat(
                  cleanRow['Volume'] || cleanRow['Lots']
                ),
                stopLoss: sl,
                takeProfit: cleanRow['TP'] ? parseFloat(cleanRow['TP']) : null,
                rMultiple,
                entryTime: new Date(cleanRow['Open Time']),
                exitTime: new Date(cleanRow['Close Time']),
                notes: `Imported from Exness - Ticket ${ticket}`,
                // tags/images added manually later
              },
            });

            importedTickets.add(ticket);
          })
          .on('end', resolve)
          .on('error', reject);
      });

      // Bulk create trades
      for (const item of results) {
        await tx.trade.create({
          data: item.data,
        });
      }
    });

    // Cleanup temp file
    fs.unlinkSync(req.file.path);

    res.json({
      message: `Imported ${results.length} closed trades`,
      skipped: errors.length,
      errors,
    });
  } catch (error) {
    console.error(error);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Import failed', details: error.message });
  }
});

// DELETE trade by id
app.delete('/trades/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.trade.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete trade' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Backend crushing it on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
