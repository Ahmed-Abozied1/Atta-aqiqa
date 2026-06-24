import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { sendEmail } from "./email";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  trustedOrigins: [
    process.env.BETTER_AUTH_URL!,
    "https://www.ataa-aqiqa.com",
    "https://ataa-aqiqa.com",
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "إعادة تعيين كلمة المرور",
        text: `انقر على الرابط لإعادة تعيين كلمة المرور الخاصة بك: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  user: {
    changeEmail: {
      enabled: true,
    },
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        input: false,
      },
      image: {
        type: "string",
        required: false,
        input: true, 
      },
    },
  },
  plugins: [
    emailOTP({
      otpLength: 4,
      expiresIn: 300,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        const subject = type === "email-verification" 
          ? "رمز التحقق من حسابك في عطاء" 
          : "رمز تسجيل الدخول إلى عطاء";
        
        const message = type === "email-verification"
          ? `رمز التحقق الخاص بحسابك هو: ${otp}`
          : `رمز تسجيل الدخول الخاص بك هو: ${otp}`;
        
        await sendEmail({
          to: email,
          subject: subject,
          text: message,
        });
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;