import { z } from "zod";

export const createInProjectDescriptionSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  description: z.string().min(1, "Title is required").max(150),
  date: z.string().min(1, "Title is required"),
  ldescription: z.string().min(1, "Title is required"),
});
