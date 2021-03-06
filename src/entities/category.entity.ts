import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { createCode } from '../modules/helper/create-code.helper';

import { BaseEntity } from './base';
import { Entities } from './enum/entity.enum';
import { Inventory } from './inventory.entity';
import { ProductCategory } from './product-category.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
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
  public code!: string;

  @ManyToOne(Entities.INVENTORY)
  @JoinColumn({ name: 'inventory_id' })
  public inventory!: Inventory;

  @OneToMany(Entities.PRODUCT_CATEGORY, 'category')
  public productCategories!: ProductCategory[];

  @BeforeInsert()
  public createCode() {
    this.code = createCode().toUpperCase();
  }
}
