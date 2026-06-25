export interface BookingModalData {
  productId: string;
  productName: string;
  price: number;
  location: string;
  intent?: string;
  imageUrl?: string;
  quantity?: number;
}
export interface OrderResponse {
  id: string;
  orderNumber: number;
  productId: string;
  userId?: string;
  status: string;
  totalPrice: number;
  intent: string;
  beneficiaryName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  guestName?: string | null;
  guestImage?: string | null;
  userId?: string | null;
  productId: string;
  user?: {
    name: string;
    email?: string;
    image: string | null;
  } | null;
}

export interface CreateOrderPayload {
  productId: string;
  intent: string;
  beneficiaryName: string;
  phone: string;
  quantity: number;
  price: number;
}

export interface PhoneObject {
  country: string;
  number: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  rating: number;
  category: string;
  location: string;
  intents: string[];
  createdAt: Date;
  updatedAt: Date;
  reviews: Review[];
  averageRating: number;
  reviewsCount: number;
  beneficiaries?: number;
}