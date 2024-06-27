import { BranchShop } from 'src/modules/branchshop/entities/branchshop.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => BranchShop, (branchShop) => branchShop.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'quantity-product',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'branchshop_id',
      referencedColumnName: 'id',
    },
  })
  branchShop: BranchShop[];

  @ManyToMany(() => Order, (order) => order.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'order-product',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
  })
  order: Order[];
}
