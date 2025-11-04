# 🎙️ KSEF.EXPERT Audio Generator

Automatyczne generowanie plików audio dla wszystkich artykułów używając ElevenLabs Text-to-Speech ze sklonowanym głosem.

## 📋 Wymagania

1. **Node.js** (v16+)
2. **Strapi Backend** uruchomiony na `localhost:1337`
3. **ElevenLabs API Key** + **Voice ID** (Twój sklonowany głos)

## 🚀 Krok po kroku - Setup

### 1. Instalacja zależności

```bash
cd /Users/a2141/NOW/ksef-strapi-backend
npm install axios form-data
```

### 2. Utwórz Strapi API Token

1. Otwórz Strapi Admin: `http://localhost:1337/admin`
2. Idź do: **Settings** → **API Tokens** → **Create new API Token**
3. Ustawienia:
   - **Name**: `Audio Generator`
   - **Token type**: `Full access`
   - **Duration**: `Unlimited`
4. Kliknij **Save**
5. **Skopiuj token** (pojawi się tylko raz!)

### 3. Pobierz ElevenLabs API Key

1. Idź do: https://elevenlabs.io/app/settings/api-keys
2. Kliknij **Create API Key**
3. Skopiuj klucz

### 4. Pobierz Voice ID

**Po zakończeniu treningu głosu (za ~5h):**

1. Idź do: https://elevenlabs.io/app/voice-lab
2. Znajdź swój sklonowany głos
3. Kliknij na niego
4. Skopiuj **Voice ID** (długi ciąg znaków)

### 5. Konfiguracja - Ustaw zmienne środowiskowe

Możesz to zrobić na 2 sposoby:

#### **Opcja A: Bezpośrednio w terminalu** (zalecane):

```bash
export STRAPI_URL="http://localhost:1337"
export STRAPI_API_TOKEN="twój_strapi_token"
export ELEVENLABS_API_KEY="twój_elevenlabs_api_key"
export ELEVENLABS_VOICE_ID="twój_voice_id"
```

#### **Opcja B: Plik .env**:

```bash
cd /Users/a2141/NOW/ksef-strapi-backend/scripts
cp .env.example .env
nano .env  # Edytuj i wklej swoje tokeny
```

## 🧪 Test - Dry Run (bez generowania)

**Zalecane przed pierwszym uruchomieniem!**

```bash
cd /Users/a2141/NOW/ksef-strapi-backend
node scripts/generate-audio.js --dry-run
```

Sprawdzi:
- ✅ Połączenie ze Strapi
- ✅ Ile artykułów zostanie przetworzonych
- ✅ Długość tekstów

## 🎬 Uruchomienie

### Test na 5 artykułach:

```bash
node scripts/generate-audio.js --limit 5
```

### Generuj wszystkie artykuły (250):

```bash
node scripts/generate-audio.js
```

### Wznowienie (skip artykułów z audio):

```bash
node scripts/generate-audio.js --skip-existing
```

## 📊 Przykładowy output

```
🎙️  KSEF.EXPERT Audio Generator

Configuration:
  Strapi URL: http://localhost:1337
  Voice ID: 21m00Tcm4TlvDq8ikWAM
  Dry Run: NO
  Skip Existing: NO
  Limit: ALL

📥 Fetching articles from Strapi...

✅ Found 250 articles

[1/250] Processing: "KSEF 2026: Kompletny Przewodnik"
    ID: 1, Slug: ksef-2026-kompletny-przewodnik
    📝 Text length: 3456 characters
    🎙️  Generating audio...
    ☁️  Uploading to Strapi...
    ✅ SUCCESS: Audio generated and uploaded

[2/250] Processing: "Jak przygotować firmę do KSeF"
    ID: 2, Slug: jak-przygotowac-firme-do-ksef
    ⏭️  SKIPPED: Already has audio file

...

============================================================
📊 SUMMARY
============================================================
Total articles: 250
✅ Generated: 248
⏭️  Skipped: 2
❌ Failed: 0
============================================================
```

## ⏱️ Szacowany czas

- **1 artykuł** = ~10-15 sekund
- **250 artykułów** = ~40-60 minut

## 💰 Szacowany koszt

- **250 artykułów** × 2500 znaków = 625,000 znaków
- **ElevenLabs Pro** ($22/msc):
  - 100,000 znaków w cenie
  - Przekroczenie: 525,000 × $0.30 = **~$157**

**Sprawdź swoje limity:** https://elevenlabs.io/app/usage

## ⚠️ Ważne

- Skrypt **automatycznie** dodaje pauzy między requestami (1s)
- Można bezpiecznie przerwać (Ctrl+C) i wznowić później z `--skip-existing`
- Pliki MP3 są tymczasowo zapisywane w `scripts/temp/` i usuwane po uploadu

## 🐛 Troubleshooting

### "STRAPI_API_TOKEN is not set"
- Upewnij się że ustawiłeś zmienne środowiskowe
- Sprawdź: `echo $STRAPI_API_TOKEN`

### "401 Unauthorized"
- Token Strapi jest nieprawidłowy lub wygasł
- Wygeneruj nowy w Strapi Admin

### "Voice not found"
- Voice ID jest nieprawidłowy
- Sprawdź w ElevenLabs Voice Lab

### "429 Too Many Requests"
- Przekroczyłeś limit API
- Poczekaj chwilę lub zwiększ `setTimeout` w skrypcie

## 📞 Pomoc

Jeśli coś nie działa:
1. Sprawdź czy Strapi backend działa: `http://localhost:1337/admin`
2. Sprawdź logi w terminalu
3. Uruchom z `--dry-run` żeby zdiagnozować problem
