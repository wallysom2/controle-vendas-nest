import { IsNotEmpty, IsNumber, IsArray, IsEnum, IsOptional, Min, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PurchaseStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class PurchaseProductDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ID do produto',
    example: 1,
  })
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Quantidade do produto',
    example: 2,
  })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Preço unitário do produto',
    example: 1999.99,
  })
  unitPrice: number;
}

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ID da venda relacionada',
    example: 1,
  })
  saleId: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseProductDto)
  @ApiProperty({
    description: 'Lista de produtos comprados',
    type: [PurchaseProductDto],
  })
  products: PurchaseProductDto[];

  @IsOptional()
  @IsEnum(PurchaseStatus)
  @ApiProperty({
    description: 'Status da compra',
    enum: PurchaseStatus,
    default: PurchaseStatus.PENDING,
    required: false,
  })
  status?: PurchaseStatus;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Valor total da compra',
    example: 3999.98,
  })
  totalAmount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Valor do desconto',
    example: 199.99,
    required: false,
  })
  discount?: number;

  @IsOptional()
  @ApiProperty({
    description: 'Observações da compra',
    example: 'Entrega em horário comercial',
    required: false,
  })
  notes?: string;
} 