"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  MessageCircle,
  Phone,
  Instagram,
  MapPin,
  Clock,
  Lock,
  Unlock,
  Download,
  Upload,
  Mail,
  Scissors,
  Sparkles,
} from "lucide-react";
import Assistant from "./components/Assistant";

/* === PODATKI PODJETJA === */
const BUSINESS = {
  name: "HM home studio",
  owner: "Hati Matijasevic",
  address: "Wallweg 21, 63450 Hanau",
  email: "hati.matijasevic@gmail.com",
  phoneDisplay: "+49 176 63298747",
  phoneTel: "+4917663298747",
  instagram: "https://www.instagram.com/hm.homestudio",
  taxNote: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet",
};

/* === PREVODI === */
const translations = {
  de: {
    heroTitle: "Schönheit mit Liebe zum Detail",
    heroText:
      "Maniküre, UV-Gel Nägel in unserem Homestudio in Hanau. Qualität, Hygiene und Freundlichkeit stehen an erster Stelle.",
    reserve: "Termin reservieren",
    servicesTitle: "Leistungen",
    pricelistTitle: "Preise",
    nailsTitle: "UV-Gel & Maniküre",
    lashesTitle: "Wimpern",
    galleryTitle: "Galerie",
    galleryNails: "Nägel",
    galleryLashes: "Wimpern",
    contactTitle: "Kontakt & Reservierungen",
    contactSubtitle: "Am schnellsten über WhatsApp oder Anruf.",
    bookingTitle: "Online-Termin",
    bookingSubtitle:
      "Wähle Service, Datum und Uhrzeit. Gern auch per WhatsApp oder Anruf.",
    bookingName: "Name",
    bookingService: "Service",
    bookingDate: "Datum",
    bookingDuration: "Dauer",
    bookingNoSlots: "Keine freien Termine an diesem Tag.",
    bookingAdmin: "Admin-Modus",
    bookingLock: "Sperren",
    bookingUnlock: "Freigeben",
    exportPlan: "Plan exportieren",
    importPlan: "Plan importieren",
    minutes: "Min",
    today: "Heute",
    locationBadge: "Parken in der Nähe • Kaffee/Tee inklusive",
    emailTemplate: "E-Mail Vorlage",
    studioTitle: "Studio",
    studioText:
      "Einblick in unser gemütliches Studio – sauber, komfortabel, mit rosegoldenen Akzenten.",
    prices: {
      nails: [
        ["Neumodellage UV-Gel (Natur/Babyboomer/French/Farbe)", "40 €"],
        ["Auffüllen (Natur/Babyboomer/French/Farbe)", "35 €"],
        ["Nailart ab", "3 €"],
        ["Maniküre mit Shellac", "30 €"],
        ["Shellac Füße", "25 €"],
      ],
      lashes: [
        ["1:1 (Classic) – Neu", "60 €"],
        ["Volumen (2D–5D) – Neu", "70 €"],
        ["Volumen (6D–10D) – Neu", "80 €"],
        ["Auffüllen 1:1 (3–4 Wochen)", "50 €"],
        ["Auffüllen Volumen 2D–5D (3–4 Wochen)", "60 €"],
        ["Auffüllen Volumen 6D–10D (3–4 Wochen)", "70 €"],
      ],
    },
  },
  en: {
    heroTitle: "Beauty with attention to detail",
    heroText:
      "Manicure, UV-gel nails… Quality, hygiene and kindness first.",
    reserve: "Book an appointment",
    servicesTitle: "Services",
    pricelistTitle: "Price list",
    nailsTitle: "UV-Gel & Manicure",
    lashesTitle: "Lashes",
    galleryTitle: "Gallery",
    galleryNails: "Nails",
    galleryLashes: "Lashes",
    contactTitle: "Contact & Reservations",
    contactSubtitle: "Fastest via WhatsApp or call.",
    bookingTitle: "Online booking",
    bookingSubtitle:
      "Choose service, date and time. Also via WhatsApp or call.",
    bookingName: "Name",
    bookingService: "Service",
    bookingDate: "Date",
    bookingDuration: "Duration",
    bookingNoSlots: "No available slots on this day.",
    bookingAdmin: "Admin mode",
    bookingLock: "Block",
    bookingUnlock: "Unblock",
    exportPlan: "Export plan",
    importPlan: "Import plan",
    minutes: "min",
    today: "Today",
    locationBadge: "Parking nearby • Coffee/tea included",
    emailTemplate: "Email template",
    studioTitle: "Studio",
    studioText:
      "A glimpse into our cozy studio — clean, comfortable, with rose-gold details.",
    prices: {
      nails: [
        ["New UV-gel set (Natural/Babyboomer/French/Color)", "€40"],
        ["Refill (Natural/Babyboomer/French/Color)", "€35"],
        ["Nail art from", "€3"],
        ["Manicure with Shellac", "€30"],
        ["Shellac Toes", "€25"],
      ],
      lashes: [
        ["Classic 1:1 – New", "€60"],
        ["Volume (2D–5D) – New", "€70"],
        ["Volume (6D–10D) – New", "€80"],
        ["Refill Classic (3–4 weeks)", "€50"],
        ["Refill Volume 2D–5D (3–4 weeks)", "€60"],
        ["Refill Volume 6D–10D (3–4 weeks)", "€70"],
      ],
    },
  },
};

