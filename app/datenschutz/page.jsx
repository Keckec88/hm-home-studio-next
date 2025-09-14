export const metadata = {
  title: "Datenschutzerklärung – HM home studio",
  description: "Datenschutzinformationen gemäß DSGVO",
};

export default function DatenschutzPage(){
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <header>
        <h1 className="text-4xl font-semibold mb-2">Datenschutzerklärung</h1>
        <p className="text-slate-600">Stand: 01.09.2025</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-2">1. Verantwortlicher</h2>
        <p><strong>HM home studio</strong> – Hati Matijasevic<br/>Wallweg 21, 63450 Hanau<br/>
           E-Mail: <a href="mailto:hati.matijasevic@gmail.com" className="text-rose-700">hati.matijasevic@gmail.com</a>, 
           Tel.: <a href="tel:+4917663298747" className="text-rose-700">+49 176 63298747</a></p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Hosting & Protokolldaten</h2>
        <p>Beim Aufruf unserer Website werden technisch notwendige Daten verarbeitet (z.&nbsp;B. IP‑Adresse, Datum/Uhrzeit, aufgerufene URL, 
        Referrer, User‑Agent). Die Verarbeitung erfolgt auf Grundlage von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO 
        (berechtigtes Interesse an einer stabilen und sicheren Bereitstellung der Website). Bei einer Bereitstellung über einen Hosting‑Anbieter 
        (z.&nbsp;B. Vercel) können Protokolldaten dort verarbeitet werden.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Cookies / lokale Speicherung</h2>
        <p>Wir setzen keine Tracking‑Cookies ein. Für Komfortfunktionen (z.&nbsp;B. Sprachwahl, Terminansicht, Admin‑Einstellungen) 
        werden Daten im lokalen Speicher Ihres Browsers (localStorage) abgelegt.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. Kontaktaufnahme (E‑Mail/Telefon/WhatsApp)</h2>
        <p>Wenn Sie uns per E‑Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage 
        (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO – vorvertragliche/vertragliche Maßnahmen). WhatsApp ist ein Dienst der WhatsApp Ireland Ltd. 
        Nachrichten sind Ende‑zu‑Ende verschlüsselt. Bitte übermitteln Sie keine sensiblen Gesundheitsdaten über WhatsApp.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Online‑Terminbuchung</h2>
        <p>Unsere Online‑Buchung erstellt eine vorbefüllte Nachricht (z.&nbsp;B. an WhatsApp). Sofern eine optionale Cloud‑Speicherung 
        aktiviert ist, speichern wir folgende Daten: Name, gewählter Service, Terminzeit, Dauer, Sprache. Die Verarbeitung erfolgt zur 
        Terminverwaltung auf Grundlage von Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO. Die Daten werden gelöscht, sobald sie für die 
        Zwecke nicht mehr erforderlich sind; gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>
        <p><em>Hinweis zu Anbietern:</em> Bei Nutzung eines externen Cloud‑Dienstes (z.&nbsp;B. Supabase) werden die Daten auf Servern des 
        Anbieters verarbeitet. Es gelten dessen Datenschutzbestimmungen. Die Übermittlung kann je nach gewähltem Rechenzentrumsstandort 
        auch in Drittländer erfolgen. Mit dem Anbieter wird ein Vertrag zur Auftragsverarbeitung geschlossen.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">6. Externe Dienste/Links</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Kalender:</strong> Bei Nutzung des „Zum Kalender hinzufügen“‑Links werden Sie auf die Seite von Google weitergeleitet. 
          Verantwortlich ist die Google Ireland Ltd.; es gelten deren Datenschutzbestimmungen.</li>
          <li><strong>Instagram:</strong> Unsere Seite verlinkt auf Instagram. Beim Aufruf der Instagram‑Website gelten die dortigen Datenschutzregeln.</li>
          <li><strong>Google Maps:</strong> Bei Klick auf den Link zu Google Maps werden Sie zu Google weitergeleitet.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">7. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft (Art.&nbsp;15 DSGVO), Berichtigung (Art.&nbsp;16), Löschung (Art.&nbsp;17), 
        Einschränkung der Verarbeitung (Art.&nbsp;18), Datenübertragbarkeit (Art.&nbsp;20) sowie Widerspruch (Art.&nbsp;21). 
        Zudem haben Sie das Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen (Art.&nbsp;7 Abs.&nbsp;3 DSGVO).</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">8. Beschwerderecht</h2>
        <p>Sie können sich bei einer Datenschutz‑Aufsichtsbehörde beschweren. Zuständig für Hessen ist der 
          <a className="text-rose-700" href="https://datenschutz.hessen.de/" target="_blank" rel="noreferrer"> Hessische Beauftragte für Datenschutz und Informationsfreiheit</a>.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Sicherheit</h2>
        <p>Wir nutzen technische und organisatorische Maßnahmen (z.&nbsp;B. TLS/SSL), um Ihre Daten zu schützen und passen diese laufend an den Stand der Technik an.</p>
      </section>
    </main>
  );
}