export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  location: "INSIDE_EGYPT" | "OUTSIDE_EGYPT";
  beneficiaries: string;
  intents: string[];
  imageUrl: string | null;
  rating: number;
  reviewsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}