import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, trim: true, minlength: 3, maxlength: 10000 })
  content: string;

  @Prop({ required: false })
  images?: [{ type: String }];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  creatorId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];
}
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ content: 'text', likes: -1, createdAt: -1 });
