import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuantityProductDto {
  @ApiProperty({ description: 'Product ID', example: 2, required: true })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'BranchShop ID', example: 1, required: true })
  @IsNotEmpty()
  @IsNumber()
  branchshopId: number;

  @ApiProperty({ description: 'Quantity', example: 100, required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
