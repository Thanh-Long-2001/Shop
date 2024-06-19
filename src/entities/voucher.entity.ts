import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum VoucherType {
    PERCENT = 'percent',
    MONEY = 'money',
}


@Entity()
export class Voucher {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({type: 'varchar'})
    description: string

    @Column({type: 'enum', enum: VoucherType})
    type: VoucherType

    @Column()
    value: number

    @ManyToMany(() => User, (user) => user.vouchers, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
        name: 'voucher-user',
        joinColumn: {
            name: 'voucher_id',
            referencedColumnName: 'id',
          },
          inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
          },
    })
    users: User[]
}