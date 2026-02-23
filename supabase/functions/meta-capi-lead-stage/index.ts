import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const PIXEL_ID = Deno.env.get("META_PIXEL_ID")!;
const ACCESS_TOKEN = Deno.env.get("META_CAPI_ACCESS_TOKEN")!;
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

const STAGE_TO_EVENT: Record<string, string> = {
  "Booked & Confirmed": "Schedule",
  "Converted Customer": "Purchase",
};

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { type, record, old_record } = await req.json();

    // On INSERT, check the new record's stage.
    // On UPDATE, only fire if stage actually changed.
    if (type === "UPDATE" && old_record?.stage === record?.stage) {
      return new Response(JSON.stringify({ skipped: "stage unchanged" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const eventName = STAGE_TO_EVENT[record?.stage];
    if (!eventName) {
      return new Response(JSON.stringify({ skipped: "stage not mapped" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userData: Record<string, string> = {};
    if (record.full_name) userData.fn = await sha256(record.full_name);
    if (record.phone) {
      const digitsOnly = record.phone.replace(/\D/g, "");
      userData.ph = await sha256(digitsOnly);
    }
    if (record.email) userData.em = await sha256(record.email);

    const eventId = `${record.id}.${record.stage}.${Date.now()}`;

    const eventData: Record<string, unknown> = {
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "system_generated",
      user_data: userData,
    };

    if (eventName === "Purchase" && record.deal_value != null) {
      eventData.custom_data = {
        currency: "USD",
        value: Number(record.deal_value),
      };
    }

    const payload = { data: [eventData], access_token: ACCESS_TOKEN };

    const metaRes = await fetch(GRAPH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const metaBody = await metaRes.json();
    console.log("meta-capi-lead-stage:", eventName, record.id, metaBody);

    return new Response(JSON.stringify(metaBody), {
      status: metaRes.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("meta-capi-lead-stage error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});
