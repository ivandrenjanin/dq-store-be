import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Inventory } from '../../entities/inventory.entity';
import { Product } from '../../entities/product.entity';
import { User } from '../../entities/user.entity';
import { CategoryService } from '../category/category.service';
import { MathService } from '../global/math/math.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: ProductRepository,
    private readonly inventoryService: InventoryService,
    private readonly categoryService: CategoryService,
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

    const product = await this.getProductById(id, inventory);

    const newQuantity = this.mathService.add(product.quantity, dto.quantity);

    if (newQuantity <= 0) {
      throw new BadRequestException();
    }

    await this.repository.insertProductDetails(dto, product);

    const updatedProduct = await this.updateProductQuantity(
      product.id,
      inventory,
      newQuantity,
    );

    return updatedProduct;
  }

  public async createProductCategory(
    id: number,
    inventoryId: number,
    identity: User,
    dto: CreateProductCategoryDto,
  ): Promise<Product> {
    try {
      const inventory = await this.inventoryService.getInventoryById(
        inventoryId,
        identity,
      );

      const product = await this.repository.findProductById(id, inventory);

      if (!product) {
        throw new NotFoundException();
      }

      const category = await this.categoryService.getCategoryById(
        dto.categoryId,
        inventory,
      );

      await this.repository.insertProductCategory(product, category);

      return this.repository.findProductById(id, inventory);
    } catch (error) {
      console.log(error);
    }
  }

  public async updateProductQuantity(
    id: number,
    inventory: Inventory,
    quantity: number,
  ): Promise<Product> {
    return await this.repository.updateProductQuantity(id, inventory, quantity);
  }

  public async getProductById(
    id: number,
    inventory: Inventory,
  ): Promise<Product> {
    const product = await this.repository.findProductById(id, inventory);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  public async getProductByIds(
    ids: number[],
    inventory: Inventory,
  ): Promise<Product[]> {
    const products = await this.repository.findProductByIds(ids, inventory);

    if (products.length === 0) {
      throw new NotFoundException();
    }

    return products;
  }
}
