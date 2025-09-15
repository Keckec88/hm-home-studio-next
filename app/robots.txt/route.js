// app/robots.txt/route.js
import { headers } from "next/headers";

export function GET() {
  // dinamično zgradi pravilno domeno (lokalno: http://localhost:3000, produkcija: tvoja domena)
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = `${proto}://${host}`;

  const body = `User-agent: *
Allow: /
Sitemap: ${base}/sitemap.xml`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
