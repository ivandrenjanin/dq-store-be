import { Inject, Injectable } from '@nestjs/common';
import { BankInfo } from '../../entities/bank-info.entity';
import { BankInfoRepository } from './bank-info.repository';

@Injectable()
export class BankInfoService {
  constructor(
    @Inject('BANK_INFO_REPOSITORY')
    private readonly repository: BankInfoRepository,
  ) {}

  public getBankInfo(): Promise<BankInfo[]> {
    return this.repository.findBankInfo();
  }
}
