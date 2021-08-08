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
import { calculator } from '../helper/calculator.helper';
import { InventoryService } from '../inventory/inventory.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { CreateProductDetailsDto } from './dto/create-product-details.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: ProductRepository,
    private readonly inventoryService: InventoryService,
    private readonly categoryService: CategoryService,
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

    const { sellingPrice, taxRate } = dto;

    const taxedPrice = calculator.add(
      sellingPrice,
      calculator.calculatePercent(sellingPrice, taxRate),
    );

    const product = await this.repository.insertProduct(
      dto,
      taxedPrice,
      inventory,
    );

    return product;
  }

  public async createProductDetails(
    id: number,
    inventoryId: number,
    identity: User,
    dto: CreateProductDetailsDto,
  ): Promise<void> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const product = await this.getProductById(id, inventory);

    const newQuantity = calculator.add(product.quantity, dto.quantity);

    if (newQuantity <= 0) {
      throw new BadRequestException();
    }

    await this.repository.insertProductDetails(dto, product);

    await this.updateProductQuantity(product.id, inventory, newQuantity);
  }

  public async createProductCategory(
    id: number,
    inventoryId: number,
    identity: User,
    dto: CreateProductCategoryDto,
  ): Promise<Product> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const product = await this.getProductById(id, inventory);

    const category = await this.categoryService.getCategoryById(
      dto.categoryId,
      inventory,
    );

    await this.repository.insertProductCategory(product, category);

    return this.repository.findProductById(id, inventory);
  }

  public async updateProduct(
    inventoryId: number,
    id: number,
    identity: User,
    dto: UpdateProductDto,
  ): Promise<void> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    await this.getProductById(id, inventory);

    await this.repository.updateProduct(id, inventory, dto);
  }

  public async updateProductQuantity(
    id: number,
    inventory: Inventory,
    quantity: number,
  ): Promise<void> {
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
