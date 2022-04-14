import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthDto } from './auth/dto';
import { GetAddress } from './utils';

import { JwtAuthGuard } from './utils/guards/jwt-guard.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetAddress('accountAddress') address: string): string {
    console.log(address);
    return this.appService.getHello(1);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-authorization')
  testAuthorization() : string {
    return 'test - authorization - success!';
  }

}
