
import { Controller, Request, Post, UseGuards, Body, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './services/local-auth.guard';
import { SignupDto } from './dto/singup.dto';

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto).catch(err=>{
      if(err.code == "ER_DUP_ENTRY"){
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
    });
  }

}
