import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please provide a valid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(72, "Password must be 72 characters or less");

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
