// features/profile/services/profile.service.ts
import { authClient } from '@/lib/auth-client';

// features/profile/types/profile.types.ts
 interface AccountFormData {
  name: string;
  email: string;
  phone?: string;
  image?: string;
}



 interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type AdminPasswordFormData = PasswordFormData;
export const profileService = {
  async updateAccountInfo(data: AccountFormData, currentEmail?: string) {
    if (data.email !== currentEmail) {
      const { error } = await authClient.changeEmail({
        newEmail: data.email,
      });
      if (error) throw new Error(error.message);
    }

    const { error } = await authClient.updateUser({
      name: data.name,
      image: data.image,
    });
    if (error) throw new Error(error.message);
  },

  async updateProfileImage(imageUrl: string) {
    const { error } = await authClient.updateUser({
      image: imageUrl,
    });
    if (error) throw new Error(error.message);
  },

  async deleteProfileImage() {
    const { error } = await authClient.updateUser({
      image: null,
    });
    if (error) throw new Error(error.message);
  },

  async changePassword(data: PasswordFormData) {
    const { error } = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    if (error) throw new Error(error.message);
  },
};