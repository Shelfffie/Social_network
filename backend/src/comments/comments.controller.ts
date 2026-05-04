import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import mongoose from 'mongoose';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import type { UserDocument } from 'src/utils/schema.types';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/post/:postId')
  async getCommentsByPost(
    @Param('postId') postId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(postId);
    if (!isValid) throw new HttpException('Inalid ID', 400);

    return this.commentsService.getComments(postId, page);
  }

  @UseGuards(AuthGuard)
  @Post('/post/:postId')
  async createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: UserDocument,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(postId);
    if (!isValid) throw new HttpException('Inalid ID', 400);

    return await this.commentsService.createComment(
      postId,
      createCommentDto,
      user,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @CurrentUser() user: UserDocument,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(commentId);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    return await this.commentsService.deleteComment(commentId, user);
  }
}
