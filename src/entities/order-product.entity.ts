import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

export const ORDER_PRODUCT_TABLENAME = `order-product`;

@Entity(ORDER_PRODUCT_TABLENAME)
export class OrderProduct {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Product, (product) => product.order)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product[];

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Order[];

  @Column({ type: 'int', nullable: false })
  priceAtOrder: number;

  @Column({ nullable: false })
  orderQuantity: number;

  @Column({ nullable: false })
  totalPrice: number;
}
