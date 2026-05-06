"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import PartTooltip from "./PartTooltip";
import { ModalHeader } from "./ModalHeader";
import { CheckCircle } from "@/components/ui/icons/CheckCircle";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductPart {
  partNumber: number;
  isBooked: boolean;
  bookedBy?: string;
}

interface SelectPartProps {
  selectedPart: number | null;
  setSelectedPart: (id: number) => void;
  name: string;
  setName: (name: string) => void;
  parts: ProductPart[];
  loadingParts:boolean
}

const COW_PARTS = [
  { id: 1, name: "الأول", top: "25%", left: "32%" },
  { id: 2, name: "الثاني", top: "28%", left: "41%" },
  { id: 3, name: "الثالث", top: "29%", left: "49%" },
  { id: 4, name: "الرابع", top: "28%", left: "58.5%" },
  { id: 5, name: "الخامس", top: "27%", left: "68%" },
  { id: 6, name: "السادس", top: "36%", left: "75.5%" },
  { id: 7, name: "السابع", top: "43%", left: "41%" },
];

export const SelectPart = ({
  selectedPart,
  setSelectedPart,
  name,
  setName,
  parts,
  loadingParts
}: SelectPartProps) => {
  const [hoveredPart, setHoveredPart] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: string;
    left: string;
  }>({ top: "0", left: "0" });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getPartDetails = (partId: number) => {
    const part = parts?.find(p => p.partNumber === partId);
    return {
      isBooked: part?.isBooked || false,
      bookedBy: part?.bookedBy || ""
    };
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    setHoveredPart(null);
  };

  return (
    <div dir="rtl">
      <ModalHeader
        title="حدد السُبع"
        description="حدد سُبع أضحيتك المناسب لك واستكمل طلبك بكل سهولة."
      />
 {loadingParts ? (
  <div className=" flex justify-center items-center mt-8">
    <Skeleton className="w-80 md:w-150 h-150 md:h-80 rounded-xl bg-card" />
</div>
  ) : (
      <div className="relative mt-8">
        <Image
          src="/images/cow-parts.webp"
          alt="Cow Selection"
          width={800}
          height={600}
          className="w-auto h-auto mx-auto"
          priority
        />

        {COW_PARTS.map((part) => {
          const isSelected = selectedPart === part.id;
          const { isBooked, bookedBy } = getPartDetails(part.id);

          return (
            <div
              key={part.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: part.top, left: part.left }}
            >
              {isSelected ? (
                <CheckCircle className="w-4.5 md:w-[35.83px] h-4.5 md:h-[35.83px] text-green-500" />
              ) : isBooked ? (
                <div className="relative">
                  <CheckCircle className="w-4.5 md:w-[35.83px] h-4.5 md:h-[35.83px] text-gray-400" />
                  <div 
                    className="absolute inset-0 cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredPart(part.id);
                      setTooltipPosition({
                        top: `calc(${part.top} - 70px)`,
                        left: part.left,
                      });
                    }}
                    onMouseLeave={() => {
                      timeoutRef.current = setTimeout(() => {
                        setHoveredPart(null);
                      }, 150);
                    }}
                  />
                </div>
              ) : (
                <button
                  onMouseEnter={() => {
                    setHoveredPart(part.id);
                    setTooltipPosition({
                      top: `calc(${part.top} - 70px)`,
                      left: part.left,
                    });
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setHoveredPart(null);
                    }, 150);
                  }}
                  onClick={() => {
                    setHoveredPart(part.id);
                    setTooltipPosition({
                      top: `calc(${part.top} - 70px)`,
                      left: part.left,
                    });
                  }}
                  className={cn(
                    "w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-200",
                    "bg-bg text-primary border border-primary hover:bg-primary hover:text-bg",
                    "relative z-10 cursor-pointer"
                  )}
                >
                  <span className="text-tiny-medium md:text-regular-medium">
                    {part.id}
                  </span>
                </button>
              )}
            </div>
          );
        })}

        {hoveredPart !== null && (
          <div
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
            className="absolute z-50"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              transform: "translateX(-50%)",
            }}
          >
            <PartTooltip
              partName={COW_PARTS.find((p) => p.id === hoveredPart)?.name || ""}
              partId={hoveredPart}
              isHovered={true}
              isBooked={getPartDetails(hoveredPart).isBooked}
              bookedBy={getPartDetails(hoveredPart).bookedBy}
              onSelect={(id, name) => {
                setSelectedPart(id);
                setName(name);
                setHoveredPart(null);
              }}
              setName={setName}
              position={tooltipPosition}
            />
          </div>
        )}
      </div>
  )}
    </div>
  );
};