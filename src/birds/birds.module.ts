import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { BirdsController } from './controllers/birds.controller';
import { BirdsRepository } from './birds.repository';
import { Bird, BirdSchema } from './birds.schema';
import { BirdsService } from './services/birds.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([{ name: Bird.name, schema: BirdSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BirdsController],
  providers: [BirdsService, BirdsRepository],
  exports: [BirdsService, BirdsRepository],
})
export class BirdsModule {}
