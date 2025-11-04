# Standard Typografii Artykułów KSeF Expert

## Obowiązujący Standard Pisania Artykułów

Ten dokument definiuje **niezmienny standard typograficzny** dla wszystkich artykułów w systemie KSeF Expert (Strapi + Next.js).

### ⚠️ UWAGA
**NIE ZMIENIAJ** tych ustawień bez uzasadnienia biznesowego. Standard jest zdefiniowany w:
- `/components/article-content.tsx` - główny komponent renderujący
- `/components/article-table-styles.css` - style tabel

---

## Nagłówki

### H1 - Główny Tytuł
- **Czcionka**: Playfair Display, serif
- **Rozmiar**: 52px (stały)
- **Użycie**: Tylko jeden H1 na artykuł (tytuł główny)

### H2 - Podtytuły
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 24px

### H3 - Sekcje
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 20px

### H4 - Podsekcje
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 18px

### H5 - Drobne nagłówki
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 16px

### H6 - Najmniejsze nagłówki
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 14px

---

## Treść Artykułu

### Paragrafy (p, li, blockquote, linki)
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 14px
- **Line height**: 1.8 (paragrafy), 1.6 (listy)
- **Kolor**: #374151

### Listy (ul, ol)
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 14px
- **Wcięcie**: 24px

### Cytaty (blockquote)
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 14px
- **Styl**: italic
- **Border**: 4px solid #2C6AA8 (po lewej)
- **Kolor**: #6B7280

### Linki (a)
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 14px
- **Kolor**: #2C6AA8
- **Dekoracja**: underline

### Kod (code, pre)
- **Czcionka**: monospace
- **Rozmiar**: 14px
- **Tło**: #F3F4F6
- **Kolor**: #111827

---

## Tabele

### Ogólne
- **Czcionka**: Inter, sans-serif
- **Rozmiar bazowy**: 14px

### Nagłówki tabel (th)
- **Rozmiar**: 14px (desktop), 12px (mobile)
- **Waga**: 700 (bold)
- **Transform**: uppercase
- **Tło**: gradient niebieski (#2C6AA8 → #1e4a77)
- **Kolor**: #ffffff

### Komórki tabel (td)
- **Rozmiar**: 14px (desktop), 13px (mobile)
- **Kolor**: #374151

### Style wizualne
- **Zebra striping**: włączony (co drugi wiersz)
- **Hover effect**: włączony
- **Border radius**: 8px (wrapper)
- **Box shadow**: subtle

---

## Obrazki

### Format
- **Szerokość**: 100%
- **Border radius**: 8px
- **Margines**: 24px (góra i dół)

### Podpisy (caption)
- **Czcionka**: Inter, sans-serif
- **Rozmiar**: 14px (0.875em)
- **Kolor**: #6B7280
- **Styl**: italic
- **Wyrównanie**: center
- **Margines górny**: 8px

### URL obrazków
- Względne ścieżki automatycznie konwertowane na pełne URL
- Format: `http://localhost:1337/uploads/...`

---

## Mobile (< 768px)

### Tabele
- **th**: 12px
- **td**: 13px
- **Padding**: zmniejszony do 12px 14px

### Pozostałe elementy
- Zachowują rozmiary desktop (14px)

---

## Kolory Brandowe

- **Niebieski główny**: #2C6AA8
- **Niebieski ciemny**: #1e4a77
- **Tekst główny**: #111827
- **Tekst drugorzędny**: #374151
- **Tekst wyblakły**: #6B7280
- **Tło jasne**: #F3F4F6
- **Tło bardzo jasne**: #F9FAFB
- **Border**: #E5E7EB

---

## Implementacja

### Komponenty
1. **ReactMarkdown** - dla treści markdown (legacy)
2. **BlocksRenderer** - dla treści Strapi blocks (nowy format)

Oba renderery używają identycznych stylów zdefiniowanych powyżej.

### Pliki konfiguracyjne
- `/components/article-content.tsx` - renderowanie treści
- `/components/article-table-styles.css` - style tabel

---

## Konsystencja

✅ **TAK:**
- Używaj H1 tylko dla głównego tytułu artykułu
- Używaj hierarchii H2 → H3 → H4
- Trzymaj się Inter 14px dla całej treści
- Używaj Playfair Display 52px tylko dla H1

❌ **NIE:**
- Nie zmieniaj rozmiarów czcionek inline
- Nie używaj wielu H1 w jednym artykule
- Nie mieszaj czcionek serif/sans-serif poza standardem
- Nie nadpisuj styli tabel inline

---

## Nowe Funkcjonalności

### Odsłuchiwanie Artykułów (Audio TTS)
**Data dodania**: 2025-11-01

Artykuły posiadają funkcjonalność text-to-speech pozwalającą na odsłuchanie treści:
- Ikona Volume2 w prawym górnym rogu (obok Share/Bookmark)
- Obsługa języka polskiego
- Play/Pause/Stop controls
- Szczegóły: Zobacz `AUDIO_FEATURE.md`

---

## Aktualizacje

**Data utworzenia**: 2025-11-01
**Ostatnia aktualizacja**: 2025-11-01
**Wersja**: 1.1.0

**Kontakt w sprawie zmian**: Wymaga akceptacji zespołu UX/Design

---

## Checklist dla autorów artykułów

Przed publikacją artykułu upewnij się:

- [ ] H1 użyty tylko raz (tytuł główny)
- [ ] Hierarchia nagłówków jest logiczna (H2 → H3 → H4)
- [ ] Nie użyto inline styles nadpisujących standard
- [ ] Tabele mają nagłówki (thead)
- [ ] Obrazki mają alternative text
- [ ] Obrazki mają caption (opcjonalnie)
- [ ] Linki są opisowe (nie "kliknij tutaj")
- [ ] Kod jest w blokach code/pre
- [ ] Cytaty używają blockquote

---

**Ten standard jest obowiązujący dla wszystkich artykułów w systemie KSeF Expert.**
