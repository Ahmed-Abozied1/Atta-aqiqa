"use client";

import { useEffect, useState, useCallback } from "react";
import { authClient } from "@/lib/auth-client";

export const useSession = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await authClient.getSession();
      setData(res);
      return res;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
};