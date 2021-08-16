import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { BankInfoModule } from './modules/bank-info/bank-info.module';
import { CategoryModule } from './modules/category/category.module';
import { CompanyClientModule } from './modules/company-client/company-client.module';
import { CompanyModule } from './modules/company/company.module';
import { GlobalModule } from './modules/global/global.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrderModule } from './modules/order/order.module';
import { PdfGeneratorModule } from './modules/pdf-generator/pdf-generator.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    UserModule,
    CompanyModule,
    InventoryModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    CompanyClientModule,
    BankInfoModule,
    PdfGeneratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
