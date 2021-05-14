import { Inject, Injectable } from '@nestjs/common';

import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private readonly repository: CompanyRepository,
  ) {}
}
