import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { calculator } from '../modules/helper/calculator.helper';
import { BaseEntity } from './base';
import { Entities } from './enum/entity.enum';
import { Product } from './product.entity';

@Entity({ name: 'product_details' })
export class ProductDetails extends BaseEntity {
  @ApiProperty()
  @Column({
    name: 'prime_price',
    type: 'int',
    nullable: false,
  })
  public primePrice!: number;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  public quantity!: number;

  @ManyToOne(Entities.PRODUCT)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @BeforeInsert()
  public convertToCent() {
    this.primePrice = calculator.toCent(this.primePrice);
  }

  @AfterLoad()
  public convertFromCent() {
    this.primePrice = calculator.fromCent(this.primePrice);
  }
}
