import { Module } from '@nestjs/common';
import { FriendsController } from './friend-requests.controller';
import { FriendsService } from './friend-requests.service';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
