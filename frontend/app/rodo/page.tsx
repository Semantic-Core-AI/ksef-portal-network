import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Informacje RODO | KSEF.EXPERT",
  description: "Informacje o przetwarzaniu danych osobowych zgodnie z RODO w serwisie KSEF.EXPERT",
}

export default function RodoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold text-gray-900 mb-4">
            Informacje RODO
          </h1>
          <p className="text-lg text-gray-600">
            Klauzula informacyjna o przetwarzaniu danych osobowych
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Intro */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <p className="text-blue-900 font-semibold mb-2">
              📋 Klauzula informacyjna zgodnie z art. 13 i 14 RODO
            </p>
            <p className="text-blue-800 text-sm">
              Zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (RODO), informujemy o zasadach przetwarzania danych osobowych oraz prawach, które Państwu przysługują.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              1. Administrator danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Administratorem Pani/Pana danych osobowych jest:
              </p>
              <div className="bg-gray-50 border border-gray-300 p-6 my-4 rounded-lg">
                <p className="font-bold text-gray-900 text-lg mb-3">Fundacja "KSEF.EXPERT"</p>
                <p className="text-gray-700 mb-4">
                  Park Naukowo-Technologiczny "TECHNOPARK GLIWICE"<br />
                  ul. Konarskiego 18C<br />
                  44-100 Gliwice<br />
                  Polska
                </p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="text-gray-700">
                    <strong>📧 Email kontaktowy:</strong>{" "}
                    <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">
                      kontakt@ksef.expert
                    </a>
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>📞 Telefon:</strong> +48 123 456 789
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              2. Cele przetwarzania danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Pani/Pana dane osobowe przetwarzane są w następujących celach:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-blue-900 mb-2">
                    ✓ Świadczenie usług edukacyjnych drogą elektroniczną
                  </h3>
                  <p className="text-blue-800 text-sm">
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b RODO (wykonanie umowy)<br />
                    <strong>Zakres danych:</strong> imię, nazwisko, email, dane kontaktowe
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-green-900 mb-2">
                    ✓ Wysyłka newslettera z informacjami o KSeF
                  </h3>
                  <p className="text-green-800 text-sm">
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a RODO (zgoda)<br />
                    <strong>Zakres danych:</strong> adres email, imię (opcjonalnie)
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-purple-900 mb-2">
                    ✓ Marketing bezpośredni usług i produktów Administratora
                  </h3>
                  <p className="text-purple-800 text-sm">
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora)<br />
                    <strong>Zakres danych:</strong> dane kontaktowe
                  </p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-orange-900 mb-2">
                    ✓ Obsługa zapytań, zgłoszeń i reklamacji
                  </h3>
                  <p className="text-orange-800 text-sm">
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora)<br />
                    <strong>Zakres danych:</strong> dane kontaktowe, treść korespondencji
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-red-900 mb-2">
                    ✓ Analityka i statystyki korzystania z serwisu
                  </h3>
                  <p className="text-red-800 text-sm">
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora)<br />
                    <strong>Zakres danych:</strong> dane techniczne (cookies, IP, przeglądarka)
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-gray-900 mb-2">
                    ✓ Wypełnienie obowiązków prawnych
                  </h3>
                  <p className="text-gray-800 text-sm">
                    <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. c RODO (obowiązek prawny)<br />
                    <strong>Zakres danych:</strong> dane wymagane przepisami (np. rachunkowość, podatki)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              3. Odbiorcy danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Pani/Pana dane osobowe mogą być udostępniane następującym kategoriom odbiorców:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Podmioty świadczące usługi IT i hostingu</strong> – w zakresie niezbędnym do utrzymania infrastruktury technicznej serwisu
                </li>
                <li>
                  <strong>Dostawcy systemów analitycznych</strong> – w celu analizy ruchu i optymalizacji serwisu (np. Google Analytics, Vercel Analytics)
                </li>
                <li>
                  <strong>Dostawcy systemów newslettera</strong> – w celu wysyłki wiadomości email
                </li>
                <li>
                  <strong>Podmioty obsługujące płatności</strong> – wyłącznie w przypadku korzystania z płatnych usług
                </li>
                <li>
                  <strong>Organy publiczne i instytucje państwowe</strong> – w przypadku obowiązku wynikającego z przepisów prawa
                </li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-6">
                <p className="font-semibold text-yellow-900 mb-2">
                  ⚠️ Przekazywanie danych poza EOG
                </p>
                <p className="text-yellow-800 text-sm">
                  Administrator nie przekazuje danych osobowych do państw trzecich (poza Europejski Obszar Gospodarczy) bez odpowiednich gwarancji prawnych, takich jak:
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm text-yellow-800">
                  <li>Standardowe klauzule umowne zatwierdzone przez Komisję Europejską</li>
                  <li>Decyzja Komisji Europejskiej o odpowiednim poziomie ochrony</li>
                  <li>Wiążące reguły korporacyjne</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              4. Okres przechowywania danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane, a mianowicie:
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        Kategoria danych
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        Okres przechowywania
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3">
                        Dane związane z wykonaniem umowy
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Przez okres trwania umowy + okres przedawnienia roszczeń (do 6 lat) + okres wymagany przepisami prawa (np. 5 lat dla celów podatkowych)
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">
                        Dane w celach marketingowych (zgoda)
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Do czasu wycofania zgody lub wniesienia sprzeciwu
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3">
                        Dane w celach marketingowych (prawnie uzasadniony interes)
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Do czasu wniesienia sprzeciwu
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">
                        Dane analityczne (cookies)
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Zgodnie z polityką cookies (12-24 miesiące)
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3">
                        Korespondencja (email, formularze)
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Do czasu załatwienia sprawy + okres przedawnienia roszczeń
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              5. Prawa osób, których dane dotyczą
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-6">
                W związku z przetwarzaniem danych osobowych przysługują Pani/Panu następujące prawa:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-900 mb-2">
                    🔍 Prawo dostępu do danych
                  </h3>
                  <p className="text-sm text-blue-800">
                    Art. 15 RODO - prawo uzyskania potwierdzenia, czy przetwarzamy Pani/Pana dane oraz otrzymania ich kopii
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-green-900 mb-2">
                    ✏️ Prawo do sprostowania
                  </h3>
                  <p className="text-sm text-green-800">
                    Art. 16 RODO - prawo żądania poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych
                  </p>
                </div>

                <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-600">
                  <h3 className="font-bold text-red-900 mb-2">
                    🗑️ Prawo do usunięcia ("prawo do bycia zapomnianym")
                  </h3>
                  <p className="text-sm text-red-800">
                    Art. 17 RODO - prawo żądania usunięcia danych w określonych przypadkach
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-600">
                  <h3 className="font-bold text-orange-900 mb-2">
                    ⏸️ Prawo do ograniczenia przetwarzania
                  </h3>
                  <p className="text-sm text-orange-800">
                    Art. 18 RODO - prawo żądania ograniczenia przetwarzania danych w określonych sytuacjach
                  </p>
                </div>

                <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-bold text-purple-900 mb-2">
                    📤 Prawo do przenoszenia danych
                  </h3>
                  <p className="text-sm text-purple-800">
                    Art. 20 RODO - prawo otrzymania danych w ustrukturyzowanym formacie i przesłania ich innemu administratorowi
                  </p>
                </div>

                <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-600">
                  <h3 className="font-bold text-yellow-900 mb-2">
                    🚫 Prawo sprzeciwu
                  </h3>
                  <p className="text-sm text-yellow-800">
                    Art. 21 RODO - prawo wniesienia sprzeciwu wobec przetwarzania danych (dotyczy przetwarzania na podstawie prawnie uzasadnionego interesu)
                  </p>
                </div>

                <div className="bg-pink-50 p-5 rounded-lg border-l-4 border-pink-600">
                  <h3 className="font-bold text-pink-900 mb-2">
                    ↩️ Prawo do cofnięcia zgody
                  </h3>
                  <p className="text-sm text-pink-800">
                    Art. 7 ust. 3 RODO - prawo wycofania zgody w dowolnym momencie (nie wpływa na zgodność z prawem przetwarzania przed cofnięciem zgody)
                  </p>
                </div>

                <div className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-600">
                  <h3 className="font-bold text-indigo-900 mb-2">
                    📨 Prawo do wniesienia skargi
                  </h3>
                  <p className="text-sm text-indigo-800">
                    Art. 77 RODO - prawo wniesienia skargi do organu nadzorczego (Prezes UODO)
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 mt-8">
                <h3 className="font-bold text-green-900 mb-3">
                  💬 Jak skorzystać z praw?
                </h3>
                <p className="text-green-800 mb-3">
                  W celu skorzystania z wymienionych praw prosimy o kontakt:
                </p>
                <ul className="space-y-2 text-green-800">
                  <li>
                    <strong>📧 Email:</strong>{" "}
                    <a href="mailto:kontakt@ksef.expert" className="text-green-700 hover:text-green-900 underline">
                      kontakt@ksef.expert
                    </a>
                  </li>
                  <li>
                    <strong>✉️ Poczta:</strong> Fundacja "KSEF.EXPERT", ul. Konarskiego 18C, 44-100 Gliwice
                  </li>
                </ul>
                <p className="text-sm text-green-700 mt-4">
                  ⏱️ Odpowiedź na zgłoszenie zostanie udzielona bez zbędnej zwłoki, nie później niż w ciągu <strong>miesiąca</strong> od otrzymania żądania.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              6. Informacja o wymogu lub dobrowolności podania danych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-blue-900 mb-2">Podanie danych wymagane przez prawo</h3>
                  <p className="text-blue-800 text-sm">
                    W przypadku gdy przetwarzanie odbywa się na podstawie obowiązku prawnego (art. 6 ust. 1 lit. c RODO), podanie danych jest wymogiem ustawowym. Niepodanie danych uniemożliwi realizację celu, dla którego dane są zbierane.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-green-900 mb-2">Podanie danych wymagane umową</h3>
                  <p className="text-green-800 text-sm">
                    W przypadku gdy przetwarzanie odbywa się w celu wykonania umowy (art. 6 ust. 1 lit. b RODO), podanie danych jest dobrowolne, ale niezbędne do zawarcia i wykonania umowy. Niepodanie danych uniemożliwi świadczenie usług.
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-600 p-5 rounded-r-lg">
                  <h3 className="font-bold text-purple-900 mb-2">Podanie danych dobrowolne</h3>
                  <p className="text-purple-800 text-sm">
                    W przypadku gdy przetwarzanie odbywa się na podstawie zgody (art. 6 ust. 1 lit. a RODO) lub prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO), podanie danych jest całkowicie dobrowolne. Niepodanie danych nie wpłynie na możliwość korzystania z podstawowych funkcji serwisu.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              7. Zautomatyzowane podejmowanie decyzji (w tym profilowanie)
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg">
                <p className="text-gray-800 mb-3">
                  ✅ <strong>Informujemy, że Pani/Pana dane osobowe NIE są przetwarzane w sposób zautomatyzowany</strong>, w tym poprzez profilowanie, w rozumieniu art. 22 RODO.
                </p>
                <p className="text-gray-700 text-sm">
                  Nie podejmujemy wobec Pani/Pana zautomatyzowanych decyzji wywołujących skutki prawne lub w podobny sposób istotnie wpływających na Pani/Pana sytuację.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              8. Bezpieczeństwo danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych, w szczególności:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>🔐 Szyfrowanie transmisji danych (protokół SSL/TLS)</li>
                <li>💾 Regularne kopie zapasowe danych</li>
                <li>🔒 Kontrola dostępu do systemów informatycznych</li>
                <li>🛡️ Ochrona przed nieuprawnionym dostępem (firewall, antywirus)</li>
                <li>📚 Szkolenia pracowników w zakresie ochrony danych osobowych</li>
                <li>📋 Procedury reagowania na incydenty bezpieczeństwa</li>
                <li>🔍 Regularne audyty bezpieczeństwa</li>
              </ul>
            </div>
          </section>

          {/* UODO Section */}
          <section className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg">
            <h3 className="font-bold text-indigo-900 mb-3 text-xl">
              🏛️ Organ nadzorczy
            </h3>
            <p className="text-indigo-800 mb-4">
              Przysługuje Pani/Panu prawo wniesienia skargi do organu nadzorczego właściwego w sprawach ochrony danych osobowych:
            </p>
            <div className="bg-white p-4 rounded border border-indigo-300">
              <p className="font-semibold text-indigo-900 mb-2">
                Prezes Urzędu Ochrony Danych Osobowych (UODO)
              </p>
              <p className="text-indigo-800 text-sm">
                ul. Stawki 2<br />
                00-193 Warszawa<br />
                <br />
                <strong>Telefon:</strong> 22 531 03 00<br />
                <strong>Email:</strong> kancelaria@uodo.gov.pl<br />
                <strong>Strona:</strong>{" "}
                <a
                  href="https://uodo.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  www.uodo.gov.pl
                </a>
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 border border-gray-300 p-6 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-4 text-xl">
              📞 Kontakt w sprawach danych osobowych
            </h3>
            <p className="text-gray-700 mb-4">
              W razie pytań dotyczących przetwarzania danych osobowych prosimy o kontakt:
            </p>
            <div className="text-gray-700">
              <p className="font-semibold mb-2">Fundacja "KSEF.EXPERT"</p>
              <p>
                📍 Park Naukowo-Technologiczny "TECHNOPARK GLIWICE"<br />
                ul. Konarskiego 18C<br />
                44-100 Gliwice, Polska
              </p>
              <p className="mt-4">
                📧 Email: <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">kontakt@ksef.expert</a><br />
                📞 Telefon: +48 123 456 789
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
