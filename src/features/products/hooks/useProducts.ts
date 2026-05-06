import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/product.service";
import { Product } from "../types/product.types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      const productsWithBeneficiaries = data.map(product => ({
        ...product,
        beneficiaries: product.category === "كبش" ? 1 : 7
      }));
      setProducts(productsWithBeneficiaries);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}