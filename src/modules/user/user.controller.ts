import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole, User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<void> {
    return this.userService.updateUser(user, id);
  }
}
