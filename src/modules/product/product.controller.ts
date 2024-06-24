import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { Logger } from 'src/Log/logger.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('api/product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private logger: Logger,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.findAllProduct();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<void> {
    return this.productService.updateProduct(product, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get('category/:id')
  async findByCategory(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number,
  ): Promise<{ message: string; data: Pagination<Product> }> {
    limit = limit > 2 ? 2 : limit;
    const category = await this.categoryRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!category) {
      this.logger.error(
        `Category not found with ID: ${id}`,
        '',
        'ProductService',
      );
    }

    let result = {
      message: 'Get Product success!',
      data: await this.productService.findByCategory(
        {
          page,
          limit,
        },
        category,
      ),
    };
    return result;
  }
}
