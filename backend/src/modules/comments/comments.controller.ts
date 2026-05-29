import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import type { UserDocument } from 'src/utils/schema.types';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { IsValidMongooseIdPipe } from 'src/common/pipes/is-valid-mongoose-ts.pipe';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Get('/post/:postId')
  async getCommentsByPost(
    @Param('postId', IsValidMongooseIdPipe) postId: string,
    @CurrentUser() user: UserDocument,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.commentsService.getComments(postId, page, user);
  }

  @UseGuards(AuthGuard)
  @Post('/post/:postId')
  async createComment(
    @Param('postId', IsValidMongooseIdPipe) postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: UserDocument,
  ) {
    return await this.commentsService.createComment(
      postId,
      createCommentDto,
      user,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:commentId')
  async deleteComment(
    @Param('commentId', IsValidMongooseIdPipe) commentId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return await this.commentsService.deleteComment(commentId, user);
  }

  @UseGuards(AuthGuard)
  @Patch('/:commentId/like')
  async likeUnlikeComment(
    @Param('commentId', IsValidMongooseIdPipe) commentId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.commentsService.likeUnlike(commentId, user);
  }
}
