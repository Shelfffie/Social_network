import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import mongoose from 'mongoose';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/:postId')
  async getCommentsByPost(
    @Param('postId') postId: string,
    @Query() page: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(postId);
    if (!isValid) throw new HttpException('Inalid ID', 400);

    return this.commentsService.getPosts(postId, Number(page));
  }
}
