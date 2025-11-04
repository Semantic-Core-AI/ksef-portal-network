import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Regulamin | KSEF.EXPERT",
  description: "Regulamin korzystania z serwisu KSEF.EXPERT",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold text-gray-900 mb-4">
            Regulamin Serwisu
          </h1>
          <p className="text-lg text-gray-600">
            Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 1. Postanowienia ogólne
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Niniejszy Regulamin określa zasady korzystania z serwisu internetowego KSEF.EXPERT dostępnego pod adresem <strong>ksef.expert</strong> (dalej: "Serwis").
                </li>
                <li>
                  Administratorem i właścicielem Serwisu jest:
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-4">
                    <p className="font-semibold text-gray-900 mb-2">Fundacja "KSEF.EXPERT"</p>
                    <p className="text-gray-700">
                      Park Naukowo-Technologiczny "TECHNOPARK GLIWICE"<br />
                      ul. Konarskiego 18C<br />
                      44-100 Gliwice<br />
                      Polska
                    </p>
                    <p className="mt-4">
                      <strong>Email:</strong> <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">kontakt@ksef.expert</a><br />
                      <strong>Telefon:</strong> +48 123 456 789
                    </p>
                  </div>
                </li>
                <li>
                  Korzystanie z Serwisu jest równoznaczne z akceptacją niniejszego Regulaminu.
                </li>
                <li>
                  Regulamin jest dostępny nieodpłatnie na stronie Serwisu w formie umożliwiającej jego pobranie, utrwalenie i wydrukowanie.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 2. Definicje
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>Użyte w Regulaminie pojęcia oznaczają:</p>
              <div className="space-y-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Serwis</strong> – serwis internetowy KSEF.EXPERT dostępny pod adresem ksef.expert
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Administrator</strong> – Fundacja "KSEF.EXPERT" z siedzibą w Gliwicach
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Użytkownik</strong> – osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, korzystająca z Serwisu
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Treści</strong> – wszelkie materiały dostępne w Serwisie, w tym artykuły, przewodniki, narzędzia, kalkulatory, itp.
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">Usługi</strong> – usługi edukacyjne, informacyjne i narzędziowe świadczone przez Administratora za pośrednictwem Serwisu
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <strong className="text-gray-900">KSeF</strong> – Krajowy System e-Faktur prowadzony przez Ministerstwo Finansów RP
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 3. Zakres usług
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Serwis oferuje Użytkownikom:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Bezpłatny dostęp do bazy wiedzy o KSeF</li>
                    <li>Narzędzia edukacyjne (quizy, kalkulatory, walidatory)</li>
                    <li>Newsletter z informacjami o zmianach w przepisach</li>
                    <li>Grafy wiedzy i wizualizacje powiązań tematycznych</li>
                    <li>Dostęp do interpretacji prawnych i FAQ</li>
                  </ul>
                </li>
                <li>
                  Część usług może wymagać rejestracji lub subskrypcji (usługi premium).
                </li>
                <li>
                  Administrator zastrzega sobie prawo do zmiany zakresu oferowanych usług oraz wprowadzania nowych funkcjonalności.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 4. Warunki korzystania z Serwisu
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Korzystanie z Serwisu wymaga:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Urządzenia z dostępem do Internetu</li>
                    <li>Przeglądarki internetowej obsługującej JavaScript i cookies</li>
                    <li>Aktywnego konta email (do subskrypcji newslettera)</li>
                  </ul>
                </li>
                <li>
                  Użytkownik zobowiązany jest do:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Korzystania z Serwisu w sposób zgodny z prawem i dobrymi obyczajami</li>
                    <li>Niepodejmowania działań mogących zakłócić funkcjonowanie Serwisu</li>
                    <li>Niepodawania nieprawdziwych danych osobowych</li>
                    <li>Zachowania w tajemnicy danych dostępowych do konta (jeśli dotyczy)</li>
                  </ul>
                </li>
                <li>
                  Zabrania się:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Kopiowania, rozpowszechniania i modyfikowania Treści bez zgody Administratora</li>
                    <li>Korzystania z Serwisu w sposób naruszający prawa osób trzecich</li>
                    <li>Podejmowania prób ingerencji w infrastrukturę techniczną Serwisu</li>
                    <li>Wykorzystywania automatycznych narzędzi do pobierania danych (web scraping) bez zgody</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 5. Prawa autorskie i własność intelektualna
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Wszystkie Treści dostępne w Serwisie (teksty, grafiki, logotypy, bazy danych, oprogramowanie) stanowią przedmiot praw autorskich i są chronione przepisami ustawy o prawie autorskim i prawach pokrewnych.
                </li>
                <li>
                  Użytkownik może korzystać z Treści wyłącznie na użytek własny, w zakresie dozwolonym przez Administratora.
                </li>
                <li>
                  Kopiowanie, rozpowszechnianie lub publikowanie Treści wymaga pisemnej zgody Administratora, chyba że Regulamin stanowi inaczej.
                </li>
                <li>
                  Dozwolone jest cytowanie fragmentów artykułów z podaniem źródła i linku do oryginalnej publikacji.
                </li>
              </ol>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-6">
                <p className="font-semibold text-gray-900 mb-2">✅ Dozwolone użycie:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Przeglądanie treści na potrzeby własne</li>
                  <li>Cytowanie z podaniem źródła</li>
                  <li>Udostępnianie linków do artykułów</li>
                  <li>Korzystanie z narzędzi (kalkulatory, quizy)</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 mt-4">
                <p className="font-semibold text-gray-900 mb-2">❌ Zabronione użycie:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Kopiowanie całych artykułów bez zgody</li>
                  <li>Publikowanie treści na innych stronach</li>
                  <li>Wykorzystywanie komercyjne bez licencji</li>
                  <li>Automatyczne pobieranie danych (web scraping)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 6. Wyłączenie odpowiedzialności
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-4">
                <p className="font-bold text-yellow-900 text-lg mb-2">⚠️ WAŻNE ZASTRZEŻENIE</p>
                <p className="text-yellow-800">
                  Serwis KSEF.EXPERT ma charakter <strong>wyłącznie edukacyjny i informacyjny</strong>. Nie stanowi porady prawnej, podatkowej ani księgowej.
                </p>
              </div>

              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Administrator dokłada wszelkich starań, aby informacje zamieszczone w Serwisie były rzetelne i aktualne, jednak <strong>nie gwarantuje ich poprawności, kompletności ani aktualności</strong>.
                </li>
                <li>
                  Użytkownik korzysta z Treści i Usług na własną odpowiedzialność. Administrator nie ponosi odpowiedzialności za decyzje podjęte na podstawie informacji zawartych w Serwisie.
                </li>
                <li>
                  W sprawach wymagających interpretacji prawnej lub podatkowej należy skonsultować się z wykwalifikowanym doradcą, prawnikiem lub księgowym.
                </li>
                <li>
                  Administrator nie ponosi odpowiedzialności za:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Szkody wynikające z korzystania lub niemożności korzystania z Serwisu</li>
                    <li>Przerwy w dostępie do Serwisu wynikające z przyczyn technicznych</li>
                    <li>Działania osób trzecich (np. ataki hakerskie)</li>
                    <li>Treści zamieszczane przez użytkowników (np. komentarze)</li>
                  </ul>
                </li>
                <li>
                  Serwis nie jest powiązany z Ministerstwem Finansów, Krajową Administracją Skarbową ani żadnym organem państwowym.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 7. Newsletter
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Użytkownik może zapisać się do bezpłatnego newslettera, podając swój adres email.
                </li>
                <li>
                  Newsletter wysyłany jest maksymalnie 1 raz w tygodniu i zawiera:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Informacje o zmianach w przepisach dotyczących KSeF</li>
                    <li>Nowe artykuły i interpretacje prawne</li>
                    <li>Praktyczne porady i case studies</li>
                    <li>Informacje o webinarach i wydarzeniach</li>
                  </ul>
                </li>
                <li>
                  Użytkownik może w każdej chwili zrezygnować z newslettera, klikając link "wypisz się" w otrzymanej wiadomości.
                </li>
                <li>
                  Zapisanie się do newslettera wymaga wyrażenia dobrowolnej zgody na przetwarzanie danych osobowych (adres email) w celu wysyłki informacji marketingowych.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 8. Prywatność i ochrona danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Administrator przetwarza dane osobowe Użytkowników zgodnie z:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Rozporządzeniem RODO (UE 2016/679)</li>
                    <li>Ustawą o ochronie danych osobowych</li>
                    <li>Polityką Prywatności dostępną pod adresem{" "}
                      <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-semibold">
                        /privacy
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  Szczegółowe informacje o przetwarzaniu danych osobowych znajdują się w{" "}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-semibold">
                    Polityce Prywatności
                  </a>.
                </li>
                <li>
                  Serwis wykorzystuje pliki cookies. Szczegóły w{" "}
                  <a href="/cookies" className="text-blue-600 hover:text-blue-800 font-semibold">
                    Polityce Cookies
                  </a>.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 9. Reklamacje
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Reklamacje dotyczące funkcjonowania Serwisu można składać:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Drogą elektroniczną na adres: <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">kontakt@ksef.expert</a></li>
                    <li>Listownie na adres: Fundacja "KSEF.EXPERT", ul. Konarskiego 18C, 44-100 Gliwice</li>
                  </ul>
                </li>
                <li>
                  Reklamacja powinna zawierać:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Imię i nazwisko / nazwę firmy</li>
                    <li>Adres email lub korespondencyjny</li>
                    <li>Szczegółowy opis problemu</li>
                    <li>Oczekiwany sposób rozpatrzenia reklamacji</li>
                  </ul>
                </li>
                <li>
                  Administrator rozpatruje reklamacje w terminie do <strong>14 dni roboczych</strong> od daty ich otrzymania.
                </li>
                <li>
                  Odpowiedź na reklamację zostanie przesłana na adres email podany przez Użytkownika.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 10. Zmiany Regulaminu
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  Administrator zastrzega sobie prawo do wprowadzania zmian w Regulaminie.
                </li>
                <li>
                  Zmiany Regulaminu wchodzą w życie w terminie 14 dni od daty publikacji zmienionego Regulaminu w Serwisie.
                </li>
                <li>
                  Użytkownicy zostaną poinformowani o zmianach poprzez:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Komunikat na stronie głównej Serwisu</li>
                    <li>Wiadomość email (dla subskrybentów newslettera)</li>
                  </ul>
                </li>
                <li>
                  Korzystanie z Serwisu po wejściu w życie zmian oznacza akceptację nowego Regulaminu.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              § 11. Postanowienia końcowe
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  W sprawach nieuregulowanych niniejszym Regulaminem mają zastosowanie przepisy prawa polskiego, w szczególności:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Ustawa z dnia 23 kwietnia 1964 r. – Kodeks cywilny</li>
                    <li>Ustawa z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną</li>
                    <li>Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych</li>
                    <li>Rozporządzenie RODO (UE 2016/679)</li>
                  </ul>
                </li>
                <li>
                  Wszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd właściwy miejscowo dla siedziby Administratora.
                </li>
                <li>
                  W przypadku konsumentów - spory mogą być rozstrzygane przez sąd właściwy według przepisów Kodeksu postępowania cywilnego.
                </li>
                <li>
                  Konsument ma prawo do skorzystania z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń (mediacja, arbitraż konsumencki).
                </li>
              </ol>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 border border-gray-300 p-6 rounded-lg mt-8">
            <h3 className="font-bold text-gray-900 mb-4">Kontakt</h3>
            <p className="text-gray-700 mb-4">
              W razie pytań dotyczących Regulaminu prosimy o kontakt:
            </p>
            <p className="text-gray-700">
              <strong>Fundacja "KSEF.EXPERT"</strong><br />
              📍 Park Naukowo-Technologiczny "TECHNOPARK GLIWICE"<br />
              ul. Konarskiego 18C, 44-100 Gliwice, Polska
            </p>
            <p className="text-gray-700 mt-4">
              📧 Email: <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">kontakt@ksef.expert</a><br />
              📞 Telefon: +48 123 456 789
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
