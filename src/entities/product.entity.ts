import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base';
import { Entities } from './enum/entity.enum';
import { Inventory } from './inventory.entity';
import { ProductCategory } from './product-category.entity';
import { ProductDetails } from './product-details.entity';
import { ProductOrder } from './product-order.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
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

  @ApiProperty()
  @Column({
    name: 'selling_price',
    type: 'int',
    nullable: false,
  })
  public sellingPrice!: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  public quantity!: number;

  @ManyToOne(Entities.INVENTORY)
  @JoinColumn({ name: 'inventory_id' })
  public inventory!: Inventory;

  @OneToMany(Entities.PRODUCT_DETAILS, 'product')
  public productDetails: ProductDetails[];

  @OneToMany(Entities.PRODUCT_CATEGORY, 'product')
  public productCategories!: ProductCategory[];

  @OneToMany(Entities.PRODUCT_ORDER, 'product')
  public productOrders!: ProductOrder[];
}
