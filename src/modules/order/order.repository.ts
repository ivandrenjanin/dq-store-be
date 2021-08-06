import { EntityManager, EntityRepository } from 'typeorm';
import { CompanyClient } from '../../entities/company-client.entity';

import { Inventory } from '../../entities/inventory.entity';
import { Order } from '../../entities/order.entity';
import { ProductOrder } from '../../entities/product-order.entity';
import { Product } from '../../entities/product.entity';

@EntityRepository()
export class OrderRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertOrder(
    inventory: Inventory,
    companyClient: CompanyClient,
    orderNumber: string,
  ) {
    return await this.entityManager.save<Order>(
      this.entityManager.create<Order>(Order, {
        inventory,
        companyClient,
        orderNumber,
      }),
    );
  }

  public async insertProductOrder(
    order: Order,
    product: Product,
    total: number,
    totalTaxed: number,
    quantity: number,
  ): Promise<ProductOrder> {
    return await this.entityManager.save<ProductOrder>(
      this.entityManager.create<ProductOrder>(ProductOrder, {
        order,
        product,
        total,
        totalTaxed,
        quantity,
      }),
    );
  }

  public async updateOrderGrandTotal(
    id: number,
    total: number,
    totalTaxed: number,
  ): Promise<void> {
    await this.entityManager.update(Order, { id }, { total, totalTaxed });
  }

  public async deleteOrder(id: number) {
    await this.entityManager.delete<Order>(Order, id);
  }

  public async findOrderById(id: number, inventory: Inventory): Promise<Order> {
    return await this.entityManager.findOne<Order>(Order, {
      where: { id, inventory },
      relations: ['companyClient'],
    });
  }

  public async countOrdersByInventoryId(inventory: Inventory): Promise<number> {
    return await this.entityManager.count<Order>(Order, {
      where: { inventory },
    });
  }
}
