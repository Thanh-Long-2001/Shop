import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { User } from '../entities/user.entity';
import { LoginDto } from 'src/modules/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    public jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    
    return this.userService.validateUser(email, password);
  }

  async login(user: User) {
    const payload = { id:user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '35m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}