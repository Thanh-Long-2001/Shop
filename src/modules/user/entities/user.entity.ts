import { Order } from 'src/modules/order/entities/order.entity';
import { Voucher } from 'src/modules/voucher/entities/voucher.entity';
import {
  Entity,
  ObjectIdColumn,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 200 })
  fullName: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  numberPhone?: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  order?: Order[];

  @Column({ nullable: true })
  image?: string;

  @ManyToMany(() => Voucher, (voucher) => voucher.users)
  vouchers: Voucher[];
}
