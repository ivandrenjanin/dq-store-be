import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from '../company/company.module';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, CompanyModule, ProductModule, CategoryModule],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    {
      provide: 'INVENTORY_REPOSITORY',
      useClass: InventoryRepository,
    },
  ],
})
export class InventoryModule {}
