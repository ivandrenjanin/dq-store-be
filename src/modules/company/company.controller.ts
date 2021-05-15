import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetIdentity } from '../../decorators/get-identity.decorator';
import { AllowedRoles } from '../../decorators/set-allowed-roles.decorator';
import { Company } from '../../entities/company.entity';
import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiBearerAuth()
@ApiTags('company')
@Controller('company')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
  )
  @ApiCreatedResponse({
    type: Company,
  })
  public createCompany(
    @Body() dto: CreateCompanyDto,
    @GetIdentity() identity: User,
  ): Promise<Company> {
    return this.service.createCompany(dto, identity);
  }

  @Get()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Company,
  })
  public getCompanyByUserId(@GetIdentity() identity: User): Promise<Company> {
    return this.service.getCompanyByUserId(identity);
  }

  @Patch('/:id')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
  )
  @ApiCreatedResponse({
    type: Company,
  })
  public updateCompanyById(
    @Param('id') id: number,
    @Body() dto: UpdateCompanyDto,
    @GetIdentity() identity: User,
  ): Promise<Company> {
    return this.service.updateCompanyById(id, dto, identity);
  }
}
