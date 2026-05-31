import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostDocument, UserDocument } from 'src/utils/schema.types';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { getPagination } from 'src/utils/get-pagination';
import { Post } from 'src/schemas/Post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(
    createPostDto: CreatePostDto,
    user: UserDocument,
    photos?: Express.Multer.File[],
  ) {
    const imageURLs = photos
      ? photos.map((file) => `uploads/posts/photos/${file.filename}`)
      : [];

    const newPost = new this.postModel({
      ...createPostDto,
      creatorId: user._id,
      imageURLs: imageURLs,
    });
    const savedPost = await newPost.save();
    return await savedPost.populate(
      'creatorId',
      'displayName username iconURL',
    );
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

  async getPostById(id: string, user: UserDocument) {
    const post = await this.postModel
      .findById(id)
      .populate('creatorId', 'username iconURL')
      .exec();

    if (!post) throw new HttpException('Not found', 404);

    const postObj = post.toObject();

    return {
      ...postObj,
      likesCount: postObj.likes?.length || 0,
      isLiked: user
        ? postObj.likes?.some((id) => id.toString() === user._id.toString())
        : false,
      likes: undefined,
    };
  }

  async getPostsAndFilter(
    page: number,
    search: string,
    user?: UserDocument,
    byUser?: string,
  ) {
    const { skip, limit } = getPagination(page, 10);
    const filter: any = {};

    if (search) {
      filter.$text = { $search: search };
    }
    if (byUser) {
      filter.creatorId = new Types.ObjectId(byUser);
    }

    const [posts, count] = await Promise.all([
      this.postModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('creatorId', '_id displayName username iconURL')
        .exec(),
      this.postModel.countDocuments(filter).exec(),
    ]);

    //поміняти потім на інший метод
    const mappedPosts = posts.map((post) => {
      const postObj = post.toObject();

      return {
        ...postObj,
        likesCount: postObj.likes?.length || 0,
        isLiked: user
          ? postObj.likes?.some((id) => {
              return id.toString() === user._id.toString();
            })
          : false,
        likes: undefined,
      };
    });

    return { posts: mappedPosts, count };
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
