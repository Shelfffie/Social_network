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
import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/utils/schema.types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async signUp(registerDto: RegisterDto) {
    const { password, ...rest } = registerDto;

    const salt = 11;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({
      ...rest,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async signIn(loginDto: LoginDto) {
    const user: UserDocument | null = await this.usersService.findOne(
      loginDto.username,
    );

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch)
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return { payload, token };
  }
}
