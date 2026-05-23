import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from 'src/utils/schema.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findOne(filter: Record<string, string>): Promise<UserDocument | null> {
    return await this.userModel.findOne(filter).select('+password').exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }

  async updateUser(user: UserDocument, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: user._id }, updateUserDto, {
        returnDocument: 'after',
      })
      .exec();
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  async deleteUser(user: UserDocument) {
    const deleted = await this.userModel.findByIdAndDelete(user._id).exec();
    if (!deleted) throw new HttpException('User not found', 404);
    return deleted;
  }

  async addFriend(friendUserId: string, meId: string, session?: ClientSession) {
    return await this.userModel
      .findByIdAndUpdate(
        meId,
        {
          $addToSet: { friends: friendUserId },
        },
        { returnDocument: 'after', session },
      )
      .exec();
  }

  async removeFriend(
    friendUserId: string,
    meId: string,
    session?: ClientSession,
  ) {
    return await this.userModel
      .findByIdAndUpdate(
        meId,
        { $pull: { friends: friendUserId } },
        { returnDocument: 'after', session },
      )
      .exec();
  }

  async deleteFriend(targetId: string, userId: string) {
    const friend = await this.findById(targetId);
    const user = await this.findById(userId);
    if (!friend || !user) throw new HttpException('User not found', 404);
    if (!user.friends?.some((id) => id.toString() === targetId))
      throw new HttpException('This user is not your friend', 404);
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await Promise.all([
        this.removeFriend(targetId, userId, session),
        this.removeFriend(userId, targetId, session),
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

  async getFriendList(userId: string) {
    return this.userModel
      .findById(userId)
      .select('friends')
      .populate({ path: 'friends', select: 'username' })
      .exec();
  }
}
