import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from '../company/company.module';
import { CompanyClientController } from './company-client.controller';
import { CompanyClientRepository } from './company-client.repository';
import { CompanyClientService } from './company-client.service';

@Module({
  imports: [AuthModule, CompanyModule],
  controllers: [CompanyClientController],
  providers: [
    CompanyClientService,
    {
      provide: 'COMPANY_CLIENT_REPOSITORY',
      useClass: CompanyClientRepository,
    },
  ],
  exports: [CompanyClientService],
})
export class CompanyClientModule {}
