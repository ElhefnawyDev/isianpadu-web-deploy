import { Content } from "next/font/google";
import { z } from "zod";

export const createFontSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
});
