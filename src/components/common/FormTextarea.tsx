// components/common/FormTextarea.tsx
import { UseFormRegister, FieldError, Path, FieldValues } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label: string | React.ReactNode;
  register: UseFormRegister<T>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
  dir?: 'rtl' | 'ltr';
}

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  register,
  error,
  placeholder,
  rows = 3,
  dir = 'rtl',
}: FormTextareaProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-medium-medium! text-title">
        {label}
      </Label>
      <div className="relative">
        <Textarea
          id={name}
          placeholder={placeholder}
          dir={dir}
          rows={rows}
          {...register(name)}
          className={`p-3 text-regular-normal text-paragraph border-[1.5px] border-border focus:border-primary outline-none rounded-lg w-full resize-y
            ${error ? 'border-red-500' : ''}`}
        />
        {error && (
          <div className="absolute left-3 top-3">
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