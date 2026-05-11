import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
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
import { Response } from 'express';
import { SecurityService } from './security.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UsersService))
    private securityService: SecurityService,
    private usersService: UsersService,
  ) {}

  async signUp(registerDto: RegisterDto) {
    const { password, email, username, ...rest } = registerDto;
    console.log(registerDto);

    const blindIndex = await this.securityService.generateBlindIndex(email);
    const existingUser = await this.userModel.findOne({
      $or: [{ blindIndex: blindIndex }, { username: username }],
    });
    if (existingUser) {
      throw new HttpException('User already exist', 409);
    }

    const ecnryptedEmail = await this.securityService.encryptValue(email);

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
      filter.blindIndex = await this.securityService.generateBlindIndex(email);
    }

    const user: UserDocument | null = await this.usersService.findOne(filter);

    if (!user) throw new HttpException('Invalid credentials', 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new HttpException('Invalid credentials', 401);

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = await this.securityService.generateToken(
      user._id.toString(),
      user.username,
    );

    return { payload, token };
  }
}
