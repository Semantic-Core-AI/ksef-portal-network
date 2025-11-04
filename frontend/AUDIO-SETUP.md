# 🎵 Audio Player - Instrukcja konfiguracji

## ✅ Zaimplementowane funkcje

### 1. **TypeScript Interface** (lib/strapi.ts)
Dodano pole `audioFile` do interfejsu `StrapiArticle`:
```typescript
audioFile?: {
  url: string
  name?: string
  mime?: string
  size?: number
}
```

### 2. **Audio Player Component** (components/audio-player.tsx)
Elegancki odtwarzacz audio z funkcjami:
- ▶️ Play/Pause
- 🎚️ Przewijanie (seek bar)
- 🔊 Kontrola głośności
- 📥 Pobieranie pliku
- ⏱️ Wyświetlanie czasu (aktualny/całkowity)
- 📱 Responsywny design
- 🎨 Gradient navy-blue zgodny z designem

### 3. **Integracja ze stroną artykułu** (app/article/[slug]/page.tsx)
Odtwarzacz wyświetla się automatycznie:
- Pojawia się po głównym obrazku artykułu
- Tylko gdy artykuł ma uploadowany plik audio
- Wyświetla tytuł artykułu w playerze

---

## 📋 Co musisz zrobić w Strapi

### KROK 1: Dodaj pole "audioFile" w Content Type Builder

1. Otwórz **Strapi Admin Panel**: http://localhost:1337/admin
2. Przejdź do: **Content-Type Builder** → **Article** (COLLECTION TYPES)
3. Kliknij **+ Add another field**
4. Wybierz **Media**
5. Wypełnij formularz:
   - **Name**: `audioFile`
   - **Type**: `Single media`
   - **Allowed types**: Zaznacz tylko **Audio** ✅ (obsługuje MP3, WAV, OGG, FLAC, AAC)
6. W zakładce **ADVANCED SETTINGS**:
   - **Required field**: ❌ NIE (pole opcjonalne)
   - **Private field**: ❌ NIE
   - **Enable localization**: ❌ NIE (jeśli nie używasz)
7. Kliknij **Finish**
8. Kliknij **Save** (w prawym górnym rogu)
9. **WAŻNE**: Strapi zrestartuje się automatycznie

### KROK 2: Wygeneruj plik audio (MP3 lub WAV) w ElevenLabs

1. Skopiuj treść artykułu ze Strapi
2. Wejdź na: **https://elevenlabs.io/**
3. Wklej tekst artykułu
4. Wybierz głos (np. polski lektor)
5. Wybierz format wyjściowy:
   - **MP3** (rekomendowane) - mniejszy rozmiar, dobra jakość
   - **WAV** - najwyższa jakość, większy rozmiar
6. Kliknij **Generate** 🎬
7. Pobierz wygenerowany plik

### KROK 3: Upload audio do artykułu w Strapi

1. Wejdź do **Content Manager** → **Articles**
2. Otwórz artykuł do edycji
3. Znajdź pole **audioFile**
4. Kliknij **Browse files** lub przeciągnij plik audio (MP3, WAV, etc.)
5. Kliknij **Save**
6. Kliknij **Publish** (jeśli artykuł jest w draft)

---

## 🎯 Jak to działa

### Frontend automatycznie:
```typescript
// Sprawdza czy artykuł ma audio
{article.audioFile?.url && (
  <div className="mb-8">
    <AudioPlayer
      audioUrl={article.audioFile.url}
      title={article.title}
    />
  </div>
)}
```

### Audio Player:
- Dodaje automatycznie URL bazowy Strapi do ścieżki pliku
- Obsługuje pliki z Strapi (`/uploads/...`) lub pełne URL
- Wyświetla elegancki gradient player z kontrolkami

---

## 📁 Struktura plików

```
/Users/a2141/NOW/ksef-expert-konsolid/
├── lib/
│   └── strapi.ts                    # Interface z polem audioFile ✅
├── components/
│   └── audio-player.tsx             # Komponent odtwarzacza ✅
└── app/
    └── article/
        └── [slug]/
            └── page.tsx              # Integracja na stronie ✅

/Users/a2141/NOW/ksef-strapi-backend/
└── src/
    └── api/
        └── article/
            └── content-types/
                └── article/
                    └── schema.json   # Dodaj pole audioFile ⚠️
```

---

## 🎨 Design systemu

### Kolory:
- **Background gradient**: `from-[#1E2A5E] to-[#2C6AA8]` (navy-blue)
- **Progress bar**: White
- **Buttons**: White z hover effects
- **Text**: White / White-70 opacity

