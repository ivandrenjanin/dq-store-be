import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Company } from '../../entities/company.entity';
import { User } from '../../entities/user.entity';

import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private readonly repository: CompanyRepository,
  ) {}

  public async createCompany(
    dto: CreateCompanyDto,
    identity: User,
  ): Promise<Company> {
    const existingCompany = await this.repository.findCompanyByUserId(
      identity.id,
    );

    if (existingCompany) {
      throw new ForbiddenException();
    }

    const company = await this.repository.insertCompany(dto, identity);

    return company;
  }

  public async getCompanyByUserId(identity: User): Promise<Company> {
    const company = await this.repository.findCompanyByUserId(identity.id);

    if (!company) {
      throw new NotFoundException();
    }

    return company;
  }
}
