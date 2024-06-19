import { ApiProperty } from '@nestjs/swagger';
import { BranchShop } from 'src/entities/branchshop.entity';
import { BranchShopInfo } from 'src/entities/infro-branchshop.entity';
import { Product } from 'src/entities/product.entity';

export class CreateQuantityProductDto {

    @ApiProperty({description: 'Quantity', example: 100, required: true})
    quantity: number

}