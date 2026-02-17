const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function generateEventId(): string {
  return `${Date.now()}.${Math.random().toString(36).slice(2, 11)}`;
}

interface CAPIEventParams {
  event_name: string;
  event_id: string;
  first_name?: string;
  phone?: string;
  email?: string;
  custom_data?: Record<string, unknown>;
}

export function sendCAPIEvent(params: CAPIEventParams): void {
  const { event_name, event_id, first_name, phone, email, custom_data } =
    params;

  const payload: Record<string, unknown> = {
    event_name,
    event_id,
    source_url: window.location.href,
    user_agent: navigator.userAgent,
    fbc: getCookie("_fbc"),
    fbp: getCookie("_fbp"),
  };

  if (first_name) payload.first_name = first_name;
  if (phone) payload.phone = phone;
  if (email) payload.email = email;
  if (custom_data) payload.custom_data = custom_data;

  fetch(`${SUPABASE_URL}/functions/v1/meta-capi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((err) => {
    console.error("CAPI event failed:", err);
  });
}
