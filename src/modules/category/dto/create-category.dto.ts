import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/entities/category.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateCategoryDto {

    @ApiProperty({example: 'Quần', required :true})
    name: string

    @ApiProperty({description: 'Id of other category', example: '1', required :true})
    parent: Category

}