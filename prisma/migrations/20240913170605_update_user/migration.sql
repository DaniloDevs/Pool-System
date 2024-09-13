/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `voting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "voting_code_key" ON "voting"("code");
