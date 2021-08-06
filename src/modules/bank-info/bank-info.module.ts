import { Module } from '@nestjs/common';
import { BankInfoController } from './bank-info.controller';
import { BankInfoRepository } from './bank-info.repository';
import { BankInfoService } from './bank-info.service';

@Module({
  imports: [],
  controllers: [BankInfoController],
  providers: [
    BankInfoService,
    {
      provide: 'BANK_INFO_REPOSITORY',
      useClass: BankInfoRepository,
    },
  ],
})
export class BankInfoModule {}
