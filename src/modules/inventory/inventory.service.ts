import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Inventory } from '../../entities/inventory.entity';
import { User } from '../../entities/user.entity';
import { CompanyService } from '../company/company.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_REPOSITORY')
    private readonly repository: InventoryRepository,
    private readonly companyService: CompanyService,
  ) {}

  public async createInventory(
    dto: CreateInventoryDto,
    identity: User,
  ): Promise<Inventory> {
    const company = await this.companyService.getCompanyByUserId(identity);

    const inventory = await this.repository.insertInventory(dto, company);

    return inventory;
  }

  public async getInventories(identity: User): Promise<Inventory[]> {
    const company = await this.companyService.getCompanyByUserId(identity);
    return this.repository.findInventoriesByCompanyId(company);
  }

  public async getInventoryById(
    id: number,
    identity: User,
  ): Promise<Inventory> {
    const company = await this.companyService.getCompanyByUserId(identity);

    const inventory = await this.repository.findInventoryByCompanyId(
      id,
      company,
    );

    if (!inventory) {
      throw new NotFoundException();
    }

    return inventory;
  }

  public async updateInventoryById(
    id: number,
    dto: UpdateInventoryDto,
    identity: User,
  ): Promise<Inventory> {
    const company = await this.companyService.getCompanyByUserId(identity);

    const inventory = await this.repository.findInventoryByCompanyId(
      id,
      company,
    );

    if (!inventory) {
      throw new NotFoundException();
    }

    await this.repository.updateInventoryById(id, dto);
    return inventory;
  }
}
