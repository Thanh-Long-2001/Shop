import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';
import { User } from '../user/entities/user.entity';
import { OrderProduct } from './entities/order-product.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    private productService: ProductService,
  ) {}

  async createOrder(
    userId: number,
    createOrder: CreateOrderDto,
  ): Promise<OrderProduct> {
    let order = new Order();
    order.user = { id: userId } as User;
    let orderItem = await this.orderRepository.save(order);
    let product = await this.productService.findOne(createOrder.productId);
    let productId = parseInt(createOrder.productId);
    let totalPrice = createOrder.orderQuantity * product.price;
    if (orderItem) {
      const orderProduct = new OrderProduct();
      orderProduct.productId = productId;
      orderProduct.orderId = orderItem.id;
      orderProduct.priceAtOrder = product.price;
      orderProduct.orderQuantity = createOrder.orderQuantity;
      orderProduct.totalPrice = totalPrice;

      return await this.orderProductRepository.save(orderProduct);
    }
  }

  async getOrder(userId: number): Promise<Object> {
    const orderInfo = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderProducts', 'orderProducts')
      .leftJoinAndSelect('orderProducts.product', 'product')
      .where('order.userId = :userId', { userId })
      .getMany();

    const orders = Object.keys(orderInfo).map((key) => orderInfo[key]);

    let result1 = {
      orders,
    };

    return result1;
  }

  async addOneProductToOneOrder(
    userId: number,
    idOrder: number,
    createOrderDto: CreateOrderDto,
  ): Promise<number> {
    const order = await this.orderRepository.findOne({
      where: { id: idOrder, user: { id: userId } },
      relations: ['user'],
    });
    if (!order) {
      throw new Error('Order not found or does not belong to the user');
    }

    // Check if the product already exists in the order
    let orderProduct = await this.orderProductRepository.findOne({
      where: {
        orderId: idOrder,
        productId: parseInt(createOrderDto.productId),
      },
    });

    if (orderProduct) {
      // If product exists, update the quantity and total price
      orderProduct.orderQuantity += createOrderDto.orderQuantity;
      orderProduct.totalPrice +=
        createOrderDto.orderQuantity * orderProduct.priceAtOrder;
    } else {
      // If product does not exist, add a new product to the order
      const product = await this.productService.findOne(
        createOrderDto.productId,
      );
      const productId = parseInt(createOrderDto.productId);
      const totalPrice = createOrderDto.orderQuantity * product.price;

      orderProduct = new OrderProduct();
      orderProduct.productId = productId;
      orderProduct.orderId = idOrder;
      orderProduct.priceAtOrder = product.price;
      orderProduct.orderQuantity = createOrderDto.orderQuantity;
      orderProduct.totalPrice = totalPrice;
    }

    console.log(orderProduct);
    await this.orderProductRepository.save(orderProduct);

    return 1;
  }
}
