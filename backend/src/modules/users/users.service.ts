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

  async findOne(username: string): Promise<UserDocument | null> {
    return await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    user: UserDocument,
  ) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) throw new HttpException('User not found', 404);
  }

  async deleteUser(id: string, user: UserDocument) {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
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
        { new: true, session },
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
        { new: true, session },
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
}
