import { z } from "zod";

export const createCompanyBgSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Max Characters us is 500 only!"),
});
