import { z } from "zod";

export const createServicesSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  hsDescription: z.string().min(1, "Title is required").max(260),
  description: z.string().min(1, "Title is required"),
  lDescription: z.string().min(1, "Title is required"),
});
