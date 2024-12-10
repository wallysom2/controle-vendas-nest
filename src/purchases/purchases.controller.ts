import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './create-purchase.dto';
import { Purchase } from '@prisma/client';

@ApiTags('purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova compra' })
  @ApiResponse({ status: 201, description: 'Compra criada com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchasesService.createPurchase(createPurchaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as compras' })
  @ApiResponse({ status: 200, description: 'Lista de compras retornada com sucesso' })
  async getPurchases(): Promise<Purchase[]> {
    return this.purchasesService.getPurchases();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma compra pelo ID' })
  @ApiResponse({ status: 200, description: 'Compra encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  async getPurchaseById(@Param('id', ParseIntPipe) id: number): Promise<Purchase> {
    return this.purchasesService.getPurchaseById(id);
  }
} 