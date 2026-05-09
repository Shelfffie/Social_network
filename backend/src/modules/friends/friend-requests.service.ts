import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ClientSession, Connection, Model, Types } from 'mongoose';
import { FriendRequests } from 'src/schemas/Friends-requests.schema';
import { FriendsDocument } from 'src/utils/schema.types';
import { FriendsFilterType } from './utils/types';
import { InjectConnection } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';

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
    const userObjectId = new Types.ObjectId(userId);
    const targetObjectId = new Types.ObjectId(targetId);
    return await this.friendsModel
      .findOne({
        $or: [
          {
            from: userObjectId,
            to: targetObjectId,
          },
          {
            from: targetObjectId,
            to: userObjectId,
          },
        ],
      })
      .session(session ?? null)
      .exec();
  }

  async getRequests(query: FriendsFilterType) {
    console.log('Виконується пошук із фільтром:', query);

    const allDocs = await this.friendsModel.find({}).exec();
    console.log('Усього документів у базі:', allDocs.length);
    return await this.friendsModel.find(query).exec();
  }

  async sendRequest(targetId: string, userId: string) {
    console.log('TARGET ID:', targetId, 'USER ID:', userId);

    const target = await this.usersService.findById(targetId);
    if (!target) throw new HttpException('User not found', 404);
    const isFriends = target.friends?.some((id) => id.toString() === userId);
    if (isFriends) throw new HttpException('Friendship already exist', 409);
    const pendingRequest = await this.getFriendship(targetId, userId);
    if (pendingRequest) throw new HttpException('Request already exist', 409);

    console.log('ШУКАЄМО: from:', userId, 'to:', targetId);
    console.log('РЕЗУЛЬТАТ ПОШУКУ:', pendingRequest);

    return await new this.friendsModel({
      from: new Types.ObjectId(userId),
      to: new Types.ObjectId(targetId),
    }).save();
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
        this.usersService.addFriend(sender._id.toString(), userId, session),
        this.usersService.addFriend(userId, sender._id.toString(), session),
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

  async declineOrCancelFriendchip(targetId: string, userId: string) {
    console.log('target id:', targetId, 'user:', userId);

    const request = await this.getFriendship(targetId, userId);
    console.log(request);

    if (!request) throw new HttpException('Request friendship not found.', 404);

    await this.friendsModel.deleteOne({ _id: request._id });
    return { message: 'Friendship request declined successfully' };
  }
}
