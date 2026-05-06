import { authClient } from "@/lib/auth-client";

export class AuthService {
  static async signIn(email: string, password: string, rememberMe: boolean, callbackURL: string) {
    return await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL,
    });
  }

  static async signUp(email: string, password: string, name: string, phone: string) {
    return await authClient.signUp.email({
      email,
      password,
      name,
      phone,
    });
  }

  static async sendVerificationOtp(email: string) {
    return await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });
  }


  static async requestPasswordReset(email: string, redirectTo: string) {
    return await authClient.requestPasswordReset({
      email,
      redirectTo,
    });
  }

  static async resetPassword(newPassword: string, token: string) {
    return await authClient.resetPassword({
      newPassword,
      token,
    });
  }


  static async verifyEmail(email: string, otp: string) {
    return await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });
  }

}