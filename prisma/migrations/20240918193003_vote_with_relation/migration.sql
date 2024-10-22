-- CreateTable
CREATE TABLE "voting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "candidate" TEXT NOT NULL,
    "voteAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voterId" TEXT NOT NULL,
    CONSTRAINT "voting_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "voter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "voter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "votecode" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "validVote" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "voting_code_key" ON "voting"("code");

-- CreateIndex
CREATE UNIQUE INDEX "voter_votecode_key" ON "voter"("votecode");
