import { Content } from "next/font/google";
import { z } from "zod";

export const createexperiencesGISchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  description: z.string().min(1, "Short description is required"),
});
