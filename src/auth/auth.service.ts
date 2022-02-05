import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BirdsRepository } from 'src/birds/birds.repository';
import { LoginRequestDto } from './dto/login.request';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly birdsRepository: BirdsRepository, private jwtService: JwtService) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당하는 email이 있는지 확인
    const bird = await this.birdsRepository.findBirdByEmail(email);

    if (!bird) throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');

    //* password 일치 여부 확인
    const isPasswordValidated: boolean = await bcrypt.compare(password, bird.password);

    if (!isPasswordValidated) throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');

    const payload = { email: email, sub: bird.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
