import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'abc@gmail.com', required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  fullName: string;
}
