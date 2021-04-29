import { PinoLogger } from 'nestjs-pino';
import { EntityManager, EntityRepository } from 'typeorm';

import { UnprocessableEntityException } from '@nestjs/common';

import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository()
export class UserRepository {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly logger: PinoLogger,
  ) {}

  public insertUser(dto: CreateUserDto): Promise<User> {
    try {
      return this.entityManager.save<User>(
        this.entityManager.create<User>(User, dto),
      );
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException();
    }
  }
}
