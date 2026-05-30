export type PostType = {
  _id: string;
  content: string;
  imageURLs?: string[];
  commentsCount?: number;
  tags?: string[];
  likesCount: number;
  isLiked: boolean;
  creatorId: {
    _id: string;
    displayName?: string;
    username?: string;
    iconURL?: string;
  };
};

export interface FetchPostsProps {
  page: number;
  search?: string;
  userId?: string;
}

//zod .

/*const FilterSchema = z.object({
  page: z.coerce.number().default(1), // Zod сам поставить 1, якщо значення відсутнє
  search: z.string().optional(),
  userId: z.string().optional(),
});

type FetchPostsProps = z.infer<typeof FilterSchema>;*/
