import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() body: any) {
    const created = await this.usersService.createUser(body)
    return created;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Query() query: any) {
    const users = await this.usersService.getUsers(query)
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const {password, ...result} = await this.usersService.getUser({id: req.user.id})
    return result;
  }
}
