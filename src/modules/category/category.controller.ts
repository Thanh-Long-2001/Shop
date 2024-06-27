import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { UserRole } from '../user/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Category')
@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  updateCategory(
    @Body() category: CreateCategoryDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.categoryService.updateCategory(category, id);
  }
}
