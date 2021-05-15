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
    publicId: string,
    dto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.entityManager.transaction(async (txManager) => {
      await txManager.update(Company, { publicId }, { ...dto });

      return txManager.findOne<Company>(Company, { where: { publicId } });
    });
  }

  public async findCompanyByUserId(userId: number): Promise<Company> {
    const [company] = await this.entityManager
      .createQueryBuilder<CompanyUser>(CompanyUser, 'companyUser')
      .where('companyUser.user_id = :userId', { userId })
      .leftJoinAndSelect('companyUser.company', 'company')
      .select(
        `public_id as "publicId",
        created_at as "createdAt",
        updated_at as "updatedAt",
        postal_code as "postalCode",
        tax_id_number as "taxIdNumber",
        company_number as "companyNumber",
        activity_code as "activityCode",
        bank_name as "bankName",
        bank_account_number as "bankAccountNumber",
        phone_fax_number as "phoneFaxNumber",
        phone_mobile_number as "phoneMobileNumber",
        website_url as "websiteUrl",
        is_active as "isActive",
        name,
        email
        `,
      )
      .execute();

    return company;
  }
}
