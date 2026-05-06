import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Connection, Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from 'src/utils/schema.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findOne(username: string): Promise<UserDocument | null> {
    const findUser = await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();
    if (!findUser) return null;
    return findUser;
  }

  async findById(id: string): Promise<UserDocument | null> {
    const findUser = await this.userModel.findById(id).exec();
    if (!findUser) return null;
    return findUser;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    user: UserDocument,
  ) {
    const userObj = await this.userModel.findById(id).exec();
    if (!userObj) throw new HttpException('User not found', 404);
    if (userObj._id.toString() !== user._id.toString())
      throw new HttpException('Forbidden', 403);
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUser(id: string, user: UserDocument) {
    const userObj = await this.userModel.findById(id).exec();
    if (!userObj) throw new HttpException('User not found', 404);
    if (userObj._id.toString() !== user._id.toString())
      throw new HttpException('Forbidden', 403);
    return await this.userModel.findByIdAndDelete(id);
  }

  async addFriend(
    friendUserId: mongoose.Types.ObjectId,
    meId: string,
    session?: ClientSession,
  ) {
    return await this.userModel
      .findByIdAndUpdate(
        meId,
        {
          $addToSet: { friends: friendUserId },
        },
        { new: true, session },
      )
      .exec();
  }

  async removeFriend(
    friendUserId: mongoose.Types.ObjectId,
    meId: string,
    session?: ClientSession,
  ) {
    return await this.userModel
      .findByIdAndUpdate(
        meId,
        { $pull: { friends: friendUserId } },
        { new: true, session },
      )
      .exec();
  }

  async deleteFriend(targetId: string, userId: string) {
    const friend = await this.findById(targetId);
    if (!friend) throw new HttpException('User not found', 404);
    if (!friend.friends?.some((id) => id.toString() === userId))
      throw new HttpException('This user is not your friend', 404);
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await Promise.all([
        this.removeFriend(
          new mongoose.Types.ObjectId(targetId),
          userId,
          session,
        ),
        this.removeFriend(
          new mongoose.Types.ObjectId(userId),
          targetId,
          session,
        ),
      ]);
      await session.commitTransaction();
      return { message: 'Friend is deleted' };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
