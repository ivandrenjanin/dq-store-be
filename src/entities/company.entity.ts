import { Column, Entity, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Entities } from './enum/entity.enum';
import { CompanyUser } from './company-user.entity';
import { BaseEntity } from './base';
import { Inventory } from './inventory.entity';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @ApiProperty()
  @Column({
    name: 'name',
    type: String,
  })
  public name!: string;

  @ApiProperty()
  @Column({
    name: 'postal_code',
    type: String,
  })
  public postalCode!: string;

  @ApiProperty()
  @Column({
    name: 'tax_id_number',
    unique: true,
    type: String,
  })
  public taxIdNumber!: string;

  @ApiProperty()
  @Column({
    name: 'company_number',
    unique: true,
    type: String,
  })
  public companyNumber!: string;

  @ApiProperty()
  @Column({
    name: 'activity_code',
    nullable: true,
    type: String,
  })
  public activityCode?: string;

  @ApiProperty()
  @Column({
    name: 'bank_name',
    nullable: true,
    type: String,
  })
  public bankName?: string;

  @ApiProperty()
  @Column({
    name: 'bank_account_number',
    nullable: true,
    type: String,
  })
  public bankAccountNumber?: string;

  @ApiProperty()
  @Column({
    name: 'phone_fax_number',
    nullable: true,
    type: String,
  })
  public phoneFaxNumber?: string;

  @ApiProperty()
  @Column({
    name: 'phone_mobile_number',
    nullable: true,
    type: String,
  })
  public phoneMobileNumber?: string;

  @ApiProperty()
  @Column({
    name: 'email',
    nullable: true,
    type: String,
  })
  public email?: string;

  @ApiProperty()
  @Column({
    name: 'website_url',
    nullable: true,
    type: String,
  })
  public websiteURL?: string;

  @ApiProperty()
  @Column({
    name: 'is_active',
    default: true,
    type: Boolean,
  })
  public isActive!: boolean;

  @OneToMany(Entities.COMPANY_USER, 'company')
  public companyUsers!: CompanyUser[];

  @OneToMany(Entities.INVENTORY, 'company')
  public inventories: Inventory[];
}
