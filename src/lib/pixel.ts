export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const viewContent = (params: {
  content_name: string;
  content_ids: string[];
  value: number;
  currency?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      ...params,
      currency: params.currency ?? "EGP",
    });
  }
};

export const initiateCheckout = (params: {
  content_name: string;
  content_ids: string[];
  value: number;
  num_items: number;
  currency?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", {
      ...params,
      currency: params.currency ?? "EGP",
    });
  }
};

export const purchase = (params: {
  content_name: string;
  content_ids: string[];
  value: number;
  num_items: number;
  currency?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      ...params,
      currency: params.currency ?? "EGP",
    });
  }
};

export const completeRegistration = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration");
  }
};
