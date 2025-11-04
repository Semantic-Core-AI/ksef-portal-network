import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Polityka Prywatności | KSEF.EXPERT",
  description: "Polityka prywatności serwisu KSEF.EXPERT - dowiedz się, jak przetwarzamy Twoje dane osobowe",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold text-gray-900 mb-4">
            Polityka Prywatności
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
              1. Administrator danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Administratorem Państwa danych osobowych jest:
              </p>
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
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              2. Cele i podstawy prawne przetwarzania danych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>Przetwarzamy Państwa dane osobowe w następujących celach:</p>

              <div className="space-y-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">a) Świadczenie usług edukacyjnych</h3>
                  <p>
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b RODO (wykonanie umowy)<br />
                    <strong>Zakres danych:</strong> imię, nazwisko, adres email, dane kontaktowe
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">b) Newsletter i komunikacja marketingowa</h3>
                  <p>
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a RODO (zgoda)<br />
                    <strong>Zakres danych:</strong> adres email, imię
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">c) Analityka i usprawnienie serwisu</h3>
                  <p>
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)<br />
                    <strong>Zakres danych:</strong> dane dotyczące korzystania z serwisu (cookies, statystyki)
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">d) Obsługa pytań i zgłoszeń</h3>
                  <p>
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)<br />
                    <strong>Zakres danych:</strong> imię, nazwisko, adres email, treść korespondencji
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">e) Wypełnienie obowiązków prawnych</h3>
                  <p>
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. c RODO (obowiązek prawny)<br />
                    <strong>Zakres danych:</strong> dane wymagane przepisami prawa (np. rachunkowość)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              3. Okres przechowywania danych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>Dane osobowe będą przechowywane przez okres:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Dane związane z usługami:</strong> przez czas trwania umowy oraz przez okres wymagany przepisami prawa po jej zakończeniu (np. 5 lat dla celów podatkowych)
                </li>
                <li>
                  <strong>Newsletter:</strong> do czasu wycofania zgody lub wniesienia sprzeciwu
                </li>
                <li>
                  <strong>Dane analityczne (cookies):</strong> zgodnie z polityką cookies (zazwyczaj 12-24 miesięcy)
                </li>
                <li>
                  <strong>Korespondencja:</strong> do czasu wygaśnięcia roszczeń wynikających z umowy
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              4. Udostępnianie danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>Państwa dane osobowe mogą być udostępniane następującym kategoriom odbiorców:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Podmioty świadczące usługi IT:</strong> hosting, zarządzanie serwerami, usługi chmurowe
                </li>
                <li>
                  <strong>Podmioty obsługujące płatności:</strong> operatorzy płatności elektronicznych (jeśli dotyczy)
                </li>
                <li>
                  <strong>Dostawcy narzędzi analitycznych:</strong> Google Analytics, Vercel Analytics
                </li>
                <li>
                  <strong>Dostawcy narzędzi marketingowych:</strong> systemy do wysyłki newsletterów
                </li>
                <li>
                  <strong>Organy państwowe:</strong> w przypadku obowiązku prawnego (np. UKS, policja, sądy)
                </li>
              </ul>
              <p className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
                ⚠️ <strong>Uwaga:</strong> Nie przekazujemy danych osobowych poza Europejski Obszar Gospodarczy (EOG) bez odpowiednich zabezpieczeń prawnych.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              5. Prawa osób, których dane dotyczą
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>Przysługują Państwu następujące prawa:</p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo dostępu</h4>
                  <p className="text-sm text-blue-800">
                    Prawo uzyskania informacji o przetwarzaniu danych oraz kopii danych (art. 15 RODO)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo sprostowania</h4>
                  <p className="text-sm text-blue-800">
                    Prawo żądania poprawienia nieprawidłowych danych (art. 16 RODO)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo do usunięcia</h4>
                  <p className="text-sm text-blue-800">
                    Prawo żądania usunięcia danych ("prawo do bycia zapomnianym") (art. 17 RODO)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo do ograniczenia</h4>
                  <p className="text-sm text-blue-800">
                    Prawo ograniczenia przetwarzania danych (art. 18 RODO)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo do przenoszenia</h4>
                  <p className="text-sm text-blue-800">
                    Prawo otrzymania danych w formacie strukturalnym (art. 20 RODO)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo sprzeciwu</h4>
                  <p className="text-sm text-blue-800">
                    Prawo wniesienia sprzeciwu wobec przetwarzania (art. 21 RODO)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo cofnięcia zgody</h4>
                  <p className="text-sm text-blue-800">
                    Prawo wycofania zgody w dowolnym momencie (art. 7 ust. 3 RODO)
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Prawo do skargi</h4>
                  <p className="text-sm text-blue-800">
                    Prawo wniesienia skargi do UODO (art. 77 RODO)
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-6">
                <p className="font-semibold text-gray-900 mb-2">Jak skorzystać z praw?</p>
                <p className="text-gray-700">
                  W celu skorzystania z powyższych praw prosimy o kontakt:<br />
                  📧 Email: <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">kontakt@ksef.expert</a><br />
                  ✉️ Listownie: Fundacja "KSEF.EXPERT", ul. Konarskiego 18C, 44-100 Gliwice
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              6. Bezpieczeństwo danych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo danych:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Szyfrowanie połączeń (SSL/TLS)</li>
                <li>Regularne kopie zapasowe danych</li>
                <li>Kontrola dostępu do systemów IT</li>
                <li>Aktualizacje i monitorowanie zabezpieczeń</li>
                <li>Szkolenia personelu w zakresie ochrony danych</li>
                <li>Procedury reagowania na incydenty bezpieczeństwa</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              7. Zautomatyzowane podejmowanie decyzji i profilowanie
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Informujemy, że Państwa dane osobowe <strong>nie są przetwarzane w sposób zautomatyzowany</strong> (w tym poprzez profilowanie) w rozumieniu art. 22 RODO, skutkującym podejmowaniem decyzji wywołujących skutki prawne lub podobnie istotnie wpływających na Państwa sytuację.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              8. Pliki cookies
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Nasza strona wykorzystuje pliki cookies (ciasteczka). Szczegółowe informacje na temat cookies znajdują się w naszej{" "}
                <a href="/cookies" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Polityce Cookies
                </a>.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              9. Zmiany w Polityce Prywatności
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. O wszelkich zmianach poinformujemy Państwa poprzez publikację zaktualizowanej wersji na tej stronie wraz z datą ostatniej aktualizacji.
              </p>
              <p className="mt-4">
                Zalecamy regularne przeglądanie Polityki Prywatności w celu bycia na bieżąco z tym, jak chronimy Państwa dane.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              10. Kontakt
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                W razie pytań dotyczących niniejszej Polityki Prywatności lub sposobu przetwarzania danych osobowych, prosimy o kontakt:
              </p>
              <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg mt-4">
                <p className="font-semibold text-gray-900">Fundacja "KSEF.EXPERT"</p>
                <p className="text-gray-700 mt-2">
                  📍 Park Naukowo-Technologiczny "TECHNOPARK GLIWICE"<br />
                  ul. Konarskiego 18C, 44-100 Gliwice, Polska
                </p>
                <p className="text-gray-700 mt-4">
                  📧 Email: <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">kontakt@ksef.expert</a><br />
                  📞 Telefon: +48 123 456 789
                </p>
              </div>
            </div>
          </section>

          {/* UODO Info */}
          <section className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
            <h3 className="font-bold text-indigo-900 mb-2">Urząd Ochrony Danych Osobowych (UODO)</h3>
            <p className="text-indigo-800 text-sm">
              W przypadku naruszenia przepisów RODO przysługuje Państwu prawo wniesienia skargi do organu nadzorczego:
            </p>
            <p className="text-indigo-800 text-sm mt-3">
              <strong>Prezes Urzędu Ochrony Danych Osobowych</strong><br />
              ul. Stawki 2<br />
              00-193 Warszawa<br />
              <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                www.uodo.gov.pl
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
