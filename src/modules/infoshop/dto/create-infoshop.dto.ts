import { ApiProperty } from '@nestjs/swagger';
import { BranchShop } from 'src/entities/branchshop.entity';
import { Category } from 'src/entities/category.entity';

export class CreateInfoShopDto {

    @ApiProperty({example: 'Luxury Cơ sở 1', required :true})
    name: string

    @ApiProperty({example: 'Cầu Giấy, Hà Nội', required :true})
    address: string
}