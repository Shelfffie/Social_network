import {
  Controller,
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

@Controller('reuests')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
}
