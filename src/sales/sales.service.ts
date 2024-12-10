import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './create-sale.dto';
import { Sale } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.prisma.sale.create({
      data: {
        date: createSaleDto.date || new Date(),
        customerName: createSaleDto.customerName,
        customerEmail: createSaleDto.customerEmail,
        customerPhone: createSaleDto.customerPhone,
        status: createSaleDto.status,
        totalAmount: new Decimal(createSaleDto.totalAmount.toString()),
        paymentMethod: createSaleDto.paymentMethod,
        notes: createSaleDto.notes
      },
    });
  }

  async getSales(): Promise<Sale[]> {
    return this.prisma.sale.findMany({
      include: {
        purchases: true,
      },
    });
  }

  async getSaleById(id: number): Promise<Sale | null> {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        purchases: true,
      },
    });
  }
} 