import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  
  async findAllUser(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const checkUser = await this.usersRepository.findOne({where: {email: user.email}})
    if (checkUser) {
      throw new Error(`${checkUser.email} already exists`)
    } else {
      user.password = await bcrypt.hash(user.password, 10);
      return this.usersRepository.save(user);
    }
  }

  async updateUser(user: UpdateUserDto, id: string): Promise<void> {
     await this.usersRepository.update(parseInt(id), user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOne(id: string): Promise<User | undefined> {
    const idUser = parseInt(id);
    return this.usersRepository.findOne({ where: { id: idUser } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    
    const user = await this.findByEmail(email);
     
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
