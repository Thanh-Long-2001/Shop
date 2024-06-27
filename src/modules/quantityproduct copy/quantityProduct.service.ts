import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuantityProductDto } from './dto/create-quantity-product.dto';
import { QuantityProduct } from '../product/entities/quantity-product.entity';
import { UpdateQuantityProductDto } from './dto/update-quantity-product-shop.dto';

@Injectable()
export class QuantityProductService {
  constructor(
    @InjectRepository(QuantityProduct)
    private quantityProductRepository: Repository<QuantityProduct>,
  ) {}

  async createQuantityProduct(
    payload: CreateQuantityProductDto,
  ): Promise<QuantityProduct> {
    return await this.quantityProductRepository.save(payload);
  }

  async updateQuantityProduct(
    brId: string,
    payload: UpdateQuantityProductDto,
  ): Promise<void> {
    const bId = parseInt(brId);
    const quantityProduct = await this.quantityProductRepository.findOne({
      where: { productId: payload.productId, branchshopId: bId },
    });

    if (!quantityProduct) {
      throw new Error('QuantityProduct not found');
    }
    quantityProduct.quantity = payload.quantity;
    await this.quantityProductRepository.save(quantityProduct);
  }
}
