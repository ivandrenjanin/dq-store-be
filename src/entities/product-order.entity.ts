import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  public quantity!: number;

  @ManyToOne(Entities.PRODUCT)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ManyToOne(Entities.ORDER)
  @JoinColumn({ name: 'order_id' })
  public order!: Order;
}
