import { EntityManager, EntityRepository } from 'typeorm';

import { User } from '../../entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@EntityRepository()
export class IdentityRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public findIdentityById(claims: JwtPayload): Promise<User> {
    return this.entityManager.findOne<User>(User, { id: claims.id });
  }

  public findIdentityByEmail(email: string): Promise<User> {
    return this.entityManager.findOne<User>(User, { email });
  }
}
