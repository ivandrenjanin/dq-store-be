import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { calculator } from '../modules/helper/calculator.helper';

import { BaseEntity } from './base';
import { CompanyClient } from './company-client.entity';
import { Entities } from './enum/entity.enum';
import { Inventory } from './inventory.entity';
import { ProductOrder } from './product-order.entity';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @ApiProperty()
  @Column({
    type: 'bigint',
    default: 0,
    nullable: false,
  })
  public total!: number;

  @ApiProperty()
  @Column({
    type: 'bigint',
    default: 0,
    nullable: false,
  })
  public totalTaxed!: number;

  @ApiProperty()
  @Column({
    type: String,
    nullable: false,
  })
  public orderNumber!: string;

  @ApiProperty()
  @Column({
    type: String,
    nullable: true,
  })
  public filePath!: string;

  @ApiProperty()
  @Column({
    type: String,
    nullable: true,
  })
  public fileName!: string;

  @ManyToOne(Entities.INVENTORY)
  @JoinColumn({ name: 'inventory_id' })
  public inventory!: Inventory;

  @ManyToOne(Entities.COMPANY_CLIENT, { eager: true })
  @JoinColumn({ name: 'company_client_id' })
  public companyClient!: CompanyClient;

  @OneToMany(Entities.PRODUCT_ORDER, 'order', {
    eager: true,
    onDelete: 'CASCADE',
  })
  public productOrders!: ProductOrder[];

  @AfterLoad()
  public convertFromCent() {
    this.total = calculator.fromCent(this.total);
    this.totalTaxed = calculator.fromCent(this.totalTaxed);
  }
}
