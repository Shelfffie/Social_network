import { Types } from 'mongoose';

export type FriendsFilterType = {
  to?: Types.ObjectId;
  from?: Types.ObjectId;
};
