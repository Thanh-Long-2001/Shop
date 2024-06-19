import { ApiProperty } from '@nestjs/swagger';
import { BranchShopInfo } from 'src/entities/infro-branchshop.entity';

export class CreateBranchShopDto {

    @ApiProperty({description: 'Id of other branchShop', example: '1', required :true})
    info: BranchShopInfo
}