import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { GetIdentity } from '../../decorators/get-identity.decorator';
import { AllowedRoles } from '../../decorators/set-allowed-roles.decorator';
import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
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
    type: Order,
  })
  public async createOrder(
    @Param('inventoryId') inventoryId: number,
    @GetIdentity() identity: User,
    @Body() dto: CreateOrderDto,
  ): Promise<Order> {
    return this.service.createOrder(inventoryId, identity, dto);
  }
}
