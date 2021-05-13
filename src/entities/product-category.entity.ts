import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

import { Entities } from './enum/entity.enum';
import { Product } from './product.entity';

@Entity({ name: 'product_category' })
export class ProductCategory {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @ManyToOne(Entities.PRODUCT)
  @JoinColumn({ name: 'product_id' })
  public product!: Product;

  @ManyToOne(Entities.CATEGORY)
  @JoinColumn({ name: 'category_id' })
  public category!: Category;
}
