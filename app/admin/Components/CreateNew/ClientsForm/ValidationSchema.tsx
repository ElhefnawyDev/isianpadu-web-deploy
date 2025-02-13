import { z } from "zod";

// Validation schema for creating and updating clients
export const createClientsSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Client name is required." })
    .max(20, { message: "Client name must be less than 20 characters." }),

  category: z
    .string()
    .min(1, { message: "Client category is required." })
    .max(50, { message: "Client category must be less than 50 characters." }),

  date: z.string().min(1, { message: "Date is required." }),

  projectNumber: z
    .string()
    .regex(/^\d+$/, { message: "Project number must be a valid number." }),

  projects: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Project title is required." }),
        date: z.string().min(1, { message: "Project date is required." }),
        description: z
          .string()
          .min(1, { message: "Project description is required." })
          .max(500, {
            message: "Project description must be less than 500 characters.",
          }),
      })
    )
    .min(1, { message: "At least one project is required." }),
});
