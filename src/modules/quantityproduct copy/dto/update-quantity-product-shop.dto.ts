import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdateQuantityProductDto {
  @ApiProperty({ description: 'ProductId', example: 5, required: true })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: 'Quantity', example: 100, required: true })
  @IsNotEmpty()
  quantity: number;
}
