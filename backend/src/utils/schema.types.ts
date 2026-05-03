import { HydratedDocument } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { User } from 'src/schemas/User.schema';

export type UserDocument = HydratedDocument<User>;

export type PostDocument = HydratedDocument<Post>;
