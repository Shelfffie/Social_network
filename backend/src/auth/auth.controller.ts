import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/Register.dto';
import { LoginDto } from './dtos/Login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  @Post('sign-in')
  async signIn(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { payload, token } = await this.authService.signIn(loginDto);

    res.cookie('access_token', token, {
      maxAge: 90000000,
      httpOnly: true,
      signed: true,
      sameSite: 'lax',
    });

    return {
      user: payload,
      message: 'Login successfull',
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { signed: true });
    return { message: 'Logout successfull' };
  }
}
