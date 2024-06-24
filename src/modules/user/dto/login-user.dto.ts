import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123',
  })
  @IsString()
  password: string;
}
