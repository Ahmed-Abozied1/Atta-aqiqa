"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppButtonProps extends React.ComponentProps<typeof Button> {
  isDisabled?: boolean;
  isLoading?: boolean;
  appVariant?: "primary" | "secondary";
  asChild?: boolean;
}

export const AppButton = ({
  children,
  className,
  isDisabled,
  isLoading,
  appVariant = "primary",
  asChild = false,
  ...props
}: AppButtonProps) => {
  const variantStyles = {
    primary: "bg-primary hover:bg-primary/70! active:scale-[0.98] active:bg-primary/90! transition-all",
    secondary: "bg-secondary  hover:bg-secondary/70! active:scale-[0.98] active:bg-secondary/90! transition-all",
  };

  return (
    <Button
      asChild={asChild}
      disabled={isDisabled || isLoading}
      variant={appVariant === "primary" ? "default" : "secondary"}
      className={cn(
        "rounded-xl md:rounded-2xl h-12 md:h-14 px-4 md:px-6 py-3 md:py-3.5",
        "text-small-bold text-bg sm:text-regular-bold md:text-medium-bold",
        "transition-all duration-200 cursor-pointer",
        variantStyles[appVariant],
        className
      )}
      {...props}
    >
     <span className="flex items-center gap-2">
  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
  {children}
</span>
    </Button>
  );
};