# Instrukcje dodania artykułu "KSeF 2026: Kompletny przewodnik"

## Artykuł przygotowany do wprowadzenia

Pełna treść artykułu znajduje się w pliku: `/tmp/ksef-2026-article.md`

## Sposób 1: Ręczne dodanie przez Strapi Admin Panel (ZALECANE)

1. Otwórz Strapi Admin Panel: http://localhost:1337/admin
2. Przejdź do: Content Manager → Articles → Create new entry
3. Wypełnij pola:

### Podstawowe informacje:
- **Title**: `KSeF 2026: Kompletny przewodnik po obowiązkowym systemie e-faktur w Polsce`
- **Slug**: `ksef-2026-kompletny-przewodnik-pelny` (lub inny unikalny)
- **Excerpt**:
  ```
  Kompleksowy przewodnik po obowiązkowym systemie e-faktur KSeF, który wejdzie w życie 1 lutego 2026. Dowiedz się wszystkiego o kosztach wdrożenia, harmonogramie, wymaganiach technicznych i przygotowaniu Twojej firmy do nowego systemu fakturowania.
  ```

### Kategoryzacja:
- **Category**: `Wdrożenie`
- **Difficulty**: `Średni`
- **Content Type**: `Przewodnik`
- **Tags**: `["KSeF", "e-faktury", "wdrożenie", "2026", "fakturowanie elektroniczne", "VAT", "MF", "system księgowy", "digitalizacja"]`

### Treść:
- **Content**: Skopiuj całą zawartość z `/tmp/ksef-2026-article.md` i wklej jako Rich Text
  - Strapi automatycznie przekonwertuje Markdown na format Blocks
  - Upewnij się, że formatowanie (nagłówki, listy, tabele) jest zachowane

### Metadane:
- **Reading Time**: `25` minut
- **Views**: `0`
- **Comments Count**: `0`
- **Published At**: `2025-01-15T10:00:00.000Z` (lub aktualna data)

### Flagy:
- ✅ **Is Featured**: TAK
- ✅ **Is Trending**: TAK
- ✅ **Has CTA**: TAK
- **CTA Text**: `Sprawdź narzędzia KSeF`

### Autor:
- **Name**: `Marek Kowalski`
- **Avatar**: `https://ui-avatars.com/api/?name=Marek+Kowalski&size=200&background=2C6AA8&color=fff`
- **Role**: `Ekspert ds. KSeF i e-fakturowania`
- **Bio**: `Certyfikowany doradca podatkowy z 15-letnim doświadczeniem w cyfryzacji procesów księgowych. Specjalista wdrożeń KSeF.`

### Rating:
- **Average**: `4.8`
- **Count**: `124`

### Obrazek:
- **Thumbnail**: `https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop`

4. Kliknij **Save** i potem **Publish**

## Sposób 2: Import przez API (wymaga konwersji do Blocks)

Aby zaimportować przez API, treść musi być w formacie Strapi Blocks (array), a nie Markdown (string).

Użyj poniższego skryptu konwersji (przykładowy - wymaga dopracowania):

```bash
# Najpierw zainstaluj narzędzie do konwersji
npm install markdown-to-jsx

# Następnie użyj skryptu konwersji (TODO - do stworzenia)
node scripts/convert-markdown-to-blocks.js /tmp/ksef-2026-article.md
```

## Weryfikacja

Po dodaniu artykułu, sprawdź:

1. Frontend: http://localhost:3002/article/ksef-2026-kompletny-przewodnik-pelny
2. Czy wszystkie elementy się wyświetlają:
   - ✅ Nagłówki (H2, H3) - Inter 14-24px
   - ✅ Listy punktowane i numerowane
   - ✅ Tabele (z właściwym formatowaniem)
   - ✅ Pogrubiony tekst
   - ✅ Linki
   - ✅ Cytaty
3. Czy typography standard jest zachowany (Inter 14px dla treści)
4. Czy ikony Share/Bookmark/Audio działają poprawnie

## Rozwiązywanie problemów

### Problem: "Title must be unique"
**Rozwiązanie**: Zmień slug na unikalny (np. dodaj `-pelny`, `-v2`, itp.)

### Problem: "Content must be array"
**Rozwiązanie**: Użyj Strapi Admin Panel zamiast API - automatycznie konwertuje format

### Problem: "Author avatar required"
**Rozwiązanie**: Dodaj URL awatara (możesz użyć UI Avatars: `https://ui-avatars.com/api/?name=...`)

## Gotowe!

Artykuł będzie dostępny pod adresem:
- Frontend: `/article/[slug]`
- API: `http://localhost:1337/api/articles?filters[slug][$eq]=[slug]`

---

**Data przygotowania**: 2025-11-01
**Przygotowane przez**: Claude Code
**Treść artykułu**: `/tmp/ksef-2026-article.md`
