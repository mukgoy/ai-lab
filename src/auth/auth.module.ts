import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthService, JwtStrategy, LocalStrategy, UserService } from './services';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60*60 + 's' },
    })
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    UserService,
  ],
  exports: [

  ],
})
export class AuthModule {}
