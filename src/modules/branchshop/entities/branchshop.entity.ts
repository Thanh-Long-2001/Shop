import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchShopInfo } from 'src/modules/infoshop/entities/infro-branchshop.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Entity()
export class BranchShop {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, (product) => product.branchShop)
  products: Product[];

  @OneToOne(() => BranchShopInfo)
  @JoinColumn()
  info: BranchShopInfo;
}
