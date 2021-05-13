import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

import { Entities } from './enum/entity.enum';
import { User } from './user.entity';

@Entity({ name: 'company_user' })
export class CompanyUser {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @ManyToOne(Entities.COMPANY)
  @JoinColumn({ name: 'company_id' })
  public company!: Company;

  @ManyToOne(Entities.USER)
  @JoinColumn({ name: 'user_id' })
  public user!: User;
}
