/*
  Warnings:

  - Made the column `country_id` on table `City` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city_id` on table `District` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_City" ("country_id", "id", "name", "prefix") SELECT "country_id", "id", "name", "prefix" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE TABLE "new_District" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    CONSTRAINT "District_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_District" ("city_id", "id", "name") SELECT "city_id", "id", "name" FROM "District";
DROP TABLE "District";
ALTER TABLE "new_District" RENAME TO "District";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
