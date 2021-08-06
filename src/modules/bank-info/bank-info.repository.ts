import { EntityManager, EntityRepository } from 'typeorm';
import { BankInfo } from '../../entities/bank-info.entity';

@EntityRepository()
export class BankInfoRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public findBankInfo(): Promise<BankInfo[]> {
    return this.entityManager.find<BankInfo>(BankInfo);
  }
}
