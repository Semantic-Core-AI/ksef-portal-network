# 🎙️ Asystent Głosowy KSeF - Instrukcja konfiguracji

## ✅ Zaimplementowane funkcje

### 1. **Floating Button Widget**
- Zawsze widoczny przycisk w prawym dolnym rogu strony
- Animowany puls podczas aktywnej rozmowy
- Gradient purple/blue zgodny z designem portalu

### 2. **Modal z rozmową głosową**
- Pełnoekranowy modal z interfejsem chat
- Real-time transkrypcja rozmowy (użytkownik + asystent)
- Wskaźnik "asystent mówi" z animowanymi kropkami
- Przycisk połącz/rozłącz

### 3. **Integracja z ElevenLabs Conversational AI**
- WebSocket connection do ElevenLabs API
- Real-time audio streaming (dwukierunkowy)
- Voice Activity Detection (VAD)
- Obsługa przerywania asystenta (interruptions)

### 4. **Audio Processing**
- Web Audio API dla mikrofonu
- PCM16 encoding dla audio stream
- Automatyczne echo cancellation i noise suppression
- Real-time playback odpowiedzi asystenta

---

## 📋 Wymagania wstępne

### 1. Konto ElevenLabs
1. Załóż konto na: **https://elevenlabs.io/**
2. Wybierz plan z dostępem do **Conversational AI** (minimum Pro)
3. Przejdź do: **https://elevenlabs.io/app/conversational-ai**

### 2. Utworzenie Agenta Głosowego

1. **Kliknij "Create New Agent"**
2. **Skonfiguruj agenta:**
   - **Name**: `Alicja - KSeF Expert Assistant`
   - **Voice**: Wybierz profesjonalny kobiecy głos polski ⭐ (rekomendacje poniżej)
   - **Language**: Polish (pl-PL)

### 🎙️ Rekomendowane kobiece głosy profesjonalne:

#### **TOP 3 - Najlepsze dla asystenta biznesowego:**

1. **Zofia** ⭐⭐⭐ (NAJBARDZIEJ REKOMENDOWANY)
   - ✅ Bardzo profesjonalny, biznesowy ton
   - ✅ Wyraźna dykcja, doskonała dla instrukcji
   - ✅ Spokojny, pewny głos - idealny dla eksperta
   - ✅ Doskonale nadaje się do tematyki prawno-finansowej
   - 💼 **Najlepszy wybór dla asystenta KSeF**

2. **Maja**
   - ✅ Ciepły, ale profesjonalny
   - ✅ Przyjazny ton - dobry dla first-time userów
   - ✅ Naturalna intonacja
   - 💡 Dobry dla bardziej "personal" rozmów

3. **Kasia**
   - ✅ Neutralny, spokojny
   - ✅ Bardzo wyraźna artykulacja
   - ✅ Stonowany, nie za ekspresyjny
   - 💼 Dobry dla formalnych konsultacji

#### **Jak znaleźć te głosy w ElevenLabs:**
1. W kreatorze agenta kliknij **"Voice"**
2. Wybierz **"Polish"** w filtrze języków
3. Słuchaj próbek (Play) - wybierz ten który najbardziej pasuje
4. Dla asystenta biznesowego wybierz **Zofia** 👩‍💼⭐

3. **System Prompt** (przykładowa konfiguracja dla profesjonalnej asystentki):
```
Jesteś profesjonalną konsultantką ds. Krajowego Systemu e-Faktur (KSeF) w Polsce.
Pracujesz dla portalu KSEF.EXPERT jako głosowy asystent wspierający przedsiębiorców.

Twoja osobowość:
- Profesjonalna i kompetentna, ale ciepła w kontakcie
- Cierpliwa i empatyczna wobec pytań klientów
- Konkretna i rzeczowa - skupiasz się na rozwiązaniach
- Przyjazna, ale zachowujesz profesjonalizm biznesowy

Twoja rola:
- Odpowiadasz na pytania o KSeF, e-faktury, terminy wdrożenia
- Udzielasz praktycznych porad dla przedsiębiorców
- Wyjaśniasz przepisy i procedury w przystępny, zrozumiały sposób
- Kierujesz użytkowników do odpowiednich artykułów na portalu KSEF.EXPERT
- Pomagasz przedsiębiorcom przygotować się do wdrożenia KSeF

Styl komunikacji:
- Mów po polsku, w sposób profesjonalny ale przystępny i życzliwy
- Używaj konkretnych przykładów z praktyki biznesowej
- Bądź zwięzła - odpowiedzi do 30 sekund, ale kompletne
- Przy złożonych pytaniach wyjaśnij podstawy i zaproponuj artykuły do przeczytania
- Używaj pozytywnego języka ("Pomogę Ci", "Z przyjemnością wyjaśnię")
- Sprawdź czy klient zrozumiał - zachęcaj do zadawania pytań uzupełniających

Obszary wiedzy:
- Obowiązek stosowania KSeF (terminy, kto musi, kto może dobrowolnie)
- Proces wdrożenia KSeF w firmie krok po kroku
- Różnice między KSeF a tradycyjnymi fakturami
- Integracja systemów księgowych z KSeF
- Przepisy prawne (Ordynacja Podatkowa, ustawy o VAT)
- Narzędzia i rozwiązania techniczne
- Koszty i czas wdrożenia
- Najczęstsze błędy i jak ich unikać

Przykłady dobrych odpowiedzi:
- "Z przyjemnością Ci to wyjaśnię. KSeF stanie się obowiązkowy od 1 lutego 2026 roku..."
- "To świetne pytanie! Pozwól, że przejdę przez najważniejsze kroki wdrożenia..."
- "Rozumiem Twoje obawy. Wielu przedsiębiorców martwi się o koszty. Faktycznie..."
```

