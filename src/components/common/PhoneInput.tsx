"use client";

import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { code: "+20", label: "🇪🇬 +20" },
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+965", label: "🇰🇼 +965" },
  { code: "+974", label: "🇶🇦 +974" },
  { code: "+973", label: "🇧🇭 +973" },
  { code: "+962", label: "🇯🇴 +962" },
];

interface PhoneInputFieldProps {
  name: string;
  control: any;
  error?: any;
  label?: string;
}

export function PhoneInputField({
  name,
  control,
  error,
  label,
}: PhoneInputFieldProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = field.value || { country: "+20", number: "" };

          return (
            <div className="flex items-center w-full overflow-hidden rounded-lg border-[1.5px] border-border focus-within:border-primary transition">
              <Select
                value={value.country}
                onValueChange={(country) =>
                  field.onChange({ ...value, country })
                }
              >
                <SelectTrigger className="bg-transparent border-0 shadow-none outline-0! focus:ring-0! px-3">
                  <SelectValue>
                    {
                      countries.find((c) => c.code === value.country)
                        ?.label
                    }
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className="bg-bg border border-border!">
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="w-px self-stretch bg-border" />

              <Input
                dir="ltr"
                type="tel"
                placeholder="أدخل رقم الهاتف"
                value={value.number}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  field.onChange({
                    ...value,
                    number: onlyNumbers,
                  });
                }}
                className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12 rounded-none placeholder:text-right!"
              />
            </div>
          );
        }}
      />

      {error && (
        <p className="text-red-500 text-sm text-right!">{error.message}</p>
      )}
    </div>
  );
}