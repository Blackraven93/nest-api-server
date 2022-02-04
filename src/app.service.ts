import { Body, Injectable, Param } from '@nestjs/common';

// controller

@Injectable()
export class AppService {
  getHello(@Body() body): string {
    return `Hello World! ${body}`;
  }
}
