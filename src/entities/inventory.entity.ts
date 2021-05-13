import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base';
import { Company } from './company.entity';
import { Entities } from './enum/entity.enum';

@Entity({ name: 'inventory' })
export class Inventory extends BaseEntity {
  @ApiProperty()
  @Column({
    type: String,
    nullable: false,
  })
  public name!: string;

  @ManyToOne(Entities.COMPANY)
  @JoinColumn({ name: 'company_id' })
  public company!: Company;
}
