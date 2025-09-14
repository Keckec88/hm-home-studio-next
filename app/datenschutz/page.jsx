export const metadata = { title: "Datenschutz – HM home studio" };

export default function Datenschutz() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Datenschutzerklärung</h1>
      <div className="space-y-4 text-slate-700 leading-relaxed bg-white p-6 rounded-xl shadow">
        <p>
          Wir verarbeiten personenbezogene Daten (z. B. Name, Telefonnummer) nur,
          wenn Sie einen Termin anfragen oder uns kontaktieren (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
        <p>
          Hosting/Deployment erfolgt über Vercel (Vercel Inc.). Beim Aufruf der Seite werden
          technisch notwendige Daten (IP, User-Agent, Zeitpunkt) serverseitig verarbeitet.
          Mehr dazu in der{" "}
          <a className="text-rose-600" href="https://vercel.com/legal/privacy" target="_blank" rel="noreferrer">
            Vercel-Datenschutzerklärung
          </a>.
        </p>
        <p>Wir setzen keine Tracking-Cookies und keine externen Analytics-Skripte.</p>
        <p>
          Ihre Rechte: Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch,
          Datenübertragbarkeit sowie Beschwerde bei einer Aufsichtsbehörde.
        </p>
        <p>
          Kontakt: Hati Matijasevic, Wallweg 21, 63450 Hanau —
          <a className="text-rose-600" href="mailto:hati.matijasevic@gmail.com"> hati.matijasevic@gmail.com</a>
        </p>
      </div>
    </main>
  );
}
