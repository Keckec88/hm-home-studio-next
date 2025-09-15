import { headers } from "next/headers";

export async function GET() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "hmhomestudio.de";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = `${proto}://${host}`;
  const lastmod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><lastmod>${lastmod}</lastmod></url>
  <url><loc>${base}/impressum</loc><lastmod>${lastmod}</lastmod></url>
  <url><loc>${base}/datenschutz</loc><lastmod>${lastmod}</lastmod></url>
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
