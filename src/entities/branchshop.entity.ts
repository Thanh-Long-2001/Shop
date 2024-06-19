import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { BranchShopInfo } from './infro-branchshop.entity';

@Entity()
export class BranchShop {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(
    () => Product,
    (product) => product.branchShop,
  )
  products: Product[]

  @OneToOne(() => BranchShopInfo)
  @JoinColumn()
  info: BranchShopInfo
}
