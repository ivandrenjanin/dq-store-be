import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from '../../entities/user.entity';
import { ConfigOption } from '../../enums/config-option.enum';
import { CompanyClientService } from '../company-client/company-client.service';
import { CompanyService } from '../company/company.service';
import { ConfigService } from '../global/config/config.service';
import { calculator } from '../helper/calculator.helper';
import { InventoryService } from '../inventory/inventory.service';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { generateOrderInvoiceTemplate } from './helper/generate-order-invoice-template.helper';
import { generatePDF } from './helper/generate-pdf.helper';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly repository: OrderRepository,
    private readonly inventoryService: InventoryService,
    private readonly productService: ProductService,
    private readonly companyService: CompanyService,
    private readonly companyClientService: CompanyClientService,
    private readonly configService: ConfigService,
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

    const company = await this.companyService.getCompanyByUserId(identity);

    const companyClient = await this.companyClientService.getCompanyClient(
      dto.companyClientId,
      company,
    );

    let grandTotal = 0;
    let grandTotalTaxed = 0;

    try {
      const orderCount = await this.repository.countOrdersByInventoryId(
        inventory,
      );

      const orderNumber = `${orderCount + 1}/${new Date().getFullYear()}`;

      const order = await this.repository.insertOrder(
        inventory,
        companyClient,
        orderNumber,
      );

      if (products.length !== dto.order.length) {
        throw new NotFoundException('PRODUCTS_NOT_FOUND');
      }

      for (const product of products) {
        const innerDto = dto.order.find((o) => o.productId === product.id);

        if (innerDto.quantity > product.quantity) {
          console.log({ innerDto, product });
          throw new BadRequestException('NOT_ENOUGH_PRODUCTS');
        }

        const newQuantity = calculator.subtract(
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

        const total = calculator.multiply(
          innerDto.quantity,
          product.sellingPrice,
        );

        const totalTaxed = calculator.add(
          total,
          calculator.calculatePercent(total, product.taxRate),
        );

        grandTotal = calculator.add(grandTotal, total);

        const newQuantity = calculator.subtract(
          product.quantity,
          innerDto.quantity,
        );

        await this.repository.insertProductOrder(
          order,
          product,
          total,
          totalTaxed,
          innerDto.quantity,
        );

        await this.productService.updateProductQuantity(
          product.id,
          inventory,
          newQuantity,
        );
      }

      grandTotalTaxed = calculator.add(
        grandTotal,
        calculator.calculatePercent(grandTotal, 20),
      );

      await this.repository.updateOrderGrandTotal(
        order.id,
        calculator.toCent(grandTotal),
        calculator.toCent(grandTotalTaxed),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getOrderInvoice(
    inventoryId: number,
    orderId: number,
    identity: User,
  ): Promise<{ file: Buffer; fileName: string }> {
    const company = await this.companyService.getCompanyByUserId(identity);

    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const order = await this.repository.findOrderById(orderId, inventory);

    const template = generateOrderInvoiceTemplate(company, order);

    const { file } = await generatePDF(
      template,
      this.configService.getOrThrow(ConfigOption.CHROMIUM_EXE_PATH),
    );

    const fileName = `${order.orderNumber}.pdf`;

    return { file, fileName };
  }
}
