-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "country_id" INTEGER,
    CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_City" ("country_id", "id", "name", "prefix") SELECT "country_id", "id", "name", "prefix" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
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
    "country_id" INTEGER NOT NULL,
    CONSTRAINT "Customer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Customer_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Employee" ("employee_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Customer_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("alt_direction", "alt_email", "alt_phone", "country_id", "customer_id", "direcction", "name", "phone", "seller_id", "tb_code", "tb_code_type") SELECT "alt_direction", "alt_email", "alt_phone", "country_id", "customer_id", "direcction", "name", "phone", "seller_id", "tb_code", "tb_code_type" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_alt_email_key" ON "Customer"("alt_email");
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");
CREATE TABLE "new_District" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city_id" INTEGER,
    CONSTRAINT "District_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_District" ("city_id", "id", "name") SELECT "city_id", "id", "name" FROM "District";
DROP TABLE "District";
ALTER TABLE "new_District" RENAME TO "District";
CREATE TABLE "new_Employee" (
    "employee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "country_id" INTEGER,
    "inventory_id" INTEGER,
    CONSTRAINT "Employee_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Employee_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("birth_date", "country_id", "employee_id", "inventory_id", "name") SELECT "birth_date", "country_id", "employee_id", "inventory_id", "name" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_ImgUrl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "ImgUrl_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImgUrl" ("id", "product_id", "url") SELECT "id", "product_id", "url" FROM "ImgUrl";
DROP TABLE "ImgUrl";
ALTER TABLE "new_ImgUrl" RENAME TO "ImgUrl";
CREATE TABLE "new_OrderDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit_price" REAL NOT NULL,
    "unit_measure" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" REAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "OrderDetails_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderDetails_product_id_item_name_fkey" FOREIGN KEY ("product_id", "item_name") REFERENCES "Product" ("id", "name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderDetails" ("description", "id", "item_name", "order_id", "product_id", "quantity", "total_price", "unit_measure", "unit_price") SELECT "description", "id", "item_name", "order_id", "product_id", "quantity", "total_price", "unit_measure", "unit_price" FROM "OrderDetails";
DROP TABLE "OrderDetails";
ALTER TABLE "new_OrderDetails" RENAME TO "OrderDetails";
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
    "category_id" INTEGER,
    "inventory_id" INTEGER NOT NULL,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category_id", "description", "discount", "id", "inventory_id", "iva", "name", "score", "shipping_cost", "stock", "unit_measure", "unit_price") SELECT "category_id", "description", "discount", "id", "inventory_id", "iva", "name", "score", "shipping_cost", "stock", "unit_measure", "unit_price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_name_key" ON "Product"("id", "name");
CREATE TABLE "new_SubCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    CONSTRAINT "SubCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("category_id", "id", "name") SELECT "category_id", "id", "name" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT NOT NULL,
    "role_id" INTEGER,
    CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "password", "role_id", "status", "username") SELECT "email", "id", "password", "role_id", "status", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
