export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

type ProductParams = {
  content_name: string;
  content_ids: string[];
  value: number;
  num_items?: number;
  currency?: string;
};

const track = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
};

const withCurrency = (params: ProductParams) => ({
  ...params,
  content_type: "product",
  currency: params.currency ?? "EGP",
});

export const pageview = () => track("PageView");

export const viewContent = (params: ProductParams) => track("ViewContent", withCurrency(params));

export const initiateCheckout = (params: ProductParams) =>
  track("InitiateCheckout", withCurrency(params));

export const lead = (params: ProductParams) => track("Lead", withCurrency(params));

export const purchase = (params: ProductParams) => track("Purchase", withCurrency(params));

export const completeRegistration = () => track("CompleteRegistration");
