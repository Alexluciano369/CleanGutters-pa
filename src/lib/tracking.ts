// Google Ads and GA4 tracking utilities

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GOOGLE_ADS_TAG = "AW-18146670851";
const LEAD_CONVERSION_LABEL = "HZx0COTCwqocEIPygM1D";
const PHONE_CONVERSION_LABEL = "WkdfCOaV080cEIPygM1D";

export function trackGoogleAdsLeadConversion(): void {
  if (typeof window.gtag !== "function") {
    console.warn("gtag not available — Google Ads conversion not fired");
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_TAG}/${LEAD_CONVERSION_LABEL}`,
    value: 150.0,
    currency: "USD",
  });
}

export function trackTelephoneClick(): void {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_TAG}/${PHONE_CONVERSION_LABEL}`,
  });
}

export function trackGA4Event(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function trackNorthWalesLeadSubmit(): void {
  trackGA4Event("north_wales_lead_submit", {
    territory: "north_wales_pa",
    lead_source: "google_ads",
  });
}
