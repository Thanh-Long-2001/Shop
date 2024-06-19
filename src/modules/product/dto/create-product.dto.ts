import { ApiProperty } from '@nestjs/swagger';
import { BranchShop } from 'src/entities/branchshop.entity';
import { Category } from 'src/entities/category.entity';

export class CreateProductDto {

    @ApiProperty({example: 'Quần rách', required :true})
    name: string

    @ApiProperty({example: 'Quần âu', required :true})
    description: string

    @ApiProperty({example: '100', required :true})
    price: number

    @ApiProperty({description: 'Id of other category', example: '1', required :true})
    category: Category

}