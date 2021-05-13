import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Entities } from './enum/entity.enum';
import { UserRole } from './user-role.entity';
import { CompanyUser } from './company-user.entity';
import { BaseEntity } from './base';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @ApiProperty()
  @Column({
    name: 'email',
    unique: true,
    type: String,
  })
  public email!: string;

  @Exclude()
  @Column({
    name: 'password',
    type: String,
  })
  public password!: string;

  @ApiProperty()
  @Column({
    name: 'first_name',
    type: String,
  })
  public firstName!: string;

  @ApiProperty()
  @Column({
    name: 'last_name',
    type: String,
  })
  public lastName!: string;

  @ApiProperty()
  @Column({
    name: 'is_active',
    default: true,
    type: Boolean,
  })
  public isActive!: boolean;

  @OneToMany(Entities.USER_ROLE, 'user', {
    eager: true,
  })
  public roles!: UserRole[];

  @OneToMany(Entities.COMPANY_USER, 'user')
  public companyUsers!: CompanyUser[];
}