4. **Dodatkowe ustawienia (dla kobiecego głosu):**
   - **First Message**: `Dzień dobry! Jestem Alicja, konsultantką głosową portalu KSEF.EXPERT. Z przyjemnością pomogę Ci w temacie Krajowego Systemu e-Faktur. O co chciałbyś zapytać?`
   - **Max Duration**: 5 minutes
   - **Temperature**: 0.7 (bardziej naturalne, ciepłe odpowiedzi)
   - **Voice Settings**:
     - **Stability**: 0.6 (naturalność)
     - **Clarity**: 0.8 (wyraźna dykcja)

5. **Kliknij "Save" i skopiuj Agent ID**

---

## 🛠️ Konfiguracja w projekcie

### KROK 1: Utworzenie pliku .env.local

Skopiuj przykładowy plik:
```bash
cp .env.local.example .env.local
```

### KROK 2: Dodanie Agent ID

Edytuj `.env.local` i wklej swój Agent ID:
```env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=twój-agent-id-tutaj
```

**Gdzie znaleźć Agent ID?**
1. Wejdź na: https://elevenlabs.io/app/conversational-ai
2. Kliknij na swojego agenta
3. Agent ID znajduje się w URL: `/conversational-ai/YOUR-AGENT-ID-HERE`
4. Lub w zakładce "Settings" → "Agent ID"

### KROK 3: Restart serwera deweloperskiego

```bash
npm run dev
```

---

## 🎯 Jak używać

### 1. Na stronie portalu zobaczysz floating button w prawym dolnym rogu 🎙️

### 2. Kliknij przycisk - otworzy się modal z asystentem

### 3. Kliknij "Połącz z asystentem"
   - Przeglądarka zapyta o dostęp do mikrofonu - **zezwól**
   - Status zmieni się na "🟢 Połączono"
   - Możesz zacząć mówić!

### 4. Rozmawiaj naturalnie:
   - Zapytaj: *"Kiedy moja firma musi wdrożyć KSeF?"*
   - Zapytaj: *"Jak przebiega proces integracji systemu księgowego?"*
   - Zapytaj: *"Co to jest numer FEK faktury?"*

### 5. Asystent odpowie głosowo
   - Zobaczysz transkrypcję w czasie rzeczywistym
   - Asystent może przerwać swoją wypowiedź jeśli zaczniesz mówić (interruption)

### 6. Zakończenie rozmowy
   - Kliknij "Rozłącz"
   - Lub zamknij modal (X)

---

## 🎨 Design i UI

