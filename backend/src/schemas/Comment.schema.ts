import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ required: true, trim: true, minlength: 1 })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  postId: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
