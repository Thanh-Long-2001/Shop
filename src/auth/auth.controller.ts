import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginDto } from 'src/modules/user/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { ApiAcceptedResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Create user successfully.'})
  async register(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  // @ApiBody()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({description: 'Login successfully.'})
  @ApiUnauthorizedResponse({description: 'Username password failed.'})
  async login(@Body() user: LoginDto) {
    const validUser = await this.usersService.findByEmail(user.email);
    return this.authService.login(validUser);
  }

  @Post('refresh')
  async refresh(@Body() body) {
    const { refresh_token } = body;
    const decoded = this.authService.jwtService.verify(refresh_token);
    const user = await this.usersService.findByEmail(decoded.email);
    if (!user) {
      return { message: 'Invalid token' };
    }
    return this.authService.login(user);
  }
}
