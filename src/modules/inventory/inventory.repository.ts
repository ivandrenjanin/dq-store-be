import { UnprocessableEntityException } from '@nestjs/common';
import { EntityManager, EntityRepository } from 'typeorm';
import { Company } from '../../entities/company.entity';
import { Inventory } from '../../entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@EntityRepository()
export class InventoryRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async insertInventory(dto: CreateInventoryDto, company: Company) {
    try {
      const inv = await this.entityManager.save<Inventory>(
        this.entityManager.create<Inventory>(Inventory, {
          name: dto.name,
          company,
        }),
      );

      return this.entityManager.findOne<Inventory>(Inventory, inv.id);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  public async findInventoriesByCompanyId(
    company: Company,
  ): Promise<Inventory[]> {
    return this.entityManager.find<Inventory>(Inventory, {
      where: { company },
    });
  }

  public async findInventoryByCompanyId(
    id: number,
    company: Company,
  ): Promise<Inventory> {
    return this.entityManager.findOne<Inventory>(Inventory, {
      where: { id, company },
      relations: ['categories', 'products', 'orders'],
    });
  }

  public async updateInventoryById(
    id: number,
    dto: UpdateInventoryDto,
  ): Promise<Inventory> {
    return await this.entityManager.transaction(async (txManager) => {
      await txManager.update(Inventory, { id }, { ...dto });
      return txManager.findOne<Inventory>(Inventory, { where: { id } });
    });
  }
}
