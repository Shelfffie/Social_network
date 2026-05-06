import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { Friends } from 'src/schemas/Friends.schema';
import { FriendsDocument } from 'src/utils/schema.types';
import { FriendsFilterType } from './utils/types';
import { UsersService } from 'src/users/users.service';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name) private friendsModel: Model<FriendsDocument>,
    @InjectConnection() private readonly connection: Connection,
    private usersService: UsersService,
  ) {}

  async getFriendshipStatus(targetId: string, userId: string) {
    return await this.friendsModel
      .findOne({
        $or: [
          { from: userId, to: targetId },
          { from: targetId, to: userId },
        ],
      })
      .exec();
  }

  async getRequests(query: FriendsFilterType) {
    return await this.friendsModel.find(query).exec();
  }

  async sendRequest(targetId: string, userId: string) {
    const target = await this.usersService.findById(targetId);
    if (!target) throw new HttpException('User not found', 404);
    const friendship = this.getFriendshipStatus(targetId, userId);
    if (!friendship)
      throw new HttpException('Request or friendship already exist', 409);

    const newRequest = new this.friendsModel({ from: userId, to: targetId });
    return await newRequest.save();
  }

  async acceptFriendship(requestId: string, userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const request = await this.friendsModel
        .findById(requestId)
        .session(session);
      if (!request) throw new HttpException('Request does not exist', 404);
      if (request.to.toString() !== userId.toString())
        throw new HttpException(
          'You are not authorized to accept this request',
          403,
        );
      if (request.status === 'accepted')
        throw new HttpException('Users are already friends', 409);
      const sender = await this.usersService.findById(request.from.toString());
      if (!sender) {
        await this.friendsModel.deleteOne({ _id: requestId });
        throw new HttpException('User no longer exist.', 404);
      }

      request.status = 'accepted';
      await request.save({ session });

      await Promise.all([
        this.usersService.addFriend(sender._id, userId, session),
        this.usersService.addFriend(
          new mongoose.Types.ObjectId(userId),
          sender._id.toString(),
          session,
        ),
      ]);

      await session.commitTransaction();
      return { message: 'Friend request accepted.' };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async deleteFriend(targetId: string, userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const friendship = await this.getFriendshipStatus(targetId, userId);
      if (!friendship)
        throw new HttpException('This friendship does not exist', 404);
      await this.friendsModel
        .findByIdAndDelete(friendship._id)
        .session(session);
      await Promise.all([
        this.usersService.removeFriend(
          new mongoose.Types.ObjectId(targetId),
          userId,
          session,
        ),
        this.usersService.removeFriend(
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
      session.endSession();
    }
  }
}
