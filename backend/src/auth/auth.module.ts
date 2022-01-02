import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import repositories from './repository';
import { AuthService, JwtStrategy, LocalStrategy, UserService } from './services';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([
      ...repositories
    ]),
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
