import { Content } from "next/font/google";
import { z } from "zod";

export const createFooterGISchema = z.object({
  address: z.string().min(1, "address is required"),
  description: z.string().min(1, "address is required"),
  copyright: z.string().min(1, "address is required"),
  location: z.string().min(1, "location is required").max(150),
  email: z.string().min(1, "email is required").max(150),
  phone: z.string().min(1, "phone Number is required").max(150),
  workingHourse: z.string().min(1, "workingHourse is required").max(150),
});
