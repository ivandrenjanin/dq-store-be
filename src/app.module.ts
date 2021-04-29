import { Module } from '@nestjs/common';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
