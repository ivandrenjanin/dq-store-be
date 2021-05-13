import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Entities } from './enum/entity.enum';
import { UserRole } from './user-role.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Column({
    type: String,
    nullable: false,
    unique: true,
  })
  public name!: string;

  @Column({
    type: String,
    nullable: true,
  })
  public description?: string;

  @OneToMany(Entities.USER_ROLE, 'role')
  public userRoles!: UserRole[];
}
