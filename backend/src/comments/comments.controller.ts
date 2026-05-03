import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/:postId')
  async getCommentsByPost(@Param('postId') postId: string) {
    return {};
  }
}
