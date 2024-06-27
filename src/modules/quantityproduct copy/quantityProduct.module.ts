import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuantityProductController } from './quantityProduct.controller';
import { QuantityProductService } from './quantityProduct.service';
import { QuantityProduct } from '../product/entities/quantity-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuantityProduct])],
  controllers: [QuantityProductController],
  providers: [QuantityProductService],
  exports: [QuantityProductService],
})
export class QuantityProductModule {}
