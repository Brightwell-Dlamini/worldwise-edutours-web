-- CreateTable
CREATE TABLE "trades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "instrument" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "direction" TEXT NOT NULL,
    "entryPrice" REAL NOT NULL,
    "exitPrice" REAL,
    "positionSize" REAL NOT NULL,
    "stopLoss" REAL,
    "takeProfit" REAL,
    "rMultiple" REAL,
    "entryTime" DATETIME NOT NULL,
    "exitTime" DATETIME,
    "notes" TEXT,
    "runningPL" TEXT,
    "playbookId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "trades_playbookId_fkey" FOREIGN KEY ("playbookId") REFERENCES "playbooks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trade_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tradeId" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "trade_images_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trade_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tradeId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    CONSTRAINT "trade_tags_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "trades" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "playbooks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rules" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "missed_days" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "reason" TEXT,
    "playbookId" INTEGER NOT NULL,
    CONSTRAINT "missed_days_playbookId_fkey" FOREIGN KEY ("playbookId") REFERENCES "playbooks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notebook_entries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "template" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "trade_tags_tradeId_tag_key" ON "trade_tags"("tradeId", "tag");

-- CreateIndex
CREATE UNIQUE INDEX "missed_days_date_key" ON "missed_days"("date");
