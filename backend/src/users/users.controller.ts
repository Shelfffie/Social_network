import {
  Controller,
  Post,
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
import mongoose from 'mongoose';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Patch('/:id')
  async updateUser(
    @CurrentUser() user: UserDocument,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    const updatedUser = await this.usersService.updateUser(
      id,
      updateUserDto,
      user,
    );
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  @Delete('/:id')
  deleteUser(@CurrentUser() user: UserDocument, @Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    return this.usersService.deleteUser(id, user);
  }
}
