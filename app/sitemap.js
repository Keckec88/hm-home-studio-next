export default function sitemap() {
  const base = "https://hm-home-studio-next.vercel.app"; // zamenjaj, ko boš imel svojo domeno
  const now = new Date();
  return [
    { url: ${base}/,           lastModified: now },
    { url: ${base}/impressum,  lastModified: now },
    { url: ${base}/datenschutz,lastModified: now },
  ];
}
