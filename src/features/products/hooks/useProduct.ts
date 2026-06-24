import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/product.service";
import { Product } from "../types/product.types";

const cache = new Map<string, Product>();

export function useProduct(productId: string, initialProduct?: Product | null) {
  const [product, setProduct] = useState<Product | null>(() => {
    if (initialProduct && !cache.has(productId)) {
      cache.set(productId, initialProduct);
    }
    return cache.get(productId) ?? null;
  });
  const [loading, setLoading] = useState(!cache.has(productId));
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (force = false) => {
    if (!productId) return;
    if (!force && cache.has(productId)) {
      setProduct(cache.get(productId)!);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProduct(productId);
      cache.set(productId, data);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (cache.has(productId)) {
      setProduct(cache.get(productId)!);
      setLoading(false);
    } else {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  return { product, loading, error, refetch: () => fetchProduct(true) };
}