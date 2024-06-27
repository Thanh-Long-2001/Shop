import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Logger } from 'src/log/logger.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Category } from '../category/entities/category.entity';
import { Product } from './entities/product.entity';
import { SortDto } from 'src/enums/sort.enum';
@Injectable()
export class ProductService {
  constructor(
    private logger: Logger,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createProduct(product: CreateProductDto): Promise<Product> {
    this.logger.log('Creating a new product', 'ProductService');
    const newProduct = await this.productRepository.save(product);
    this.logger.log(
      `Product created with ID: ${newProduct.id}`,
      'ProductService',
    );

    return newProduct;
  }

  async findAllProduct(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async updateProduct(product: UpdateProductDto, id: string): Promise<void> {
    await this.productRepository.update(parseInt(id), product);
  }

  async findOne(id: string): Promise<Product | undefined> {
    const idProduct = parseInt(id);
    return this.productRepository.findOne({ where: { id: idProduct } });
  }

  async findByCategory(
    options: IPaginationOptions,
    category: Category,
    sort: SortDto,
  ): Promise<Pagination<Product>> {
    this.logger.log(
      `Fetching products for category ID: ${category.id}`,
      'ProductService',
    );
    const categoryIds = await this.getCategoryAndDescendantsIds(category.id);
    const queryBuilder = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.id IN (:...categoryIds)', { categoryIds });

    console.log(sort);

    if (sort.priceMin !== undefined && sort.priceMax !== undefined) {
      queryBuilder.andWhere('product.price BETWEEN :priceMin AND :priceMax', {
        priceMin: sort.priceMin,
        priceMax: sort.priceMax,
      });
    } else if (sort.priceMin !== undefined) {
      queryBuilder.andWhere('product.price >= :priceMin', {
        priceMin: sort.priceMin,
      });
    } else if (sort.priceMax !== undefined) {
      queryBuilder.andWhere('product.price <= :priceMax', {
        priceMax: sort.priceMax,
      });
    }

    if (sort.field) {
      queryBuilder.orderBy(
        'product.price',
        sort.field === 'increase' ? 'ASC' : 'DESC',
      );
    }
    this.logger.log(
      `Query built for category ID: ${category.id}`,
      'ProductService',
    );

    return paginate<Product>(queryBuilder, options);
  }

  private async getCategoryAndDescendantsIds(
    categoryId: number,
  ): Promise<number[]> {
    this.logger.log(
      `Fetching category and descendants IDs for category ID: ${categoryId}`,
      'ProductService',
    );
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      this.logger.error(
        `Category not found with ID: ${categoryId}`,
        '',
        'ProductService',
      );
      throw new Error('Category not found');
    }

    const categoriesQueue = [category];
    const categoryIds = [category.id];

    while (categoriesQueue.length > 0) {
      const currentCategory = categoriesQueue.shift();

      const childrenCategories = await this.categoryRepository.find({
        where: { parent: currentCategory },
      });

      for (const childCategory of childrenCategories) {
        categoryIds.push(childCategory.id);
        categoriesQueue.push(childCategory);
      }
    }

    this.logger.log(
      `Found ${categoryIds.length} category IDs including descendants for category ID: ${categoryId}`,
      'ProductService',
    );
    return categoryIds;
  }
}
