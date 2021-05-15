import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
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

  @Exclude()
  @DeleteDateColumn({
    nullable: true,
    name: 'deleted_at',
    type: 'timestamp without time zone',
  })
  public readonly deletedAt?: string;
}
