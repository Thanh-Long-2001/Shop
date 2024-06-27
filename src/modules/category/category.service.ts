import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async updateCategory(category: CreateCategoryDto, id: string): Promise<void> {
    await this.categoryRepository.update(parseInt(id), category);
  }
}
