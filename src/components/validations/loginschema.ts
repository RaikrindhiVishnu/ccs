import { z } from "zod";

export const loginSchema = z.object({
  login_id: z
    .string()
    .min(1, "Login ID is required")
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;