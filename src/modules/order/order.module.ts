import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';
import { OrderProduct } from './entities/order-product.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct]), ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
