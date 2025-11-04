# Funkcjonalność Odsłuchiwania Artykułów

**Data dodania**: 2025-11-01
**Wersja**: 1.0.0

## Przegląd

System KSeF Expert posiada funkcjonalność text-to-speech (TTS) pozwalającą na odsłuchiwanie artykułów. Wykorzystuje natywne Web Speech API przeglądarki z obsługą języka polskiego.

---

## Komponenty

### ArticleAudioPlayer
**Lokalizacja**: `/components/article-audio-player.tsx`

Komponent React odpowiedzialny za odtwarzanie treści artykułów przy użyciu syntezy mowy.

#### Props:
- `title: string` - Tytuł artykułu
- `content: string` - Pełna treść artykułu (markdown lub blocks)
- `excerpt?: string` - Opcjonalny excerpt artykułu

#### Funkcjonalność:
- **Play** - Rozpoczyna odczytywanie artykułu
- **Pause** - Wstrzymuje odczytywanie
- **Resume** - Wznawia odczytywanie
- **Stop** - Zatrzymuje odczytywanie

#### Ikony (Lucide React):
- `Volume2` - Rozpocznij odczytywanie (niebieski #2C6AA8)
- `Pause` - Wstrzymaj odczytywanie (niebieski #2C6AA8)
- `Play` - Wznów odczytywanie (niebieski #2C6AA8)
- `VolumeX` - Zatrzymaj odczytywanie (czerwony #DC2626)

---

## Konfiguracja TTS

### Ustawienia syntezy mowy:
```typescript
utterance.lang = 'pl-PL'       // Polski język
utterance.rate = 0.9           // Prędkość (90% normalnej)
utterance.pitch = 1            // Wysokość tonu (domyślna)
utterance.volume = 1           // Głośność (100%)
```

### Automatyczny wybór głosu:
System automatycznie wybiera polski głos TTS jeśli jest dostępny w przeglądarce:
```typescript
const voices = window.speechSynthesis.getVoices()
const polishVoice = voices.find(voice => voice.lang.startsWith('pl'))
```

---

## Przetwarzanie treści

### Ekstrakcja tekstu z Markdown:
Komponent automatycznie usuwa formatowanie Markdown przed odczytaniem:
- Nagłówki (`#`, `##`, etc.)
- Pogrubienie (`**text**`)
- Kursywa (`*text*`)
- Linki (`[text](url)`) - zachowuje tylko tekst
- Bloki kodu (\`\`\`code\`\`\`)
- Inline code (\`code\`)
- Obrazki (`![alt](url)`)

### Kolejność odczytywania:
1. Tytuł artykułu
2. Excerpt (jeśli dostępny)
3. Pełna treść artykułu

---

## Integracja

### W komponencie ArticlePage:
**Lokalizacja**: `/app/article/[slug]/page.tsx`

```tsx
import { ArticleAudioPlayer } from "@/components/article-audio-player"

<ArticleAudioPlayer
  title={article.title}
  content={article.content}
  excerpt={article.excerpt}
/>
```

### Pozycja:
- Górny prawy róg artykułu
- Obok ikon Share i Bookmark
- W sekcji Author/Meta

---

## Wsparcie przeglądarek

### Web Speech API dostępne w:
✅ Chrome/Edge (doskonałe wsparcie)
✅ Safari (dobre wsparcie)
✅ Firefox (podstawowe wsparcie)
❌ Starsze przeglądarki

### Graceful degradation:
- Komponent automatycznie ukrywa się jeśli przeglądarka nie wspiera API
- Sprawdzenie: `'speechSynthesis' in window`

---

## UX/UI

### Stany przycisku:
1. **Nieaktywny** → Ikona `Volume2` (niebieski)
2. **Odczytywanie** → Ikona `Pause` + `VolumeX` (stop)
3. **Wstrzymany** → Ikona `Play` + `VolumeX` (stop)

### Hover effects:
- Tło: `hover:bg-[#F3F4F6]`
- Border radius: `rounded-lg`
- Transition: `transition-colors`

### Tooltips:
- "Odsłuchaj artykuł"
- "Wstrzymaj odczytywanie"
- "Wznów odczytywanie"
- "Zatrzymaj odczytywanie"

---

## Obsługa błędów

### Events:
```typescript
utterance.onerror = (event) => {
  console.error('Speech synthesis error:', event)
  // Reset state
  setIsPlaying(false)
  setIsPaused(false)
}
```

### Komunikat dla użytkownika:
Jeśli przeglądarka nie wspiera TTS:
```
"Twoja przeglądarka nie obsługuje funkcji odczytywania tekstu."
```

---

## Wydajność

### Optymalizacje:
- Użycie `useRef` dla utterance (unikanie re-renders)
- Komponent client-side only (`"use client"`)
- Lazy loading głosów (tylko przy pierwszym użyciu)
- Cancel poprzedniego utterance przed nowym

### Limit długości:
- Brak limitu - TTS odczytuje pełny artykuł
- Dla bardzo długich artykułów możliwe jest future improvement (chunking)

---

## Future Improvements

### Możliwe rozszerzenia:
1. **Kontrola prędkości** - Slider dla użytkownika (0.5x - 2x)
2. **Wybór głosu** - Lista dostępnych głosów polskich
3. **Progress bar** - Pokazywanie postępu odczytywania
4. **Skip forward/backward** - Przeskakiwanie między sekcjami
5. **Download audio** - Zapis do pliku MP3 (wymaga backend)
6. **Remember position** - Zapamiętanie miejsca po odświeżeniu

---

## Backup

**Backup przed dodaniem tej funkcjonalności:**
- Lokalizacja: `/Users/a2141/NOW/ksef-expert-konsolid_backup_przed-sound_*.tar.gz`
- Data: 2025-11-01
- Opis: Pełny backup projektu przed wprowadzeniem audio/TTS

---

## Technologie

- **Web Speech API** - Natywne API przeglądarki
- **React Hooks** - useState, useEffect, useRef
- **TypeScript** - Pełna typizacja
- **Lucide React** - Ikony

---

## Testowanie

### Testy manualne:
1. ✅ Kliknięcie Play rozpoczyna odczytywanie
2. ✅ Kliknięcie Pause wstrzymuje odczytywanie
3. ✅ Kliknięcie Play po Pause wznawia odczytywanie
4. ✅ Kliknięcie Stop zatrzymuje i resetuje
5. ✅ Polski akcent jest używany (jeśli dostępny)
6. ✅ Treść markdown jest prawidłowo przetwarzana

### Testy przeglądarek:
- [ ] Chrome/Edge
- [ ] Safari
- [ ] Firefox
- [ ] Mobile browsers

---

**Kontakt w sprawie zmian**: Wymaga akceptacji zespołu UX/Product
