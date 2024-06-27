import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FieldSort } from '../enums/field-sort.enum';

export class SortDto {
  @ApiProperty({
    enum: FieldSort,
    description: 'Sort field (increase or decrease)',
  })
  @IsEnum(FieldSort)
  field: FieldSort;

  @ApiProperty({ description: 'Minimum price', required: false, example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMin?: number;

  @ApiProperty({ description: 'Maximum price', required: false, example: 1000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMax?: number;
}
