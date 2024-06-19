import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from '../../entities/product.entity'
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async createProduct(product: CreateProductDto): Promise<Product> {
        return this.productRepository.save(product);
    }

    async findAllProduct(): Promise<Product[]> {
        return this.productRepository.find()
      }

    async updateProduct(product: UpdateProductDto, id: string): Promise<void> {
        await this.productRepository.update(parseInt(id), product);
     }

     async findOne(id: string): Promise<Product | undefined> {
        const idProduct = parseInt(id);
        return this.productRepository.findOne({ where: { id: idProduct } });
      }
}