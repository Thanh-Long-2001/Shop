import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {

    @ApiProperty({required :false})
    fullname: string

    @ApiProperty({required :false})
    address: string
    
    @ApiProperty({required :false})
    numberphone: string

    @ApiProperty({required :false})
    image: string
}