"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
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
  ShieldCheck,
} from "lucide-react";

// Assistant is client-only
const Assistant = dynamic(() => import("./components/Assistant"), { ssr: false });

/* =====================================================
   BUSINESS DATA
   ===================================================== */
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

/* =====================================================
   TRANSLATIONS (8 languages)
   Minimal keys: keep identical structure so UI stays stable
   ===================================================== */
const basePrices = {
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
};

const t = {
  de: {
    heroTitle: "Schönheit mit Liebe zum Detail",
    heroText:
      "Maniküre, UV-Gel Nägel in unserem Homestudio in Hanau. Qualität, Hygiene und Freundlichkeit stehen an erster Stelle.",
    reserve: "Termin reservieren",
    help: "Hilfe",
    servicesTitle: "Leistungen",
    pricelistTitle: "Preise",
    nailsTitle: "UV-Gel & Maniküre",
    lashesTitle: "Wimpern",
    galleryTitle: "Galerie",
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
    lockDay: "ZABLOKIRAJ DAN",
    unlockDay: "ODBLOKIRAJ DAN",
    exportPlan: "Plan exportieren",
    importPlan: "Plan importieren",
    minutes: "Min",
    today: "Heute",
    locationBadge: "Parken in der Nähe • Kaffee/Tee inklusive",
    emailTemplate: "E-Mail Vorlage",
    studioTitle: "Studio",
    studioText:
      "Einblick in unser gemütliches Studio – sauber, komfortabel, mit rosegoldenen Akzenten.",
    prices: basePrices,
  },
  en: {
    heroTitle: "Beauty with attention to detail",
    heroText:
      "Manicure and UV-gel nails in our cozy home studio in Hanau. Quality, hygiene and kindness first.",
    reserve: "Book an appointment",
    help: "Help",
    servicesTitle: "Services",
    pricelistTitle: "Prices",
    nailsTitle: "UV-gel & Manicure",
    lashesTitle: "Lashes",
    galleryTitle: "Gallery",
    contactTitle: "Contact & Reservations",
    contactSubtitle: "Fastest via WhatsApp or a call.",
    bookingTitle: "Online booking",
    bookingSubtitle: "Choose service, date and time. Also via WhatsApp or call.",
    bookingName: "Name",
    bookingService: "Service",
    bookingDate: "Date",
    bookingDuration: "Duration",
    bookingNoSlots: "No free slots on this day.",
    bookingAdmin: "Admin mode",
    bookingLock: "Lock",
    bookingUnlock: "Unlock",
    lockDay: "LOCK DAY",
    unlockDay: "UNLOCK DAY",
    exportPlan: "Export plan",
    importPlan: "Import plan",
    minutes: "min",
    today: "Today",
    locationBadge: "Parking nearby • Coffee/tea included",
    emailTemplate: "Email template",
    studioTitle: "Studio",
    studioText:
      "A peek into our cozy studio – clean, comfortable, with rose‑gold accents.",
    prices: basePrices,
  },
  sl: {
    heroTitle: "Lepota z ljubeznijo do detajlov",
    heroText:
      "Manikura in UV‑gel nohti v našem domačem studiu v Hanau. Kakovost, higiena in prijaznost na prvem mestu.",
    reserve: "Rezerviraj termin",
    help: "Pomoč",
    servicesTitle: "Storitve",
    pricelistTitle: "Cenik",
    nailsTitle: "UV‑gel in manikura",
    lashesTitle: "Trepalnice",
    galleryTitle: "Galerija",
    contactTitle: "Kontakt in rezervacije",
    contactSubtitle: "Najhitreje prek WhatsAppa ali klica.",
    bookingTitle: "Spletna rezervacija",
    bookingSubtitle: "Izberi storitev, datum in uro. Lahko tudi prek WhatsApp/klica.",
    bookingName: "Ime",
    bookingService: "Storitev",
    bookingDate: "Datum",
    bookingDuration: "Trajanje",
    bookingNoSlots: "Ni prostih terminov na ta dan.",
    bookingAdmin: "Admin način",
    bookingLock: "Zakleni",
    bookingUnlock: "Odkleni",
    lockDay: "ZABLOKIRAJ DAN",
    unlockDay: "ODBLOKIRAJ DAN",
    exportPlan: "Izvozi plan",
    importPlan: "Uvozi plan",
    minutes: "min",
    today: "Danes",
    locationBadge: "Parkiranje v bližini • Kava/čaj vključena",
    emailTemplate: "E‑poštna predloga",
    studioTitle: "Studio",
    studioText:
      "Pogled v naš prijeten studio – čist, udoben, z rožnato‑zlatimi poudarki.",
    prices: basePrices,
  },
  bs: {
    heroTitle: "Ljepota s ljubavlju prema detaljima",
    heroText:
      "Manikir i UV‑gel nokti u našem kućnom studiju u Hanau. Kvalitet, higijena i ljubaznost na prvom mjestu.",
    reserve: "Rezerviši termin",
    help: "Pomoć",
    servicesTitle: "Usluge",
    pricelistTitle: "Cjenovnik",
    nailsTitle: "UV‑gel i manikir",
    lashesTitle: "Trepavice",
    galleryTitle: "Galerija",
    contactTitle: "Kontakt i rezervacije",
    contactSubtitle: "Najbrže preko WhatsAppa ili poziva.",
    bookingTitle: "Online rezervacija",
    bookingSubtitle: "Izaberi uslugu, datum i vrijeme.",
    bookingName: "Ime",
    bookingService: "Usluga",
    bookingDate: "Datum",
    bookingDuration: "Trajanje",
    bookingNoSlots: "Nema slobodnih termina za taj dan.",
    bookingAdmin: "Admin režim",
    bookingLock: "Zaključaj",
    bookingUnlock: "Otključaj",
    lockDay: "ZAKLJUČAJ DAN",
    unlockDay: "OTKLUČAJ DAN",
    exportPlan: "Izvoz plana",
    importPlan: "Uvoz plana",
    minutes: "min",
    today: "Danas",
    locationBadge: "Parking u blizini • Kafa/čaj uključeni",
    emailTemplate: "Email predložak",
    studioTitle: "Studio",
    studioText:
      "Pogled u naš ugodan studio – čist, udoban, sa roza‑zlatnim detaljima.",
    prices: basePrices,
  },
  hr: {
    heroTitle: "Ljepota s ljubavlju prema detaljima",
    heroText:
      "Manikura i UV‑gel nokti u našem kućnom studiju u Hanau. Kvaliteta, higijena i ljubaznost na prvom mjestu.",
    reserve: "Rezerviraj termin",
    help: "Pomoć",
    servicesTitle: "Usluge",
    pricelistTitle: "Cjenik",
    nailsTitle: "UV‑gel i manikura",
    lashesTitle: "Trepavice",
    galleryTitle: "Galerija",
    contactTitle: "Kontakt i rezervacije",
    contactSubtitle: "Najbrže preko WhatsAppa ili poziva.",
    bookingTitle: "Online rezervacija",
    bookingSubtitle: "Odaberi uslugu, datum i vrijeme.",
    bookingName: "Ime",
    bookingService: "Usluga",
    bookingDate: "Datum",
    bookingDuration: "Trajanje",
    bookingNoSlots: "Nema slobodnih termina za taj dan.",
    bookingAdmin: "Admin način",
    bookingLock: "Zaključaj",
    bookingUnlock: "Otključaj",
    lockDay: "ZAKLJUČAJ DAN",
    unlockDay: "OTKLUČAJ DAN",
    exportPlan: "Izvoz plana",
    importPlan: "Uvoz plana",
    minutes: "min",
    today: "Danas",
    locationBadge: "Parkiranje u blizini • Kava/čaj uključeni",
    emailTemplate: "Predložak e‑pošte",
    studioTitle: "Studio",
    studioText:
      "Pogled u naš ugodan studio – čist, udoban, s ružičasto‑zlatnim detaljima.",
    prices: basePrices,
  },
  sr: {
    heroTitle: "Lepota sa ljubavlju prema detaljima",
    heroText:
      "Manikir i UV‑gel nokti u našem kućnom studiju u Hanau. Kvalitet, higijena i ljubaznost na prvom mestu.",
    reserve: "Rezerviši termin",
    help: "Pomoć",
    servicesTitle: "Usluge",
    pricelistTitle: "Cenovnik",
    nailsTitle: "UV‑gel i manikir",
    lashesTitle: "Trepuše",
    galleryTitle: "Galerija",
    contactTitle: "Kontakt i rezervacije",
    contactSubtitle: "Najbrže preko WhatsAppa ili poziva.",
    bookingTitle: "Online rezervacija",
    bookingSubtitle: "Izaberi uslugu, datum i vreme.",
    bookingName: "Ime",
    bookingService: "Usluga",
    bookingDate: "Datum",
    bookingDuration: "Trajanje",
    bookingNoSlots: "Nema slobodnih termina za taj dan.",
    bookingAdmin: "Admin režim",
    bookingLock: "Zaključaj",
    bookingUnlock: "Otključaj",
    lockDay: "ZAKLJUČAJ DAN",
    unlockDay: "OTKLUČAJ DAN",
    exportPlan: "Izvoz plana",
    importPlan: "Uvoz plana",
    minutes: "min",
    today: "Danas",
    locationBadge: "Parking u blizini • Kafa/čaj uključeni",
    emailTemplate: "Email šablon",
    studioTitle: "Studio",
    studioText:
      "Pogled u naš prijatan studio – čist, udoban, sa roze‑zlatnim detaljima.",
    prices: basePrices,
  },
  tr: {
    heroTitle: "Detaylara özenle güzellik",
    heroText:
      "Hanau’daki ev stüdyomuzda manikür ve UV‑jel tırnaklar. Önce kalite, hijyen ve güler yüz.",
    reserve: "Randevu al",
    help: "Yardım",
    servicesTitle: "Hizmetler",
    pricelistTitle: "Fiyatlar",
    nailsTitle: "UV‑jel & Manikür",
    lashesTitle: "Kirpik",
    galleryTitle: "Galeri",
    contactTitle: "İletişim & Rezervasyon",
    contactSubtitle: "En hızlı WhatsApp veya telefonla.",
    bookingTitle: "Online randevu",
    bookingSubtitle: "Hizmet, tarih ve saat seçin.",
    bookingName: "İsim",
    bookingService: "Hizmet",
    bookingDate: "Tarih",
    bookingDuration: "Süre",
    bookingNoSlots: "Bu gün için boş saat yok.",
    bookingAdmin: "Yönetici modu",
    bookingLock: "Kilitle",
    bookingUnlock: "Kilidi aç",
    lockDay: "GÜNÜ KİLİTLE",
    unlockDay: "GÜNÜ AÇ",
    exportPlan: "Planı dışa aktar",
    importPlan: "Planı içe aktar",
    minutes: "dk",
    today: "Bugün",
    locationBadge: "Yakında otopark • Kahve/çay dahil",
    emailTemplate: "E‑posta şablonu",
    studioTitle: "Stüdyo",
    studioText:
      "Sıcak stüdyomuza bir bakış – temiz, konforlu, pembe‑altın dokunuşlarla.",
    prices: basePrices,
  },
  es: {
    heroTitle: "Belleza con atención al detalle",
    heroText:
      "Manicura y uñas de gel UV en nuestro estudio en casa en Hanau. Calidad, higiene y amabilidad ante todo.",
    reserve: "Reservar cita",
    help: "Ayuda",
    servicesTitle: "Servicios",
    pricelistTitle: "Precios",
    nailsTitle: "UV‑gel y manicura",
    lashesTitle: "Pestañas",
    galleryTitle: "Galería",
    contactTitle: "Contacto y reservas",
    contactSubtitle: "Más rápido por WhatsApp o llamada.",
    bookingTitle: "Reserva online",
    bookingSubtitle: "Elige servicio, fecha y hora.",
    bookingName: "Nombre",
    bookingService: "Servicio",
    bookingDate: "Fecha",
    bookingDuration: "Duración",
    bookingNoSlots: "No hay citas libres ese día.",
    bookingAdmin: "Modo admin",
    bookingLock: "Bloquear",
    bookingUnlock: "Desbloquear",
    lockDay: "BLOQUEAR DÍA",
    unlockDay: "DESBLOQUEAR DÍA",
    exportPlan: "Exportar plan",
    importPlan: "Importar plan",
    minutes: "min",
    today: "Hoy",
    locationBadge: "Parking cercano • Café/té incluidos",
    emailTemplate: "Plantilla de email",
    studioTitle: "Estudio",
    studioText:
      "Vistazo a nuestro acogedor estudio: limpio, cómodo, con toques de oro rosado.",
    prices: basePrices,
  },
};

