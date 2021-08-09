import { EntityManager, EntityRepository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { Inventory } from '../../entities/inventory.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@EntityRepository()
export class CategoryRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertCategory(
    dto: CreateCategoryDto,
    inventory: Inventory,
  ): Promise<Category> {
    return await this.entityManager.transaction(async (txManager) => {
      const { name } = dto;
      const category = await txManager.save<Category>(
        txManager.create<Category>(Category, { name, inventory }),
      );

      return txManager.findOne<Category>(Category, { id: category.id });
    });
  }

  public async updateCategory(
    dto: UpdateCategoryDto,
    categoryId: number,
  ): Promise<Category> {
    return await this.entityManager.transaction(async (txManager) => {
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
