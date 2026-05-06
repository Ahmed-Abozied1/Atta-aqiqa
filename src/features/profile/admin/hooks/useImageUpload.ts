// components/features/profile/hooks/useImageUpload.ts
"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

export function useImageUpload(onUpload: (url: string) => Promise<void>) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("الملف يجب أن يكون صورة");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة يجب أن لا يتجاوز 5 ميجابايت");
        return;
      }

      setIsLoading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.result) {
            await onUpload(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("حدث خطأ أثناء معالجة الصورة");
      } finally {
        setIsLoading(false);
      }
    },
    [onUpload]
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    fileInputRef,
    isLoading,
    handleFileChange,
    triggerFileInput,
  };
}