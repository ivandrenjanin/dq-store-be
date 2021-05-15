import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AllowedRoles } from '../../decorators/set-allowed-roles.decorator';

import { User } from '../../entities/user.entity';
import { IdentityPermissionRole } from '../../enums/identity-role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @AllowedRoles(
    IdentityPermissionRole.SUPER_ADMIN,
    IdentityPermissionRole.ADMIN,
  )
  @ApiCreatedResponse({
    type: User,
  })
  public createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.createUser(dto);
  }
}
