import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authSerivce.login(req.user);
  }
  
  @Post('/signup')
  async signup(@Request() req, @Body() body) {
    return this.usersService.createUser(body);
  }
}
