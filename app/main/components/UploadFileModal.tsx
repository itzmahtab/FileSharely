"use client";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadFileForm from "./UploadFileForm";

export default function UploadFileModal({ className }: { className?: string }) {
  return (
    <section className={`min-h-screen w-full py-24 px-4 ${className}`}>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Upload Your Files
        </h1>
        <p className="text-muted-foreground text-lg">
          Share your files instantly using a public link
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg mt-4">
              <Upload className="h-5 w-5" />
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription>
                Upload a file to share it with others using a public link.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <UploadFileForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
