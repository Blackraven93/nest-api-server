import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BirdRequestDto } from './dto/birds.request.dto';
import * as bcrypt from 'bcrypt';
import { Bird } from './services/birds.schema';
import { Model } from 'mongoose';
import { BirdsRepository } from './birds.repository';

@Injectable()
export class BirdsService {
  constructor(private readonly birdsRepository: BirdsRepository) {}

  async signUp(body: BirdRequestDto) {
    const { email, name, password } = body;
    const isBirdExist = await this.birdsRepository.existsByEmail(email);

    if (isBirdExist) {
      throw new UnauthorizedException('해당 계정은 이미 존재합니다!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const bird = await this.birdsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return bird.readOnlyData;
  }

  async uploadImg(bird: Bird, files: Express.Multer.File[]) {
    const fileName = `birds/${files[0].filename}`;
    console.log(fileName);
    const newBird = await this.birdsRepository.findByIdAndUpdateImg(bird.id, fileName);
    console.log(newBird);
    return newBird;
  }
}
