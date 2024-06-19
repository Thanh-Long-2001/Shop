import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchShop } from 'src/entities/branchshop.entity';
import { Repository } from 'typeorm';
import { CreateQuantityProductDto } from './dto/create-quantity-product.dto';
import { QuantityProduct } from 'src/entities/quantity-product.entity';

@Injectable()
export class QuantityProductService {
  constructor(


    @InjectRepository(QuantityProduct)
    private quantityProductRepository: Repository<QuantityProduct>
  ) {}

  async createQuantityProduct(quantityProduct: CreateQuantityProductDto): Promise<QuantityProduct> {
    return this.quantityProductRepository.save(quantityProduct);
  }

  async updateQuantityProduct(brId: string, prId: string, quantity: CreateQuantityProductDto): Promise<void> {
    const bId = parseInt(brId);
    const pId = parseInt(prId);

    console.log(bId, pId, quantity);
    
    const quantityProduct = await this.quantityProductRepository.findOne({
      where: { productId: pId, branchshopId: bId }
    });
    

    if (!quantityProduct) {
      throw new Error('QuantityProduct not found');
    }
    quantityProduct.quantity = quantity.quantity;
    await this.quantityProductRepository.save(quantityProduct);  }
}
