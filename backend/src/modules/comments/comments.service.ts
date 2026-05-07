import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from 'src/schemas/Comment.schema';
import { Post } from 'src/schemas/Post.schema';
import { getPagination } from 'src/utils/get-pagination';
import {
  CommentDocument,
  PostDocument,
  UserDocument,
} from 'src/utils/schema.types';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async getComments(postId: string, page: number) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new HttpException("Post doesn't exist", 404);

    const { skip, limit } = getPagination(page, 20);
    const comments = await this.commentModel
      .find({
        postId: new Types.ObjectId(postId),
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: 'creatorId', select: 'username' });

    return comments;
  }

  async createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
    user: UserDocument,
  ) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new HttpException("Post doesn't exist", 404);
    const newComment = new this.commentModel({
      ...createCommentDto,
      creatorId: user._id,
      postId: postId,
      parentId: createCommentDto.parentId ?? null,
    });

    return await newComment.save();
  }

  async deleteComment(commentId: string, user: UserDocument) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) throw new HttpException("Comment doesn't exist", 404);
    if (comment.creatorId.toString() !== user._id.toString())
      throw new HttpException('Forbidden', 403);
    return await this.commentModel.findByIdAndDelete(commentId);
  }
}
