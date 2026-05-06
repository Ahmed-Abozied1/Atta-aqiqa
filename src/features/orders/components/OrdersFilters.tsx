"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { OrdersFilters as Filters } from "../types/orders.types"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterHorizontal } from "@/components/ui/icons/FilterHorizontal"
import { Search } from "@/components/ui/icons/Search"
import { FILTER_OPTIONS } from "../constants"

interface OrdersFiltersProps {
  filters: Filters
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  onReset: () => void
}

export function OrdersFilters({ filters, onFilterChange, onReset }: OrdersFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const FilterSection = ({ title, options, value, filterKey }: { 
    title: string, 
    options: { label: string, value: string }[], 
    value: string, 
    filterKey: keyof Filters 
  }) => (
    <div className="mb-6">
      <h4 className="text-title text-medium-bold md:heading-6-bold mb-4 text-right">{title}:</h4>
      <RadioGroup 
        value={value} 
        onValueChange={(val) => onFilterChange(filterKey, val)} 
        dir="rtl" 
        className="space-y-2"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2 cursor-pointer">
            <RadioGroupItem value={option.value} id={`${filterKey}-${option.value}`} />
            <Label htmlFor={`${filterKey}-${option.value}`} className="text-regular-normal! md:text-medium-normal! text-title! cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <div className="flex items-center gap-2 md:gap-4 flex-1">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="w-10 md:w-14 h-10 md:h-14 rounded-lg md:rounded-2xl bg-card hover:bg-card/80 transition-colors">
            <FilterHorizontal  /> 
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" dir="rtl" className="w-[320px] p-0 rounded-4 border-0 bg-bg overflow-hidden shadow-xl">
<ScrollArea className="h-112.5 p-5">
  
  <FilterSection 
    title="الترتيب حسب" 
    filterKey="sortBy" 
    value={filters.sortBy || 'newest'} 
    options={[
      { label: "الكل", value: "all" },
      { label: "الاسم", value: "name" },
      { label: "الأحدث", value: "newest" },
      { label: "الأقدم", value: "oldest" }
    ]} 
  />
  <hr className="border-border mb-6" />

  <FilterSection 
    title="النطاق" 
    filterKey="scope" 
    value={filters.scope || 'all'} 
    options={[
      { label: "الكل", value: "all" },
      { label: "داخل مصر", value: "INSIDE_EGYPT" },
      { label: "خارج مصر", value: "OUTSIDE_EGYPT" }
    ]} 
  />
  <hr className="border-border mb-6" />

  <FilterSection 
    title="نوع الطلب" 
    filterKey="orderType" 
    value={filters.orderType || 'all'} 
    options={[
      { label: "الكل", value: "all" },
      { label: "حجز", value: "BOOKING" },
      { label: "شراء", value: "PURCHASE" }
    ]} 
  />
  <hr className="border-border mb-6" />

  <FilterSection 
    title="نوع الحجز" 
    filterKey="bookingType" 
    value={filters.bookingType || 'all'} 
    options={FILTER_OPTIONS.bookingType} 
  />
  <hr className="border-border mb-6" />

  <FilterSection 
    title="الحالة" 
    filterKey="status" 
    value={filters.status || 'all'} 
    options={[
      { label: "الكل", value: "all" },
      { label: "قيد الاستلام", value: "PENDING" },
      { label: "تم الاستلام", value: "RECEIVED" },
      { label: "جاري التنفيذ", value: "EXECUTING" },
      { label: "مكتمل", value: "COMPLETED" }
    ]} 
  />
</ScrollArea>
          <div className="p-4 bg-card flex gap-3">
            <Button 
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-2xl h-12 text-regular-bold"
            >
              تطبيق
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { onReset(); setIsOpen(false); }}
              className="flex-1 border-primary border-[1.5px] bg-transparent text-primary hover:bg-primary/10 rounded-2xl h-12 text-regular-bold"
            >
              إعادة تعيين
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="relative w-full max-w-100 hidden md:block">
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <Search />
        </div>
        <Input
          value={filters.searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e.target.value)}
          placeholder="ابحث ..."
          className="p-4 pr-12 border-[1.5px] border-border h-14 rounded-lg placeholder:text-paragraph text-title text-regular-normal text-right"
        />
      </div>

      <Button className="w-10 h-10 block md:hidden rounded-lg bg-card">
        <Search />
      </Button>
    </div>
  )
}