import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-cat',
      signOptions: { expiresIn: '60s' },
    });
  }

  async validate(payload: any) {
    //console.log('validate()', payload);
    const isAuthorized = await this.authService.verifyLogin(payload.account_address);
    if(!isAuthorized) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
