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
import { Inventory } from '../../entities/inventory.entity';
import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

@ApiBearerAuth()
@ApiTags('inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
  )
  @ApiCreatedResponse({
    type: Inventory,
  })
  public createInventory(
    @Body() dto: CreateInventoryDto,
    @GetIdentity() identity: User,
  ): Promise<Inventory> {
    return this.service.createInventory(dto, identity);
  }

  @Get()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Inventory,
  })
  public getInventories(@GetIdentity() identity: User): Promise<Inventory[]> {
    return this.service.getInventories(identity);
  }

  @Get('/:id')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Inventory,
  })
  public getInventoryById(
    @Param('id') id: number,
    @GetIdentity() identity: User,
  ): Promise<Inventory> {
    return this.service.getInventoryById(id, identity);
  }

  @Patch('/:id')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Inventory,
  })
  public updateInventoryById(
    @Param('id') id: number,
    @Body() dto: UpdateInventoryDto,
    @GetIdentity() identity: User,
  ): Promise<Inventory> {
    return this.service.updateInventoryById(id, dto, identity);
  }
}
