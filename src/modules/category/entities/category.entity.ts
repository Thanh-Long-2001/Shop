import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => Category)
  parent: Category;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
