export type PostType = {
  _id: string;
  content?: string;
  images?: string[];
  commentsCount?: number;
  tags?: string[];
  likesCount: number;
  isLiked: boolean;
  creatorId?: {
    _id?: string;
    displayName?: string;
    username?: string;
    iconURL?: string;
  };
};
