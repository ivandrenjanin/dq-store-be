import { PinoLogger } from 'nestjs-pino';
import { EntityManager, EntityRepository } from 'typeorm';

@EntityRepository()
export class CompanyRepository {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly logger: PinoLogger,
  ) {}
}
