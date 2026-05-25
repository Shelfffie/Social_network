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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { UserDocument } from 'src/utils/schema.types';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidMongooseIdPipe } from 'src/common/pipes/is-valid-mongoose-ts.pipe';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/upload/multer.config';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Patch('me')
  @UseInterceptors(FileInterceptor('icon', multerConfig('user/avatars')))
  async updateUser(
    @CurrentUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const updatedUser = await this.usersService.updateUser(
      user,
      updateUserDto,
      file,
    );
    return updatedUser;
  }

  @Delete('me')
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

  @Get('friends')
  getFriendsList(@CurrentUser() user) {
    return this.usersService.getFriendList(user._id.toString());
  }
}
