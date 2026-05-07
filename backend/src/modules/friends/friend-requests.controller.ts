import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { UserDocument } from 'src/utils/schema.types';
import { GetRequestsDto } from './dtos/get-requests.dto';
import { FriendsService } from './friend-requests.service';
import { FriendsFilterType } from './utils/types';
import mongoose from 'mongoose';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { IsValidMongooseIdPipe } from 'src/common/pipes/is-valid-mongoose-ts.pipe';

@UseGuards(AuthGuard)
@Controller('reuests')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Get('')
  getRequestsByUser(
    @CurrentUser() user: UserDocument,
    @Query() query: GetRequestsDto,
  ) {
    const filter: FriendsFilterType = {};

    if (query.type === 'incoming') {
      filter.to = user._id;
    } else {
      filter.from = user._id;
    }

    filter.status = query.status;
    return this.friendsService.getRequests(filter);
  }

  @Post('/:targetId')
  sendFriendRequest(
    @Param('targetId', IsValidMongooseIdPipe) targetId: string,
    @CurrentUser() user: UserDocument,
  ) {
    if (targetId === user._id.toString())
      throw new HttpException('You cannot send a request to yourself', 400);
    return this.friendsService.sendRequest(targetId, user._id.toString());
  }

  @Post('/:requestId')
  acceptRequestId(
    @Param('requestId', IsValidMongooseIdPipe) requestId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.friendsService.acceptFriendship(requestId, user._id.toString());
  }

  @Delete(':/targetId')
  declineOrCancelFriendchip(
    @Param('targetId', IsValidMongooseIdPipe) targetId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.friendsService.declineOrCancelFriendchip(
      targetId,
      user._id.toString(),
    );
  }
}
