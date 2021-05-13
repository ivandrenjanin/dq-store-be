import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base';
import { Entities } from './enum/entity.enum';
import { ProductOrder } from './product-order.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  public total!: number;

  @OneToMany(Entities.PRODUCT_ORDER, 'order')
  public productOrders!: ProductOrder[];
}
