import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { Company } from './company.entity';
import { Entities } from './enum/entity.enum';
import { Order } from './order.entity';

@Entity({ name: 'company_client' })
export class CompanyClient extends BaseEntity {
  @ApiProperty()
  @Column({
    name: 'name',
    type: String,
  })
  public name!: string;

  @ApiProperty()
  @Column({
    name: 'postal_code',
    nullable: true,
    type: String,
  })
  public postalCode?: string;

  @ApiProperty()
  @Column({
    name: 'street',
    nullable: true,
    type: String,
  })
  public street?: string;

  @ApiProperty()
  @Column({
    name: 'city',
    nullable: true,
    type: String,
  })
  public city?: string;

  @ApiProperty()
  @Column({
    name: 'tax_id_number',
    nullable: true,
    type: String,
  })
  public taxIdNumber!: string;

  @ApiProperty()
  @Column({
    name: 'company_number',
    nullable: true,
    type: String,
  })
  public companyNumber!: string;

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

  @ManyToOne(Entities.COMPANY)
  @JoinColumn({ name: 'company_id' })
  public company!: Company;

  @OneToMany(Entities.ORDER, 'companyClient')
  public orders: Order[];
}
