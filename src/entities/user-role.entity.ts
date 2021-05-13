import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Entities } from './enum/entity.enum';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ name: 'user_role' })
export class UserRole {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @ManyToOne(Entities.ROLE, {
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  public role!: Role;

  @ManyToOne(Entities.USER)
  @JoinColumn({ name: 'user_id' })
  public user!: User;
}