### Ikony (Lucide React):
- 🎧 Headphones (nagłówek)
- ▶️ Play
- ⏸️ Pause
- 🔊 Volume2
- 🔇 VolumeX
- 📥 Download

---

## 🚀 Przykład użycia

### 1. Bez audio:
```
Artykuł bez pola audioFile → Player NIE pojawia się
```

### 2. Z audio:
```
Artykuł z audioFile (MP3):
  url: "/uploads/artykul_123.mp3"
  name: "artykul_123.mp3"
  mime: "audio/mpeg"
  size: 2547821

Artykuł z audioFile (WAV):
  url: "/uploads/artykul_123.wav"
  name: "artykul_123.wav"
  mime: "audio/wav"
  size: 15234567

→ Player pojawia się automatycznie
→ URL: http://localhost:1337/uploads/artykul_123.mp3 (lub .wav)
→ Tytuł: "Posłuchaj artykułu"
→ Obsługuje: MP3, WAV, OGG, AAC, FLAC
```

---

## ⚡ Tips & Tricks

### 1. **Wybór formatu audio:**

#### **MP3** (rekomendowane) ⭐
- ✅ Mały rozmiar (~1MB/min przy 128kbps)
- ✅ Świetna kompatybilność (wszystkie przeglądarki)
- ✅ Wystarczająca jakość dla mowy
- 📊 Bitrate: 128 kbps (mowa) lub 192 kbps (muzyka)

#### **WAV** (najwyższa jakość)
- ✅ Bezstratna jakość audio
- ⚠️ Duży rozmiar (~10MB/min)
- ✅ Dobra kompatybilność przeglądarek
- 📊 Idealne dla archiwalnych nagrań

#### **Inne formaty:**
- **OGG** - dobra jakość, mały rozmiar (ale słabsza kompatybilność Safari)
- **AAC** - podobne do MP3, używane przez Apple
- **FLAC** - bezstratna kompresja (duże pliki)

### 2. **Rekomendacje formatów dla różnych przypadków:**

| Przypadek użycia | Format | Dlaczego |
|-----------------|--------|----------|
| 🎯 **Standardowe artykuły** | MP3 128kbps | Małe pliki, dobra jakość |
| 🎙️ **Wywiady/Podcasty** | MP3 192kbps | Lepsza jakość głosu |
| 🎓 **Premium content** | WAV | Najwyższa jakość |
| 📱 **Mobile-first** | MP3 96kbps | Ultraszybkie ładowanie |

### 3. **ElevenLabs sugestie:**
- Użyj głosu polskiego lektora (np. "Antoni", "Zofia")
- Podziel długie artykuły na sekcje
- Preview przed wygenerowaniem
- WAV dla najwyższej jakości, MP3 dla produkcji

### 4. **Strapi Media Library:**
- Pliki znajdują się w: `/Users/a2141/NOW/ksef-strapi-backend/public/uploads/`
- Backup regularnie folder `uploads/`
- Możesz dodać folder CDN w przyszłości
- **Limit rozmiaru**: Domyślnie Strapi przyjmuje do 1GB (można zwiększyć w konfiguracji)

---

## 🐛 Troubleshooting

### Problem: Audio nie gra
**Rozwiązanie**: Sprawdź czy plik audio jest dostępny pod URL:
```bash
# Dla MP3:
curl http://localhost:1337/uploads/nazwa_pliku.mp3

# Dla WAV:
curl http://localhost:1337/uploads/nazwa_pliku.wav
```

### Problem: Player się nie pojawia
**Rozwiązanie**: Sprawdź w konsoli przeglądarki czy `article.audioFile?.url` ma wartość

### Problem: 404 na plik audio
**Rozwiązanie**: Upewnij się że:
1. Strapi backend działa na porcie 1337
2. Plik został uploadowany (sprawdź Media Library w Strapi)
3. Artykuł został opublikowany (Publish)

---

## 📊 Status implementacji

- ✅ TypeScript interface zaktualizowany
- ✅ AudioPlayer component stworzony
- ✅ Integracja na stronie artykułu
- ✅ Responsywny design
- ✅ Kontrolki audio (play/pause/volume/seek)
- ✅ Download button
- ⚠️ **Musisz dodać**: Pole `audioFile` w Strapi Content Type Builder

---

## 🎓 Next Steps

1. **Dodaj pole audioFile w Strapi** (KROK 1 powyżej)
2. **Wygeneruj audio dla 1-2 artykułów** w ElevenLabs
3. **Upload i przetestuj** na http://localhost:3000
4. **Jeśli działa** → dodaj audio do wszystkich ważnych artykułów
5. **Future**: Rozważ automatyzację (Strapi plugin + ElevenLabs API)

---

Gotowe! 🎵 Masz teraz profesjonalny audio player dla artykułów!
