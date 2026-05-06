'use client';

import { AppButton } from "@/components/common/AppButton";
import { CircleCheckIcon } from "@/components/ui/icons/CircleCheckIcon";
import { useModalStore } from "@/store/useModalStore";

interface AuthSuccessProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onContinue?: () => void;
}

export const AuthSuccess = ({
  title,
  subtitle,
  buttonText,
  onContinue,
}: AuthSuccessProps) => {
  const { close } = useModalStore();

  const handleContinue = () => {
    close();
    onContinue?.();
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 p-4 md:p-8">
      <CircleCheckIcon />
      <div className="flex flex-col gap-2 text-center">
        <h1 className="heading-6-bold md:heading-4-bold text-title">{title}</h1>
        <p className="text-regular-normal md:text-large-normal text-paragraph">
          {subtitle}
        </p>
      </div>
      <AppButton
        onClick={handleContinue}
        className="w-full"
      >
        {buttonText}
      </AppButton>
    </div>
  );
};