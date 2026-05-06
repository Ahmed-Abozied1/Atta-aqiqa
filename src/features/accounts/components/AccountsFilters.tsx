"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AccountsFilters as Filters } from "../types/accounts.types"
import { ROLE_OPTIONS } from "../constants/accounts.constants"
import { FilterHorizontal } from "@/components/ui/icons/FilterHorizontal"
import { Search } from "@/components/ui/icons/Search"

interface AccountsFiltersProps {
  filters: Filters
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  onReset: () => void
  selectedCount: number
}

export function AccountsFilters({
  filters,
  onFilterChange,
  onReset,
  selectedCount,
}: AccountsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleFilterUpdate = useCallback((key: keyof Filters, value: string) => {
    onFilterChange(key, value)
  }, [onFilterChange])

  return (
    <div className="flex items-center gap-2 md:gap-4 flex-1">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className="w-10 md:w-14 h-10 md:h-14 rounded-lg md:rounded-2xl bg-card hover:bg-card/80 transition-colors">
            <FilterHorizontal/>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          dir="rtl"
          className="w-75 md:w-[320px] p-0 rounded-4 border-0 bg-bg overflow-hidden shadow-xl"
        >
          <div className="p-5 space-y-6">
            <div>
              <h4 className="text-title text-medium-bold md:heading-6-bold mb-4 text-right">الترتيب حسب:</h4>
              <RadioGroup 
                value={filters.sortBy || 'newest'} 
                onValueChange={(val) => handleFilterUpdate('sortBy', val)} 
                dir="rtl" 
                className="space-y-2"
              >
                {[
                  { label: "الكل", value: "all" },
                  { label: "الاسم", value: "name" },
                  { label: "الأحدث", value: "newest" },
                  { label: "الأقدم", value: "oldest" }
                ].map((option) => (
                  <div key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                    <Label htmlFor={`sort-${option.value}`} className="text-regular-normal! md:text-medium-normal! text-title! cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <hr className="border-border" />

            <div>
              <h4 className="text-title text-medium-bold md:heading-6-bold mb-4 text-right">الدور:</h4>
              <RadioGroup 
                value={filters.role || 'all'} 
                onValueChange={(val) => handleFilterUpdate('role', val)} 
                dir="rtl" 
                className="space-y-2"
              >
                {ROLE_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={option.value} id={`role-${option.value}`} />
                    <Label htmlFor={`role-${option.value}`} className="text-regular-normal! md:text-medium-normal! text-title! cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <hr className="border-border" />

            <div>
              <h4 className="text-title text-medium-bold md:heading-6-bold mb-4">الحالة:</h4>
              <RadioGroup
                value={filters.status || 'all'}
                onValueChange={(val) => handleFilterUpdate('status', val)}
                dir="rtl"
                className="space-y-2"
              >
                {[
                  { label: "الكل", value: "all" },
                  { label: "نشط", value: "active" },
                  { label: "غير نشط", value: "inactive" }
                ].map((option) => (
                  <div key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={option.value} id={`status-${option.value}`} />
                    <Label htmlFor={`status-${option.value}`} className="text-regular-normal! md:text-medium-normal! text-title! cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

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
          <Search/>
        </div>
        <Input
          value={filters.searchTerm}
          onChange={(e) => handleFilterUpdate('searchTerm', e.target.value)}
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