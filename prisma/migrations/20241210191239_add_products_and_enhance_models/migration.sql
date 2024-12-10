/*
  Warnings:

  - You are about to drop the column `products` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `totalAmount` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'DELIVERED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'DELIVERED', 'RETURNED');

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "products",
ADD COLUMN     "discount" DECIMAL(10,2),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalAmount" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "status" "SaleStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalAmount" DECIMAL(10,2) NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "manufacturer" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" DECIMAL(10,2),
    "dimensions" TEXT,
    "barcode" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseProduct" (
    "id" SERIAL NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateIndex
CREATE INDEX "PurchaseProduct_purchaseId_idx" ON "PurchaseProduct"("purchaseId");

-- CreateIndex
CREATE INDEX "PurchaseProduct_productId_idx" ON "PurchaseProduct"("productId");

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
