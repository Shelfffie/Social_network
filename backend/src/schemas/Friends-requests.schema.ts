import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class FriendRequests {
  @Prop({
    required: false,
    type: { type: Types.ObjectId, ref: 'User', required: true },
  })
  from: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  to: Types.ObjectId;
}

export const FriendsSchema = SchemaFactory.createForClass(FriendRequests);
