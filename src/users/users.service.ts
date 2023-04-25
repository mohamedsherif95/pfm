import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './User.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  
  async createUser(userObject: any) {
    const created = this.usersRepository.create(userObject);
    const newUsers = await this.usersRepository.save(created);
    return newUsers;
  }

  async getUsers(filter?: any) {
    return this.usersRepository.find({where: filter})
  }

  async getUser(identifier: any) {
    return this.usersRepository.findOne({where: identifier})
  }
}
