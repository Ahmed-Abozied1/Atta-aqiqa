"use client";

import { cn } from "@/lib/utils";
import { CheckCircle } from "@/components/ui/icons/CheckCircle";

interface Step {
    id: number;
    label: string;
}

interface BookingStepperProps {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    steps: Step[];
    hasParts?: boolean;
}

export function BookingStepper({ currentStep, setCurrentStep, steps, hasParts = true }: BookingStepperProps) {
    const totalSteps = steps.length;
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    
    return (
        <div className="mx-auto mt-4 w-full sm:w-85.75 md:w-150 min-h-17.5 md:min-h-18.5 pl-4">
            <div className="relative flex items-center justify-between w-full">
                <div className="absolute top-5 right-0 w-full h-px border-t border-solid border-gray-200 -z-10" />
                <div
                    className="absolute top-5 right-0 h-px bg-primary transition-all duration-500 -z-10"
                    style={{ width: `${progressPercentage}%` }}
                />

               {steps.map((step) => {
    const isCompleted = currentStep > step.id;
    const isActive = currentStep === step.id;

    return (
        <div key={step.id} className="flex flex-col items-center relative z-10">
            
            {/* NO CLICK ANYMORE */}
            <div className="mb-2 cursor-default">
                {isCompleted ? (
                    <div className="bg-white rounded-full">
                        <CheckCircle />
                    </div>
                ) : (
                    <div
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white border border-solid",
                            isActive
                                ? "border-secondary text-secondary"
                                : "border-border bg-border text-paragraph"
                        )}
                    >
                        <span className="text-regular-medium">{step.id}</span>
                    </div>
                )}
            </div>

            <span
                className={cn(
                    "absolute top-12 whitespace-nowrap transition-colors duration-300 text-small-medium md:text-medium-medium!",
                    isActive
                        ? "text-secondary"
                        : isCompleted
                        ? "text-primary"
                        : "text-paragraph"
                )}
            >
                {step.label}
            </span>
        </div>
    );
})}
            </div>
        </div>
    );
}