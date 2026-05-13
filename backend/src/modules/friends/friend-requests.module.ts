import { Module } from '@nestjs/common';
import { FriendsController } from './friend-requests.controller';
import { FriendsService } from './friend-requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FriendRequests,
  FriendsSchema,
} from 'src/schemas/Friends-requests.schema';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: FriendRequests.name,
        schema: FriendsSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
