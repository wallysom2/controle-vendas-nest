import { IsOptional, IsDateString, IsString, IsEmail, IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SaleStatus } from '@prisma/client';

export class CreateSaleDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Data da venda',
    example: '2023-12-10T10:00:00Z',
    required: false,
  })
  date?: Date;

  @IsString()
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  customerName: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@email.com',
    required: false,
  })
  customerEmail?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Telefone do cliente',
    example: '(11) 98765-4321',
    required: false,
  })
  customerPhone?: string;

  @IsOptional()
  @IsEnum(SaleStatus)
  @ApiProperty({
    description: 'Status da venda',
    enum: SaleStatus,
    default: SaleStatus.PENDING,
    required: false,
  })
  status?: SaleStatus;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Valor total da venda',
    example: 3999.99,
  })
  totalAmount: number;

  @IsString()
  @ApiProperty({
    description: 'Método de pagamento',
    example: 'CREDIT_CARD',
  })
  paymentMethod: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Observações da venda',
    example: 'Cliente solicitou entrega expressa',
    required: false,
  })
  notes?: string;
} 