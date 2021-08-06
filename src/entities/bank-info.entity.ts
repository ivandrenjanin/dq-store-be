import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'bank_info' })
export class BankInfo extends BaseEntity {
  @ApiProperty()
  @Column({
    type: String,
    nullable: false,
  })
  public name!: string;

  @ApiProperty()
  @Column({
    type: String,
    nullable: false,
  })
  public code!: number;

  @ApiProperty()
  @Column({
    type: String,
    nullable: false,
  })
  public country!: string;
}
