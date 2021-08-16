import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CompanyClientModule } from '../company-client/company-client.module';
import { CompanyModule } from '../company/company.module';
import { InventoryModule } from '../inventory/inventory.module';
import { PdfGeneratorModule } from '../pdf-generator/pdf-generator.module';
import { ProductModule } from '../product/product.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [
    AuthModule,
    InventoryModule,
    ProductModule,
    CompanyModule,
    CompanyClientModule,
    PdfGeneratorModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'ORDER_REPOSITORY',
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
