import { HydratedDocument } from 'mongoose';
import { Comment } from 'src/schemas/Comment.schema';
import { Friends } from 'src/schemas/Friends-requests.schema';
import { Post } from 'src/schemas/Post.schema';
import { User } from 'src/schemas/User.schema';

export type UserDocument = HydratedDocument<User>;

export type PostDocument = HydratedDocument<Post>;

export type CommentDocument = HydratedDocument<Comment>;

export type FriendsDocument = HydratedDocument<Friends>;
