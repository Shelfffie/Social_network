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
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import type { UserDocument } from 'src/utils/schema.types';
import { GetRequestsDto } from './dtos/get-requests.dto';
import { FriendsService } from './friend-requests.service';
import { FriendsFilterType } from './utils/types';
import mongoose from 'mongoose';

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
    @Param('targetId') targetId: string,
    @CurrentUser() user: UserDocument,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(targetId);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    if (targetId === user._id.toString())
      throw new HttpException('You cannot send a request to yourself', 400);
    return this.friendsService.sendRequest(targetId, user._id.toString());
  }

  @Post('/:requestId')
  acceptRequestId(
    @Param('requestId') requestId: string,
    @CurrentUser() user: UserDocument,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(requestId);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    return this.friendsService.acceptFriendship(requestId, user._id.toString());
  }

  @Delete(':/targetId')
  declineOrCancelFriendchip(
    @Param('targetId') targetId: string,
    @CurrentUser() user: UserDocument,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(targetId);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    return this.friendsService.declineOrCancelFriendchip(
      targetId,
      user._id.toString(),
    );
  }
}
