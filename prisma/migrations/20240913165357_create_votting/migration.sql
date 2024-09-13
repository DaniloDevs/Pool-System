-- CreateTable
CREATE TABLE "voting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "candidate" TEXT NOT NULL,
    "voteAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
