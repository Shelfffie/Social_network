import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import mongoose from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const isValid = mongoose.Types.ObjectId.isValid(payload.id);
      if (!isValid) throw new HttpException('Inalid ID', 400);
      const user = await this.usersService.findById(payload.id);

      if (!user) throw new HttpException('User nor found', 404);

      request.user = user;
    } catch {
      throw new HttpException('Unauthorized', 401);
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.signedCookies?.access_token || request.cookies?.access_token;
  }
}
