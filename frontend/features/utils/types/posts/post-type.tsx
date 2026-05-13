export type PostType = {
  _id: string;
  content?: string;
  images?: string[];
  likes?: string[];
  commentsCount?: number;
  tags?: string[];
  creatorId?: {
    _id?: string;
    displayName?: string;
    username?: string;
    iconURL?: string;
  };
};
