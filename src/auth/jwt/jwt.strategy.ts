import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BirdsRepository } from 'src/birds/birds.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly birdsRepository: BirdsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // auth.module의 secret key와 일치해야 한다.
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const bird = await this.birdsRepository.findBirdByIdWithoutPassword(payload.sub);
    // request.user에 들어가 있음
    if (bird) {
      return bird;
    } else {
      throw new UnauthorizedException('접근 오류!');
    }
  }
}
