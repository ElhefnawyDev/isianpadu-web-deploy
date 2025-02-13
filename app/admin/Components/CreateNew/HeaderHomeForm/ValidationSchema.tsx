import { z } from "zod";

export const createHeaderHomeSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Title is required").max(255),
  opacity: z.string().min(0, "opacity is 0 at least").max(100, "opacity is 100 maximum"),
});
