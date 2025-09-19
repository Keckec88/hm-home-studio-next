"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Phone, MapPin, Clock, CalendarDays, Euro, Instagram, MessageSquare } from "lucide-react";

type Locale = "de" | "sl" | "en";

type AssistantProps = {
  locale?: Locale;
  /** WhatsApp številka brez + (npr. 4917663298747) */
  whatsappNumber?: string;
  /** prikazna telefonska številka (npr. +49 176 63298747) */
  phone?: string;
  /** niz za Google Maps query (npr. “Wallweg 21, 63450 Hanau”) */
  mapsQuery?: string;
};

type QA = {
  id: string;
  keywords: string[]; // vsa v lower-case
  answer: { de: string; sl: string; en: string };
};

const FAQ: QA[] = [
  {
    id: "booking",
    keywords: ["termin", "rezerv", "book", "online", "appointment"],
    answer: {
      de: "Klici oder nutze die WhatsApp-Nachricht. Oder klicke unten auf „Zum Online-Termin“, ich scrolle dich direkt dorthin. 😊",
      sl: "Uporabi WhatsApp ali pokliči. Lahko pa klikneš tudi „Na spletni termin“ in te odpeljem do obrazca. 😊",
      en: "Use WhatsApp or call. Or click “Go to booking” and I’ll scroll you to the form. 😊",
    },
  },
  {
    id: "price",
    keywords: ["price", "preise", "cenik", "kosten", "euro", "€"],
    answer: {
      de: "Cenik/Preisliste najdeš na strani – spodaj v sekciji storitev. 📄 Wenn möchtest, klicke „Cenik/Preise“ – skrolam tja.",
      sl: "Cenik je na strani – v razdelku storitev. 📄 Če želiš, klikni „Cenik/Preise“ in te premaknem tja.",
      en: "The price list is on the page in the services section. 📄 Click “Prices” and I’ll scroll there.",
    },
  },
  {
    id: "address",
    keywords: ["address", "naslov", "addresse", "kje", "where", "lokacija", "location"],
    answer: {
      de: "Naslov: Wallweg 21, 63450 Hanau. Parken in der Nähe – Kaffee/Tee inklusive. ☕️",
      sl: "Naslov: Wallweg 21, 63450 Hanau. Parkirišče je blizu – kava/čaj vključena. ☕️",
      en: "Address: Wallweg 21, 63450 Hanau. Parking nearby – coffee/tea included. ☕️",
    },
  },
  {
    id: "hours",
    keywords: ["hours", "working", "zeit", "odpiralni", "öffnungs", "open", "pon", "mo", "sa", "sob"],
    answer: {
      de: "Delovni/Öffnungszeiten: po dogovoru (Mo–Sa). 📅 Schreibe uns gerne per WhatsApp.",
      sl: "Odpiralni čas: po dogovoru (Pon–Sob). 📅 Piši nam na WhatsApp.",
      en: "Opening hours: by appointment (Mon–Sat). 📅 Message us on WhatsApp.",
    },
  },
  {
    id: "instagram",
    keywords: ["insta", "instagram", "gallery", "galerija", "bilder", "fotos"],
    answer: {
      de: "Naše delo najdeš na Instagramu. 📸",
      sl: "Naše delo najdeš na Instagramu. 📸",
      en: "See our work on Instagram. 📸",
    },
  },
];

const UI = {
  open: {
    de: "Fragen? Ich helfe 😊",
    sl: "Vprašanje? Z veseljem pomagam 😊",
    en: "Need help? I’m here 😊",
  },
  title: {
    de: "HM Assistent",
    sl: "HM pomočnik",
    en: "HM Assistant",
  },
  inputPlaceholder: {
    de: "Schreibe deine Frage…",
    sl: "Napiši vprašanje…",
    en: "Type your question…",
  },
  quick: {
    booking: { de: "Zum Online-Termin", sl: "Na spletni termin", en: "Go to booking" },
    prices: { de: "Preise", sl: "Cenik", en: "Prices" },
    address: { de: "Adresse", sl: "Naslov", en: "Address" },
    hours: { de: "Öffnungszeiten", sl: "Odpiralni čas", en: "Hours" },
    whatsapp: { de: "WhatsApp", sl: "WhatsApp", en: "WhatsApp" },
    call: { de: "Anrufen", sl: "Pokliči", en: "Call" },
    instagram: { de: "Instagram", sl: "Instagram", en: "Instagram" },
  },
  sys: {
    hello: {
      de: "Hallo! Ich bin dein Assistent. Wobei kann ich helfen?",
      sl: "Živjo! Sem tvoj pomočnik. Kako lahko pomagam?",
      en: "Hi! I’m your assistant. How can I help?",
    },
    noMatch: {
      de: "Hmmm, bin mir nicht sicher. Möchtest du „Zum Online-Termin“ oder Infos zu Preisen/Adresse?",
      sl: "Hmm, nisem povsem prepričan. Želiš, da te premaknem na spletni termin ali te zanimajo cene/naslov?",
      en: "Hmm, not sure. Want me to scroll you to booking, or show prices/address?",
    },
  },
};

type Msg = { role: "user" | "bot"; text: string };

