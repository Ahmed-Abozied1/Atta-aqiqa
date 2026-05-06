// components/common/ImageUpload.tsx
"use client";

import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, file?: File) => void;
  label?: string;
  existingImageUrl?: string;
}

export function ImageUpload({ value, onChange, label, existingImageUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || existingImageUrl || "");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange(previewUrl, file);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && <Label className="text-medium-medium! text-title">{label}</Label>}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 transition-colors hover:border-primary cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          preview ? "border-solid" : ""
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { 
          e.preventDefault(); 
          setIsDragging(false); 
          const file = e.dataTransfer.files[0]; 
          if (file && file.type.startsWith("image/")) handleFileChange(file); 
        }}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label={label || "رفع صورة المنتج"}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={(e) => { 
            const file = e.target.files?.[0]; 
            if (file) handleFileChange(file); 
          }}
          aria-label={label || "اختر ملف الصورة"}
        />
        {preview ? (
          <div className="relative">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image src={preview} alt="معاينة المنتج" fill className="object-cover" />
            </div>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); handleRemove(); }} 
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              aria-label="إزالة الصورة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Upload className="w-10 h-10 text-muted-foreground mb-3" aria-hidden="true" />
            <p className="text-sm text-muted-foreground mb-1">اسحب وأفلت الصورة هنا أو اضغط للاختيار</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF حتى 5MB</p>
          </div>
        )}
      </div>
    </div>
  );
}