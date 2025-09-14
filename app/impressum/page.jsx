export const metadata = {
  title: "Impressum – HM home studio",
  description: "Impressum nach § 5 TMG für HM home studio",
};

export default function ImpressumPage(){
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold mb-6">Impressum</h1>

      <section className="space-y-2 mb-8">
        <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
        <p><strong>HM home studio</strong><br/>Hati Matijasevic<br/>Wallweg 21<br/>63450 Hanau</p>
        <p>Telefon: <a href="tel:+4917663298747" className="text-rose-700">+49 176 63298747</a><br/>
           E-Mail: <a href="mailto:hati.matijasevic@gmail.com" className="text-rose-700">hati.matijasevic@gmail.com</a></p>
        <p>Kleinunternehmer nach § 19 UStG: Es wird keine Umsatzsteuer ausgewiesen.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
        <p>Hati Matijasevic, Wallweg 21, 63450 Hanau</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">EU‑Streitschlichtung</h2>
        <p>Die Europäische Kommission stellt eine Plattform zur Online‑Streitbeilegung (OS) bereit:{" "}
          <a className="text-rose-700" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>.
          Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Haftung für Inhalte</h2>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
        Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Haftung für Links</h2>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
        ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
      </section>

      <section className="mb-2">
        <h2 className="text-xl font-semibold">Urheberrecht</h2>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
        Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
        außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
      </section>

      <section className="mb-2">
        <h2 className="text-xl font-semibold">Bildnachweise</h2>
        <p>Eigene Bilder, sofern nicht anders angegeben.</p>
      </section>
    </main>
  );
}