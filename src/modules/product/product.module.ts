import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { InventoryModule } from '../inventory/inventory.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [AuthModule, InventoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_REPOSITORY',
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
