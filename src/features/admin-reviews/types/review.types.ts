export interface Review {
  id: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  guestName?: string | null;
  userId?: string | null;
  productId: string;
  user?: {
    name: string;
    image: string | null;
    email: string;
  } | null;
  product: {
    name: string;
    price: number;
    location: string;
  };
}