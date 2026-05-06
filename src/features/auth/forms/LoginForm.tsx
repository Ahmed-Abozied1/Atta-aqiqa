"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/common/FormInput";
import { FormPasswordInput } from "@/components/common/FormPasswordInput";
import { FormCheckbox } from "@/components/common/FormCheckbox";
import { AppButton } from "@/components/common/AppButton";
import { loginSchema, LoginFormData } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { ResendVerificationButton } from "../components/ResendVerificationButton";
import { LoginFormProps } from "../types";

const LoginForm = ({ role }: LoginFormProps) => {
  const {
    handleLogin,
    emailForVerification,
    setView,
    router
  } = useLogin(role);

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } =
    useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "", rememberMe: true },
      mode: "onChange",
    });

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 w-full">
      {emailForVerification && (
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
          <p className="text-small-medium text-orange-700 mb-2 text-right">
            حسابك غير مفعل بعد، يرجى تفعيل الحساب للمتابعة
          </p>
          <ResendVerificationButton email={emailForVerification} />
        </div>
      )}

      <FormInput
        name="email"
        label="البريد الإلكتروني"
        type="email"
        register={register}
        error={errors.email}
        placeholder="أدخل البريد الإلكتروني"
      />

      <FormPasswordInput
        name="password"
        label="كلمة المرور"
        register={register}
        error={errors.password}
        placeholder="أدخل كلمة المرور"
      />

      <div className="flex items-center justify-between">
        <FormCheckbox name="rememberMe" label="تذكرني" register={register} />

        <button
          type="button"
          onClick={() => {
            if (role === 'ADMIN') router.push("/admin/forgot-password");
            else if (role === 'USER') setView('FORGOT_PASSWORD');
          }}
          className="text-small-link md:text-regular-link text-secondary no-underline hover:underline cursor-pointer"
        >
          نسيت كلمة المرور؟
        </button>
      </div>

      <AppButton type="submit" isLoading={isSubmitting} isDisabled={!isDirty}>
        تسجيل الدخول
      </AppButton>

      {role === 'USER' && (
        <p className="text-small-medium md:text-regular-medium text-title text-center">
          ليس لديك حساب؟{' '}
          <button
            type="button"
            onClick={() => setView('REGISTER')}
            className="text-secondary text-regular-link mr-2 hover:underline cursor-pointer"
          >
            أنشئ حساباً جديداً
          </button>
        </p>
      )}
    </form>
  );
};

export default LoginForm;