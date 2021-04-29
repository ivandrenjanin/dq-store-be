import { Module } from '@nestjs/common';
import { GlobalModule } from './modules/global/global.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [GlobalModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
