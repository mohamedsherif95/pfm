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
    console.log('Log ⭐ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ req:', req.user);
    return this.authSerivce.login(req.user);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('/signup')
  async signup(@Request() req, @Body() body) {
    console.log('Log ⭐ >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ req:', req.user);
    return this.usersService.createUser(body);
  }
}
