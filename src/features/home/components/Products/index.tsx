'use client'

import { useEffect, useRef } from 'react'
import { SectionHeader } from '@/components/common/SectionHeader'
import { ProductsCarousel } from './ProductsCarousel'
import { ProductsTabs } from './ProductsTabs'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { Product } from '../../types'

interface ProductsProps {
  products: Product[]
  loading: boolean
  error: any
  refetch: () => void
  activeTab: 'inside' | 'outside'
  onTabChange: (value: 'inside' | 'outside') => void
}

export const Products = ({ 
  products, 
  loading, 
  error, 
  refetch,
  activeTab,
  onTabChange
}: ProductsProps) => {
  const sectionRef = useRef<HTMLElement>(null)

  const handleTabChange = (value: 'inside' | 'outside') => {
    onTabChange(value)
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-24 pr-4 sm:pr-16 bg-bg">
      <SectionHeader
        badge="منتجاتنا"
        title="الذبيحة المناسبة لك"
        description="اختار المكان المناسب لتنفيذ الذبيحه الخاصه بك داخل مصر أو في افريقيا لفقراء المسلمين"
      />
      <ProductsTabs
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <div className="relative mt-8 md:mt-12">
        {error && (
          <ErrorMessage message="عذرًا، حدث خطأ أثناء جلب البيانات." onRetry={refetch} />
        )}
        <ProductsCarousel products={products} loading={loading} />
      </div>
    </section>
  )
}