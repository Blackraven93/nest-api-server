import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bird } from './birds.schema';
import { BirdRequestDto } from './dto/birds.request.dto';

// 서비스에서 바로 핸들링 하는게 아닌
// 여러가지 DB에 요청 처리를 중간에 처리하여
// 쿼리를 한번 수정할 수 있도록

@Injectable()
export class BirdsRepository {
  constructor(@InjectModel(Bird.name) private readonly birdModel: Model<Bird>) {}

  async findBirdByEmail(email: string): Promise<Bird | null> {
    const bird = await this.birdModel.findOne({ email });
    return bird;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.birdModel.exists({ email });
    return result;
  }

  async create(bird: BirdRequestDto): Promise<Bird> {
    return await this.birdModel.create(bird);
  }
}
