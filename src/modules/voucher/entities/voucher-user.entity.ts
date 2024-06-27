import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Voucher } from './voucher.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('voucher-user')
export class VoucherUser {
  @PrimaryColumn({ name: 'voucher_id' })
  voucherId: number;

  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.vouchers)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => Voucher, (voucher) => voucher.users)
  @JoinColumn([{ name: 'voucher_id', referencedColumnName: 'id' }])
  vouchers: Voucher[];
}
