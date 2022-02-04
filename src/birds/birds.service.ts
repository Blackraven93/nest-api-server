import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BirdRequestDto } from './dto/birds.request.dto';
import * as bcrypt from 'bcrypt';
import { Bird } from './birds.schema';
import { Model } from 'mongoose';

@Injectable()
export class BirdsService {
  constructor(@InjectModel(Bird.name) private readonly birdModel: Model<Bird>) { }

  async signUp(body: BirdRequestDto) {
    const { email, name, password } = body;
    const isBirdExist = await this.birdModel.exists({ email });

    if (isBirdExist) {
      throw new UnauthorizedException('해당 계정은 이미 존재합니다!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const bird = await this.birdModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return bird.readOnlyData;
  }
}
