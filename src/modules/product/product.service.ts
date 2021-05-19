import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { MathService } from '../global/math/math.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: ProductRepository,
    private readonly inventoryService: InventoryService,
    public readonly mathService: MathService,
  ) {}

  public async createProduct(
    inventoryId: number,
    identity: User,
    dto: CreateProductDto,
  ): Promise<Product> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const product = await this.repository.insertProduct(dto, inventory);

    return product;
  }

  public async createProductDetails(
    id: number,
    inventoryId: number,
    identity: User,
    dto: CreateProductDetailsDto,
  ): Promise<Product> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const product = await this.repository.findProductById(id, inventory);

    if (!product) {
      throw new NotFoundException();
    }

    const newQuantity = this.mathService.add(product.quantity, dto.quantity);

    if (newQuantity <= 0) {
      throw new BadRequestException();
    }

    await this.repository.insertProductDetails(dto, product);

    const updatedProduct = await this.repository.updateProductQuantity(
      product.id,
      inventory,
      newQuantity,
    );

    return updatedProduct;
  }
}
