import { useState } from "react";
import { CreateOrderPayload } from "../types/product.types";

interface UseCreateOrderReturn {
  createOrder: (payload: CreateOrderPayload) => Promise<any | false>;
  isSubmitting: boolean;
  error: string | null;
}

export function useCreateOrder(): UseCreateOrderReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (payload: CreateOrderPayload) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      const body = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : null;

      if (!response.ok) {
        const message =
          (body && (body.error || body.message)) ||
          `Request failed with status ${response.status}`;
        setError(message);
        return false;
      }

      return body ?? true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createOrder, isSubmitting, error };
}