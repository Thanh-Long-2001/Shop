import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BranchShop } from 'src/entities/branchshop.entity';
import { Category } from 'src/entities/category.entity';

export class CreateOrderDto {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty()
  orderQuantity: number;

  @ApiProperty({ example: '1', required: true })
  @IsNotEmpty()
  productId: string;
}
