'use client';

import { useState } from 'react';
import { UseFormRegister, FieldError, Path, FieldValues } from 'react-hook-form';
import { EyeIcon } from '../ui/icons/EyeIcon';
import { EyeOffIcon } from '../ui/icons/EyeOffIcon';
import { FormInput } from './FormInput';

interface FormPasswordInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder?: string;
}

export function FormPasswordInput<T extends FieldValues>({
  name,
  label,
  register,
  error,
  placeholder,
}: FormPasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      name={name}
      label={label}
      register={register}
      error={error}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      leftElement={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 cursor-pointer"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  );
}