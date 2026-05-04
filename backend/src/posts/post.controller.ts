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
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import type { UserDocument } from 'src/utils/schema.types';
import { AuthGuard } from 'src/common/guards/auth.guard';

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
  @Patch('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePostDto,
    @CurrentUser() user: UserDocument,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    const updatedPost = this.updatePost(id, updateUserDto, user);
    if (!updatedPost) throw new HttpException('Post not found', 404);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id: string, @CurrentUser() user: UserDocument) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    return this.postService.deletePost(id, user);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    return this.postService.getPostById(id);
  }

  @Get('')
  async getPosts(
    @Query()
    query: PaginationFilterDto,
  ) {
    const page = query.page ?? 1;
    const search = query.search ?? '';

    return this.postService.getPostsAndFilter(page, search);
  }

  @UseGuards(AuthGuard)
  @Get('/likes')
  async getPostsByLikes(
    @CurrentUser() user: UserDocument,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.postService.getPostsByLikes(page, user);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/like')
  async likeUnlikePost(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Inalid ID', 400);
    return this.postService.likeUnlike(id, user);
  }
}
