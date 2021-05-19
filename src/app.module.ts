import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CompanyModule } from './modules/company/company.module';
import { GlobalModule } from './modules/global/global.module';
import { InventoryModule } from './modules/inventory/inventory.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
