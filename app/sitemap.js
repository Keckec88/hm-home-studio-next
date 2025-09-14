import { headers } from "next/headers";

export default function sitemap() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const base = `${proto}://${host}`;

  const now = new Date();
  return [
    { url: `${base}/`,           lastModified: now },
    { url: `${base}/impressum`,  lastModified: now },
    { url: `${base}/datenschutz`,lastModified: now },
  ];
}
