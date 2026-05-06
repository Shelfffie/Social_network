import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Connection, Model } from 'mongoose';
import { FriendRequests } from 'src/schemas/Friends-requests.schema';
import { FriendsDocument } from 'src/utils/schema.types';
import { FriendsFilterType } from './utils/types';
import { UsersService } from 'src/users/users.service';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(FriendRequests.name)
    private friendsModel: Model<FriendsDocument>,
    @InjectConnection() private readonly connection: Connection,
    private usersService: UsersService,
  ) {}

  async getFriendship(
    targetId: string,
    userId: string,
    session?: ClientSession,
  ) {
    return await this.friendsModel
      .findOne(
        {
          $or: [
            { from: userId, to: targetId },
            { from: targetId, to: userId },
          ],
        },
        { session },
      )
      .exec();
  }

  async getRequests(query: FriendsFilterType) {
    return await this.friendsModel.find(query).exec();
  }

  async sendRequest(targetId: string, userId: string) {
    const target = await this.usersService.findById(targetId);
    if (!target) throw new HttpException('User not found', 404);
    const isFriends = target.friends?.some((id) => id.toString() === userId);
    if (isFriends) throw new HttpException('Friendship already exist', 409);
    const pendingRequest = await this.getFriendship(targetId, userId);
    if (pendingRequest) throw new HttpException('Request already exist', 409);

    return await new this.friendsModel({ from: userId, to: targetId }).save();
  }

  async acceptFriendship(requestId: string, userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    const request = await this.friendsModel.findById(requestId);

    if (!request) throw new HttpException('Request does not exist', 404);
    if (request.to.toString() !== userId.toString())
      throw new HttpException(
        'You are not authorized to accept this request',
        403,
      );
    if (request.from.toString() === userId) {
      throw new HttpException('Request cannot accept your own request', 409);
    }
    const sender = await this.usersService.findById(request.from.toString());
    if (!sender) {
      await this.friendsModel.deleteOne({ _id: requestId });
      throw new HttpException('User no longer exist.', 404);
    }

    try {
      await this.friendsModel.deleteOne({ _id: request._id }).session(session);

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

  async declineFriendship(targetId: string, userId: string) {
    const request = await this.getFriendship(targetId, userId);
    if (!request)
      throw new HttpException('Pending request friendship not found.', 404);

    await this.friendsModel.deleteOne({ _id: request._id });
    return { message: 'Friendship request declined successfully' };
  }
}
