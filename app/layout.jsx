// app/layout.jsx
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  // posodobi na svojo domeno (nastavljeno za produkcijo)
  metadataBase: new URL("https://hmhomestudio.de"),
  title: {
    default: "HM home studio",
    template: "%s | HM home studio",
  },
  description:
    "Manikura, UV gel nohti in podaljševanje trepalnic v prijetnem homestudiu v Hanau – kakovost, higiena in prijaznost.",
  keywords: [
    "manikura",
    "UV gel",
    "gel nohti",
    "trepalnice",
    "Hanau",
    "Hati Matijasevic",
    "HM home studio",
  ],
  alternates: {
    canonical: "/",
    // če imaš jezikovne različice, poti dopolni; sicer pusti tako
    languages: {
      de: "/",
      en: "/en",
      tr: "/tr",
      sr: "/sr",
      hr: "/hr",
    },
  },
  openGraph: {
    url: "/",
    type: "website",
    siteName: "HM home studio",
    locale: "de_DE",
    title: "HM home studio – Manikura, UV gel, trepalnice – Hanau",
    description:
      "Manikura, UV gel nohti in podaljševanje trepalnic v prijetnem homestudiu v Hanau.",
    // če boš dodal sliko /public/og-cover.jpg, bo uporabljena
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "HM home studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HM home studio – Hanau",
    description:
      "Manikura, UV gel nohti in podaljševanje trepalnic v prijetnem homestudiu v Hanau.",
    images: ["/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    sitemap: "https://hmhomestudio.de/sitemap.xml",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  category: "Beauty & Personal Care",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5dce2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-rose-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
