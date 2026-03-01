generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "sqlite"

}

enum InstrumentType {
FOREX
CRYPTO
STOCK
FUTURES
CFD
}

enum Currency {
USD
ZAR
}

enum PredefinedTag {
BREAKOUT
PULLBACK
REVERSAL
SCALP
SWING
FOMO
REVENGE
OVERTRADING
CUT_WINNER_EARLY
MOVED_STOP
GOOD_EXECUTION
POOR_RISK
NEWS_TRADE
// Add more as needed – you said no custom categories, so these are fixed
}

model Trade {
id Int @id @default(autoincrement())
instrument InstrumentType
symbol String
currency Currency @default(USD)
direction String
entryPrice Float
exitPrice Float?
positionSize Float
stopLoss Float?
takeProfit Float?
rMultiple Float?
entryTime DateTime
exitTime DateTime?
notes String?
runningPL String?
images TradeImage[]
tags TradeTag[]
playbookId Int?
playbook Playbook? @relation(fields: [playbookId], references: [id])
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@map("trades")
}
model TradeImage {
id Int @id @default(autoincrement())
tradeId Int
trade Trade @relation(fields: [tradeId], references: [id], onDelete: Cascade)
imagePath String // File path on disk or base64 string
createdAt DateTime @default(now())

@@map("trade_images")
}

model TradeTag {
id Int @id @default(autoincrement())
tradeId Int
trade Trade @relation(fields: [tradeId], references: [id], onDelete: Cascade)
tag PredefinedTag

@@unique([tradeId, tag]) // Prevent duplicate tags on same trade
@@map("trade_tags")
}
model Playbook {
id Int @id @default(autoincrement())
name String
description String?
rules String // Markdown or JSON for entry/exit criteria
trades Trade[]
missedDays MissedDay[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@map("playbooks")
}

model MissedDay {
id Int @id @default(autoincrement())
date DateTime @unique
reason String?
playbookId Int
playbook Playbook @relation(fields: [playbookId], references: [id])

@@map("missed_days")
}

model NotebookEntry {
id Int @id @default(autoincrement())
title String
content String // Markdown support later
template Boolean @default(false) // true = reusable template
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@map("notebook_entries")
}
