import { supabase } from "@/lib/supabase";

export interface LeadFormData {
  name: string;
  phone: string;
  zip_code: string;
  service_needed: string;
  message?: string;
  sms_consent?: boolean;
  email?: string;
  address?: string;
}

export interface TrackingData {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface LeadSubmission extends LeadFormData, TrackingData {
  territory: string;
  lead_source: string;
  landing_page: string;
  page_url: string;
}

export async function submitLead(
  formData: LeadFormData
): Promise<{ success: boolean; error?: string }> {
  const tracking = collectTrackingParams();
  const pageUrl = window.location.href;

  const payload: LeadSubmission = {
    ...formData,
    ...tracking,
    territory: "north_wales_pa",
    lead_source: "google_ads",
    landing_page: "north_wales_pa",
    page_url: pageUrl,
  };

  try {
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/north-wales-lead`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorBody.error || `Request failed (${response.status})`,
      };
    }

    const data = await response.json();
    if (!data || data.success !== true) {
      return {
        success: false,
        error: data?.error || "Unexpected response from server",
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error occurred",
    };
  }
}

function collectTrackingParams(): TrackingData {
  const params = new URLSearchParams(window.location.search);
  const tracking: TrackingData = {};

  const gclid = params.get("gclid");
  if (gclid) tracking.gclid = gclid;

  const gbraid = params.get("gbraid");
  if (gbraid) tracking.gbraid = gbraid;

  const wbraid = params.get("wbraid");
  if (wbraid) tracking.wbraid = wbraid;

  const utmFields: (keyof TrackingData)[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  for (const field of utmFields) {
    const value = params.get(field);
    if (value) tracking[field] = value;
  }

  return tracking;
}

export { supabase };
