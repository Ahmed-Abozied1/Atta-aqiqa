import { Product, Review, CreateOrderPayload, OrderResponse } from "../types/product.types";

export const productService = {
  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
  },

  async getProducts(): Promise<Product[]> {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  async getRelatedProducts(productId: string, limit?: number): Promise<Product[]> {
  const params = new URLSearchParams();
  params.append("productId", productId);
  if (limit) params.append("limit", limit.toString());
  
  const response = await fetch(`/api/products/related?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch related products");
  return response.json();
},

  async getReviews(productId: string): Promise<Review[]> {
    const response = await fetch(`/api/reviews?productId=${productId}`);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },

  async createReview(productId: string, rating: number, comment: string): Promise<Review> {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment }),
    });
    if (!response.ok) throw new Error("Failed to create review");
    return response.json();
  },

  async createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create order");
    }
    return response.json();
  },
  async getProductParts(productId: string) {
  const response = await fetch(
    `/api/product-parts?productId=${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product parts");
  }

  return response.json();
},
};