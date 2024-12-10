import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Smartphone Galaxy S21',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Smartphone Samsung Galaxy S21 128GB',
    required: false,
  })
  description?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Código SKU do produto',
    example: 'SAMS21-128-BLK',
  })
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Preço do produto',
    example: 3999.99,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 50,
  })
  stockQuantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Fabricante do produto',
    example: 'Samsung',
  })
  manufacturer: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Marca do produto',
    example: 'Samsung Galaxy',
  })
  brand: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Categoria do produto',
    example: 'Smartphones',
  })
  category: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Peso do produto em kg',
    example: 0.169,
    required: false,
  })
  weight?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Dimensões do produto (AxLxP)',
    example: '151.7 x 71.2 x 7.9 mm',
    required: false,
  })
  dimensions?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Código de barras do produto',
    example: '7892509112437',
    required: false,
  })
  barcode?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Indica se o produto está ativo',
    example: true,
    default: true,
    required: false,
  })
  isActive?: boolean;
} 