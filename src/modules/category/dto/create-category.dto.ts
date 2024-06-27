import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Quần', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Id of other category',
    example: '1',
    required: true,
  })
  @IsNotEmpty()
  parent: Category;
}
