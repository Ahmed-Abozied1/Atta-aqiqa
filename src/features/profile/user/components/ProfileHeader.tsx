"use client";

import { useProfile } from "../hooks/useProfile";
import ProfileImageUpload from "./ProfileImageUpload";
import { useProfileStore } from "@/store/profileStore";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileHeaderProps {
  name: string;
}

export const ProfileHeader = ({ name }: ProfileHeaderProps) => {
  const { isImageUpdating, handleImageUpload, handleImageDelete } = useProfile();
  const { user, isLoading } = useProfileStore();

  const loading = isLoading || !user;

  return (
    <div className="flex flex-col items-center text-center">
      {loading ? (
        <Skeleton className="bg-card w-24 h-24 rounded-full mb-4 md:mb-6" />
      ) : (
        <ProfileImageUpload
          currentImage={user?.image || undefined}
          userName={user?.name || name}
          isImageUpdating={isImageUpdating}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
        />
      )}

      {loading ? (
        <Skeleton className="bg-card h-6 w-32 mb-4 md:mb-6" />
      ) : (
        <h2 className="heading-6-bold text-title mb-4 md:mb-6">
          {user?.name?.split(" ").slice(0, 2).join(" ") || name}
        </h2>
      )}
    </div>
  );
};