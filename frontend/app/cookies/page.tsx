import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Polityka Cookies | KSEF.EXPERT",
  description: "Polityka wykorzystywania plików cookies w serwisie KSEF.EXPERT",
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold text-gray-900 mb-4">
            Polityka Cookies
          </h1>
          <p className="text-lg text-gray-600">
            Informacje o wykorzystywaniu plików cookies
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
              🍪 Czym są cookies?
            </p>
            <p className="text-blue-800">
              Cookies (ciasteczka) to małe pliki tekstowe, które są zapisywane na Twoim urządzeniu (komputerze, smartfonie, tablecie) podczas przeglądania stron internetowych. Cookies pomagają witrynie zapamiętać informacje o Twojej wizycie, takie jak preferencje językowe, ustawienia czy aktywność na stronie.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              1. Kto zarządza cookies?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Administratorem plików cookies używanych w serwisie KSEF.EXPERT jest:
              </p>
              <div className="bg-gray-50 border border-gray-300 p-6 my-4 rounded-lg">
                <p className="font-bold text-gray-900 text-lg mb-3">Fundacja "KSEF.EXPERT"</p>
                <p className="text-gray-700 mb-4">
                  Park Naukowo-Technologiczny "TECHNOPARK GLIWICE"<br />
                  ul. Konarskiego 18C<br />
                  44-100 Gliwice<br />
                  Polska
                </p>
                <p className="text-gray-700">
                  📧 Email: <a href="mailto:kontakt@ksef.expert" className="text-blue-600 hover:text-blue-800">kontakt@ksef.expert</a><br />
                  📞 Telefon: +48 123 456 789
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              2. Rodzaje cookies wykorzystywanych w serwisie
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-6">
                W naszym serwisie wykorzystujemy następujące rodzaje plików cookies:
              </p>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <h3 className="font-bold text-blue-900 mb-3 text-xl flex items-center gap-2">
                    <span>🔵</span> Cookies niezbędne (wymagane)
                  </h3>
                  <p className="text-blue-800 mb-3">
                    <strong>Cel:</strong> Zapewnienie podstawowego funkcjonowania serwisu
                  </p>
                  <p className="text-blue-800 text-sm mb-3">
                    Te cookies są konieczne do prawidłowego działania strony. Umożliwiają podstawowe funkcje, takie jak nawigacja po stronie czy dostęp do zabezpieczonych obszarów. Bez tych cookies serwis nie może działać poprawnie.
                  </p>
                  <div className="bg-white p-4 rounded border border-blue-300">
                    <p className="text-sm text-blue-900 mb-2"><strong>Przykłady:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                      <li>Cookies sesyjne (session cookies)</li>
                      <li>Cookies zabezpieczające (security cookies)</li>
                      <li>Cookies preferencji użytkownika</li>
                    </ul>
                    <p className="text-xs text-blue-700 mt-3">
                      ⏱️ <strong>Czas przechowywania:</strong> sesja lub do 12 miesięcy
                    </p>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                  <h3 className="font-bold text-green-900 mb-3 text-xl flex items-center gap-2">
                    <span>🟢</span> Cookies funkcjonalne
                  </h3>
                  <p className="text-green-800 mb-3">
                    <strong>Cel:</strong> Zapamiętywanie ustawień i preferencji użytkownika
                  </p>
                  <p className="text-green-800 text-sm mb-3">
                    Te cookies pozwalają serwisowi zapamiętać wybory dokonane przez Ciebie (np. język, region, rozmiar czcionki) i zapewnić bardziej spersonalizowane funkcje.
                  </p>
                  <div className="bg-white p-4 rounded border border-green-300">
                    <p className="text-sm text-green-900 mb-2"><strong>Przykłady:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-green-800">
                      <li>Preferencje językowe</li>
                      <li>Ustawienia wyświetlania</li>
                      <li>Zapamiętane formularze</li>
                    </ul>
                    <p className="text-xs text-green-700 mt-3">
                      ⏱️ <strong>Czas przechowywania:</strong> do 24 miesięcy
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
                  <h3 className="font-bold text-purple-900 mb-3 text-xl flex items-center gap-2">
                    <span>🟣</span> Cookies analityczne (statystyczne)
                  </h3>
                  <p className="text-purple-800 mb-3">
                    <strong>Cel:</strong> Analiza ruchu i zachowań użytkowników
                  </p>
                  <p className="text-purple-800 text-sm mb-3">
                    Te cookies zbierają informacje o tym, jak odwiedzający korzystają ze strony (np. które strony odwiedzają najczęściej). Wszystkie informacje zbierane przez te cookies są zagregowane i anonimowe.
                  </p>
                  <div className="bg-white p-4 rounded border border-purple-300">
                    <p className="text-sm text-purple-900 mb-2"><strong>Używane narzędzia:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-purple-800">
                      <li>Google Analytics - analiza ruchu i zachowań użytkowników</li>
                      <li>Vercel Analytics - monitorowanie wydajności serwisu</li>
                    </ul>
                    <p className="text-xs text-purple-700 mt-3">
                      ⏱️ <strong>Czas przechowywania:</strong> do 24 miesięcy
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                  <h3 className="font-bold text-orange-900 mb-3 text-xl flex items-center gap-2">
                    <span>🟠</span> Cookies marketingowe (reklamowe)
                  </h3>
                  <p className="text-orange-800 mb-3">
                    <strong>Cel:</strong> Personalizacja reklam i kampanii marketingowych
                  </p>
                  <p className="text-orange-800 text-sm mb-3">
                    Te cookies są używane do śledzenia użytkowników między różnymi stronami internetowymi w celu wyświetlania reklam dopasowanych do Twoich zainteresowań.
                  </p>
                  <div className="bg-white p-4 rounded border border-orange-300">
                    <p className="text-sm text-orange-900 mb-2"><strong>Używane narzędzia:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-orange-800">
                      <li>Facebook Pixel (jeśli aktywny)</li>
                      <li>Google Ads Remarketing (jeśli aktywny)</li>
                    </ul>
                    <p className="text-xs text-orange-700 mt-3">
                      ⏱️ <strong>Czas przechowywania:</strong> do 24 miesięcy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              3. Cookies pierwszej i trzeciej strony
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-900 mb-3">
                    🔵 Cookies pierwszej strony (First-party)
                  </h3>
                  <p className="text-blue-800 text-sm">
                    Cookies ustawiane bezpośrednio przez naszą domenę (ksef.expert). Używamy ich do podstawowych funkcji serwisu, takich jak zapamiętywanie preferencji i analiza ruchu.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-bold text-purple-900 mb-3">
                    🟣 Cookies trzeciej strony (Third-party)
                  </h3>
                  <p className="text-purple-800 text-sm">
                    Cookies ustawiane przez zewnętrzne serwisy (np. Google Analytics, narzędzia social media). Pomagają nam analizować ruch i dostarczać lepsze doświadczenia użytkownika.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              4. Jak zarządzać cookies?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Masz pełną kontrolę nad cookies. Możesz je zaakceptować, odrzucić lub usunąć w każdej chwili:
              </p>

              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                  <h3 className="font-bold text-green-900 mb-3">
                    ✅ Ustawienia przeglądarki
                  </h3>
                  <p className="text-green-800 text-sm mb-4">
                    Większość przeglądarek domyślnie akceptuje cookies, ale możesz zmienić te ustawienia:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded border border-green-300">
                      <strong className="text-green-900">Chrome:</strong>{" "}
                      <span className="text-green-800">
                        Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie i inne dane witryn
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <strong className="text-green-900">Firefox:</strong>{" "}
                      <span className="text-green-800">
                        Opcje → Prywatność i bezpieczeństwo → Ciasteczka i dane stron
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <strong className="text-green-900">Safari:</strong>{" "}
                      <span className="text-green-800">
                        Preferencje → Prywatność → Pliki cookie i dane witryn
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <strong className="text-green-900">Edge:</strong>{" "}
                      <span className="text-green-800">
                        Ustawienia → Prywatność, wyszukiwanie i usługi → Pliki cookie
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <h3 className="font-bold text-blue-900 mb-3">
                    🛠️ Narzędzia zewnętrzne
                  </h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Możesz również skorzystać z narzędzi zewnętrznych do zarządzania cookies:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-blue-800">
                    <li>
                      <strong>Your Online Choices:</strong>{" "}
                      <a
                        href="https://www.youronlinechoices.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        www.youronlinechoices.com
                      </a>
                    </li>
                    <li>
                      <strong>Network Advertising Initiative:</strong>{" "}
                      <a
                        href="https://www.networkadvertising.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        www.networkadvertising.org
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
                  <h3 className="font-bold text-yellow-900 mb-3">
                    ⚠️ Konsekwencje wyłączenia cookies
                  </h3>
                  <p className="text-yellow-800 text-sm">
                    Wyłączenie cookies może wpłynąć na funkcjonalność serwisu. Niektóre funkcje mogą nie działać poprawnie, a doświadczenie użytkownika może być ograniczone. Cookies niezbędne są konieczne do podstawowego działania strony i nie można ich wyłączyć.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              5. Szczegółowe informacje o cookies
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">Poniżej znajduje się szczegółowa lista cookies używanych w serwisie:</p>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        Nazwa cookie
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        Dostawca
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        Cel
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        Typ
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">
                        Ważność
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-xs">
                        _ga
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Google Analytics
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Identyfikacja użytkowników
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Analityczny
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        2 lata
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-xs">
                        _gid
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Google Analytics
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Identyfikacja sesji
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Analityczny
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        24 godziny
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-xs">
                        _gat
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Google Analytics
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Limitowanie żądań
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Analityczny
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        1 minuta
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-xs">
                        __va
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Vercel Analytics
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Analiza wydajności
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Analityczny
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        2 lata
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-xs">
                        consent
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        KSEF.EXPERT
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Zgoda na cookies
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Niezbędny
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        12 miesięcy
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              6. Prywatność i ochrona danych osobowych
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Niektóre cookies mogą przetwarzać dane osobowe (np. adres IP). Przetwarzanie to odbywa się zgodnie z:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Rozporządzeniem RODO (UE 2016/679)</strong> - w zakresie ochrony danych osobowych
                </li>
                <li>
                  <strong>Ustawą Prawo telekomunikacyjne</strong> (art. 173-174) - w zakresie przechowywania i dostępu do informacji w urządzeniach końcowych
                </li>
              </ul>
              <p className="mt-4">
                Szczegółowe informacje o przetwarzaniu danych osobowych znajdziesz w naszej Polityce Prywatności.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900 mb-4">
              7. Zmiany w Polityce Cookies
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Cookies. O wszelkich zmianach poinformujemy poprzez publikację zaktualizowanej wersji na tej stronie wraz z datą ostatniej aktualizacji.
              </p>
              <p className="mt-4">
                Zalecamy regularne przeglądanie Polityki Cookies w celu bycia na bieżąco z informacjami o wykorzystywanych przez nas cookies.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 border border-gray-300 p-6 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-4 text-xl">
              📞 Kontakt w sprawach cookies
            </h3>
            <p className="text-gray-700 mb-4">
              W razie pytań dotyczących Polityki Cookies prosimy o kontakt:
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

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
            <p className="font-semibold text-blue-900 mb-2">
              ℹ️ Dodatkowe zasoby
            </p>
            <p className="text-blue-800 text-sm">
              Więcej informacji o cookies i prywatności online:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1 text-sm text-blue-800">
              <li>
                <a
                  href="https://uodo.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Urząd Ochrony Danych Osobowych (UODO)
                </a>
              </li>
              <li>
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  AllAboutCookies.org
                </a>
              </li>
              <li>
                <a
                  href="https://www.youronlinechoices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Your Online Choices
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
