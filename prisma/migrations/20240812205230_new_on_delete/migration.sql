-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "customer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "alt_email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "alt_phone" TEXT,
    "direcction" TEXT NOT NULL,
    "alt_direction" TEXT,
    "tb_code" TEXT NOT NULL,
    "tb_code_type" TEXT NOT NULL,
    "seller_id" INTEGER,
    "country_id" INTEGER,
    CONSTRAINT "Customer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Customer_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Employee" ("employee_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Customer_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("alt_direction", "alt_email", "alt_phone", "country_id", "customer_id", "direcction", "name", "phone", "seller_id", "tb_code", "tb_code_type") SELECT "alt_direction", "alt_email", "alt_phone", "country_id", "customer_id", "direcction", "name", "phone", "seller_id", "tb_code", "tb_code_type" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_alt_email_key" ON "Customer"("alt_email");
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
