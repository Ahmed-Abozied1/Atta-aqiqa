import { useState, useEffect } from "react";
import { Product } from "../types/product.types";
import { productService } from "../services/product.service";

export const useRelatedProducts = (productId: string, limit?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getRelatedProducts(productId, limit);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch related products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId, limit]);

  return { products, loading, error };
};