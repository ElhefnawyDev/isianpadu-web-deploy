import { z } from "zod";

export const createCoreValueSchema = z.object({
  title: z.string().min(1, "Title is required").max(20),
  present: z.string().min(1, "Description is required"),
});
