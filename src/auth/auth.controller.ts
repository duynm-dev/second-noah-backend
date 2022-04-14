import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signin')
  signinLocal(@Body() dto: AuthDto) {
    return this.authService.signinLocal(dto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
      return this.authService.loginWithCredentials(loginDto);
  }

  @Get('/getMsg')
  async getRandomString(@Req() request: Request): Promise<string> {
      try {
          const addressWallet = request.query.address;
          return this.authService.randomString(addressWallet);
      } catch (error) {
          console.log('[getRandomString] error', error);
      }
  }
}
