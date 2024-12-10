import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './create-product.dto';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // Verifica se já existe um produto com o mesmo SKU ou código de barras
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        OR: [
          { sku: createProductDto.sku },
          { barcode: createProductDto.barcode },
        ],
      },
    });

    if (existingProduct) {
      throw new ConflictException('Já existe um produto com este SKU ou código de barras');
    }

    return this.prisma.product.create({
      data: {
        ...createProductDto,
        price: new Decimal(createProductDto.price.toString()),
        weight: createProductDto.weight ? new Decimal(createProductDto.weight.toString()) : null,
      },
    });
  }

  async getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  async updateProduct(id: number, updateData: Partial<CreateProductDto>): Promise<Product> {
    const product = await this.getProductById(id);

    if (updateData.sku || updateData.barcode) {
      const existingProduct = await this.prisma.product.findFirst({
        where: {
          OR: [
            { sku: updateData.sku },
            { barcode: updateData.barcode },
          ],
          NOT: {
            id: id,
          },
        },
      });

      if (existingProduct) {
        throw new ConflictException('Já existe outro produto com este SKU ou código de barras');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        price: updateData.price ? new Decimal(updateData.price.toString()) : undefined,
        weight: updateData.weight ? new Decimal(updateData.weight.toString()) : undefined,
      },
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.getProductById(id);

    return this.prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.getProductById(id);
    const newQuantity = product.stockQuantity + quantity;

    if (newQuantity < 0) {
      throw new ConflictException('Quantidade em estoque não pode ser negativa');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        stockQuantity: newQuantity,
      },
    });
  }
} 