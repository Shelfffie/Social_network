import { imageValidator } from "@/features/common/schemas/image-val-schema";
import * as z from "zod";

const HASHTAG_REGEX = /#[\p{L}0-9_]+/gu;

interface TransformedContent {
  content: string;
  tags: string[];
}

export const PostSchema = z.object({
  content: z.string().transform((val): TransformedContent => {
    const tags = val.match(HASHTAG_REGEX) || [];
    const contentWithoutTags = val.replace(HASHTAG_REGEX, "").trim();

    return {
      content: contentWithoutTags,
      tags: tags,
    };
  }),
  photos: z.array(imageValidator).optional(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
