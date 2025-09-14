export const metadata = { title: "Impressum – HM home studio" };

export default function Impressum() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Impressum</h1>
      <div className="space-y-4 text-slate-700 leading-relaxed bg-white p-6 rounded-xl shadow">
        <p><strong>HM home studio</strong><br/>Hati Matijasevic<br/>Wallweg 21<br/>63450 Hanau</p>
        <p>
          E-Mail: <a className="text-rose-600" href="mailto:hati.matijasevic@gmail.com">hati.matijasevic@gmail.com</a><br/>
          Telefon: <a className="text-rose-600" href="tel:+4917663298747">+49 176 63298747</a>
        </p>
        <p>Umsatzsteuer gemäß § 19 UStG nicht erhoben (Kleinunternehmerregelung).</p>
        <p>Inhaltlich Verantwortliche: Hati Matijasevic.</p>
        <p>
          Haftung für Inhalte: Sorgfältig gepflegt, dennoch ohne Gewähr für Vollständigkeit/Richtigkeit.
          Externe Links: Für Inhalte verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </div>
    </main>
  );
}
