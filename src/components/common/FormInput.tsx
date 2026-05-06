import { UseFormRegister, FieldError, Path, FieldValues } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle } from '../ui/icons/AlertCircle';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string | React.ReactNode;
   register: UseFormRegister<T>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  register,
  error,
  type = 'text',
  placeholder,
  dir = 'rtl',
  leftElement,
  rightElement,
}: FormInputProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-medium-medium! text-title">
        {label}
      </Label>
      <div className="relative flex items-center">
        {rightElement && (
          <div className="absolute right-4 flex items-center">
            {rightElement}
          </div>
        )}
        <div className="absolute left-3 md:left-4 flex items-center">
          {error ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : (
            leftElement
          )}
        </div>
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          dir={dir}
          {...register(name)}
          className={`p-3 md:p-4 text-regular-normal text-paragraph border-[1.5px] border-border focus:border-primary outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 block h-auto rounded-lg 
            ${(rightElement ? 'pr-12!' : '')} 
            ${(leftElement || error ? 'pl-12!' : '')} 
            ${error ? 'border-red-500' : ''}`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-small-normal text-right">
          {error.message}
        </p>
      )}
    </div>
  );
}