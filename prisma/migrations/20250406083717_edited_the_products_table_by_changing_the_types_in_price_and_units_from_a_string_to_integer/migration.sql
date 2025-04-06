/*
  Warnings:

  - Changed the type of `unitsLeft` on the `products_table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pricePerUnit` on the `products_table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products_table" DROP COLUMN "unitsLeft",
ADD COLUMN     "unitsLeft" INTEGER NOT NULL,
DROP COLUMN "pricePerUnit",
ADD COLUMN     "pricePerUnit" INTEGER NOT NULL;
