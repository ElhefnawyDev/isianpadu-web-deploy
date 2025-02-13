import { z } from "zod";

export const createProgressBarSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  present: z.string().min(1, "Description is required"),
});
