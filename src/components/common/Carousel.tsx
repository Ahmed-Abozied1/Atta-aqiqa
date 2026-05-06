import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { CarouselDots } from '@/components/common/CarouselDots';

type CarouselProps<T> = {
  items: T[]
  loading?: boolean
  renderItem: (item: T) => React.ReactNode
  renderSkeleton: () => React.ReactNode
  slidesPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export function Carousel<T>({
  items,
  loading = false,
  renderItem,
  renderSkeleton,
  slidesPerView = {
    mobile: 1.5,
    tablet: 2.5,
    desktop: 3.5,
  },
}: CarouselProps<T>) {
  const [mounted, setMounted] = useState(false);
  const [swiperApi, setSwiperApi] = useState<SwiperType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayItems = useMemo(() => 
    loading ? Array.from({ length: 5 }) : items,
  [loading, items]);

  const swiperKey = useMemo(() => 
    `swiper-${loading}-${mounted}-${items.length}`,
  [loading, mounted, items.length]);

  useEffect(() => {
    if (swiperApi && mounted) {
      swiperApi.update();
      if (!loading) {
        swiperApi.slideTo(0, 0);
      }
    }
  }, [loading, items.length, swiperApi, mounted]);

  if (!mounted) {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 pb-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={`mount-fallback-${index}`}
              className="shrink-0"
              style={{ width: `${100 / slidesPerView.desktop}%` }}
            >
              {renderSkeleton()}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
    <Swiper
  key={swiperKey}
  modules={[Navigation, Pagination]}
  onSwiper={setSwiperApi}
  onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
  dir="rtl"
  spaceBetween={16}
  observer
  observeParents
  watchSlidesProgress
  breakpoints={{
    0: { slidesPerView: slidesPerView.mobile },
    640: { slidesPerView: slidesPerView.tablet },
    1024: { slidesPerView: slidesPerView.desktop },
  }}
  className="pb-8 overflow-visible items-stretch!"
>
  {displayItems.map((item, index) => (
    <SwiperSlide
      key={loading ? `skeleton-${index}` : `item-${index}`}
      className="h-auto! flex"
    >
      <div className="w-full flex h-full!">
        {loading ? renderSkeleton() : renderItem(item as T)}
      </div>
    </SwiperSlide>
  ))}
</Swiper>

      {!loading && items.length > 1 && (
        <CarouselDots
          count={items.length}
          activeIndex={selectedIndex}
          onDotClick={(index) => swiperApi?.slideTo(index)}
        />
      )}
    </div>
  );
}