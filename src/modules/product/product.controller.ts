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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from 'src/log/logger.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../category/entities/category.entity';
import { UserRole } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';
import { SortDto } from 'src/enums/sort.enum';
import { FieldSort } from 'src/enums/field-sort.enum';

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

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.USER)
  @Get('category/:id')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'field', enum: FieldSort, required: false })
  @ApiQuery({ name: 'priceMin', type: Number, required: false })
  @ApiQuery({ name: 'priceMax', type: Number, required: false })
  async findByCategoryAndSortBy(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('field') field: FieldSort,
    @Query('priceMin') priceMin: number,
    @Query('priceMax') priceMax: number,
  ): Promise<{ message: string; data: Pagination<Product> }> {
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
    const sort: SortDto = { field, priceMin, priceMax };
    let result = {
      message: 'Get Product success!',
      data: await this.productService.findByCategory(
        {
          page,
          limit,
        },
        category,
        sort,
      ),
    };
    return result;
  }
}
