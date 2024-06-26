import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/modules/category/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({ example: 'Quần rách', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Quần âu', required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '100', required: true })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Id of other category',
    example: '1',
    required: true,
  })
  @IsNotEmpty()
  category: Category;
}
