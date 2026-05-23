import {
  Controller,
  Body,
  UseGuards,
  Get,
  Res,
  Patch,
  Param,
  HttpException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { UserDocument } from 'src/utils/schema.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidMongooseIdPipe } from 'src/common/pipes/is-valid-mongoose-ts.pipe';
import type { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Patch('')
  async updateUser(
    @CurrentUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(user, updateUserDto);
    return updatedUser;
  }

  @Delete('')
  deleteUser(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    const deleted = this.usersService.deleteUser(user);

    res.clearCookie('access_token', { signed: true });
    res.clearCookie('refresh_token', { signed: true });
    return deleted;
  }

  @Delete('/:friendId')
  deleteFriend(
    @CurrentUser() user,
    @Param('friendId', IsValidMongooseIdPipe) friendId: string,
  ) {
    return this.usersService.deleteFriend(friendId, user._id.toString());
  }

  @Get('/:friends')
  getFriendsList(@CurrentUser() user) {
    return this.usersService.getFriendList(user._id.toString());
  }
}
