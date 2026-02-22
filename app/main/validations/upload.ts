import { z } from "zod";

export const uploadFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .trim()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
});

export const createFileSchema = uploadFormSchema.extend({
  coverImageURL: z.string().url({ message: "Cover image must be a valid URL" }),
  fileURL: z.string().url({ message: "File URL must be a valid URL" }),
  fileName: z.string().min(1, { message: "File name cannot be empty" }),
  fileSize: z.number().positive({ message: "File size must be a positive number" }),
  clerkUserId: z.string().min(1, { message: "User ID is required" }),
});

export type UploadFileFormData = z.infer<typeof uploadFormSchema>;
export type CreateFileData = z.infer<typeof createFileSchema>;
