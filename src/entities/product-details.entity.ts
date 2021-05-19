import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { Entities } from './enum/entity.enum';
import { Product } from './product.entity';

@Entity({ name: 'product_details' })
export class ProductDetails extends BaseEntity {
  @ApiProperty()
  @Column({
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
}
