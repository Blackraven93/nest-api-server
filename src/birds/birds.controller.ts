import {
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
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { PositiveIntPipe } from 'src/pipe/positiveInt.pipe';
import { BirdsService } from './birds.service';

@Controller('birds')
@UseFilters(HttpExceptionFilter)
export class BirdsController {
  constructor(private readonly birdsService: BirdsService) {}

  // birds
  @Get()
  getAllBird() {
    throw new HttpException('api is broken', 401);
    return `all Birds`;
  }

  // birds/:id
  @Get(':id')
  readBird(@Param('id', ParseIntPipe, PositiveIntPipe) param) {
    console.log(param);
    return `read one bird`;
  }

  @Post()
  createBird() {
    return 'create Bird';
  }

  @Put(':id')
  updateBird() {
    return 'update bird';
  }

  @Patch(':id')
  updatePartialBird() {
    return 'update partial bird';
  }

  @Delete(':id')
  deleteBird() {
    return 'delete bird';
  }
}
