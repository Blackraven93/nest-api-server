import { Module } from '@nestjs/common';
import { BirdsController } from './birds.controller';
import { BirdsService } from './birds.service';

@Module({
  imports: [],
  controllers: [BirdsController],
  providers: [BirdsService],
})
export class BirdsModule {}
