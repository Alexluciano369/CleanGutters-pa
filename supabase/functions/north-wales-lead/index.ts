import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    const required = [
      "territory",
      "lead_source",
      "landing_page",
      "name",
      "phone",
      "page_url",
    ];
    for (const field of required) {
      if (!body[field] || typeof body[field] !== "string") {
        return new Response(
          JSON.stringify({ error: `Missing or invalid field: ${field}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    const submittedAt = new Date().toISOString();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error: dbError } = await supabase
      .from("leads")
      .insert({
        territory: body.territory,
        lead_source: body.lead_source,
        landing_page: body.landing_page,
        name: body.name.trim(),
        email: body.email?.trim() || null,
        phone: body.phone.trim(),
        zip_code: body.zip_code?.trim() || null,
        service_needed: body.service_needed?.trim() || null,
        address: body.address?.trim() || null,
        message: body.message?.trim() || null,
        sms_consent: body.sms_consent === true ? true : false,
        gclid: body.gclid || null,
        gbraid: body.gbraid || null,
        wbraid: body.wbraid || null,
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        utm_term: body.utm_term || null,
        utm_content: body.utm_content || null,
        page_url: body.page_url,
        submitted_at: submittedAt,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const leadEmail = "alexluciano369@gmail.com";
    let emailStatus: string = "not_attempted";

    if (leadEmail) {
      const rows = [
        ["Name", body.name],
        ["Phone", body.phone],
        ["ZIP Code", body.zip_code || "Not provided"],
        ["Service Needed", body.service_needed || "Not provided"],
        ["Email", body.email || "Not provided"],
        ["Address", body.address || "Not provided"],
        ["Message", body.message || "Not provided"],
        ["SMS Consent", body.sms_consent === true ? "Yes" : "No"],
        ["", ""],
        ["Territory", body.territory],
        ["Lead Source", body.lead_source],
        ["Landing Page", body.landing_page],
        ["Page URL", body.page_url],
        ["Submitted At", submittedAt],
        ["", ""],
        ["GCLID", body.gclid || "N/A"],
        ["GBRAID", body.gbraid || "N/A"],
        ["WBRAID", body.wbraid || "N/A"],
        ["UTM Source", body.utm_source || "N/A"],
        ["UTM Medium", body.utm_medium || "N/A"],
        ["UTM Campaign", body.utm_campaign || "N/A"],
        ["UTM Term", body.utm_term || "N/A"],
        ["UTM Content", body.utm_content || "N/A"],
      ];

      const emailHtml = `<h2>New Lead — North Wales, PA Landing Page</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:4px 16px 4px 0;font-weight:bold;">${label}</td><td>${value}</td></tr>`
  )
  .join("\n")}
</table>`;

      try {
        const resendKey = Deno.env.get("RESEND_API_KEY");
        if (resendKey) {
          const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendKey}`,
            },
            body: JSON.stringify({
              from: "CleanGutters Leads <onboarding@resend.dev>",
              to: [leadEmail],
              replyTo: "cleangutters2008@gmail.com",
              subject: `New Lead: ${body.name} — North Wales, PA`,
              html: emailHtml,
            }),
          });

          const emailResBody = await emailRes.text().catch(() => "unknown");
          if (!emailRes.ok) {
            console.error(
              `Resend email failed (${emailRes.status}): ${emailResBody}`
            );
            emailStatus = `failed (${emailRes.status}): ${emailResBody}`;
          } else {
            emailStatus = "sent";
          }
        } else {
          emailStatus = "no_resend_key";
          console.log(
            `Lead ${data.id} saved. RESEND_API_KEY not configured — email not sent to ${leadEmail}.`
          );
        }
      } catch (emailErr) {
        emailStatus = `exception: ${emailErr.message}`;
        console.error("Email notification error:", emailErr.message);
      }
    } else {
      emailStatus = "not_attempted";
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
