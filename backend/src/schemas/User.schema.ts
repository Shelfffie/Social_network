import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50,
  })
  username: string;

  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    match: /^[\w.]+@[a-z]+\.[a-z]{2,5}$/,
  })
  email: string;

  @Prop({
    required: true,
    match: /^(?=.*[а-яa-zA-Z])(?=.*\d).{8,}$/,
    minlength: 8,
    select: false,
  })
  password: string;

  @Prop()
  icon?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friends: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friendsRequest: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friendsRequestfromUsers: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comments' }] })
  comments: Types.ObjectId[];
}
