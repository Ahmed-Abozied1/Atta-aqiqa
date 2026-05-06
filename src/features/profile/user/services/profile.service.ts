import { authClient } from "@/lib/auth-client";
import { AccountFormData, PasswordFormData } from "../types/profile.types";
type UpdateAccountPayload = {
  name: string;
  email: string;
  phone?: string;
};
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

  async updateAccountInfo(data: UpdateAccountPayload, currentEmail?: string) {
    const updateResult = await authClient.updateUser({
      name: data.name,
      ...(data.phone && { phone: data.phone }),
    });

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


  async changePassword(data: PasswordFormData) {
    const result = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    });
    if (result.error) throw new Error(result.error.message);
    return result;
  },
};