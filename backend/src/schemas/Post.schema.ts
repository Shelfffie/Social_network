import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Types } from 'mongoose';

function TagsValidator(val: string[]) {
  return val.length <= 5;
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, trim: true, minlength: 1, maxlength: 10000 })
  content: string;

  @Prop([String])
  imageURLs?: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  creatorId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], index: true })
  likes: Types.ObjectId[];

  @Prop({ default: 0 })
  commentsCount: number;

  @Prop({
    type: [String],
    set: (tags: string[]) => {
      if (!tags) return;
      return tags.reduce((acc, tag) => {
        const trimmed = tag.trim().toLowerCase();
        if (trimmed)
          acc.push(trimmed.startsWith('#') ? trimmed : `#${trimmed}`);
        return acc;
      }, [] as string[]);
    },
    validate: {
      validator: TagsValidator,
      message: 'Maximum tags is 5',
    },
  })
  tags: string[];
}
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ content: 'text' });
PostSchema.index({ createdAt: -1 });
