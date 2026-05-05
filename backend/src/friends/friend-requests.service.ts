import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friends } from 'src/schemas/Friends.schema';
import { FriendsDocument, UserDocument } from 'src/utils/schema.types';
import { GetRequestsDto } from './dtos/get-requests.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name) private friendsModel: Model<FriendsDocument>,
  ) {}

  async getRequests(user: UserDocument, query: GetRequestsDto) {
    return await this.friendsModel.find(query).exec();
  }
}
