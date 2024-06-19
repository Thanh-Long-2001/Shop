import { ApiProperty } from '@nestjs/swagger';
import { BranchShop } from 'src/entities/branchshop.entity';
import { Category } from 'src/entities/category.entity';

export class CreateOrderDto {

    @ApiProperty({required :true, example: 1})
    orderQuantity: number

    @ApiProperty({example: '1', required :true})
    productId: string
}