"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, X, Phone, MapPin, Send } from "lucide-react";

type Props = {
  locale?: "de" | "sl" | "en";
  whatsappNumber?: string; // brez +
  phone?: string;
  mapsQuery?: string;
  buttonLabel?: string;
};

const copy = {
  de: {
    title: "Pomočnik",
    ask: "Kako vam lahko pomagam?",
    quick: "Hitre možnosti",
    toWA: "Napiši WhatsApp",
    call: "Pokliči",
    where: "Kje smo?",
    close: "Zapri",
  },
  sl: {
    title: "Pomočnik",
    ask: "Kako ti lahko pomagam?",
    quick: "Hitre možnosti",
    toWA: "Piši na WhatsApp",
    call: "Pokliči",
    where: "Kje smo?",
    close: "Zapri",
  },
  en: {
    title: "Assistant",
    ask: "How can I help?",
    quick: "Quick actions",
    toWA: "Write on WhatsApp",
    call: "Call",
    where: "Where are we?",
    close: "Close",
  },
};

export default function Assistant({
  locale = "sl",
  whatsappNumber,
  phone,
  mapsQuery,
  buttonLabel = "Pomoč",
}: Props) {
  const t = copy[locale] ?? copy.sl;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  // omogoči odpiranje preko gumba v headerju
  useEffect(() => {
    (window as any).hmAssistantOpen = () => setOpen(true);
    return () => {
      (window as any).hmAssistantOpen = undefined;
    };
  }, []);

  // zakleni scroll v ozadju, ko je odprto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // za mobitel “dvignemo” pogled
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const waBase = whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined;
  const maps = mapsQuery
    ? `https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`
    : undefined;

  return (
    <>
      {/* FAB gumb – večji in jasno označen */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300/50"
          aria-label={buttonLabel}
        >
          <MessageCircle className="h-5 w-5" />
          <span>{buttonLabel}</span>
        </button>
      )}

      {/* Bottom-sheet */}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* sheet */}
          <div className="relative z-[90] w-full max-w-md rounded-t-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-rose-600" />
                <h3 className="text-lg font-semibold">{t.title}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-slate-100"
                aria-label={t.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
              <p className="mb-3 text-slate-600">{t.ask}</p>

              <div className="mb-4 flex items-center gap-2 rounded-xl border p-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Npr.: Kdaj imate termin? Cena? Naslov?"
                  className="w-full bg-transparent px-2 py-2 outline-none"
                />
                {waBase && (
                  <a
                    href={`${waBase}?text=${encodeURIComponent(q || "Pozdrav! Zanima me ...")}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 font-medium text-white hover:bg-[#1ebe5a]"
                  >
                    <Send className="h-4 w-4" />
                  </a>
                )}
              </div>

              <p className="mb-2 text-sm font-medium text-slate-500">{t.quick}</p>
              <div className="grid grid-cols-2 gap-3">
                {waBase && (
                  <a
                    href={waBase}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 font-medium text-white hover:bg-[#1ebe5a]"
                  >
                    <MessageCircle className="h-4 w-4" /> {t.toWA}
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 font-medium"
                  >
                    <Phone className="h-4 w-4" /> {t.call}
                  </a>
                )}
                {maps && (
                  <a
                    href={maps}
                    target="_blank"
                    className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 font-medium"
                  >
                    <MapPin className="h-4 w-4" /> {t.where}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


