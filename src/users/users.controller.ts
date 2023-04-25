import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: any) {
    const created = await this.usersService.createUser(body)
    console.log('Log ⭐ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ created:', created);
    return created;
  }

  @Get()
  async getUsers(@Query() query: any) {
    const users = await this.usersService.getUsers(query)
    console.log('Log ⭐ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ users:', users);
    return users;
  }
}
