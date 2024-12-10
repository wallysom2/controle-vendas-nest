import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './create-sale.dto';
import { Sale } from '@prisma/client';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova venda' })
  @ApiResponse({ status: 201, description: 'Venda criada com sucesso' })
  async createSale(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.createSale(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as vendas' })
  @ApiResponse({ status: 200, description: 'Lista de vendas retornada com sucesso' })
  async getSales(): Promise<Sale[]> {
    return this.salesService.getSales();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma venda pelo ID' })
  @ApiResponse({ status: 200, description: 'Venda encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  async getSaleById(@Param('id', ParseIntPipe) id: number): Promise<Sale> {
    return this.salesService.getSaleById(id);
  }
} 