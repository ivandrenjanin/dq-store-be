import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { GetIdentity } from '../../decorators/get-identity.decorator';
import { AllowedRoles } from '../../decorators/set-allowed-roles.decorator';
import { Category } from '../../entities/category.entity';
import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiBearerAuth()
@ApiTags('inventory/category')
@Controller('inventory/:inventoryId/category')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Category,
  })
  public createCategory(
    @Param('inventoryId') inventoryId: number,
    @GetIdentity() identity: User,
    @Body() dto: CreateCategoryDto,
  ): Promise<Category> {
    return this.service.createCategory(inventoryId, identity, dto);
  }

  @Patch('/:id')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Category,
  })
  public updateCategory(
    @Param('inventoryId') inventoryId: number,
    @Param('id') id: number,
    @GetIdentity() identity: User,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.service.updateCategory(inventoryId, id, identity, dto);
  }
}
