import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, UserDocument } from 'src/utils/schema.types';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { getPagination } from 'src/utils/get-pagination';
import { Post } from 'src/schemas/Post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(createPostDto: CreatePostDto, user: UserDocument) {
    const newPost = new this.postModel({
      ...createPostDto,
      creatorId: user._id,
    });
    return await newPost.save();
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
    user: UserDocument,
  ) {
    const post = await this.postModel.findById(id);
    if (!post) throw new HttpException('Post not found', 404);
    if (post.creatorId.toString() !== user._id.toString())
      throw new HttpException('Forbidden', 403);

    return await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      returnDocument: 'after',
    });
  }

  async deletePost(id: string, user: UserDocument) {
    const post = await this.postModel.findById(id);
    if (!post) throw new HttpException('Post not found', 404);
    if (post.creatorId.toString() !== user._id.toString())
      throw new HttpException('Forbidden', 403);
    return await { message: 'Deleted succesfully!' };
  }

  async getPostById(id: string) {
    return await this.postModel
      .findById(id)
      .populate('creatorId', 'username')
      .exec();
  }

  async getPostsAndFilter(page: number, search: string) {
    const { skip, limit } = getPagination(page, 10);

    const filter = search ? { $text: { $search: search } } : {};
    const [posts, count] = await Promise.all([
      this.postModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('creatorId', 'username')
        .exec(),
      this.postModel.countDocuments(filter).exec(),
    ]);

    return { posts, count };
  }

  async getPostsByLikes(page: number, user: UserDocument) {
    const { skip, limit } = getPagination(page, 10);
    const filter = { likes: user._id };

    const [posts, count] = await Promise.all([
      this.postModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('creatorId', 'name')
        .exec(),
      this.postModel.countDocuments(filter).exec(),
    ]);

    return { posts, count };
  }

  async likeUnlike(id: string, user: UserDocument) {
    const post = await this.postModel.findById(id);
    if (!post) throw new HttpException('Post not found', 404);

    const isLiked = post.likes.some(
      (likeId) => likeId.toString() === user._id.toString(),
    );

    if (isLiked) {
      post.likes = post.likes.filter(
        (likeId) => likeId.toString() !== user._id.toString(),
      );
    } else {
      post.likes.push(user._id);
    }

    await post.save();
    return { isLiked: !isLiked };
  }
}
