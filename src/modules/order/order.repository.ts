import { EntityManager, EntityRepository } from 'typeorm';

import { Inventory } from '../../entities/inventory.entity';
import { Order } from '../../entities/order.entity';
import { ProductOrder } from '../../entities/product-order.entity';
import { Product } from '../../entities/product.entity';

@EntityRepository()
export class OrderRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertOrder(inventory: Inventory) {
    return await this.entityManager.save<Order>(
      this.entityManager.create<Order>(Order, { inventory }),
    );
  }

  public async insertProductOrder(
    order: Order,
    product: Product,
    total: number,
    quantity: number,
  ): Promise<ProductOrder> {
    return await this.entityManager.save<ProductOrder>(
      this.entityManager.create<ProductOrder>(ProductOrder, {
        order,
        product,
        total,
        quantity,
      }),
    );
  }

  public async updateOrderGrandTotal(
    id: number,
    total: number,
  ): Promise<Order> {
    return await this.entityManager.transaction(async (txManager) => {
      await txManager.update(Order, { id }, { total });
      return txManager.findOne<Order>(Order, {
        where: { id },
        relations: ['productOrders'],
      });
    });
  }

  public async deleteOrder(id: number) {
    await this.entityManager.delete<Order>(Order, id);
  }
}
