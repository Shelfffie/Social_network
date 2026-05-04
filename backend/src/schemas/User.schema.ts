import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
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
    trim: true,
    minLength: 2,
    maxLength: 50,
  })
  displayName?: string;

  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
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

  @Prop({ required: false })
  iconURL?: string;

  @Prop({ required: false, type: [{ type: Types.ObjectId, ref: 'User' }] })
  friends?: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
