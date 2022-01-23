import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { GetIdentity } from '../../decorators/get-identity.decorator';
import { AllowedRoles } from '../../decorators/set-allowed-roles.decorator';
import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { FileResponse } from './dto/file-response';
import { OrderService } from './order.service';

@ApiBearerAuth()
@ApiTags('inventory/order')
@Controller('inventory/:inventoryId/order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: null,
  })
  public async createOrder(
    @Param('inventoryId') inventoryId: number,
    @GetIdentity() identity: User,
    @Body() dto: CreateOrderDto,
  ): Promise<void> {
    return this.service.createOrder(inventoryId, identity, dto);
  }

  @Get('/:orderId/invoice')
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
    IdentityPermissionRole.COMPANY_ADMIN,
    IdentityPermissionRole.COMPANY_MEMBER,
  )
  @ApiCreatedResponse({
    type: FileResponse,
  })
  public async getOrderInvoice(
    @Param('inventoryId') inventoryId: number,
    @Param('orderId') orderId: number,
    @GetIdentity() identity: User,
  ) {
    return this.service.getOrderInvoice(inventoryId, orderId, identity);
  }
}
