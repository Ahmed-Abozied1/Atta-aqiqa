"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntentMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: any;
  label?: string;
}

const INTENT_OPTIONS = [
  { value: "ADHIYA", label: "أضحية" },
  { value: "BUY", label: "شراء" },
  { value: "AQEEQA", label: "عقيقة" },
  { value: "NAZR", label: "نذر" },
  { value: "KAFFARA", label: "كفارة" },
  { value: "SADAKA", label: "صدقة" },
];

export function IntentMultiSelect({ value, onChange, error, label }: IntentMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIntent = (intentValue: string) => {
    if (value.includes(intentValue)) {
      onChange(value.filter((v) => v !== intentValue));
    } else {
      onChange([...value, intentValue]);
    }
  };

  const getSelectedLabels = () => {
    return value
      .map((v) => INTENT_OPTIONS.find((opt) => opt.value === v)?.label)
      .filter(Boolean)
      .join("، ");
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-medium-medium! text-title">{label}</label>}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-4 py-2 text-right border rounded-lg bg-bg flex items-center justify-between",
            error ? "border-red-500" : "border-border",
            "focus:outline-none focus:ring-2 focus:ring-primary"
          )}
        >
          <span className={value.length === 0 ? "text-muted-foreground" : "text-title"}>
            {value.length === 0 ? "اختر النية" : getSelectedLabels()}
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 mt-1 w-full bg-bg border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
              {INTENT_OPTIONS.map((intent) => (
                <button
                  key={intent.value}
                  type="button"
                  onClick={() => toggleIntent(intent.value)}
                  className={cn(
                    "w-full px-4 py-2 text-right hover:bg-gray-50 flex items-center justify-between",
                    value.includes(intent.value) && "bg-primary/5"
                  )}
                >
                  <span className="text-paragraph">{intent.label}</span>
                  {value.includes(intent.value) && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}