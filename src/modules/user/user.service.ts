import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../entities/user.entity';
import { EncryptionService } from '../global/encryption/encryption.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly repository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const { password, ...rest } = dto;

    const hashedPassword = await this.encryptionService.hashString(password);

    const user = await this.repository.insertUser({
      ...rest,
      password: hashedPassword,
    });

    return user;
  }
}
