import { Content } from "next/font/google";
import { z } from "zod";

export const createHomeGISchema = z.object({
  title1: z
    .string()
    .min(1, "Title is required")
    .max(20, "Max characters are 20 only!"),
  title2: z
    .string()
    .min(1, "Short description is required")
    .max(40, "Max characters are 40 only!"),
  content: z
    .string()
    .min(1, "Description is required")
    .max(160, "Max characters are 160 only!"),
  height: z.string(),
  width: z.string(),
});
