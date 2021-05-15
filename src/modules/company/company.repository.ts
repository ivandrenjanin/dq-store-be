import { UnprocessableEntityException } from '@nestjs/common';
import { EntityManager, EntityRepository } from 'typeorm';
import { CompanyUser } from '../../entities/company-user.entity';
import { Company } from '../../entities/company.entity';
import { User } from '../../entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

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

  public async updateCompanyById(
    id: number,
    dto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.entityManager.transaction(async (txManager) => {
      await txManager.update(Company, { id }, { ...dto });
      return txManager.findOne<Company>(Company, { where: { id } });
    });
  }

  public async findCompanyByUserId(userId: number): Promise<Company> {
    const [companyUser] = await this.entityManager
      .createQueryBuilder<CompanyUser>(CompanyUser, 'companyUser')
      .select('company_id as "companyId"')
      .where('companyUser.user_id = :userId', { userId })
      .execute();

    const company = await this.entityManager.findOne<Company>(Company, {
      where: { id: companyUser.companyId },
    });

    return company;
  }
}
