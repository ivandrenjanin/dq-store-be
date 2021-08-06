import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CompanyClient } from '../../entities/company-client.entity';
import { Company } from '../../entities/company.entity';
import { User } from '../../entities/user.entity';
import { CompanyService } from '../company/company.service';
import { CompanyClientRepository } from './company-client.repository';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateCompanyClientDto } from './dto/update-company-client.dto';
import { CompanyClientExceptionMessage } from './enum/company-client-exception-message.enum';

@Injectable()
export class CompanyClientService {
  constructor(
    @Inject('COMPANY_CLIENT_REPOSITORY')
    private readonly repository: CompanyClientRepository,
    private readonly companyService: CompanyService,
  ) {}

  public async createCompanyClient(
    dto: CreateCompanyClientDto,
    identity: User,
  ): Promise<CompanyClient> {
    const company = await this.companyService.getCompanyByUserId(identity);

    const companyClient = await this.repository.insertCompanyClient(
      dto,
      company,
    );

    return companyClient;
  }

  public async updateCompanyClient(
    id: number,
    dto: UpdateCompanyClientDto,
    identity: User,
  ): Promise<CompanyClient> {
    const company = await this.companyService.getCompanyByUserId(identity);
    const companyClient = await this.repository.findCompanyClientById(
      id,
      company,
    );

    if (!companyClient) {
      throw new NotFoundException(
        CompanyClientExceptionMessage.COMPANY_CLIENT_NOT_FOUND,
      );
    }

    const updated = await this.repository.updateCompanyClient(id, dto);

    return updated;
  }

  public async deleteCompanyClient(id: number, identity: User): Promise<void> {
    const company = await this.companyService.getCompanyByUserId(identity);

    await this.getCompanyClient(id, company);

    await this.repository.deleteCompanyClient(id);
  }

  public async getCompanyClient(
    id: number,
    company: Company,
  ): Promise<CompanyClient> {
    const companyClient = await this.repository.findCompanyClientById(
      id,
      company,
    );

    if (!companyClient) {
      throw new NotFoundException(
        CompanyClientExceptionMessage.COMPANY_CLIENT_NOT_FOUND,
      );
    }

    return companyClient;
  }

  public async getCompanyClients(identity: User): Promise<CompanyClient[]> {
    const company = await this.companyService.getCompanyByUserId(identity);
    return this.repository.findCompanyClientsByCompanyId(company);
  }
}
