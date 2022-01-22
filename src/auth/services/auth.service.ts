import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../dto/singup.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: any) {
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    const user = await this.userService.create(signupDto);
    return user;
  }
}