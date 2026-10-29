export const LEAD_ERROR_MESSAGE =
  "We could not confirm your request. Please try again or call (215) 469-1244.";

const SUBMIT_TIMEOUT_MS = 20000;

export interface LeadInput {
  name: string;
  phone: string;
  service_needed: string;
  territory: string;
  landing_page: string;
}

interface TrackingData {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function createSubmissionId(): string {
  return crypto.randomUUID();
}

export async function submitLead(input: LeadInput, submissionId: string): Promise<boolean> {
  const payload = {
    ...input,
    ...collectTrackingParams(),
    submission_id: submissionId,
    lead_source: "google_ads",
    page_url: window.location.href,
  };

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/north-wales-lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) return false;
    const data: unknown = await response.json();
    return typeof data === "object" && data !== null && (data as { success?: unknown }).success === true;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeout);
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
