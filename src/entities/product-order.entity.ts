import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { calculator } from '../modules/helper/calculator.helper';

import { Entities } from './enum/entity.enum';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ name: 'product_order' })
export class ProductOrder {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  public total!: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  public totalTaxed!: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  public quantity!: number;

  @ManyToOne(Entities.PRODUCT, { eager: true })
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ManyToOne(Entities.ORDER)
  @JoinColumn({ name: 'order_id' })
  public order!: Order;

  @BeforeInsert()
  public convertToCent() {
    this.total = calculator.toCent(this.total);
    this.totalTaxed = calculator.toCent(this.totalTaxed);
  }

  @AfterLoad()
  public convertFromCent() {
    this.total = calculator.fromCent(this.total);
    this.totalTaxed = calculator.fromCent(this.totalTaxed);
  }
}
