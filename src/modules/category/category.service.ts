import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../../entities/category.entity';
import { Inventory } from '../../entities/inventory.entity';

import { User } from '../../entities/user.entity';
import { InventoryService } from '../inventory/inventory.service';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryExceptionMessage } from './enum/category-exception-message.enum';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly repository: CategoryRepository,
    private readonly inventoryService: InventoryService,
  ) {}

  public async createCategory(
    inventoryId: number,
    identity: User,
    dto: CreateCategoryDto,
  ): Promise<Category> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const category = await this.repository.insertCategory(dto, inventory);

    return category;
  }

  public async updateCategory(
    inventoryId: number,
    categoryId: number,
    identity: User,
    dto: UpdateCategoryDto,
  ): Promise<Category> {
    const inventory = await this.inventoryService.getInventoryById(
      inventoryId,
      identity,
    );

    const category = await this.repository.updateCategory(
      dto,
      categoryId,
      inventory,
    );

    return category;
  }

  public async getCategoryById(
    id: number,
    inventory: Inventory,
  ): Promise<Category> {
    const category = await this.repository.findCategoryById(id, inventory);

    if (!category) {
      throw new NotFoundException(CategoryExceptionMessage.CATEGORY_NOT_FOUND);
    }

    return category;
  }
}
