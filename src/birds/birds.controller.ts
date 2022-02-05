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
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PositiveIntPipe } from 'src/pipe/positiveInt.pipe';
import { Bird } from './birds.schema';
import { BirdsService } from './birds.service';
import { ReadOnlyBirdDto } from './dto/bird.dto';
import { BirdRequestDto } from './dto/birds.request.dto';

@Controller('birds')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class BirdsController {
  constructor(
    private readonly BirdsService: BirdsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 유저 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentBird(@CurrentUser() bird: Bird) {
    return bird.readOnlyData;
  }

  // swagger 추가 설명
  @ApiResponse({
    status: 500,
    description: 'Server Error..',
  })
  @ApiResponse({
    status: 200,
    description: '성공!!',
    type: ReadOnlyBirdDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: BirdRequestDto) {
    console.log(body);
    return await this.BirdsService.signUp(body);
  }

  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
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
