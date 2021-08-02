import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { GetIdentity } from '../../decorators/get-identity.decorator';
import { AllowedRoles } from '../../decorators/set-allowed-roles.decorator';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@ApiBearerAuth()
@ApiTags('inventory/product')
@Controller('inventory/:inventoryId/product')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Product,
  })
  public createProduct(
    @Param('inventoryId') inventoryId: number,
    @GetIdentity() identity: User,
    @Body() dto: CreateProductDto,
  ): Promise<Product> {
    return this.service.createProduct(inventoryId, identity, dto);
  }

  @Post('/:id/details')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: null,
  })
  public createProductDetails(
    @Param('inventoryId') inventoryId: number,
    @Param('id') id: number,
    @GetIdentity() identity: User,
    @Body() dto: CreateProductDetailsDto,
  ): Promise<void> {
    return this.service.createProductDetails(id, inventoryId, identity, dto);
  }

  @Post('/:id/category')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: Product,
  })
  public createProductCategory(
    @Param('inventoryId') inventoryId: number,
    @Param('id') id: number,
    @GetIdentity() identity: User,
    @Body() dto: CreateProductCategoryDto,
  ) {
    return this.service.createProductCategory(id, inventoryId, identity, dto);
  }
}
