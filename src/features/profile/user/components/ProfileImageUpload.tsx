"use client";

import { ImageUpload } from "@/components/common/ImageUpload";
import { getInitials } from "@/lib/getInitials";

interface ProfileImageUploadProps {
  currentImage?: string;
  userName: string;
  isImageUpdating: boolean;
  onImageUpload: (url: string) => Promise<void>;
  onImageDelete: () => Promise<void>;
}

const ProfileImageUpload = ({
  currentImage,
  userName,
  isImageUpdating,
  onImageUpload,
  onImageDelete,
}: ProfileImageUploadProps) => {
  const userInitial = getInitials(userName);

  return (
    <ImageUpload
      currentImage={currentImage}
      onImageUpload={onImageUpload}
      onImageDelete={onImageDelete}
      userInitial={userInitial}
      isLoading={isImageUpdating}
    />
  );
};

export default ProfileImageUpload;