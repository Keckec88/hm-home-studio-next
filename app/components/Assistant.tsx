"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "de" | "sl";

const STRINGS: Record<Locale, any> = {
  de: {
    title: "Wie kann ich helfen?",
    book: "Termin buchen",
    prices: "Leistungen & Preise",
    location: "Standort & Parken",
    contact: "Kontakt",
    bookDesc: "Ich helfe dir, zum Buchungsbereich zu springen.",
    goToBooking: "Zum Buchungsbereich",
    pricesDesc: "Ich zeige dir, wo du die Preise findest.",
    goToPrices: "Zum Preisbereich",
    locationDesc:
      "Studio: Wallweg 21, 63450 Hanau. Parken in der Nähe, Kaffee/Tee inklusive.",
    openMaps: "In Google Maps öffnen",
    contactDesc: "Du erreichst uns per WhatsApp, Telefon oder E-Mail.",
    whatsapp: "WhatsApp öffnen",
    call: "Anrufen",
    copyEmail: "E-Mail-Vorlage kopieren",
    copied: "Vorlage kopiert!",
  },
  sl: {
    title: "Kako ti lahko pomagam?",
    book: "Rezervacija termina",
    prices: "Storitve & cenik",
    location: "Lokacija & parkirišče",
    contact: "Kontakt",
    bookDesc: "Pomagam ti skočiti do razdelka za rezervacijo.",
    goToBooking: "Na razdelek za rezervacijo",
    pricesDesc: "Pokažem, kje je cenik.",
    goToPrices: "Na razdelek cenik",
    locationDesc:
      "Studio: Wallweg 21, 63450 Hanau. Parkiranje v bližini, kava/čaj vključena.",
    openMaps: "Odpri v Google Maps",
    contactDesc: "Dosegljivi smo preko WhatsApp, telefona ali e-pošte.",
    whatsapp: "Odpri WhatsApp",
    call: "Pokliči",
    copyEmail: "Kopiraj e-poštno predlogo",
    copied: "Predloga kopirana!",
  },
};

const EMAIL_TEMPLATES: Record<Locale, string> = {
  de: `Hallo!

Ich möchte einen Termin reservieren:
• Leistung:
• Datum:
• Uhrzeit:
• Name:
• Telefon:

Danke!`,
  sl: `Zdravo!

Želim rezervirati termin:
• Storitev:
• Datum:
• Ura:
• Ime:
• Telefon:

Hvala!`,
};

type Props = {
  /** Jezik za prikaz (če ne podaš, privzeto "de"). */
  locale?: Locale;
  /** WhatsApp link (internacionalna oblika brez +, npr. 4917663298747) */
  whatsappNumber?: string;
  /** Telefonska številka (z +) */
  phone?: string;
  /** Google Maps query (naslov) */
  mapsQuery?: string;
};

/**
 * Plavajoči pomočnik/“avatar” v spodnjem desnem kotu.
 * Brez strežnika, brez API ključev.
 */
export default function Assistant({
  locale = "de",
  whatsappNumber = "4917663298747",
  phone = "+4917663298747",
  mapsQuery = "Wallweg 21, 63450 Hanau",
}: Props) {
  const T = STRINGS[locale] ?? STRINGS.de;
  const EMAIL_TEMPLATE = EMAIL_TEMPLATES[locale] ?? EMAIL_TEMPLATES.de;

  const [open, setOpen] = useState(false);
  const [notif, setNotif] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (open && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL_TEMPLATE);
    setNotif(T.copied);
    setTimeout(() => setNotif(null), 1500);
  };

  return (
    <>
      {/* Floating button */}
      <button
        aria-label="Assistant"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-400 text-white shadow-lg ring-1 ring-black/10 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
      >
        <span className="text-xl">🧑‍💼</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-20 right-5 z-50 w-[320px] max-w-[90vw] rounded-2xl bg-white/95 backdrop-blur shadow-2xl ring-1 ring-black/5"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-rose-100">
              🧑‍💼
            </div>
            <div className="font-semibold">{T.title}</div>
          </div>

          <div className="p-4 space-y-4">
            {/* book */}
            <div className="rounded-xl border bg-rose-50/60 p-3">
              <div className="font-medium mb-1">{T.book}</div>
              <div className="text-sm mb-2 text-rose-900/80">{T.bookDesc}</div>
              <button
                onClick={() => scrollTo("termin")}
                className="rounded-lg bg-rose-500 text-white px-3 py-1.5 text-sm hover:bg-rose-600 transition"
              >
                {T.goToBooking}
              </button>
            </div>

            {/* prices */}
            <div className="rounded-xl border p-3">
              <div className="font-medium mb-1">{T.prices}</div>
              <div className="text-sm mb-2 text-neutral-600">{T.pricesDesc}</div>
              <button
                onClick={() => scrollTo("cenik")}
                className="rounded-lg bg-neutral-800 text-white px-3 py-1.5 text-sm hover:bg-black transition"
              >
                {T.goToPrices}
              </button>
            </div>

            {/* location */}
            <div className="rounded-xl border p-3">
              <div className="font-medium mb-1">{T.location}</div>
              <div className="text-sm mb-2 text-neutral-600">{T.locationDesc}</div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`}
                target="_blank"
                className="inline-block rounded-lg bg-white border px-3 py-1.5 text-sm hover:bg-neutral-50 transition"
              >
                {T.openMaps}
              </a>
            </div>

            {/* contact */}
            <div className="rounded-xl border p-3">
              <div className="font-medium mb-2">{T.contact}</div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] text-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 transition"
                >
                  {/* WhatsApp icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.486 2 2 6.177 2 11.25c0 1.791.51 3.464 1.389 4.9L2 22l5.08-1.307A10.4 10.4 0 0 0 12 20.5c5.514 0 10-4.177 10-9.25S17.514 2 12 2Zm5.662 13.705c-.239.676-1.194 1.122-1.948 1.27-.519.103-1.197.184-3.476-.718-2.918-1.132-4.804-4.061-4.951-4.248-.148-.186-1.185-1.573-1.185-3.003 0-1.43.75-2.128 1.016-2.414.266-.285.584-.357.779-.357.194 0 .389.002.561.01.182.007.427-.069.669.51.239.574.814 1.985.886 2.13.072.146.12.317.023.503-.096.186-.144.303-.285.468-.142.165-.301.37-.43.498-.142.141-.29.295-.125.58.164.285.728 1.188 1.563 1.924 1.076.94 1.986 1.231 2.27 1.377.284.146.451.126.62-.075.168-.201.716-.835.907-1.121.19-.285.378-.238.629-.141.251.097 1.594.75 1.868.885.275.135.457.2.525.313.068.114.068.66-.171 1.336Z"/>
                  </svg>
                  {T.whatsapp}
                </a>

                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50/60 text-rose-700 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50 transition"
                >
                  ☎ {T.call}
                </a>

                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white px-3 py-1.5 text-sm font-medium shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#DD2A7B]/40 transition"
                >
                  ✉ {T.copyEmail}
                </button>
              </div>
            </div>
          </div>

          {notif && <div className="px-4 pb-3 text-sm text-green-700">{notif}</div>}
        </div>
      )}
    </>
  );
}
