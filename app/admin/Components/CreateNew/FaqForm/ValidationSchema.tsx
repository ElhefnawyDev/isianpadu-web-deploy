import { z } from "zod";

export const createFaqSchema = z.object({
  question: z.string().min(1, "Title is required"),
  answer: z.string().min(1, "Description is required"),
});
