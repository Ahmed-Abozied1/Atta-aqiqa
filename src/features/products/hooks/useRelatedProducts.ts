import { useState, useEffect } from "react";
import { Product } from "../types/product.types";
import { productService } from "../services/product.service";

const cache = new Map<string, Product[]>();

export const useRelatedProducts = (productId: string, limit?: number) => {
  const cacheKey = `${productId}-${limit ?? ""}`;
  const [products, setProducts] = useState<Product[]>(() => cache.get(cacheKey) ?? []);
  const [loading, setLoading] = useState(!cache.has(cacheKey));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;
    if (cache.has(cacheKey)) {
      setProducts(cache.get(cacheKey)!);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getRelatedProducts(productId, limit);
        cache.set(cacheKey, data);
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch related products");
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRelatedProducts();
    return () => { cancelled = true; };
  }, [productId, limit, cacheKey]);

  return { products, loading, error };
};