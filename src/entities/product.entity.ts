import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UnitOfMessure } from '../enums/unit-of-messure.enum';
import { calculator } from '../modules/helper/calculator.helper';
import { createCode } from '../modules/helper/create-code.helper';

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
    type: 'bigint',
    nullable: false,
  })
  public sellingPrice!: number;

  @ApiProperty()
  @Column({
    name: 'prime_price',
    type: 'bigint',
    nullable: false,
  })
  public primePrice!: number;

  @ApiProperty()
  @Column({
    name: 'taxed_price',
    type: 'bigint',
    nullable: false,
  })
  public taxedPrice!: number;

  @ApiProperty()
  @Column({
    name: 'tax_rate',
    type: 'int',
    nullable: false,
  })
  public taxRate!: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  public quantity!: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    nullable: false,
    name: 'unit_of_messure',
    default: UnitOfMessure.EACH,
    enum: UnitOfMessure,
    enumName: 'unit_of_messure',
  })
  public unitOfMessure!: UnitOfMessure;

  @ManyToOne(Entities.INVENTORY)
  @JoinColumn({ name: 'inventory_id' })
  public inventory!: Inventory;

  @OneToMany(Entities.PRODUCT_DETAILS, 'product')
  public productDetails: ProductDetails[];

  @OneToMany(Entities.PRODUCT_CATEGORY, 'product', { eager: true })
  public productCategories!: ProductCategory[];

  @OneToMany(Entities.PRODUCT_ORDER, 'product')
  public productOrders!: ProductOrder[];

  @BeforeInsert()
  public convertToCent() {
    this.primePrice = calculator.toCent(this.primePrice);
    this.taxedPrice = calculator.toCent(this.taxedPrice);
    this.sellingPrice = calculator.toCent(this.sellingPrice);
  }

  @BeforeInsert()
  public createCode() {
    this.code = createCode();
  }

  @AfterLoad()
  public convertFromCent() {
    this.primePrice = calculator.fromCent(this.primePrice);
    this.taxedPrice = calculator.fromCent(this.taxedPrice);
    this.sellingPrice = calculator.fromCent(this.sellingPrice);
  }
}
