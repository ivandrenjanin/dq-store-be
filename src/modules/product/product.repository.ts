import { EntityManager, EntityRepository } from 'typeorm';

import { Category } from '../../entities/category.entity';
import { Inventory } from '../../entities/inventory.entity';
import { ProductCategory } from '../../entities/product-category.entity';
import { ProductDetails } from '../../entities/product-details.entity';
import { Product } from '../../entities/product.entity';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@EntityRepository()
export class ProductRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertProduct(
    dto: CreateProductDto,
    taxedPrice: number,
    inventory: Inventory,
  ): Promise<Product> {
    return await this.entityManager.transaction(async (txManager) => {
      const product = await txManager.save<Product>(
        txManager.create<Product>(Product, { ...dto, taxedPrice, inventory }),
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

  public async updateProduct(
    id: number,
    inventory: Inventory,
    dto: UpdateProductDto,
  ): Promise<void> {
    await this.entityManager.update<Product>(
      Product,
      { id, inventory },
      { ...dto },
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
