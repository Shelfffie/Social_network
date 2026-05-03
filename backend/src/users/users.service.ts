import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/dtos/Login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from 'src/utils/schema.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | null> {
    const findUser = await this.userModel
      .findOne({ username })
      .select('+password');
    if (!findUser) return null;
    return findUser;
  }

  async findById(id: string): Promise<User | null> {
    const findUser = await this.userModel.findById(id);
    if (!findUser) return null;
    return findUser;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    user: UserDocument,
  ) {
    const userObj = await this.userModel.findById(id);
    if (!userObj) throw new HttpException('User not found', 404);
    if (userObj._id.toString() !== user._id.toString())
      throw new HttpException('Forbidden', 403);
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUser(id: string, user: UserDocument) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
