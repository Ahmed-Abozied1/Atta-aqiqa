// components/common/FormSelect.tsx
"use client";

import { UseFormRegister, FieldError, Path, FieldValues } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { AlertCircle } from '../ui/icons/AlertCircle';

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string | React.ReactNode;
  register: UseFormRegister<T>;
  error?: FieldError;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  register,
  error,
  options,
  placeholder,
}: FormSelectProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-medium-medium! text-title">
        {label}
      </Label>
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          className={`w-full p-3 md:p-4 text-regular-normal text-paragraph border-[1.5px] border-border focus:border-primary outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 block h-auto rounded-lg appearance-none bg-white cursor-pointer
            ${error ? 'border-red-500' : ''}
            ${error ? 'pl-12!' : ''}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-small-normal text-right">
          {error.message}
        </p>
      )}
    </div>
  );
}