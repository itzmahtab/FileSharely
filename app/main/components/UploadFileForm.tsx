"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadFiles } from "@/utils/uploadthing";
import { UploadFileFormData, uploadFormSchema } from "../validations/upload";
import { createFile } from "@/app/server/actions/file.actions";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

type UploadedFileData = {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedBy: string;
};

export default function UploadFileForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<UploadedFileData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFileData | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  
  const coverInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const res = await uploadFiles("fileUploader", { files: [file] });
      if (res && res[0]) {
        setCoverImage({
          fileUrl: res[0].url,
          fileName: res[0].name,
          fileSize: res[0].size,
          uploadedBy: "",
        });
        toast.success("Cover image uploaded!");
      }
    } catch {
      toast.error("Failed to upload cover image");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFile(true);
    try {
      const res = await uploadFiles("fileUploader", { files: [file] });
      if (res && res[0]) {
        setUploadedFile({
          fileUrl: res[0].url,
          fileName: res[0].name,
          fileSize: res[0].size,
          uploadedBy: "",
        });
        toast.success("File uploaded!");
      }
    } catch {
      toast.error("Failed to upload file");
    } finally {
      setIsUploadingFile(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFileFormData>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: UploadFileFormData) => {
    if (!coverImage) {
      toast.error("Please upload a cover image");
      return;
    }

    if (!uploadedFile) {
      toast.error("Please upload a file");
      return;
    }

    if (!user) {
      toast.error("Please sign in to upload files");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createFile({
        title: data.title,
        description: data.description,
        coverImageURL: coverImage.fileUrl,
        fileURL: uploadedFile.fileUrl,
        fileName: uploadedFile.fileName,
        fileSize: uploadedFile.fileSize,
        clerkUserId: user.id,
      });

      if (result.success) {
        toast.success("File uploaded successfully!");
        router.push("/main/files");
      } else {
        toast.error(result.error || "Failed to upload file");
        setIsSubmitting(false);
      }
    } catch {
      toast.error("Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Enter file title"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
          placeholder="Enter file description (minimum 50 characters)"
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover Image</label>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="hidden"
        />
        {coverImage ? (
          <div className="flex items-center gap-2 p-3 border rounded-md">
            <img
              src={coverImage.fileUrl}
              alt="Cover"
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{coverImage.fileName}</p>
              <p className="text-xs text-muted-foreground">
                {(coverImage.fileSize / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() => setCoverImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={() => coverInputRef.current?.click()}
            disabled={isUploadingCover}
          >
            <Upload className="h-4 w-4" />
            {isUploadingCover ? "Uploading..." : "Choose Cover Image"}
          </Button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">File</label>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        {uploadedFile ? (
          <div className="flex items-center gap-2 p-3 border rounded-md">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{uploadedFile.fileName}</p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.fileSize / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() => setUploadedFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingFile}
          >
            <Upload className="h-4 w-4" />
            {isUploadingFile ? "Uploading..." : "Choose File"}
          </Button>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
}
