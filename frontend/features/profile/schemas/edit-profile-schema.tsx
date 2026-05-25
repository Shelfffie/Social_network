import { imageValidator } from "@/features/common/schemas/image-val-schema";
import * as z from "zod";

export const EditProfileSchema = z
  .object({
    icon: imageValidator,
    displayName: z
      .string()
      .min(2, "Name must be at least 2 charachers long")
      .max(50, "Name  must be shorter than 50 characters"),
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characher long")
      .max(50, "Username  must be shorter than 50 characters")
      .transform((val) => val.toLowerCase().replace(/^@/, "")),
    bio: z.string().max(200, "Bio must be shorter than 200 characters"),
  })
  .partial();