export default function Assistant({
  locale = "de",
  whatsappNumber,
  phone,
  mapsQuery = "Wallweg 21, 63450 Hanau",
}: AssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const t = useMemo(() => UI, []);
  const l = locale;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: t.sys.hello[l] }]);
    }
  }, [open, messages.length, t, l]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    const answer = findAnswer(text.toLowerCase());
    if (answer) {
      setMessages((m) => [...m, { role: "bot", text: answer }]);
    } else {
      setMessages((m) => [...m, { role: "bot", text: t.sys.noMatch[l] }]);
    }
  };

  const findAnswer = (q: string) => {
    // booking intent
    if (includesAny(q, ["termin", "rezerv", "book", "appointment"])) {
      return FAQ.find((f) => f.id === "booking")!.answer[l];
    }
    if (includesAny(q, ["preis", "price", "cenik", "euro", "€"])) {
      return FAQ.find((f) => f.id === "price")!.answer[l];
    }
    if (includesAny(q, ["address", "addresse", "naslov", "location", "where", "lokacija"])) {
      return FAQ.find((f) => f.id === "address")!.answer[l];
    }
    if (includesAny(q, ["hours", "odpiral", "öffnungs", "open", "pon", "mo", "sa", "sob"])) {
      return FAQ.find((f) => f.id === "hours")!.answer[l];
    }
    if (includesAny(q, ["insta", "instagram", "galerija", "bilder", "fotos"])) {
      return FAQ.find((f) => f.id === "instagram")!.answer[l];
    }

    // fallback: preprosto ujemanje po ključnih besedah v FAQ
    for (const f of FAQ) {
      if (f.keywords.some((k) => q.includes(k))) return f.answer[l];
    }
    return null;
  };

  const onQuick = (what: "booking" | "prices" | "address" | "hours" | "whatsapp" | "call" | "instagram") => {
    if (what === "booking") {
      // premakni na #termin in zapri
      try {
        const el = document.querySelector("#termin");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.hash = "#termin";
      } catch {}
      setOpen(false);
      return;
    }

    if (what === "prices") {
      // poskusi skrolati do sekcije cenika; če nimaš sidra, pusti le bot sporočilo
      const sent = tryScrollToSelector('[data-section="prices"], #cenik, #preise');
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: sent
            ? (FAQ.find((f) => f.id === "price")!.answer[l])
            : (FAQ.find((f) => f.id === "price")!.answer[l]),
        },
      ]);
      return;
    }

    if (what === "address") {
      setMessages((m) => [...m, { role: "bot", text: FAQ.find((f) => f.id === "address")!.answer[l] }]);
      if (mapsQuery) {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (what === "hours") {
      setMessages((m) => [...m, { role: "bot", text: FAQ.find((f) => f.id === "hours")!.answer[l] }]);
      return;
    }

    if (what === "whatsapp") {
      if (whatsappNumber) {
        window.open(`https://wa.me/${whatsappNumber}`, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (what === "call") {
      if (phone) {
        window.location.href = `tel:${phone.replace(/\s+/g, "")}`;
      }
      return;
    }

    if (what === "instagram") {
      window.open("https://instagram.com/", "_blank", "noopener,noreferrer");
      return;
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        aria-label="assistant"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-[1000] rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300 h-14 w-14 flex items-center justify-center"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Widget Panel */}
      {open && (
        <div className="fixed bottom-20 right-4 z-[1000] w-[92vw] max-w-[360px] rounded-2xl border border-rose-200 bg-white shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-rose-50 border-b">
            <div className="font-semibold text-rose-700">{t.title[l]}</div>
            <button
              className="rounded-full p-1 text-rose-600 hover:bg-rose-100"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-[50vh] overflow-auto px-3 py-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-900"
                  } max-w-[80%] whitespace-pre-wrap`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2 px-3 pb-2">
            <QuickButton onClick={() => onQuick("booking")} icon={<CalendarDays className="h-4 w-4" />} label={t.quick.booking[l]} />
            <QuickButton onClick={() => onQuick("prices")} icon={<Euro className="h-4 w-4" />} label={t.quick.prices[l]} />
            <QuickButton onClick={() => onQuick("address")} icon={<MapPin className="h-4 w-4" />} label={t.quick.address[l]} />
            <QuickButton onClick={() => onQuick("hours")} icon={<Clock className="h-4 w-4" />} label={t.quick.hours[l]} />
            <QuickButton onClick={() => onQuick("whatsapp")} icon={<MessageSquare className="h-4 w-4" />} label={t.quick.whatsapp[l]} color="whatsapp" />
            <QuickButton onClick={() => onQuick("call")} icon={<Phone className="h-4 w-4" />} label={t.quick.call[l]} />
            <QuickButton onClick={() => onQuick("instagram")} icon={<Instagram className="h-4 w-4" />} label={t.quick.instagram[l]} color="instagram" />
          </div>

          {/* Input */}
          <form
            className="flex items-center gap-2 border-t px-3 py-3 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
              setInput("");
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.inputPlaceholder[l]}
              className="flex-1 rounded-xl border border-rose-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <button
              type="submit"
              className="rounded-xl bg-rose-500 text-white px-3 py-2 text-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function includesAny(base: string, tokens: string[]) {
  return tokens.some((t) => base.includes(t));
}

function tryScrollToSelector(sel: string) {
  const el = document.querySelector(sel);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

type QuickProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color?: "whatsapp" | "instagram" | "default";
};

function QuickButton({ onClick, icon, label, color = "default" }: QuickProps) {
  const base =
    "flex items-center justify-center gap-1 rounded-xl border px-2 py-2 text-xs font-medium focus:outline-none transition";
  const styles =
    color === "whatsapp"
      ? "border-[#25D366]/40 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20"
      : color === "instagram"
      ? "border-pink-300 bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 text-rose-700 hover:from-pink-100 hover:to-purple-100"
      : "border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100";

  return (
    <button onClick={onClick} className={`${base} ${styles}`} type="button">
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}
