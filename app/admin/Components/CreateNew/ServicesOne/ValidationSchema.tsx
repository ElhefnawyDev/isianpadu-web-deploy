import { z } from "zod";

export const createServicesOneSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  description: z.string().min(1, "description is required"),
});
