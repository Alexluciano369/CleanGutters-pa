import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOTIFY_EMAIL = "cleangutters2008@gmail.com";
const FROM_ADDRESS = "CleanGutters Leads <onboarding@resend.dev>";
const EMAIL_TIMEOUT_MS = 15000;
const MAX_FIELD_LENGTH = 2000;
const REQUIRED_FIELDS = [
  "submission_id",
  "territory",
  "lead_source",
  "landing_page",
  "name",
  "phone",
  "page_url",
] as const;
const OPTIONAL_TRACKING_FIELDS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type Body = Record<string, unknown>;

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function text(body: Body, key: string): string | undefined {
  const value = body[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, MAX_FIELD_LENGTH) : undefined;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function notificationHtml(lead: Record<string, string | undefined>): string {
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Service", lead.service_needed],
    ["Territory", lead.territory],
    ["Lead Source", lead.lead_source],
    ["Landing Page", lead.landing_page],
    ["Page URL", lead.page_url],
    ["Submitted At", lead.submitted_at],
    ["GCLID", lead.gclid],
    ["GBRAID", lead.gbraid],
    ["WBRAID", lead.wbraid],
    ["UTM Source", lead.utm_source],
    ["UTM Medium", lead.utm_medium],
    ["UTM Campaign", lead.utm_campaign],
    ["UTM Term", lead.utm_term],
    ["UTM Content", lead.utm_content],
  ];
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;font-weight:bold;">${label}</td><td>${escapeHtml(value || "N/A")}</td></tr>`,
    )
    .join("\n");
  return `<h2>New Lead — Pennsylvania Estimate Form</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
${tableRows}
</table>`;
}

async function sendNotification(
  submissionId: string,
  lead: Record<string, string | undefined>,
): Promise<{ ok: boolean; emailId?: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return { ok: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Idempotency-Key": `lead-${submissionId}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [NOTIFY_EMAIL],
        subject: `New Lead: ${lead.name} — Pennsylvania`,
        html: notificationHtml(lead),
      }),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });

    const responseBody = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error(`Resend rejected notification (${response.status}):`, JSON.stringify(responseBody));
      return { ok: false };
    }
    return { ok: true, emailId: typeof responseBody.id === "string" ? responseBody.id : undefined };
  } catch (err) {
    console.error("Resend request failed:", err instanceof Error ? err.message : err);
    return { ok: false };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ success: false, error: "Method not allowed" }, 405);
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: "Invalid request body" }, 400);
  }

  for (const field of REQUIRED_FIELDS) {
    if (!text(body, field)) {
      return json({ success: false, error: `Missing or invalid field: ${field}` }, 400);
    }
  }

  const phone = text(body, "phone")!;
  if (phone.replace(/\D/g, "").length < 7) {
    return json({ success: false, error: "Invalid field: phone" }, 400);
  }

  const submittedAt = new Date().toISOString();
  const lead: Record<string, string | undefined> = {
    name: text(body, "name"),
    phone,
    service_needed: text(body, "service_needed"),
    territory: text(body, "territory"),
    lead_source: text(body, "lead_source"),
    landing_page: text(body, "landing_page"),
    page_url: text(body, "page_url"),
    submitted_at: submittedAt,
  };
  for (const field of OPTIONAL_TRACKING_FIELDS) {
    lead[field] = text(body, field);
  }

  const submissionId = text(body, "submission_id")!;

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const existing = await supabase
      .from("leads")
      .select("id, email_status")
      .eq("submission_id", submissionId)
      .maybeSingle();
    if (existing.error) throw existing.error;

    let stored = existing.data;
    if (!stored) {
      const inserted = await supabase
        .from("leads")
        .insert({ ...lead, submission_id: submissionId, email_status: "pending" })
        .select("id, email_status")
        .single();
      if (inserted.error?.code === "23505") {
        const raced = await supabase
          .from("leads")
          .select("id, email_status")
          .eq("submission_id", submissionId)
          .single();
        if (raced.error) throw raced.error;
        stored = raced.data;
      } else if (inserted.error) {
        throw inserted.error;
      } else {
        stored = inserted.data;
      }
    }

    if (stored.email_status === "sent") {
      return json({ success: true, id: stored.id, duplicate: true }, 200);
    }

    const notification = await sendNotification(submissionId, lead);

    const updated = await supabase
      .from("leads")
      .update({
        email_status: notification.ok ? "sent" : "failed",
        email_id: notification.emailId ?? null,
      })
      .eq("id", stored.id);
    if (updated.error) console.error("Could not record email status:", updated.error.message);

    if (!notification.ok) {
      return json(
        { success: false, stage: "email", error: "Notification email was not accepted" },
        502,
      );
    }

    return json({ success: true, id: stored.id, email_accepted: true }, 200);
  } catch (err) {
    console.error("Lead submission failed:", err instanceof Error ? err.message : err);
    return json({ success: false, error: "Could not save the request" }, 500);
  }
});
