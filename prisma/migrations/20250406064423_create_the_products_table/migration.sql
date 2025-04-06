-- CreateTable
CREATE TABLE "products_table" (
    "id" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "unitsLeft" TEXT NOT NULL,
    "pricePerUnit" TEXT NOT NULL,
    "isOnOffer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_table_pkey" PRIMARY KEY ("id")
);
