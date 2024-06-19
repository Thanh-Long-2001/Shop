import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({example: 'abc@gmail.com', required :true})
    email: string

    @ApiProperty({required :true})
    password: string

    @ApiProperty({required :true})
    fullName: string
}