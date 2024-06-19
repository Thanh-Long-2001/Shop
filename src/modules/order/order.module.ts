import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProduct } from 'src/entities/order-product.entity';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderProduct]),
        ProductModule,
    ],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule {}
