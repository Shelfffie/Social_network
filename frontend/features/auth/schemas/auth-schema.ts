import * as z from "zod";

export const SignUpSchema = z
  .object({
    email: z.email("Invalid email adress").toLowerCase(),

    username: z
      .string()
      .min(3, "Username must be at least 3 characher long")
      .toLowerCase()
      .transform((val) => val.replace(/^@/, "")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(30, "Password must not exceed 30 characters")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  loginIdentifier: z
    .string()
    .min(3, "Must be at least 3 characher long")
    .toLowerCase()
    .pipe(
      z.union([
        z.email("Email is required"),
        z.string().min(3, "Username must be at least 3 characters long"),
      ])
    )
    .transform((val) => val.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
