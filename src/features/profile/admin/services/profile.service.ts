import { authClient } from "@/lib/auth-client";
import { AdminAccountFormData, AdminPasswordFormData } from "../types/profile.types";

export const profileService = {
  async updateProfileImage(url: string) {
    const result = await authClient.updateUser({ image: url });
    if (result.error) throw new Error(result.error.message);
    return result;
  },

  async deleteProfileImage() {
    const result = await authClient.updateUser({ image: null });
    if (result.error) throw new Error(result.error.message);
    return result;
  },

  async updateAccountInfo(data: AdminAccountFormData, currentEmail?: string) {
    const updateResult = await authClient.updateUser({ name: data.name });
    if (updateResult.error) throw new Error(updateResult.error.message);

    if (data.email !== currentEmail) {
      const emailResult = await authClient.changeEmail({
        newEmail: data.email,
        callbackURL: window.location.pathname,
      });
      if (emailResult.error) throw new Error(emailResult.error.message);
    }

    return updateResult;
  },

  async changePassword(data: AdminPasswordFormData) {
    const result = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    });
    if (result.error) throw new Error(result.error.message);
    return result;
  },
};