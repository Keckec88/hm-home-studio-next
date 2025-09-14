import { headers } from "next/headers";

export async function GET() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = ${proto}://System.Management.Automation.Internal.Host.InternalHost;

  const urls = [
    ${base}/,
    ${base}/impressum,
    ${base}/datenschutz,
  ];

  const body =
    <?xml version="1.0" encoding="UTF-8"?> +
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> +
    urls.map(u => <url><loc></loc><lastmod></lastmod></url>).join("") +
    </urlset>;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
