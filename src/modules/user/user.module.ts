import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
