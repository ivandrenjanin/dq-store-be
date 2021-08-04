import { UnprocessableEntityException } from '@nestjs/common';
import { EntityManager, EntityRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { Inventory } from '../../entities/inventory.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryExceptionMessage } from './enum/category-exception-message.enum';

@EntityRepository()
export class CategoryRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertCategory(
    dto: CreateCategoryDto,
    inventory: Inventory,
  ): Promise<Category> {
    return await this.entityManager.transaction(async (txManager) => {
      const { code, name } = dto;
      const found = await txManager
        .createQueryBuilder()
        .select()
        .addFrom(Category, 'category')
        .where(`category.code = '${code}'`)
        .andWhere(`category.inventory_id = ${inventory.id}`)
        .orWhere(`category.code = '${code}'`)
        .andWhere(`category.name = '${name}'`)
        .andWhere(`category.inventory_id = ${inventory.id}`)
        .execute();

      if (found.length > 0) {
        throw new UnprocessableEntityException(
          CategoryExceptionMessage.CATEGORY_CODE_OR_NAME_EXIST,
        );
      }

      const category = await txManager.save<Category>(
        txManager.create<Category>(Category, { code, name, inventory }),
      );

      return txManager.findOne<Category>(Category, { id: category.id });
    });
  }

  public async updateCategory(
    dto: UpdateCategoryDto,
    categoryId: number,
    inventory: Inventory,
  ): Promise<Category> {
    return await this.entityManager.transaction(async (txManager) => {
      if (dto.code) {
        const found = await txManager
          .createQueryBuilder()
          .select()
          .addFrom(Category, 'category')
          .where(`category.code = '${dto.code}'`)
          .andWhere(`category.inventory_id = ${inventory.id}`)
          .execute();

        if (found.length > 0) {
          throw new UnprocessableEntityException(
            CategoryExceptionMessage.CATEGORY_CODE_OR_NAME_EXIST,
          );
        }
      }

      await txManager.update(Category, { id: categoryId }, { ...dto });

      return txManager.findOne<Category>(Category, { id: categoryId });
    });
  }

  public findCategoryById(id: number, inventory: Inventory): Promise<Category> {
    return this.entityManager.findOne<Category>(Category, {
      where: { id, inventory },
    });
  }
}
