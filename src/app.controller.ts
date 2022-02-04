import { Controller, Get, Param, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

// router
// 서비스를 사용하게 만든다. => birds로 시작하는 rest가 사용할 수 있다.
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home() {
    return '<h1>Welcome! :)</h1>';
  }

  //* localhost:8000/birds/12/greeting
  @Get('/greeting')
  getHello(@Req() req: Request, @Body() Body: Body): string {
    return this.appService.getHello(Body);
  }
}
