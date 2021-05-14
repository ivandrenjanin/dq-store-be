import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalModule } from './modules/global/global.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [GlobalModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
