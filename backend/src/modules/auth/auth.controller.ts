import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/Register.dto';
import { LoginDto } from './dtos/Login.dto';
import type { Response, Request } from 'express';
import { SecurityService } from './security.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

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

    this.securityService.setCookie(
      res,
      tokens.accessToken,
      tokens.refreshToken,
    );
    return {
      user: payload,
      message: 'Login successfull',
    };
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return { message: 'Logout successfull' };
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('IN REQUEST');

    const oldRefreshToken = req.cookies['refresh_token'];
    console.log('OLD REFRESH TOKEN:', oldRefreshToken);
    if (!oldRefreshToken) throw new HttpException('Session not found', 404);

    const tokens = await this.securityService.refresh(oldRefreshToken);
    console.log('tokens:', tokens);
    this.securityService.setCookie(
      res,
      tokens.accessToken,
      tokens.refreshToken,
    );
    return { message: 'Refreshed' };
  }
}
