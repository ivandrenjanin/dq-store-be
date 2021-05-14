import { PinoLogger } from 'nestjs-pino';
import { EntityManager, EntityRepository } from 'typeorm';

import { UnprocessableEntityException } from '@nestjs/common';

import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../entities/user-role.entity';

@EntityRepository()
export class UserRepository {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly logger: PinoLogger,
  ) {}

  public async insertUser(dto: CreateUserDto): Promise<User> {
    try {
      return await this.entityManager.transaction(async (txManager) => {
        const user = await txManager.save<User>(
          txManager.create<User>(User, {
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            password: dto.password,
          }),
        );

        const role = await txManager.findOne<Role>(Role, {
          name: dto.role,
        });

        await txManager.save<UserRole>(
          txManager.create<UserRole>(UserRole, {
            role,
            user,
          }),
        );

        return user;
      });
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityException();
    }
  }
}
