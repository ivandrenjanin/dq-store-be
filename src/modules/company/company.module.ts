import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
  imports: [AuthModule],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    {
      provide: 'COMPANY_REPOSITORY',
      useClass: CompanyRepository,
    },
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
