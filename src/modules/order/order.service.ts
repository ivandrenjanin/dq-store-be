import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';
import { MathService } from '../global/math/math.service';
import { InventoryService } from '../inventory/inventory.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly repository: OrderRepository,
    private readonly inventoryService: InventoryService,
    private readonly productService: ProductService,
    private readonly mathService: MathService,
  ) {}

  public async createOrder(
    inventoryId: number,
    identity: User,
    dto: CreateOrderDto,
  ): Promise<void> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const products = await this.productService.getProductByIds(
      dto.order.map((o) => o.productId),
      inventory,
    );

    const order = await this.repository.insertOrder(inventory);
    let grandTotal = 0;

    try {
      if (products.length !== dto.order.length) {
        throw new NotFoundException('PRODUCTS_NOT_FOUND');
      }

      for (const product of products) {
        const innerDto = dto.order.find((o) => o.productId === product.id);

        if (innerDto.quantity > product.quantity) {
          console.log({ innerDto, product });
          throw new BadRequestException('NOT_ENOUGH_PRODUCTS');
        }

        const newQuantity = this.mathService.subtract(
          product.quantity,
          innerDto.quantity,
        );

        if (newQuantity < 0) {
          console.log({ newQuantity, quantity: product.quantity });
          throw new BadRequestException('NOT_ENOUGH_PRODUCTS');
        }
      }

      for (const product of products) {
        const innerDto = dto.order.find((o) => o.productId === product.id);

        const total = this.mathService.multiply(
          innerDto.quantity,
          product.sellingPrice,
        );

        grandTotal = this.mathService.add(grandTotal, total);

        const newQuantity = this.mathService.subtract(
          product.quantity,
          innerDto.quantity,
        );

        await this.repository.insertProductOrder(
          order,
          product,
          total,
          innerDto.quantity,
        );

        await this.productService.updateProductQuantity(
          product.id,
          inventory,
          newQuantity,
        );
      }

      await this.repository.updateOrderGrandTotal(order.id, grandTotal);
    } catch (error) {
      console.log(error);
      // try {
      //   await this.repository.deleteOrder(order.id);
      // } catch (e) {
      //   console.log(e);
      //   throw e;
      // }
      throw error;
    }
  }
}