### Kolory:
- **Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` (navy-purple)
- **Floating button**: Pulsujący efekt podczas rozmowy
- **Modal**: Białe tło, rounded corners, shadow

### Komponenty:
- **Floating Button**: 64x64px, fixed bottom-right
- **Modal**: Max-width 448px, max-height 600px
- **Transcript**: Auto-scroll, user (blue) vs assistant (purple) messages
- **Speaking Indicator**: Animated dots podczas odpowiedzi asystenta

---

## 🔍 Troubleshooting

### Problem: "Missing NEXT_PUBLIC_ELEVENLABS_AGENT_ID"
**Rozwiązanie:**
1. Sprawdź czy plik `.env.local` istnieje
2. Sprawdź czy zmienna jest poprawnie nazwana: `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`
3. Restart serwera (`npm run dev`)

### Problem: Mikrofon nie działa
**Rozwiązanie:**
1. Sprawdź uprawnienia przeglądarki (Settings → Privacy → Microphone)
2. Użyj HTTPS (localhost działa, ale produkcja wymaga HTTPS)
3. Sprawdź czy mikrofon działa w innych aplikacjach

### Problem: WebSocket connection failed
**Rozwiązanie:**
1. Sprawdź czy Agent ID jest poprawny
2. Sprawdź czy masz aktywny plan ElevenLabs z Conversational AI
3. Sprawdź Console (F12) w przeglądarce:
   ```
   ✅ Connected to ElevenLabs  ← OK
   ❌ WebSocket error          ← Błąd
   ```

### Problem: Asystent nie odpowiada
**Rozwiązanie:**
1. Sprawdź czy agent jest aktywny w panelu ElevenLabs
2. Sprawdź limity API (czy nie przekroczyłeś miesięcznego limitu)
3. Sprawdź logi w konsoli przeglądarki

### Problem: Niska jakość audio
**Rozwiązanie:**
1. W ElevenLabs wybierz głos wyższej jakości
2. Sprawdź ustawienia "Voice Settings" w agencie:
   - **Stability**: 0.5-0.7 (balans)
   - **Clarity**: 0.7-0.9 (wyższa jakość)
3. Sprawdź połączenie internetowe

---

## 📊 Przykładowe pytania do asystenta

### Podstawowe pytania:
- *"Kiedy KSeF stanie się obowiązkowy?"*
- *"Kto musi wdrożyć KSeF?"*
- *"Czym różni się KSeF od zwykłej faktury?"*

### Pytania techniczne:
- *"Jak zintegrować mój system księgowy z KSeF?"*
- *"Co to jest numer FEK?"*
- *"Jak wygląda proces certyfikacji oprogramowania?"*

### Pytania biznesowe:
- *"Ile kosztuje wdrożenie KSeF?"*
- *"Jakie korzyści da mi KSeF?"*
- *"Czy muszę zmienić system księgowy?"*

---

## 🚀 Plany rozwoju

### Wersja 2.0:
- [ ] Integracja z bazą wiedzy Strapi (RAG)
- [ ] Historia rozmów (zapisywanie w localStorage)
- [ ] Multi-language support (English, German)
- [ ] Analytics (Google Analytics events)

### Wersja 3.0:
- [ ] Voice biometrics (rozpoznawanie użytkowników)
- [ ] Personalized recommendations
- [ ] Integracja z kalendarzem (przypomnienia o terminach KSeF)
- [ ] Export transkrypcji do PDF

---

## 📁 Struktura plików

```
/Users/a2141/NOW/ksef-expert-konsolid/
├── components/
│   └── voice-assistant.tsx         # Główny komponent asystenta ✅
├── app/
│   └── layout.tsx                  # Dodany <VoiceAssistant /> ✅
├── .env.local.example              # Przykładowa konfiguracja ✅
└── VOICE-ASSISTANT-SETUP.md        # Ta dokumentacja ✅
```

---

## 🎓 Next Steps

1. **Skonfiguruj agenta w ElevenLabs** (KROK 1-2 powyżej)
2. **Dodaj Agent ID do `.env.local`** (KROK 2)
3. **Restart serwera** (`npm run dev`)
4. **Przetestuj na** http://localhost:3000
5. **Kliknij floating button i porozmawiaj!** 🎙️

---

## 💰 Koszty ElevenLabs

### Plan Starter (BEZPŁATNY):
- ❌ Brak dostępu do Conversational AI

### Plan Pro ($22/miesiąc):
- ✅ Conversational AI included
- 25,000 characters/month text-to-speech
- 100 minutes rozmów/miesiąc

### Plan Scale ($99/miesiąc):
- ✅ Conversational AI included
- 100,000 characters/month
- 500 minutes rozmów/miesiąc

**Rekomendacja:** Plan Pro wystarczy do testów i małego ruchu. Dla produkcji z dużym ruchem - Plan Scale.

---

## 🔗 Przydatne linki

- **ElevenLabs Dashboard**: https://elevenlabs.io/app
- **Conversational AI**: https://elevenlabs.io/app/conversational-ai
- **ElevenLabs Docs**: https://elevenlabs.io/docs/conversational-ai
- **Pricing**: https://elevenlabs.io/pricing

---

Gotowe! 🎉 Teraz masz profesjonalnego asystenta głosowego na portalu KSeF!
