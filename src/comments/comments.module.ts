import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirdsModule } from 'src/birds/birds.module';
import { Comments, CommentsSchema } from './comments.schema';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }]),
    BirdsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
