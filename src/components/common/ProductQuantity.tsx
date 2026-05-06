'use client';

import { FC } from 'react';
import { Plus, Minus } from 'lucide-react';

type ProductQuantityProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export const ProductQuantity: FC<ProductQuantityProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
}) => {
  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
  onClick={decrease}
  aria-label="Decrease quantity"
  className="w-10 md:w-11 h-10 md:h-11 flex items-center justify-center rounded-lg text-bg bg-secondary disabled:opacity-50 cursor-pointer"
>
  <Minus className="size-4 md:size-5" />
</button>

      <span className="min-w-6 text-center heading-6-bold">
        {value}
      </span>

      <button
  onClick={increase}
  aria-label="Increase quantity"
  className="w-10 md:w-11 h-10 md:h-11 flex items-center justify-center rounded-lg text-bg bg-secondary disabled:opacity-50 cursor-pointer"
>
  <Plus className="size-4 md:size-5" />
</button>
    </div>
  );
};