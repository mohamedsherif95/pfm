import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './User.entity';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  
  async createUser(userObject: any) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userObject.password, salt);
      userObject.password = hashPassword;
      await this.usersRepository.createQueryBuilder()
      .insert()
      .into(User)
      .values([userObject])
      .execute()
      return {
        status: 200,
        message: 'Account created successfully!'
      };
    } catch (err) {
      return {
        status: 500,
        message: err.code === 'ER_DUP_ENTRY' && err.errno === 1062 ? 'This email is already in use by another user!' : err.message,
      }
    }
  }

  async getUsers(filter?: any) {
    return this.usersRepository.find({where: filter})
  }

  async getUser(identifier: any) {
    return this.usersRepository.findOne({where: identifier})
  }
}
