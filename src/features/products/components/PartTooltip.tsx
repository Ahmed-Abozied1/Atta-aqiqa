"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AppButton } from "@/components/common/AppButton";

interface PartTooltipProps {
  partName: string;
  partId: number;
  isHovered: boolean;
  isBooked?: boolean;
  bookedBy?: string;
  onSelect: (id: number, name: string) => void;
  setName: (name: string) => void;
  position: { top: string; left: string };
}

export default function PartTooltip({
  partName,
  partId,
  isHovered,
  isBooked,
  bookedBy,
  onSelect,
}: PartTooltipProps) {
  const [localName, setLocalName] = useState("");

  if (!isHovered) return null;

  if (isBooked) {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-lg p-4 w-64">
        <h4 className="text-medium-bold text-title mb-2">
          السُبع {partName}
        </h4>

        <div className="inline-block bg-green-100 text-green-800 text-small-medium px-2 py-1 rounded-md mb-3">
          ✓ تم الحجز
        </div>

        <p className="text-small-normal text-paragraph mb-3">
          أدخل الاسم الذي سيظهر في فيديو التوثيق
        </p>

        <Input
          value={bookedBy || ""}
          disabled
          placeholder="أدخل الاسم"
          className="mb-3 border-border bg-gray-50 cursor-not-allowed"
        />
      </div>
    );
  }

  return (
    <div className="bg-bg border border-border rounded-xl shadow-lg p-4 w-64">
      <h4 className="text-medium-bold text-title mb-2">
        السُبع {partName}
      </h4>

      <p className="text-small-normal text-paragraph mb-3">
        أدخل الاسم الذي سيظهر في فيديو التوثيق
      </p>

      <Input
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        placeholder="أدخل الاسم"
        className="mb-3 border-border"
      />

      <AppButton
        onClick={() => onSelect(partId, localName)}
        className="w-full bg-primary text-bg h-10 rounded-lg"
      >
        اختر هذا السُبع
      </AppButton>
    </div>
  );
}