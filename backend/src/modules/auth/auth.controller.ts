import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/Register.dto';
import { LoginDto } from './dtos/Login.dto';
import type { Response, Request } from 'express';
import { SecurityService } from './security.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private securityService: SecurityService,
  ) {}

  @Post('sign-up')
  signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  @Post('sign-in')
  async signIn(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { payload, tokens } = await this.authService.signIn(loginDto);

    this.securityService.setCookie(res, tokens.accesToken, tokens.refreshToken);
    return {
      user: payload,
      message: 'Login successfull',
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { signed: true });
    res.clearCookie('refresh_token', { signed: true });

    return { message: 'Logout successfull' };
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const oldRefreshToken = req.cookies['refresh_token'];
    const tokens = await this.securityService.refresh(oldRefreshToken);
    this.securityService.setCookie(res, tokens.accesToken, tokens.refreshToken);
    return { message: 'Refreshed' };
  }
}
