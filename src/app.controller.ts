import { Controller, Get, Param, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

// router
// 서비스를 사용하게 만든다.
@Controller('birds')
export class AppController {
  constructor(private readonly appService: AppService) { }

  //* localhost:8000/birds/12/greeting
  @Get('/:id/greeting')
  getHello(@Req() req: Request, @Body() Body: Body, @Param() param): string {
    console.log(param);
    return this.appService.getHello(Body, param);
  }
}
