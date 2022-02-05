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

  async findBirdByIdWithoutPassword(birdId: string): Promise<Bird | null> {
    // 보안상의 이유로 select 뒤에 password만 제외하고 가져온다.
    // email이나 name 만 가져오고 싶은 경우 select('email name')
    const bird = await this.birdModel.findById(birdId).select('-password');
    return bird;
  }

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
