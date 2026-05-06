"use client";

import { AppButton } from "@/components/common/AppButton";

interface BookingNavigationProps {
  currentStep: number;
  handleBack: () => void;
  handleNext: () => void;
  isDisabledNext: boolean;
  isSubmitting?: boolean;
  hasParts?: boolean;
  totalSteps?: number;
}

export const BookingNavigation = ({
  currentStep,
  handleBack,
  handleNext,
  isDisabledNext,
  isSubmitting = false,
  hasParts = true,
}: BookingNavigationProps) => {
  const isSecondStep = hasParts ? currentStep === 2 : currentStep === 2;
  const isLastStep = hasParts ? currentStep === 3 : currentStep === 2;

  return (
    <div className="flex items-center justify-between gap-1 mt-8">
      <AppButton
        type="button"
        isDisabled={currentStep === 1 || isSubmitting}
        onClick={handleBack}
        className="w-fit bg-disabled text-paragraph"
      >
        السابق
      </AppButton>

      <AppButton
        type="button"
        isLoading={isSubmitting}
        isDisabled={isDisabledNext}
        onClick={handleNext}
        className="w-fit"
      >
        {isSecondStep ? "تأكيد الحجز" : isLastStep ? "إتمام الحجز" : "التالي"}
      </AppButton>
    </div>
  );
};