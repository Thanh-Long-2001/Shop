import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { BranchShop } from './branchshop.entity';
import { Order } from './order.entity';

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

  @ManyToMany(() => BranchShop, (branchShop) => branchShop.products, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
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

  @ManyToMany(() => Order, (order) => order.products, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
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
