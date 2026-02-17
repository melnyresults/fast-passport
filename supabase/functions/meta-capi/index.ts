import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const PIXEL_ID = Deno.env.get("META_PIXEL_ID")!;
const ACCESS_TOKEN = Deno.env.get("META_CAPI_ACCESS_TOKEN")!;
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const {
      event_name,
      event_id,
      source_url,
      user_agent,
      fbc,
      fbp,
      first_name,
      phone,
      email,
      custom_data,
      test_event_code,
    } = body;

    if (!event_name || !event_id) {
      return new Response(
        JSON.stringify({ error: "event_name and event_id are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userData: Record<string, string> = {};
    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;
    if (first_name) userData.fn = await sha256(first_name);
    if (phone) {
      const digitsOnly = phone.replace(/\D/g, "");
      userData.ph = await sha256(digitsOnly);
    }
    if (email) userData.em = await sha256(email);

    const eventData: Record<string, unknown> = {
      event_name,
      event_id,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: {
        ...userData,
        client_user_agent: user_agent || req.headers.get("user-agent") || "",
        client_ip_address:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          req.headers.get("cf-connecting-ip") ||
          "",
      },
    };

    if (source_url) eventData.event_source_url = source_url;
    if (custom_data) eventData.custom_data = custom_data;

    const payload: Record<string, unknown> = {
      data: [eventData],
      access_token: ACCESS_TOKEN,
    };
    if (test_event_code) payload.test_event_code = test_event_code;

    const metaRes = await fetch(GRAPH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const metaBody = await metaRes.json();

    return new Response(JSON.stringify(metaBody), {
      status: metaRes.ok ? 200 : 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("meta-capi error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
