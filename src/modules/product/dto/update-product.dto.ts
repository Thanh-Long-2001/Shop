import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/modules/category/entities/category.entity';

export class UpdateProductDto {
  @ApiProperty({ example: 'Quần', required: false })
  name: string;

  @ApiProperty({ example: 'Quần âu', required: false })
  description: string;

  @ApiProperty({ example: '100', required: false })
  price: number;

  @ApiProperty({
    description: 'Id of other category',
    example: '1',
    required: false,
  })
  category: Category;
}
