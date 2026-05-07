import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, trim: true, minlength: 3, maxlength: 10000 })
  content: string;

  @Prop([String])
  images?: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  creatorId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], index: true })
  likes: Types.ObjectId[];

  @Prop({ type: [String], index: true })
  tags: string[];
}
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ content: 'text' });
PostSchema.index({ createdAt: -1 });
