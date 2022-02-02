import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { BirdsService } from './birds.service';

@Controller('birds')
export class BirdsController {
  constructor(private readonly birdsService: BirdsService) {}

  // birds
  @Get()
  getAllBird(): string {
    return `all Birds`;
  }

  // birds/:id
  @Get(':id')
  readBird() {
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
    return;
  }

  @Delete(':id')
  deleteBird() {
    return;
  }
}
