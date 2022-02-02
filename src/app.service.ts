import { Body, Injectable, Param } from '@nestjs/common';

// controller

@Injectable()
export class AppService {
  getHello(
      @Body() body,
      @Param() param
    ): string {
    return `Hello World! ${body} ${param.id}`;
  }
}
