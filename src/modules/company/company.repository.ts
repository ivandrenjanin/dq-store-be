import { UnprocessableEntityException } from '@nestjs/common';
import { EntityManager, EntityRepository } from 'typeorm';
import { CompanyUser } from '../../entities/company-user.entity';
import { Company } from '../../entities/company.entity';
import { User } from '../../entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@EntityRepository()
export class CompanyRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertCompany(
    dto: CreateCompanyDto,
    user: User,
  ): Promise<Company> {
    try {
      return await this.entityManager.transaction(async (txManager) => {
        const company = await txManager.save<Company>(
          txManager.create<Company>(Company, dto),
        );

        await txManager.save<CompanyUser>(
          txManager.create<CompanyUser>(CompanyUser, { user, company }),
        );

        return company;
      });
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  public async findCompanyByUserId(userId: number): Promise<Company> {
    const company = await this.entityManager.findOne(Company, {
      where: {
        companyUsers: {
          where: {
            userId,
          },
        },
      },
    });

    return company;
  }
}
