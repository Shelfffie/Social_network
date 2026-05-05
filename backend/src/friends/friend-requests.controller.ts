import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FriendsModule } from './friend-requests.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import type { UserDocument } from 'src/utils/schema.types';
import { GetRequestsDto } from './dtos/get-requests.dto';

@Controller('friends')
export class FriendsController {
  constructor(private friendsModule: FriendsModule) {}

  @UseGuards(AuthGuard)
  @Get('/requests')
  getRequestsByUser(
    @CurrentUser() user: UserDocument,
    @Query() query: GetRequestsDto,
  ) {
    const filter: any = {};

    if (query.type === 'incoming') {
      filter.to = user._id;
    } else {
      filter.from = user._id;
    }

    filter.status = query.status;
  }
}
