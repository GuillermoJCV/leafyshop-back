/*
  Warnings:

  - You are about to drop the column `category_id` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit_price" REAL NOT NULL,
    "unit_measure" TEXT NOT NULL,
    "description" TEXT,
    "shipping_cost" REAL NOT NULL,
    "score" INTEGER NOT NULL,
    "iva" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "subcategory_id" INTEGER,
    "inventory_id" INTEGER NOT NULL,
    CONSTRAINT "Product_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "SubCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("description", "discount", "id", "inventory_id", "iva", "name", "score", "shipping_cost", "stock", "unit_measure", "unit_price") SELECT "description", "discount", "id", "inventory_id", "iva", "name", "score", "shipping_cost", "stock", "unit_measure", "unit_price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_name_key" ON "Product"("id", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
