import { memo, useCallback } from 'react';
import { ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { INTENT_LABELS, ITEMS_PER_PAGE, STATUS_COLORS, STATUS_LABELS } from '../constants';
import { Order, OrderStatus } from '../types/orders.types';
import { formatOrderDate } from '../utils/orders.utils';


interface OrdersMobileViewProps {
  orders: Order[];
  selectedRows: string[];
  currentPage: number;
  expandedRow: string | null;
  totalOrders: number;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onToggleExpand: (id: string) => void;
  onEdit: (order: Order) => void;
}

const OrdersMobileViewComponent = ({
  orders,
  selectedRows,
  currentPage,
  expandedRow,
  totalOrders,
  onSelectAll,
  onSelectRow,
  onToggleExpand,
  onEdit,
}: OrdersMobileViewProps) => {
  const handleSelectAll = useCallback((checked: boolean | string) => {
    onSelectAll(checked === true);
  }, [onSelectAll]);

  const handleSelectRow = useCallback((id: string) => (checked: boolean | string) => {
    onSelectRow(id, checked === true);
  }, [onSelectRow]);

  const handleToggleExpand = useCallback((id: string) => () => {
    onToggleExpand(id);
  }, [onToggleExpand]);

  const allSelected = orders.length > 0 && selectedRows.length === orders.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < orders.length;

  return (
    <div className="md:hidden">
      <div className="flex items-center bg-card py-4 px-2 rounded-xl">
        <div className="flex items-center">
          <Checkbox
            checked={allSelected ? true : someSelected ? 'indeterminate' : false}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-secondary heading-6-bold block w-8 text-center">#</span>
        </div>
        <span className="text-regular-bold text-title mr-2">رقم الطلب</span>
      </div>

      {orders.map((order, index) => (
        <div key={order.id} className="border-b border-border px-2">
          <div className="flex items-center justify-between py-2 h-14">
            <div className="flex items-center text-regular-normal">
              <Checkbox
                checked={selectedRows.includes(order.id)}
                onCheckedChange={handleSelectRow(order.id)}
              />
              <span className="text-title w-8 block text-center">
                {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
              </span>
              <span className="text-title mr-2">{order.orderNumber}</span>
            </div>

            <button onClick={handleToggleExpand(order.id)}>
              {expandedRow === order.id ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          {expandedRow === order.id && (
            <div className="pb-4">
              <div className="flex gap-2 items-center py-2 mr-16">
                <span className="text-small-bold text-title">العميل</span>
                <span className="text-small-normal text-paragraph">{order.user.name}</span>
              </div>
              <div className="flex gap-2 items-center py-2 mr-16">
                <span className="text-small-bold text-title">المنتج</span>
                <span className="text-small-normal text-paragraph">{order.product.name}</span>
              </div>
              <div className="flex gap-2 items-center py-2 mr-16">
                <span className="text-small-bold text-title">النية</span>
                <span className="text-small-normal text-paragraph">
                  {INTENT_LABELS[order.intent]}
                </span>
              </div>
              <div className="flex gap-2 items-center py-2 mr-16">
                <span className="text-small-bold text-title">السعر</span>
                <span className="text-small-normal text-paragraph">
                  {order.totalPrice.toLocaleString('en-US')} ج.م
                </span>
              </div>
              <div className="flex gap-2 items-center py-2 mr-16">
                <span className="text-small-bold text-title">الحالة</span>
                <span className={cn(
                  'px-2 py-1.25 rounded-full text-small-bold! h-8! block',
                  STATUS_COLORS[order.status as OrderStatus]
                )}>
                  {STATUS_LABELS[order.status as OrderStatus]}
                </span>
              </div>
              <div className="flex gap-2 items-center py-2 mr-16">
                <span className="text-small-bold text-title">تاريخ الطلب</span>
                <span className="text-small-normal text-paragraph">
                  {formatOrderDate(order.createdAt)}
                </span>
              </div>
              <div className="flex gap-2 items-center py-2 mr-16">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(order)}
                  className="text-primary border-primary"
                >
                  <Edit size={16} className="ml-2" />
                  تعديل
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const OrdersMobileView = memo(OrdersMobileViewComponent);