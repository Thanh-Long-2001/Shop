import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from './order-product.entity';

export enum CapchaType {
  PERCENT = 'percent',
  MONEY = 'money',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToMany(() => Product, (product) => product.order)
  products: Product[];

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}
