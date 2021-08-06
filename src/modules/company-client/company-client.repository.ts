import { EntityManager, EntityRepository } from 'typeorm';

import { UnprocessableEntityException } from '@nestjs/common';

import { CompanyClient } from '../../entities/company-client.entity';
import { Company } from '../../entities/company.entity';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateCompanyClientDto } from './dto/update-company-client.dto';

@EntityRepository()
export class CompanyClientRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertCompanyClient(
    dto: CreateCompanyClientDto,
    company: Company,
  ): Promise<CompanyClient> {
    try {
      const companyClient = await this.entityManager.save<CompanyClient>(
        this.entityManager.create<CompanyClient>(CompanyClient, {
          ...dto,
          company,
        }),
      );
      return companyClient;
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  public async updateCompanyClient(
    id: number,
    dto: UpdateCompanyClientDto,
  ): Promise<CompanyClient> {
    return await this.entityManager.transaction(async (txManager) => {
      await txManager.update(CompanyClient, { id }, { ...dto });
      return txManager.findOne<CompanyClient>(CompanyClient, { where: { id } });
    });
  }

  public async deleteCompanyClient(id: number): Promise<void> {
    await this.entityManager.softDelete<CompanyClient>(CompanyClient, { id });
  }

  public async findCompanyClientById(
    id: number,
    company: Company,
  ): Promise<CompanyClient> {
    return await this.entityManager.findOne<CompanyClient>(CompanyClient, {
      where: { id, company },
    });
  }

  public async findCompanyClientsByCompanyId(
    company: Company,
  ): Promise<CompanyClient[]> {
    return await this.entityManager.find<CompanyClient>(CompanyClient, {
      where: { company },
    });
  }
}
