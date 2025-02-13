import { Content } from "next/font/google";
import { z } from "zod";

export const createHomeGISchema = z.object({
  title1: z.string().min(1, "Title is required").max(60),
  title2: z.string().min(1, "Short description is required").max(150),
  content: z.string().min(1, "Description is required"),
  height: z.string(),
  width: z.string(),
});
