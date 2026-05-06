import { memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
}

const OrdersPaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: OrdersPaginationProps) => {
  const handlePrevPage = useCallback(() => {
    onPageChange(prev => Math.max(1, prev - 1));
  }, [onPageChange]);

  const handleNextPage = useCallback(() => {
    onPageChange(prev => Math.min(totalPages, prev + 1));
  }, [onPageChange, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between bg-card p-2 md:px-6 md:py-4 mt-4 md:mt-6">
      <span className="text-paragraph text-small-normal md:text-regular-normal">
        الصفحة {currentPage} من {totalPages}
      </span>
      <div className="flex gap-4">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="rounded-lg bg-disabled text-paragraph text-small-bold h-8! md:h-10! px-2! md:px-4! disabled:opacity-50"
        >
          <span className="hidden md:block">السابق</span>
          <ChevronRight className="block md:hidden size-4" />
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded-lg bg-primary text-small-bold h-8! md:h-10! px-2! md:px-4! text-bg disabled:opacity-50"
        >
          <span className="hidden md:block">التالي</span>
          <ChevronLeft className="block md:hidden size-4" />
        </Button>
      </div>
    </div>
  );
};

export const OrdersPagination = memo(OrdersPaginationComponent);