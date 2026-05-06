export const authErrorMessages = {
  USER_NOT_FOUND: "لم يتم العثور على المستخدم",
  INVALID_EMAIL_OR_PASSWORD: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  INVALID_PASSWORD: "كلمة المرور غير صحيحة",
  EMAIL_NOT_VERIFIED: "البريد الإلكتروني غير مفعل",
  PASSWORD_TOO_SHORT: "كلمة المرور قصيرة جداً",
  WEAK_PASSWORD: "كلمة المرور ضعيفة جداً",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "هذا البريد الإلكتروني مسجل بالفعل، جرب تسجيل الدخول",
  INVALID_EMAIL: "البريد الإلكتروني غير صالح",
  SESSION_EXPIRED: "انتهت صلاحية الجلسة",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "لم يتم العثور على الحساب",
  INVALID_TOKEN: "الرمز غير صالح",
  EXPIRED_OTP: "انتهت صلاحية رمز التحقق",
  INVALID_OTP: "رمز التحقق غير صحيح",
  EMAIL_ALREADY_VERIFIED: "البريد الإلكتروني مفعل بالفعل",
  VERIFICATION_TOKEN_EXPIRED: "انتهت صلاحية رمز التفعيل",
  RATE_LIMIT_EXCEEDED: "تم تجاوز الحد المسموح به، حاول مرة أخرى لاحقاً",
  ACCOUNT_LOCKED: "الحساب مقفل، يرجى الاتصال بالدعم",
  MISSING_PASSWORD: "كلمة المرور مطلوبة",
  MISSING_EMAIL: "البريد الإلكتروني مطلوب",
  INVALID_CURRENT_PASSWORD: "كلمة المرور الحالية غير صحيحة",
  SAME_PASSWORD: "كلمة المرور الجديدة يجب أن تكون مختلفة عن القديمة",
  INVALID_OR_EXPIRED_TOKEN: "الرمز غير صالح أو منتهي الصلاحية",
  USER_BANNED: "تم حظر هذا المستخدم",
  INVALID_PROVIDER: "مزود الخدمة غير صالح",
  SOCIAL_ACCOUNT_NOT_LINKED: "الحساب الاجتماعي غير مرتبط",
  EMAIL_CHANGE_NOT_ALLOWED: "تغيير البريد الإلكتروني غير مسموح",
  TOO_MANY_REQUESTS: "عدد كبير جداً من المحاولات، يرجى المحاولة لاحقاً",
  INVALID_CREDENTIALS: "بيانات الدخول غير صحيحة",
  ACCOUNT_NOT_VERIFIED: "الحساب غير مفعل",
  VERIFICATION_FAILED: "فشل التحقق",
  EMAIL_SEND_FAILED: "فشل إرسال البريد الإلكتروني",
  DATABASE_ERROR: "خطأ في قاعدة البيانات، يرجى المحاولة لاحقاً",
  INTERNAL_SERVER_ERROR: "حدث خطأ داخلي في الخادم",
} as const;

type AuthErrorCode = keyof typeof authErrorMessages;

export const getAuthErrorMessage = (code?: string) => {
  if (!code) return "حدث خطأ غير متوقع";

  if (code in authErrorMessages) {
    return authErrorMessages[code as AuthErrorCode];
  }

  return "حدث خطأ غير متوقع";
};