interface CommentType {
  _id: string;
  postId: string;
  parentId: string;
  content: string;
  creatorId: {
    _id: string;
    username: string;
    displayName?: string;
    iconURL?: string;
  };
  likesCount: number;
  isLiked: boolean;
  createdAt: string;
}
