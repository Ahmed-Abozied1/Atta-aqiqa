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
  { code: "+20",  flag: "🇪🇬", name: "مصر" },
  { code: "+966", flag: "🇸🇦", name: "السعودية" },
  { code: "+971", flag: "🇦🇪", name: "الإمارات" },
  { code: "+965", flag: "🇰🇼", name: "الكويت" },
  { code: "+974", flag: "🇶🇦", name: "قطر" },
  { code: "+973", flag: "🇧🇭", name: "البحرين" },
  { code: "+962", flag: "🇯🇴", name: "الأردن" },
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

          const selected = countries.find((c) => c.code === value.country);

          return (
            <div className="flex items-center w-full overflow-hidden rounded-lg border-[1.5px] border-border focus-within:border-primary transition-colors">
              <Select
                value={value.country}
                onValueChange={(country) => field.onChange({ ...value, country })}
              >
                <SelectTrigger className="shrink-0 w-20 h-12 bg-muted/40 border-0 shadow-none outline-0! focus:ring-0! px-3 gap-1 rounded-none text-sm font-medium">
                  <SelectValue>
                    {selected?.code}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className="bg-bg border border-border!" dir="rtl">
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="text-muted-foreground text-xs">{c.code}</span>
                      </span>
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
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange({ ...value, number: onlyNumbers });
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