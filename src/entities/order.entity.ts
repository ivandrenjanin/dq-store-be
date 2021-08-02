import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base';
import { Entities } from './enum/entity.enum';
import { Inventory } from './inventory.entity';
import { ProductOrder } from './product-order.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @ApiProperty()
  @Column({
    type: 'int',
    default: 0,
    nullable: false,
  })
  public total!: number;

  @ManyToOne(Entities.INVENTORY)
  @JoinColumn({ name: 'inventory_id' })
  public inventory!: Inventory;

  @OneToMany(Entities.PRODUCT_ORDER, 'order', {
    eager: true,
    onDelete: 'CASCADE',
  })
  public productOrders!: ProductOrder[];
}
