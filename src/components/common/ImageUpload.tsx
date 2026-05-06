"use client";

import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadProps {
  currentImage?: string | null;
  onImageUpload: (url: string) => Promise<void>;
  onImageDelete: () => Promise<void>;
  userInitial: string;
  isLoading: boolean;
}

export const ImageUpload = ({
  currentImage,
  onImageUpload,
  onImageDelete,
  userInitial,
  isLoading,
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadComplete = async (res: any) => {
    const url = res?.[0]?.url;
    if (url) {
      await onImageUpload(url);
      setUploadProgress(0);
    } else {
      toast.error("فشل في الحصول على رابط الصورة");
    }
    setIsUploading(false);
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    toast.error(error.message || "حدث خطأ أثناء رفع الصورة");
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleUploadBegin = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
  };

  const isProcessing = isLoading || isUploading;

  return (
    <div className="relative group">
      {currentImage ? (
        <div className="relative h-28 md:w-20 w-28 md:h-20 rounded-full overflow-hidden">
          <Image
            src={currentImage}
            alt="Profile"
            width={112}
            height={112}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: isProcessing ? 0.5 : 1 }}
          />
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="size-6 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-28 md:w-20 w-28 md:h-20">
          <div 
            className="w-full h-full bg-secondary text-bg rounded-full flex items-center justify-center heading-3-bold transition-opacity duration-300"
            style={{ opacity: isProcessing ? 0.5 : 1 }}
          >
            {userInitial}
          </div>
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <Loader2 className="size-6 text-white animate-spin" />
            </div>
          )}
        </div>
      )}

      {!isProcessing && (
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <UploadButton
            endpoint="profileImageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            onUploadBegin={handleUploadBegin}
            appearance={{
              button: "bg-primary text-white p-2 rounded-full hover:bg-primary/90 w-auto h-auto transition-all duration-200",
              container: "m-0",
            }}
            content={{
              button: <Camera className="size-4" />,
            }}
          />
        </div>
      )}

      {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <div className="inline-block bg-black/80 text-white text-xs rounded-full px-2 py-1">
            جاري الرفع... {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};