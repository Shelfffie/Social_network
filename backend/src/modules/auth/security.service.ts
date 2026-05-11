import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import { hashObjType } from './utils/hashObjType';
import { Response } from 'express';

@Injectable()
export class SecurityService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const hexKey = this.configService.get<string>('ENCRYPTION_KEY');
    if (!hexKey || hexKey.length !== 64)
      throw new Error('ENCRYPTION_KEY has no enough length');
    this.key = Buffer.from(hexKey, 'hex');
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      });
      return this.generateToken(payload.id, payload.username);
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }
  }

  async generateToken(id: string, username: string) {
    const payload = { id: id, username: username };

    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
        expiresIn: '7d',
      }),
    ]);

    return { accesToken, refreshToken };
  }

  async encryptValue(value: string): Promise<hashObjType> {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();

    return {
      iv: iv.toString('hex'),
      content: encrypted,
      tag: authTag.toString('hex'),
    };
  }

  async decryptValue(hashedValue: hashObjType): Promise<string> {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(hashedValue.iv, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(hashedValue.tag, 'hex'));
    let decrypted = decipher.update(hashedValue.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async generateBlindIndex(value: string): Promise<string> {
    const salt = this.configService.get<string>('BLIND_INDEX_SALT');
    if (!salt) throw new Error('Salt is undefined');
    return crypto
      .createHmac('sha256', salt)
      .update(value.toLowerCase().trim())
      .digest('hex');
  }

  setCookie(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      signed: true,
      sameSite: 'lax',
    });

    res.cookie('refresh_token', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      signed: true,
      sameSite: 'lax',
    });
  }
}
