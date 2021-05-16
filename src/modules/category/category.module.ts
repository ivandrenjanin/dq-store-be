import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { InventoryModule } from '../inventory/inventory.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, InventoryModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'CATEGORY_REPOSITORY',
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
