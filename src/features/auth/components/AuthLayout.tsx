"use client";

import { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col gap-4 md:gap-8 items-center w-full">
      <div className="flex flex-col items-center">
        <h1 className="heading-5-bold md:heading-4-bold text-title mb-2 text-center md:text-start">
          {title}
        </h1>

        {subtitle && (
          <div className="text-regular-normal md:text-large-normal text-paragraph mb-6 md:mb-8 text-center md:text-start">
            {subtitle}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};