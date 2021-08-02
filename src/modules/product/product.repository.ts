import { EntityManager, EntityRepository } from 'typeorm';

import { UnprocessableEntityException } from '@nestjs/common';

import { Category } from '../../entities/category.entity';
import { Inventory } from '../../entities/inventory.entity';
import { ProductCategory } from '../../entities/product-category.entity';
import { ProductDetails } from '../../entities/product-details.entity';
import { Product } from '../../entities/product.entity';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { CreateProductDto } from './dto/create-product.dto';

@EntityRepository()
export class ProductRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertProduct(
    dto: CreateProductDto,
    inventory: Inventory,
  ): Promise<Product> {
    return await this.entityManager.transaction(async (txManager) => {
      const { code } = dto;

      const existing = await txManager.findOne<Product>(Product, {
        where: { code, inventory },
      });

      if (existing) {
        throw new UnprocessableEntityException();
      }

      const product = await txManager.save<Product>(
        txManager.create<Product>(Product, { ...dto, inventory }),
      );

      return await txManager.findOne<Product>(Product, {
        where: { id: product.id },
      });
    });
  }

  public async insertProductDetails(
    dto: CreateProductDetailsDto,
    product: Product,
  ) {
    await this.entityManager.save<ProductDetails>(
      this.entityManager.create<ProductDetails>(ProductDetails, {
        ...dto,
        product,
      }),
    );
  }

  public async insertProductCategory(
    product: Product,
    category: Category,
  ): Promise<void> {
    await this.entityManager.save<ProductCategory>(
      this.entityManager.create<ProductCategory>(ProductCategory, {
        product,
        category,
      }),
    );
  }

  public async updateProductQuantity(
    id: number,
    inventory: Inventory,
    quantity: number,
  ): Promise<void> {
    await this.entityManager.update<Product>(
      Product,
      { id, inventory },
      { quantity },
    );
  }

  public findProductById(id: number, inventory: Inventory): Promise<Product> {
    return this.entityManager.findOne<Product>(Product, {
      where: { id, inventory },
    });
  }

  public findProductByIds(
    ids: number[],
    inventory: Inventory,
  ): Promise<Product[]> {
    return this.entityManager.findByIds<Product>(Product, ids, {
      where: { inventory },
    });
  }
}
