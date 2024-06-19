import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { BranchShop } from './branchshop.entity';

@Entity('quantity-product')
export class QuantityProduct {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @PrimaryColumn({ name: 'branchshop_id' })
  branchshopId: number;

  @Column({ nullable: false, default: 0 })
  quantity?: number;

  @ManyToOne(() => Product, (product) => product.branchShop)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product[];

  @ManyToOne(() => BranchShop, (branchShop) => branchShop.products)
  @JoinColumn([{ name: 'branchshop_id', referencedColumnName: 'id' }])
  branchShop: BranchShop[];
}