/* === UTIL ZA REZERVACIJE === */
const DEFAULT_PLAN = {
  slotMinutes: 120,
  weekdayStarts: ["10:30", "13:30", "18:30"],
  weekendRange: { start: "09:00", end: "18:00" },
  blockedISO: [],
};

const pad = (n) => String(n).padStart(2, "0");
const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const fromMinutes = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
const dateToISO = (date, time) => {
  const d = new Date(date);
  const [h, m] = time.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const formatLocal = (dt) =>
  new Date(dt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

function generateSlots(date, plan, selectedDuration) {
  const d = new Date(date);
  const wkRange = plan.weekendRange || DEFAULT_PLAN.weekendRange;
  const wkStarts = plan.weekdayStarts || DEFAULT_PLAN.weekdayStarts;
  const slotStep = plan.slotMinutes || DEFAULT_PLAN.slotMinutes;

  const weekday = d.getDay(); // 0=Sun … 6=Sat
  const now = new Date();
  const out = [];

  if (weekday >= 1 && weekday <= 5) {
    const weekdayEnd = { "10:30": "12:30", "13:30": "15:30", "18:30": "20:30" };
    for (const hhmm of wkStarts) {
      const endOK =
        !selectedDuration ||
        toMinutes(hhmm) + selectedDuration <= toMinutes(weekdayEnd[hhmm]);
      const iso = dateToISO(d, hhmm);
      const past = new Date(iso) < now;
      const blocked = plan.blockedISO.includes(iso);
      if (!past && endOK) out.push({ hhmm, iso, blocked });
    }
    return out;
  }

  const startMin = toMinutes(wkRange.start);
  const endMin = toMinutes(wkRange.end);
  for (let t = startMin; t + slotStep <= endMin; t += slotStep) {
    const hhmm = fromMinutes(t);
    const iso = dateToISO(d, hhmm);
    const past = new Date(iso) < now;
    const blocked = plan.blockedISO.includes(iso);
    const durationOK = !selectedDuration || t + selectedDuration <= endMin;
    if (!past && !blocked && durationOK) out.push({ hhmm, iso, blocked });
  }
  return out;
}

/* — poravnava cene (€) — */
function PriceTag({ price }) {
  const s = String(price).trim();
  const m = s.match(/^([€$])?\s*([\d.,]+)\s*([€$])?$/);
  const leading = !!m?.[1];
  const curr = m?.[1] || m?.[3] || "€";
  const num = m?.[2] || s;

  return (
    <span
      className="inline-flex items-baseline gap-1 whitespace-nowrap"
      style={{ fontFeatureSettings: '"tnum" 1' }}
    >
      {leading && <span>{curr}</span>}
      <span className="tabular-nums">{num}</span>
      {!leading && <span>{curr}</span>}
    </span>
  );
}

/* === STRAN === */
export default function Page() {
  const [lang, setLang] = useState("de");
  const t = translations[lang] || translations.de;

  // plan + persist
  const [plan, setPlan] = useState(() => {
    try {
      const raw = localStorage.getItem("hm_plan");
      const saved = raw ? JSON.parse(raw) : {};
      const merged = { ...DEFAULT_PLAN, ...saved };
      if (!merged.weekendRange) merged.weekendRange = DEFAULT_PLAN.weekendRange;
      if (!merged.weekdayStarts) merged.weekdayStarts = DEFAULT_PLAN.weekdayStarts;
      if (!merged.slotMinutes) merged.slotMinutes = DEFAULT_PLAN.slotMinutes;
      if (!Array.isArray(merged.blockedISO)) merged.blockedISO = [];
      return merged;
    } catch {
      return DEFAULT_PLAN;
    }
  });
  useEffect(() => {
    localStorage.setItem("hm_plan", JSON.stringify(plan));
  }, [plan]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayStr);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(plan.slotMinutes);

  const allServices = useMemo(() => {
    const n = t?.prices?.nails ?? [];
    const l = t?.prices?.lashes ?? [];
    return [...n, ...l].map(([label]) => label);
  }, [t]);
  const [service, setService] = useState("");
  useEffect(() => {
    setService(allServices[0] || "");
  }, [allServices]);

  const slots = useMemo(() => generateSlots(date, plan, duration), [date, plan, duration]);

  /* === Admin PIN (brez prompta) – 4391 === */
  const ADMIN_PIN = "4391";
  const [admin, setAdmin] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (localStorage.getItem("hm_admin") === "1") setAdmin(true);
  }, []);
  useEffect(() => {
    if (admin) localStorage.setItem("hm_admin", "1");
    else localStorage.removeItem("hm_admin");
  }, [admin]);

  const onAdminClick = () => {
    if (admin) {
      setAdmin(false);
      return;
    }
    setShowPin((s) => !s);
  };
  const submitPin = () => {
    if (pin === ADMIN_PIN) {
      setAdmin(true);
      setShowPin(false);
      setPin("");
    } else {
      setPin("");
    }
  };

  const toggleBlock = (slot) =>
    setPlan((p) => ({
      ...p,
      blockedISO: p.blockedISO.includes(slot.iso)
        ? p.blockedISO.filter((x) => x !== slot.iso)
        : [...p.blockedISO, slot.iso],
    }));

  const whatsappBase = `https://wa.me/${BUSINESS.phoneTel}`;
  const sendToWhatsApp = (slot) => {
    const text = encodeURIComponent(
      `Pozdrav HM home studio!\n${t.bookingName}: ${name || "-"}\nJezik/Language: ${lang.toUpperCase()}\n${t.bookingService}: ${service}\n${t.bookingDate}: ${date} ${slot.hhmm}\n${t.bookingDuration}: ${duration} ${t.minutes}`,
    );
    window.open(`${whatsappBase}?text=${text}`, "_blank");
  };

  const [copied, setCopied] = useState(false);
  const handleCopyEmail = (slot) => {
    const start = formatLocal(slot.iso);
    const body = `Liebe/r Kunde,\n\nVielen Dank für Ihre Anfrage bei HM home studio.\n• Service: ${service}\n• Termin: ${start}\n• Dauer: ca. ${duration} Min\n• Adresse: ${BUSINESS.address}\n\nLiebe Grüße\n${BUSINESS.owner}\n${BUSINESS.name}`;
    navigator.clipboard
      .writeText(body)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  const [lightbox, setLightbox] = useState(null);

  const assistantLocale = lang === "de" ? "de" : "sl";

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#hero" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="HM home studio"
              className="h-10 w-10 rounded-full bg-white object-contain ring-1 ring-black/5 shadow"
            />
            <span className="font-semibold">
              HM <span className="text-rose-600">home</span> studio
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#services">{t.servicesTitle}</a>
            <a href="#prices">{t.pricelistTitle}</a>
            <a href="#booking">{t.bookingTitle}</a>
            <a href="#gallery">{t.galleryTitle}</a>
            <a href="#studio">{t.studioTitle}</a>
            <a href="#contact">Kontakt</a>
          </nav>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => setLang(e.target.value)}
              value={lang}
              className="rounded-lg border px-2 py-1"
              aria-label="Language"
            >
              <option value="de">🇩🇪 DE</option>
              <option value="en">🇬🇧 EN</option>
            </select>
            {/* CTA → skok do termina */}
            <a
              href="#termin"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300/50"
            >
              <MessageCircle className="size-4" /> {t.reserve}
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold">{t.heroTitle}</h1>
            <p className="mb-6 text-lg">{t.heroText}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#termin"
                className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300/50"
              >
                <MessageCircle className="size-5" /> {t.reserve}
              </a>

              {/* Telefon – rahlo poudarjen */}
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50/60 px-4 py-2 font-medium text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50"
              >
                <Phone className="size-5" /> {BUSINESS.phoneDisplay}
              </a>

              {/* Instagram – brand gradient */}
              <a
                href={BUSINESS.instagram}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-4 py-2 font-medium text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#DD2A7B]/40"
              >
                <Instagram className="size-5" /> Instagram
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white/90 p-6 shadow-lg">
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-white p-6 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">STUDIO</p>
                <h3 className="mt-1 text-2xl font-semibold">{BUSINESS.address}</h3>
                <p className="mx-auto mt-2 max-w-xs text-slate-600">{t.locationBadge}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 text-rose-600 hover:underline"
                >
                  <MapPin className="size-4" /> Google Maps
                </a>
                <div className="mt-6 flex items-center justify-center gap-2 text-slate-600">
                  <Clock className="size-4" />
                  <span>Mo–Sa • nach Vereinbarung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section id="studio" className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-2xl">
              <img
                src="/studio.jpg"
                alt="HM home studio – notranjost salona"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="order-2 md:order-1">
            <h2 className="mb-4 text-3xl font-semibold">{t.studioTitle}</h2>
            <p className="leading-relaxed text-slate-600">{t.studioText}</p>
            <div className="mt-6 flex gap-3">
              <a
                href="#termin"
                className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300/50"
              >
                {t.reserve}
              </a>
              <a
                href={`https://wa.me/${BUSINESS.phoneTel}`}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 font-medium text-white shadow-sm transition hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
              >
                <MessageCircle className="size-5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-3xl font-semibold">{t.servicesTitle}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow">
              <Sparkles className="mb-3 size-6" />
              <h3 className="text-lg font-bold">UV-Gel Nägel</h3>
              <p className="text-slate-600">Natürlich oder auffällig – langlebig und formschön.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <Scissors className="mb-3 size-6" />
              <h3 className="text-lg font-bold">Maniküre</h3>
              <p className="text-slate-600">Sanfte Pflege der Nagelhaut, Form & Politur.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <Sparkles className="mb-3 size-6" />
              <h3 className="text-lg font-bold">Wimpern</h3>
              <p className="text-slate-600">Klassisch 1:1 oder Volumen 2D–10D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="bg-rose-50 py-20" data-section="prices">
        <div id="cenik" className="-mt-24 pt-24" />
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-bold">{t.nailsTitle}</h3>
            <ul className="space-y-2">
              {(t.prices?.nails ?? []).map(([n, p], i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-2 border-b pb-1"
                >
                  <span>{n}</span>
                  <PriceTag price={p} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-bold">{t.lashesTitle}</h3>
            <ul className="space-y-2">
              {(t.prices?.lashes ?? []).map(([n, p], i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-2 border-b pb-1"
                >
                  <span>{n}</span>
                  <PriceTag price={p} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">Gültig ab 01.09.2025</p>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20">
        <div id="termin" className="-mt-24 pt-24" />
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 text-3xl font-semibold">{t.bookingTitle}</h2>
          <p className="mb-6 text-slate-600">{t.bookingSubtitle}</p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* FORM */}
            <div className="rounded-xl bg-white p-6 shadow md:col-span-1">
              <label className="text-sm text-slate-600">{t.bookingName}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.bookingName}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              />

              <label className="text-sm text-slate-600">{t.bookingService}</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              >
                {allServices.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <label className="text-sm text-slate-600">{t.bookingDate}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              />

              <label className="text-sm text-slate-600">{t.bookingDuration}</label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              >
                {[90, 120].map((m) => (
                  <option key={m} value={m}>
                    {m} {t.minutes}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setDate(new Date().toISOString().slice(0, 10))}
                className="text-sm text-rose-600 underline"
              >
                {t.today}
              </button>

              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border p-3">
                <button
                  onClick={onAdminClick}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                >
                  {admin ? <Unlock className="size-4" /> : <Lock className="size-4" />}{" "}
                  {t.bookingAdmin}
                </button>

                {!admin && showPin && (
                  <div className="flex items-center gap-2">
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitPin();
                      }}
                      placeholder="PIN"
                      className="w-20 rounded-lg border px-2 py-1 text-center tracking-widest"
                    />
                    <button
                      onClick={submitPin}
                      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                    >
                      OK
                    </button>
                  </div>
                )}

                {admin && (
                  <>
                    <button
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(plan, null, 2)], {
                          type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "hm-plan.json";
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                    >
                      <Download className="size-4" /> {t.exportPlan}
                    </button>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm">
                      <Upload className="size-4" /> {t.importPlan}
                      <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            try {
                              const obj = JSON.parse(reader.result);
                              setPlan(obj);
                            } catch {
                              alert("Invalid JSON");
                            }
                          };
                          reader.readAsText(file);
                        }}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* SLOTS */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                {slots.length === 0 && (
                  <div className="col-span-full text-slate-600">{t.bookingNoSlots}</div>
                )}

                {slots.map((slot) => (
                  <div key={slot.iso} className="rounded-xl border bg-white p-2">
                    <div className="text-center font-medium">{slot.hhmm}</div>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {/* WhatsApp */}
                      <button
                        disabled={slot.blocked && !admin}
                        onClick={() => (admin ? toggleBlock(slot) : sendToWhatsApp(slot))}
                        className={
                          admin
                            ? "inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm"
                            : `inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 ${
                                slot.blocked ? "cursor-not-allowed opacity-50" : ""
                              }`
                        }
                        title={admin ? (slot.blocked ? t.bookingUnlock : t.bookingLock) : "WhatsApp"}
                      >
                        <MessageCircle className="size-4" /> WhatsApp
                      </button>

                      {/* kopiraj email predlogo */}
                      <button
                        onClick={() => handleCopyEmail(slot)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm"
                      >
                        <Mail className="size-4" /> {t.emailTemplate}
                      </button>

                      {copied && (
                        <div className="text-center text-xs text-green-600">Kopirano</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {admin && (
                <p className="mt-3 text-xs text-slate-500">
                  Admin: klik na termin ga {t.bookingLock.toLowerCase()}/
                  {t.bookingUnlock.toLowerCase()}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY (skrajšano) */}
      <section id="gallery" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-3xl font-semibold">{t.galleryTitle}</h2>
          <h3 className="mb-6 text-2xl font-semibold">{t.galleryNails}</h3>
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-rose-50 ring-1 ring-black/5" />
            ))}
          </div>
          <h3 className="mb-6 text-2xl font-semibold">{t.galleryLashes}</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-rose-50 ring-1 ring-black/5" />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-rose-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-bold">{t.contactTitle}</h3>
            <p className="mb-4 text-slate-600">{t.contactSubtitle}</p>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a
                  href={`https://wa.me/${BUSINESS.phoneTel}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 font-medium text-white shadow-sm transition hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
                >
                  <MessageCircle className="size-5" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50/60 px-4 py-2 font-medium text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300/50"
                >
                  <Phone className="size-5" /> {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2">
                  <Mail className="size-5" /> {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <MapPin className="size-5" /> {BUSINESS.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6">
          <div>
            © {new Date().getFullYear()} {BUSINESS.name} – {BUSINESS.owner}, {BUSINESS.address} •{" "}
            {BUSINESS.taxNote}
          </div>
          <div className="flex items-center gap-4">
            <a href="/impressum" className="underline underline-offset-4 hover:text-rose-700">
              Impressum
            </a>
            <span>•</span>
            <a href="/datenschutz" className="underline underline-offset-4 hover:text-rose-700">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>

      {/* Avatar / pomočnik */}
      <Assistant
        locale={assistantLocale}
        whatsappNumber={BUSINESS.phoneTel.replace("+", "")}
        phone={BUSINESS.phoneTel}
        mapsQuery={BUSINESS.address}
      />
    </div>
  );
}
