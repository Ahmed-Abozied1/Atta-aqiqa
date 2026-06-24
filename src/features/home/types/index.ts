export interface FAQType {
  id: string;
  question: string;
  answer: string;
}
export interface TestimonialUser {
  name: string | null;
  image: string | null;
}

export interface Testimonial {
  id: string;
  rating: number;
  comment: string;
  user?: TestimonialUser;
}

export interface TestimonialCardProps {
  rating: number
  comment: string
  user?: {
    name: string | null
  }
}

export interface Stat {
  label: string;
  value: string;
}

export interface Product {
  id: string
  slug?: string | null
  name: string
  description?: string
  type?: string
  price: number
  imageUrl?: string
  location: 'INSIDE_EGYPT' | 'OUTSIDE_EGYPT'
  category: string
  rating: number
  reviewsCount: number
  beneficiaries?: number
  stock?: number
  createdAt: string
  updatedAt: string
}

export interface ProductCardProps {
  id: string;
  slug?: string | null;
  name: string;
  beneficiaries?: number;
  price: number;
  rating?: number;
  imageUrl?: string;
}