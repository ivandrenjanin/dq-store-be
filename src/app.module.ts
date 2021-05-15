import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { GlobalModule } from './modules/global/global.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    UserModule,
    CompanyModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
