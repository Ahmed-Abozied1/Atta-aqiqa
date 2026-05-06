"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "../schemas/product.schema";
import { useModalStore } from "@/store/useModalStore";
import { AppButton } from "@/components/common/AppButton";
import { FormInput } from "@/components/common/FormInput";
import { FormTextarea } from "@/components/common/FormTextarea";
import { FormSelect } from "@/components/common/FormSelect";
import { UploadDropzone } from "@/lib/uploadthing";
import { IntentMultiSelect } from "./IntentMultiSelect";
import type { Resolver } from "react-hook-form";

type AddModalData = {
  onSuccess?: () => void;
} | undefined;

export function AddProductModal({ data }: { data?: AddModalData }) {
  const { close } = useModalStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);

  const resolver = zodResolver(productSchema) as unknown as Resolver<ProductFormData>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      beneficiaries: "",
      location: "INSIDE_EGYPT",
      intents: [],
      imageUrl: "",
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    try {
      setIsSubmitting(true);

      if (!imageUrl) {
        console.error("No image uploaded");
        return;
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          location: formData.location,
          beneficiaries: formData.beneficiaries,
          intents: selectedIntents,
          imageUrl: imageUrl,
        }),
      });

      if (response.ok) {
        data?.onSuccess?.();
        reset();
        setImageUrl("");
        setSelectedIntents([]);
        close();
      } else {
        const error = await response.json();
        console.error("Server error:", error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        name="name"
        label="الاسم"
        register={register}
        error={errors.name}
        placeholder="أدخل اسم المنتج"
      />

      <FormTextarea
        name="description"
        label="الوصف"
        register={register}
        error={errors.description}
        placeholder="أدخل وصف المنتج"
        rows={4}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="price"
          label="السعر"
          type="number"
          register={register}
          error={errors.price}
          placeholder="أدخل السعر"
        />

        <FormInput
          name="beneficiaries"
          label="المستفيدين"
          register={register}
          error={errors.beneficiaries}
          placeholder="أدخل المستفيدين"
        />
      </div>

      <FormSelect
        name="location"
        label="الموقع"
        register={register}
        error={errors.location}
        options={[
          { value: "INSIDE_EGYPT", label: "داخل مصر" },
          { value: "OUTSIDE_EGYPT", label: "خارج مصر" },
        ]}
      />

      <IntentMultiSelect
        value={selectedIntents}
        onChange={(intents) => {
          setSelectedIntents(intents);
          setValue("intents", intents);
        }}
        error={errors.intents}
        label="النية"
      />

      <div className="space-y-2">
        <label className="text-medium-medium! text-title">صورة المنتج</label>
        
        <div className="flex gap-4 items-start">
          {imageUrl && (
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-border">
                <img 
                  src={imageUrl} 
                  alt="Product preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setImageUrl("");
                  setValue("imageUrl", "");
                }}
                className="text-red-500 text-xs hover:text-red-600 mt-1 block"
              >
                إزالة
              </button>
            </div>
          )}

          <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition-colors flex-1">
            <UploadDropzone
              endpoint="productImage"
              onClientUploadComplete={(res) => {
                if (res?.[0]?.url) {
                  setImageUrl(res[0].url);
                  setValue("imageUrl", res[0].url);
                }
              }}
              onUploadError={(error) => {
                console.error("Upload error:", error);
              }}
              appearance={{
                container: "border-0 p-0",
                button: "bg-primary text-white rounded-lg px-4 py-2 text-sm",
                label: "text-paragraph text-sm",
                allowedContent: "text-paragraph text-xs",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <AppButton type="button" appVariant="secondary" onClick={() => { reset(); setImageUrl(""); setSelectedIntents([]); close(); }}>
          إلغاء
        </AppButton>

        <AppButton type="submit" isLoading={isSubmitting || uploading}>
          {uploading ? "جاري الرفع..." : "إضافة منتج"}
        </AppButton>
      </div>
    </form>
  );
}