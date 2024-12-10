import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { Product } from '@prisma/client';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Produto com SKU ou código de barras já existe' })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos ativos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso' })
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 409, description: 'SKU ou código de barras já existe em outro produto' })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateProductDto>,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desativar um produto' })
  @ApiResponse({ status: 204, description: 'Produto desativado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productsService.deleteProduct(id);
  }

  @Put(':id/stock')
  @ApiOperation({ summary: 'Atualizar o estoque de um produto' })
  @ApiResponse({ status: 200, description: 'Estoque atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 409, description: 'Quantidade em estoque não pode ser negativa' })
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ): Promise<Product> {
    return this.productsService.updateStock(id, quantity);
  }
} 