import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SalesModule } from './sales/sales.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    SalesModule,
    PurchasesModule,
  ],
})
export class AppModule {}
