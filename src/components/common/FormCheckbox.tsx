import { UseFormRegister, FieldError, Path, FieldValues } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label: React.ReactNode;
  register: UseFormRegister<T>;
  error?: FieldError;
  defaultChecked?: boolean;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  register,
  error,
  defaultChecked,
}: FormCheckboxProps<T>) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={name}
          defaultChecked={defaultChecked}
          className="w-6 h-6 border-border text-bg! data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
          onCheckedChange={(checked) =>
            register(name).onChange({ target: { name, value: checked === true } })
          }
        />
        <Label htmlFor={name} className="text-regular-medium text-paragraph cursor-pointer">
          {label}
        </Label>
      </div>
      {error && <p className="text-red-500 text-small-normal text-right">{error.message}</p>}
    </div>
  );
}