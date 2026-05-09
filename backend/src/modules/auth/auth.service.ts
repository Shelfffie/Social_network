import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { RegisterDto } from './dtos/Register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/utils/schema.types';
import { UsersService } from '../users/users.service';
import * as crypto from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { hashObjType } from './utils/hashObjType';

@Injectable()
export class AuthService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    const hexKey = this.configService.get<string>('ENCRYPTION_KEY');
    if (!hexKey || hexKey.length !== 64)
      throw new Error('ENCRYPTION_KEY has no enough length');
    this.key = Buffer.from(hexKey, 'hex');
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

  async signUp(registerDto: RegisterDto) {
    const { password, email, username, ...rest } = registerDto;
    console.log(registerDto);

    const blindIndex = await this.generateBlindIndex(email);
    const existingUser = await this.userModel.findOne({
      $or: [{ blindIndex: blindIndex }, { username: username }],
    });
    if (existingUser) {
      throw new HttpException('User already exist', 409);
    }

    const ecnryptedEmail = await this.encryptValue(email);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new this.userModel({
      ...rest,
      username: username,
      password: hashedPassword,
      emailContent: ecnryptedEmail.content,
      emailIv: ecnryptedEmail.iv,
      emailTag: ecnryptedEmail.tag,
      blindIndex: blindIndex,
    });

    newUser.save();
    return { message: 'Account created!' };
  }

  async signIn(loginDto: LoginDto) {
    const { username, email, password } = loginDto;
    const filter: Record<string, string> = {};
    if (!email && !username)
      throw new HttpException('Email or username is required', 400);

    if (username) {
      filter.username = username;
    } else if (email) {
      filter.blindIndex = await this.generateBlindIndex(email);
    }

    const user: UserDocument | null = await this.usersService.findOne(filter);

    if (!user) throw new HttpException('Invalid credentials', 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new HttpException('Invalid credentials', 401);

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return { payload, token };
  }
}
