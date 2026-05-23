import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const EditProfileSchema = z
  .object({
    icon: z
      .any()
      .refine(
        (file) => !file || file?.size <= MAX_FILE_SIZE,
        "Max image size is 5MB."
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
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
