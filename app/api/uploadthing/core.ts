import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    fileUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
        video: {
            maxFileSize: "16MB",
            maxFileCount: 1,
        },
        audio: {
            maxFileSize: "8MB",
            maxFileCount: 1,
        },
        "application/zip": {
            maxFileSize: "64MB",
            maxFileCount: 1,
        },
        pdf: {
            maxFileSize: "8MB",
            maxFileCount: 1,
        },
        text: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
        blob: {
            maxFileSize: "16MB",
            maxFileCount: 1,
        },
    })
        .middleware(async ({ req }) => {
            return { userId: "userId" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return {
                uploadedBy: metadata.userId,
                fileUrl: file.ufsUrl,
                fileName: file.name,
                fileSize: file.size,
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
