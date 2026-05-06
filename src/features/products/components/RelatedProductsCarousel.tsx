import { Carousel } from "@/components/common/Carousel"
import { Product } from "../types/product.types"
import { ProductCard } from "@/components/common/ProductCard"
import { ProductSkeleton } from "@/features/home/components/Products/ProductSkeleton"

interface RelatedProductsCarouselProps {
  products: Product[]
  loading?: boolean
}

export const RelatedProductsCarousel = ({
  products,
  loading = false,
}: RelatedProductsCarouselProps) => {
  return (
    <Carousel
      items={products}
      loading={loading}
      renderItem={(item) => (
        <ProductCard
          {...item}
          imageUrl={item.imageUrl||""}
          beneficiaries={item.beneficiaries ?? 0}
        />
      )}
      renderSkeleton={() => <ProductSkeleton />}
      slidesPerView={{
        mobile: 1.5,
        tablet: 2.5,
        desktop: 3.5,
      }}
    />
  )
}