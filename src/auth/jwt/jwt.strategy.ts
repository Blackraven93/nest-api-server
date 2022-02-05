import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // auth.module의 secret key와 일치해야 한다.
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  // async validate(payload) {

  // }
}
