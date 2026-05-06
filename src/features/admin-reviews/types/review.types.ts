export interface Review {
  id: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  productId: string;
  user: {
    name: string;
    image: string | null;
    email: string;
  };
  product: {
    name: string;
    price: number;
    location: string;
  };
}