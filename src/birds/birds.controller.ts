import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/pipe/positiveInt.pipe';
import { BirdsService } from './birds.service';
import { BirdRequestDto } from './dto/birds.request.dto';

@Controller('birds')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class BirdsController {
  constructor(private readonly BirdsService: BirdsService) { }

  @Get()
  getCurrentBird() {
    return 'current bird';
  }

  @Post()
  async signUp(@Body() body: BirdRequestDto) {
    console.log(body);
    return await this.BirdsService.signUp(body);
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/birds')
  uploadBirdImg() {
    return 'uploadImg';
  }
}
