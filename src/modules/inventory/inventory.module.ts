import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from '../company/company.module';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';

@Module({
  imports: [AuthModule, CompanyModule],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    {
      provide: 'INVENTORY_REPOSITORY',
      useClass: InventoryRepository,
    },
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
