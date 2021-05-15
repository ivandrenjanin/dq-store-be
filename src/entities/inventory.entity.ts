import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base';
import { Category } from './category.entity';
import { Company } from './company.entity';
import { Entities } from './enum/entity.enum';
import { Product } from './product.entity';

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

  @OneToMany(Entities.PRODUCT, 'inventory')
  public products!: Product[];

  @OneToMany(Entities.CATEGORY, 'inventory')
  public categories: Category[];
}
