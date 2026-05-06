"use client";

import { useState, useEffect, useRef } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { AppButton } from "@/components/common/AppButton";
import { useVerification } from "../hooks/useVerification";
import { useResendOTP } from "../hooks/useResendOTP";


interface VerificationFormProps {
  email?: string;
  onSuccess?: () => void;
}

const OTP_LENGTH = 4;
const INITIAL_TIMER = 60;

export const VerificationForm = ({ email, onSuccess }: VerificationFormProps) => {
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [otpValue, setOtpValue] = useState("");
  const { verifyOTP, isLoading, error, setError } = useVerification();
  const { resendOTP, isResending } = useResendOTP();
  
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      if (otpRef.current) {
        otpRef.current.focus();
      }
    }, 150);

    return () => clearTimeout(focusTimeout);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== OTP_LENGTH || isLoading) return;

    const success = await verifyOTP(otpValue, email);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleResend = async () => {
    setTimer(INITIAL_TIMER);
    setOtpValue("");
    setError(null);
    await resendOTP(email);
    setTimeout(() => otpRef.current?.focus(), 50);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 md:space-y-8 flex flex-col items-center">
      <div dir="ltr">
        <InputOTP
          ref={otpRef}
          maxLength={OTP_LENGTH}
          value={otpValue}
          onChange={(value) => setOtpValue(value)}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup className="gap-2.5">
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center animate-in fade-in duration-300">
          {error}
        </p>
      )}

      {timer > 0 ? (
        <div className="bg-[#ECEDEE] px-6 py-2.75 h-10 md:h-12 rounded-full text-loading text-regular-bold md:text-medium-bold flex items-center gap-1 cursor-not-allowed">
          <span>إعادة إرسال الرمز خلال:</span>
          <span>{formatTime(timer)}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="bg-[#ECEDEE] px-6 py-2.75 h-10 md:h-12 rounded-full text-loading text-regular-bold md:text-medium-bold flex items-center cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {isResending ? "جاري الإرسال..." : "إعادة إرسال الرمز"}
        </button>
      )}

      <AppButton 
        type="submit" 
        isDisabled={otpValue.length !== OTP_LENGTH} 
        isLoading={isLoading}
      >
        تحقق
      </AppButton>
    </form>
  );
};