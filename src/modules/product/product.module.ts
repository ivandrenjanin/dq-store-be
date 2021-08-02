import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { InventoryModule } from '../inventory/inventory.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [AuthModule, InventoryModule, CategoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepository,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
