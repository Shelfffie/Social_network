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
    return this.usersService.deleteUser(id, user);
  }
}
