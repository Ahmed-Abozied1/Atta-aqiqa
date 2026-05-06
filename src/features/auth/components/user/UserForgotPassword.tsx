import {ForgotPasswordForm} from "../../forms/ForgotPasswordForm"

export const UserForgotPassword = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8 w-full">
      <div className="flex flex-col items-center">
        <h1 className="heading-5-bold md:heading-4-bold text-title mb-2 text-center">
          نسيت كلمة المرور؟
        </h1>
        <p className="text-regular-normal md:text-large-normal text-paragraph text-center">
          أدخل بريدك الإلكتروني المسجل وسنرسل لك رمز تحقق لإعادة تعيين كلمة المرور.
        </p>
      </div>
      <ForgotPasswordForm role="USER" />
    </div>
  );
};