'use server';

import prisma from '@/lib/prisma';
import { getUser } from './user.actions';
import { createFileSchema, type CreateFileData } from '@/app/main/validations/upload';

export async function createFile(data: CreateFileData) {
  try {
    const validatedData = createFileSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0].message,
      };
    }

    const dbUser = await getUser(validatedData.data.clerkUserId);

    if (!dbUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const file = await prisma.file.create({
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        coverImageURL: validatedData.data.coverImageURL,
        fileURL: validatedData.data.fileURL,
        userId: dbUser.id,
      },
    });

    return {
      success: true,
      file,
    };
  } catch (error) {
    console.error("Error in createFile:", error);
    return {
      success: false,
      error: `Failed to create file: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
