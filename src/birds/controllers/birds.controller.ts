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
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Multer } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
import { PositiveIntPipe } from 'src/pipe/positiveInt.pipe';
import { Bird } from '../birds.schema';
import { BirdsService } from '../services/birds.service';
import { ReadOnlyBirdDto } from '../dtos/bird.dto';
import { BirdRequestDto } from '../dtos/birds.request.dto';

@Controller('birds')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class BirdsController {
  constructor(
    private readonly BirdsService: BirdsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '모든 유저 가져오기' })
  @Get('all')
  getAllBird() {
    return this.BirdsService.getAllBird();
  }

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

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  // image || files
  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('birds')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadBirdImg(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() bird: Bird) {
    console.log(files);
    // return 'uploadImg';
    // return { image: `http://localhost:${process.env.PORT}/media/birds/${files[0].filename}` };
    return this.BirdsService.uploadImg(bird, files);
  }
}
