import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { GetIdentity } from '../../decorators/get-identity.decorator';
import { AllowedRoles } from '../../decorators/set-allowed-roles.decorator';
import { CompanyClient } from '../../entities/company-client.entity';
import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CompanyClientService } from './company-client.service';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateCompanyClientDto } from './dto/update-company-client.dto';

ApiBearerAuth();
@ApiTags('company-client')
@Controller('/company-client')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyClientController {
  constructor(private readonly service: CompanyClientService) {}

  @Get()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
  )
  @ApiCreatedResponse({
    type: [CompanyClient],
  })
  public getCompanyClients(
    @GetIdentity() identity: User,
  ): Promise<CompanyClient[]> {
    return this.service.getCompanyClients(identity);
  }

  @Post()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
  )
  @ApiCreatedResponse({
    type: CompanyClient,
  })
  public createCompanyClient(
    @Body() dto: CreateCompanyClientDto,
    @GetIdentity() identity: User,
  ): Promise<CompanyClient> {
    return this.service.createCompanyClient(dto, identity);
  }

  @Patch('/:id')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
  )
  @ApiCreatedResponse({
    type: CompanyClient,
  })
  public updateCompanyClient(
    @Param('id') id: number,
    @Body() dto: UpdateCompanyClientDto,
    @GetIdentity() identity: User,
  ): Promise<CompanyClient> {
    return this.service.updateCompanyClient(id, dto, identity);
  }

  @Delete('/:id')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
  )
  @ApiCreatedResponse({
    type: null,
  })
  public deleteCompanyClient(
    @Param('id') id: number,
    @GetIdentity() identity: User,
  ): Promise<void> {
    return this.service.deleteCompanyClient(id, identity);
  }
}
