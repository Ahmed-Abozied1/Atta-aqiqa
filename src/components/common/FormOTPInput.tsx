'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface FormOTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormOTPInput = ({
  value,
  onChange,
  length = 4,
  autoFocus = true,
  disabled = false,
  className,
}: FormOTPInputProps) => {
  return (
    <div dir="ltr">
      <InputOTP
        maxLength={length}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        disabled={disabled}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup className={`gap-2.5 ${className}`}>
          {Array.from({ length }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="w-14 h-14 px-4 py-3.25 border border-border rounded-lg! bg-white focus:border-primary outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 text-medium-medium! text-title"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};