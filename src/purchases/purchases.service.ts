import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './create-purchase.dto';
import { Purchase } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const sale = await this.prisma.sale.findUnique({
      where: { id: createPurchaseDto.saleId },
    });

    if (!sale) {
      throw new NotFoundException(`Venda com ID ${createPurchaseDto.saleId} não encontrada`);
    }

    return this.prisma.purchase.create({
      data: {
        saleId: createPurchaseDto.saleId,
        status: createPurchaseDto.status,
        totalAmount: new Decimal(createPurchaseDto.totalAmount.toString()),
        discount: createPurchaseDto.discount ? new Decimal(createPurchaseDto.discount.toString()) : null,
        notes: createPurchaseDto.notes,
        products: {
          create: createPurchaseDto.products.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
            unitPrice: new Decimal(product.unitPrice.toString()),
            totalPrice: new Decimal((product.quantity * product.unitPrice).toString())
          }))
        }
      },
      include: {
        sale: true,
        products: true
      },
    });
  }

  async getPurchases(): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      include: {
        sale: true,
        products: true
      },
    });
  }

  async getPurchaseById(id: number): Promise<Purchase | null> {
    return this.prisma.purchase.findUnique({
      where: { id },
      include: {
        sale: true,
        products: true
      },
    });
  }
} 