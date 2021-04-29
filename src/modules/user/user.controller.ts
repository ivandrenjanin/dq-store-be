import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiCreatedResponse({
    type: User,
  })
  public createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.createUser(dto);
  }
}
