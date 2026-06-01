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

  async getComments(postId: string, page: number, user: UserDocument) {
    const post = await this.postModel.findById(postId);
    if (!post) throw new HttpException("Post doesn't exist", 404);

    const { skip, limit } = getPagination(page, 20);
    const comments = await this.commentModel
      .find({
        postId: postId,
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creatorId', 'username displayName iconURL');

    const mappedComments = comments.map((comment) => {
      const commentObj = comment.toObject();

      return {
        ...commentObj,
        likesCount: commentObj.likes?.length || 0,
        isLiked: user
          ? commentObj.likes?.some((id) => {
              return id.toString() === user._id.toString();
            })
          : false,
        likes: undefined,
      };
    });

    return { comments: mappedComments };
  }

  async createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
    user: UserDocument,
  ) {
    console.log(createCommentDto);

    const post = await this.postModel.findById(postId);
    if (!post) throw new HttpException("Post doesn't exist", 404);
    const newComment = new this.commentModel({
      ...createCommentDto,
      creatorId: user._id,
      postId: postId,
      parentId: createCommentDto.parentId ?? null,
    });

    await this.postModel.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 },
    });

    const savedComment = await newComment.save();
    return await savedComment.populate(
      'creatorId',
      'displayName username iconURL',
    );
  }

  async deleteComment(commentId: string, user: UserDocument) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) throw new HttpException("Comment doesn't exist", 404);
    if (comment.creatorId.toString() !== user._id.toString())
      throw new HttpException('Forbidden', 403);
    await this.postModel.findByIdAndUpdate(comment.postId, {
      $inc: { commentsCount: -1 },
    });
    return await this.commentModel.findByIdAndDelete(commentId);
  }

  async likeUnlike(id: string, user: UserDocument) {
    const comment = await this.commentModel.findById(id);
    if (!comment) throw new HttpException('comment not found', 404);

    const isLiked = comment.likes.some(
      (likeId) => likeId.toString() === user._id.toString(),
    );

    if (isLiked) {
      comment.likes = comment.likes.filter(
        (likeId) => likeId.toString() !== user._id.toString(),
      );
    } else {
      comment.likes.push(user._id);
    }

    await comment.save();
    return { isLiked: !isLiked };
  }
}
