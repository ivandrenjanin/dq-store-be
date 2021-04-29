import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @Exclude()
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @ApiProperty()
  @Column({
    name: 'public_id',
    unique: true,
    type: 'uuid',
  })
  @Generated('uuid')
  public publicId!: string;

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

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
  })
  public createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
  })
  public updatedAt!: Date;
}
