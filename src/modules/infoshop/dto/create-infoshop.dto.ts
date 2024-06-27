import { ApiProperty } from '@nestjs/swagger';
export class CreateInfoShopDto {
  @ApiProperty({ example: 'Luxury Cơ sở 1', required: true })
  name: string;

  @ApiProperty({ example: 'Cầu Giấy, Hà Nội', required: true })
  address: string;
}
