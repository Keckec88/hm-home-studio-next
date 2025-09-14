import { headers } from "next/headers";

export function GET() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = `${proto}://${host}`;

  const body = `User-agent: *
Allow: /
Sitemap: ${base}/sitemap.xml`;

  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}

