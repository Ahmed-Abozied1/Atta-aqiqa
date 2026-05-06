import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";

export const useResetPasswordToken = () => {
  const searchParams = useSearchParams();
  const { open, setView } = useModalStore();
  const initialized = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token || initialized.current) return;

    initialized.current = true;

    setView("RESET_PASSWORD");
    open("RESET_PASSWORD", { token });

    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [searchParams, open, setView]);
};