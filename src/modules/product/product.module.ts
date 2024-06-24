import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Logger } from 'src/Log/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService, Logger],
  exports: [ProductService],
})
export class ProductModule {}
