/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "content" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "archivedAt" DATETIME,
    "destroyedAt" DATETIME,
    "folderId" TEXT,
    CONSTRAINT "Note_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("archivedAt", "content", "createdAt", "destroyedAt", "folderId", "id", "title", "updatedAt") SELECT "archivedAt", "content", "createdAt", "destroyedAt", "folderId", "id", "title", "updatedAt" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_Folder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "destroyedAt" DATETIME
);
INSERT INTO "new_Folder" ("createdAt", "destroyedAt", "id", "name", "updatedAt") SELECT "createdAt", "destroyedAt", "id", "name", "updatedAt" FROM "Folder";
DROP TABLE "Folder";
ALTER TABLE "new_Folder" RENAME TO "Folder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
