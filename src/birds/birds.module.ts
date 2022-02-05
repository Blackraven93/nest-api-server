import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BirdsController } from './birds.controller';
import { BirdsRepository } from './birds.repository';
import { Bird, BirdSchema } from './birds.schema';
import { BirdsService } from './birds.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bird.name, schema: BirdSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BirdsController],
  providers: [BirdsService, BirdsRepository],
  exports: [BirdsService, BirdsRepository],
})
export class BirdsModule {}
