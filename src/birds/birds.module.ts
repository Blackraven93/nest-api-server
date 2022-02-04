import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirdsController } from './birds.controller';
import { BirdsRepository } from './birds.repository';
import { Bird, BirdSchema } from './birds.schema';
import { BirdsService } from './birds.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bird.name, schema: BirdSchema }])],
  controllers: [BirdsController],
  providers: [BirdsService, BirdsRepository],
  exports: [BirdsService],
})
export class BirdsModule {}
