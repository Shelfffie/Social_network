import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  Delete,
  Get,
  Query,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import mongoose from 'mongoose';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PaginationFilterDto } from './dtos/pagination-filter.dto';
import type { UserDocument } from 'src/utils/schema.types';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { IsValidMongooseIdPipe } from 'src/common/pipes/is-valid-mongoose-ts.pipe';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post('')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.postService.createPost(createPostDto, user);
  }

  @UseGuards(AuthGuard)
  @Get('/liked')
  async getPostsByLikes(
    @CurrentUser() user: UserDocument,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.postService.getPostsByLikes(page, user);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updatePost(
    @Param('id', IsValidMongooseIdPipe) id: string,
    @Body() updateUserDto: UpdatePostDto,
    @CurrentUser() user: UserDocument,
  ) {
    const updatedPost = await this.postService.updatePost(
      id,
      updateUserDto,
      user,
    );
    if (!updatedPost) throw new HttpException('Post not found', 404);
    return updatedPost;
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePost(
    @Param('id', IsValidMongooseIdPipe) id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.postService.deletePost(id, user);
  }

  @Get('/:id')
  async findById(
    @Param('id', IsValidMongooseIdPipe) id: string,
    user?: UserDocument,
  ) {
    return this.postService.getPostById(id, user);
  }

  @UseGuards(AuthGuard)
  @Get('')
  async getPosts(
    @Query()
    query: PaginationFilterDto,
    @CurrentUser() user?: UserDocument,
  ) {
    const page = query.page ?? 1;
    const search = query.search ?? '';
    const byUser = query.byUser ?? '';
    console.log('Page:', page, 'Search:', search);

    return this.postService.getPostsAndFilter(page, search, user, byUser);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id/like')
  async likeUnlikePost(
    @Param('id', IsValidMongooseIdPipe) id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.postService.likeUnlike(id, user);
  }
}
