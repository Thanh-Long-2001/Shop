import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product.entity"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name: string

    @ManyToOne(() => Category)
    parent: Category

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}