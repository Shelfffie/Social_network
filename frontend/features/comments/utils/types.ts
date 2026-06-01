export interface CommentType {
  _id: string;
  postId: string;
  parentId: string | null;
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

export type CommentWithReplies = CommentType & {
  replies: CommentWithReplies[];
};
