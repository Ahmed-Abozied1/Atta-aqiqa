"use client";

import { Camera, Trash2 } from "lucide-react";
import ProfileImageUpload from "./ProfileImageUpload";
import { useProfile } from "../hooks/useProfile";
import { useProfileStore } from "@/store/profileStore";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileHeader = () => {
  const { isImageUpdating, handleImageUpload, handleImageDelete } = useProfile();
  const { user, isLoading } = useProfileStore();

  const loading = isLoading || !user;

  return (
    <div className="bg-transparent md:bg-bg rounded-0 md:rounded-2xl mt-4 md:p-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
          {loading ? ( <Skeleton className="w-20 h-20 rounded-full bg-card" />):(
        <ProfileImageUpload
          currentImage={loading ? undefined : user.image ?? undefined}
          userName={loading ? "" : user.name}
          isImageUpdating={isImageUpdating}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
        />
        )}

        <div>
          {loading ? (
            <>
              <Skeleton className="h-6 bg-card w-40 mb-2" />
              <Skeleton className="h-4 bg-card w-24" />
            </>
          ) : (
            <>
              <h3 className="heading-6-bold md:heading-5-bold text-title mb-2">
                {user.name}
              </h3>
              <p className="text-regular-normal md:text-large-normal text-paragraph">
                {user.role === "ADMIN" ? "الأدمن" : ""}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="hidden md:flex gap-4">
        <button
          className="flex items-center justify-center gap-2 bg-primary text-medium-bold text-bg h-14 rounded-2xl px-6 whitespace-nowrap"
          onClick={() => {
            const uploadButton = document.querySelector(
              '[data-ut-element="button"]'
            ) as HTMLButtonElement;
            if (uploadButton) uploadButton.click();
          }}
        >
          <Camera className="size-6" />
          تعديل الصورة
        </button>

        <button
          onClick={handleImageDelete}
          className="flex items-center justify-center gap-2 bg-disabled text-medium-bold text-paragraph h-14 rounded-2xl px-6 whitespace-nowrap"
          disabled={isImageUpdating}
        >
          <Trash2 className="size-6" />
          حذف الصورة
        </button>
      </div>
    </div>
  );
};