const LANGS = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sl", label: "Slovenščina", flag: "🇸🇮" },
  { code: "bs", label: "Bosanski", flag: "🇧🇦" },
  { code: "hr", label: "Hrvatski", flag: "🇭🇷" },
  { code: "sr", label: "Srpski", flag: "🇷🇸" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

/* =====================================================
   UTILS
   ===================================================== */
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

function generateSlots(date, plan, selectedDuration) {
  const d = new Date(date);
  const weekday = d.getDay();
  const wkRange = plan.weekendRange || DEFAULT_PLAN.weekendRange;
  const wkStarts = plan.weekdayStarts || DEFAULT_PLAN.weekdayStarts;
  const slotStep = plan.slotMinutes || DEFAULT_PLAN.slotMinutes;
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
  for (let tMin = startMin; tMin + slotStep <= endMin; tMin += slotStep) {
    const hhmm = fromMinutes(tMin);
    const iso = dateToISO(d, hhmm);
    const past = new Date(iso) < now;
    const blocked = plan.blockedISO.includes(iso);
    const durationOK = !selectedDuration || tMin + selectedDuration <= endMin;
    if (!past && !blocked && durationOK) out.push({ hhmm, iso, blocked });
  }
  return out;
}

function PriceTag({ price }) {
  const s = String(price).trim();
  const m = s.match(/^([€$])?\s*([\d.,]+)\s*([€$])?$/);
  const lead = !!m?.[1];
  const curr = m?.[1] || m?.[3] || "€";
  const num = m?.[2] || s;
  return (
    <span
      className="inline-flex items-baseline gap-1 whitespace-nowrap"
      style={{ fontFeatureSettings: '"tnum" 1' }}
    >
      {lead && <span>{curr}</span>}
      <span className="tabular-nums">{num}</span>
      {!lead && <span>{curr}</span>}
    </span>
  );
}

/* =====================================================
   PAGE
   ===================================================== */
export default function Page() {
  const [lang, setLang] = useState("de");
  const tr = t[lang] || t.de;

  // plan persistence
  const [plan, setPlan] = useState(() => {
    try {
      const raw = localStorage.getItem("hm_plan");
      return raw ? { ...DEFAULT_PLAN, ...JSON.parse(raw) } : DEFAULT_PLAN;
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
    const n = tr?.prices?.nails ?? [];
    const l = tr?.prices?.lashes ?? [];
    return [...n, ...l].map(([label]) => label);
  }, [tr]);
  const [service, setService] = useState("");
  useEffect(() => setService(allServices[0] || ""), [allServices]);

  const slots = useMemo(() => generateSlots(date, plan, duration), [date, plan, duration]);

  // admin
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
  const onAdminClick = () => (admin ? setAdmin(false) : setShowPin((s) => !s));
  const submitPin = () => {
    if (pin === ADMIN_PIN) {
      setAdmin(true);
      setShowPin(false);
      setPin("");
    } else setPin("");
  };
  const toggleBlock = (slot) =>
    setPlan((p) => ({
      ...p,
      blockedISO: p.blockedISO.includes(slot.iso)
        ? p.blockedISO.filter((x) => x !== slot.iso)
        : [...p.blockedISO, slot.iso],
    }));

  const lockDay = () =>
    setPlan((p) => ({
      ...p,
      blockedISO: Array.from(new Set([...p.blockedISO, ...slots.map((s) => s.iso)])),
    }));
  const unlockDay = () =>
    setPlan((p) => ({
      ...p,
      blockedISO: p.blockedISO.filter((iso) => !slots.find((s) => s.iso === iso)),
    }));

  // actions
  const whatsappBase = `https://wa.me/${BUSINESS.phoneTel}`;
  const sendWA = (slot) => {
    const text = encodeURIComponent(
      `Pozdrav HM home studio!\nIme: ${name || "-"}\nService: ${service}\nTermin: ${date} ${slot.hhmm}\nTrajanje: ${duration} ${tr.minutes}`
    );
    window.open(`${whatsappBase}?text=${text}`, "_blank");
  };
  const [copied, setCopied] = useState(false);
  const copyEmail = (slot) => {
    const when = new Date(slot.iso).toLocaleString(lang, { dateStyle: "medium", timeStyle: "short" });
    const body = `Hallo,\n\nAnfrage bei HM home studio:\n• Service: ${service}\n• Termin: ${when}\n• Dauer: ca. ${duration} ${tr.minutes}\n• Adresse: ${BUSINESS.address}\n\nLiebe Grüße\n${BUSINESS.owner}`;
    navigator.clipboard.writeText(body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  const assistantLocale = lang;

  // image fallback helper
  const hideImg = (e) => {
    e.currentTarget.style.display = "none";
    const ph = e.currentTarget.nextElementSibling;
    if (ph instanceof HTMLElement) {
      ph.style.display = "flex";
    }
  };

  // smooth scroll fix for mobile: ensure anchor jump
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#hero" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              onError={hideImg}
              alt="HM home studio"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-white object-contain ring-1 ring-black/5 shadow"
            />
            <span className="hidden rounded-full bg-rose-50 px-2 py-0.5 text-sm font-medium text-rose-700 ring-1 ring-rose-100 md:inline-flex">
              HM <span className="pl-1 text-rose-600">home</span> studio
            </span>
            {/* fallback badge */}
            <span className="hidden items-center rounded-full bg-rose-50 px-2 py-0.5 text-sm font-medium text-rose-700 ring-1 ring-rose-100 md:hidden">
              HM home studio
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#services">{tr.servicesTitle}</a>
            <a href="#prices">{tr.pricelistTitle}</a>
            <a href="#booking">{tr.bookingTitle}</a>
            <a href="#gallery">{tr.galleryTitle}</a>
            <a href="#studio">{tr.studioTitle}</a>
            <a href="#contact">{tr.contactTitle.split(" ")[0]}</a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language switch with flags */}
            <div className="relative">
              <select
                onChange={(e) => setLang(e.target.value)}
                value={lang}
                className="rounded-lg border px-2 py-1 pr-7"
                aria-label="Language"
              >
                {LANGS.map((l) => (
                  <option key={l.code} value={l.code}>{`${l.flag} ${l.code.toUpperCase()}`}</option>
                ))}
              </select>
            </div>

            {/* Help button always visible */}
            <button
              onClick={() => (window.hmAssistantOpen?.(), null)}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-100 px-3 py-2 text-sm font-medium text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-200"
            >
              <ShieldCheck className="h-4 w-4" />
              {tr.help}
            </button>

            {/* CTA */}
            <a
              href="#termin"
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300/50"
            >
              <MessageCircle className="h-4 w-4" /> {tr.reserve}
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold">{tr.heroTitle}</h1>
            <p className="mb-6 text-lg">{tr.heroText}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#termin"
                className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-rose-600"
              >
                <MessageCircle className="h-5 w-5" /> {tr.reserve}
              </a>

              <button
                onClick={() => (window.hmAssistantOpen?.(), null)}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50/60 px-4 py-2 font-medium text-rose-700 shadow-sm transition hover:bg-rose-100"
              >
                <ShieldCheck className="h-5 w-5" />
                {tr.help}
              </button>

              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50/60 px-4 py-2 font-medium text-rose-700 shadow-sm transition hover:bg-rose-100"
              >
                <Phone className="h-5 w-5" /> {BUSINESS.phoneDisplay}
              </a>

              <a
                href={BUSINESS.instagram}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-4 py-2 font-medium text-white shadow-sm transition hover:opacity-90"
              >
                <Instagram className="h-5 w-5" /> Instagram
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white/90 p-6 shadow-lg">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="/images/studio.jpg"
                alt="Studio"
                onError={hideImg}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
              {/* fallback */}
              <div
                style={{ display: "none" }}
                className="aspect-[4/5] w/full items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-white p-6 text-center"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">STUDIO</p>
                <h3 className="mt-1 text-2xl font-semibold">{BUSINESS.address}</h3>
                <p className="mx-auto mt-2 max-w-xs text-slate-600">{tr.locationBadge}</p>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 text-rose-600 hover:underline"
            >
              <MapPin className="h-4 w-4" /> Google Maps
            </a>
            <div className="mt-2 flex items-center gap-2 text-slate-600">
              <Clock className="h-4 w-4" />
              <span>Mo–Sa • nach Vereinbarung</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-3xl font-semibold">{tr.servicesTitle}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow">
              <Sparkles className="mb-3 h-6 w-6" />
              <h3 className="text-lg font-bold">UV-Gel</h3>
              <p className="text-slate-600">Natürlich oder auffällig – langlebig und formschön.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <Scissors className="mb-3 h-6 w-6" />
              <h3 className="text-lg font-bold">Manicure</h3>
              <p className="text-slate-600">Pflege der Nagelhaut, Form &amp; Politur.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <Sparkles className="mb-3 h-6 w-6" />
              <h3 className="text-lg font-bold">{tr.lashesTitle}</h3>
              <p className="text-slate-600">Klassisch 1:1 oder Volumen 2D–10D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="bg-rose-50 py-20">
        <div id="cenik" className="-mt-24 pt-24" />
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {["nailsTitle", "lashesTitle"].map((key, idx) => {
            const title = idx === 0 ? tr.nailsTitle : tr.lashesTitle;
            const list = idx === 0 ? tr.prices.nails : tr.prices.lashes;
            return (
              <div key={key} className="rounded-xl bg-white p-6 shadow">
                <h3 className="mb-4 text-xl font-bold">{title}</h3>
                <ul className="space-y-2">
                  {list.map(([n, p], i) => (
                    <li key={i} className="flex items-baseline justify-between gap-2 border-b pb-1">
                      <span>{n}</span>
                      <PriceTag price={p} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">Gültig ab 01.09.2025</p>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20">
        <div id="termin" className="-mt-24 pt-24" />
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-2 text-3xl font-semibold">{tr.bookingTitle}</h2>
          <p className="mb-6 text-slate-600">{tr.bookingSubtitle}</p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* FORM */}
            <div className="rounded-xl bg-white p-6 shadow md:col-span-1">
              <label className="text-sm text-slate-600">{tr.bookingName}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={tr.bookingName}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              />

              <label className="text-sm text-slate-600">{tr.bookingService}</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              >
                {allServices.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>

              <label className="text-sm text-slate-600">{tr.bookingDate}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              />

              <label className="text-sm text-slate-600">{tr.bookingDuration}</label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="mt-1 mb-3 w-full rounded-xl border px-3 py-2"
              >
                {[90, 120].map((m) => (
                  <option key={m} value={m}>
                    {m} {tr.minutes}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setDate(new Date().toISOString().slice(0, 10))}
                className="text-sm text-rose-600 underline"
              >
                {tr.today}
              </button>

              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border p-3">
                <button onClick={onAdminClick} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
                  {admin ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />} {tr.bookingAdmin}
                </button>

                {!admin && showPin && (
                  <div className="flex items-center gap-2">
                    <input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => e.key === "Enter" && submitPin()}
                      placeholder="PIN"
                      className="w-20 rounded-lg border px-2 py-1 text-center tracking-widest"
                    />
                    <button onClick={submitPin} className="rounded-xl border px-3 py-2 text-sm">
                      OK
                    </button>
                  </div>
                )}

                {admin && (
                  <>
                    <button onClick={lockDay} className="rounded-xl border px-3 py-2 text-xs font-semibold text-rose-700">
                      {tr.lockDay}
                    </button>
                    <button onClick={unlockDay} className="rounded-xl border px-3 py-2 text-xs">
                      {tr.unlockDay}
                    </button>

                    <button
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "hm-plan.json";
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                    >
                      <Download className="h-4 w-4" /> {tr.exportPlan}
                    </button>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm">
                      <Upload className="h-4 w-4" /> {tr.importPlan}
                      <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          const r = new FileReader();
                          r.onload = () => {
                            try {
                              setPlan(JSON.parse(String(r.result)));
                            } catch {
                              alert("Invalid JSON");
                            }
                          };
                          r.readAsText(f);
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
                {slots.length === 0 && <div className="col-span-full text-slate-600">{tr.bookingNoSlots}</div>}
                {slots.map((slot) => (
                  <div key={slot.iso} className="rounded-xl border bg-white p-2">
                    <div className="text-center font-medium">{slot.hhmm}</div>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      <button
                        disabled={slot.blocked && !admin}
                        onClick={() => (admin ? toggleBlock(slot) : sendWA(slot))}
                        className={
                          admin
                            ? "inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm"
                            : `inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1ebe5a] ${
                                slot.blocked ? "cursor-not-allowed opacity-50" : ""
                              }`
                        }
                        title={admin ? (slot.blocked ? tr.bookingUnlock : tr.bookingLock) : "WhatsApp"}
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </button>

                      <button onClick={() => copyEmail(slot)} className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm">
                        <Mail className="h-4 w-4" /> {tr.emailTemplate}
                      </button>
                      {copied && <div className="text-center text-xs text-green-600">Kopirano</div>}
                    </div>
                  </div>
                ))}
              </div>

              {admin && (
                <p className="mt-3 text-xs text-slate-500">
                  Admin: klik na termin ga zaklene/odklene. Uporabi tudi gumba „{tr.lockDay}“ / „{tr.unlockDay}“.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-3xl font-semibold">{tr.galleryTitle}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5">
                <img
                  src={`/images/gallery/${i + 1}.jpg`}
                  onError={hideImg}
                  alt=""
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                />
                <div style={{ display: "none" }} className="flex h-full w-full items-center justify-center bg-rose-50 text-sm text-rose-600">
                  Foto
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-rose-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-xl font-bold">{tr.contactTitle}</h3>
            <p className="mb-4 text-slate-600">{tr.contactSubtitle}</p>
            <ul className="space-y-3 text-slate-700">
              <li>
                <a
                  href={`https://wa.me/${BUSINESS.phoneTel}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 font-medium text-white shadow-sm transition hover:bg-[#1ebe5a]"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS.phoneTel}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50/60 px-4 py-2 font-medium text-rose-700 transition hover:bg-rose-100"
                >
                  <Phone className="h-5 w-5" /> {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2">
                  <Mail className="h-5 w-5" /> {BUSINESS.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-5 w-5" /> {BUSINESS.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6">
          <div>
            © {new Date().getFullYear()} {BUSINESS.name} – {BUSINESS.owner}, {BUSINESS.address} • {BUSINESS.taxNote}
          </div>
          <div className="flex items-center gap-4">
            <a href="/impressum" className="underline underline-offset-4 hover:text-rose-700">Impressum</a>
            <span>•</span>
            <a href="/datenschutz" className="underline underline-offset-4 hover:text-rose-700">Datenschutz</a>
          </div>
        </div>
      </footer>

      {/* Local Assistant */}
      <Assistant
        locale={assistantLocale}
        whatsappNumber={BUSINESS.phoneTel.replace("+", "")}
        phone={BUSINESS.phoneTel}
        mapsQuery={BUSINESS.address}
        buttonLabel={tr.help}
      />
    </div>
  );
}
