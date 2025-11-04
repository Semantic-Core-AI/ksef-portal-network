# 📋 Paste Upload - Instrukcja użycia

## ✅ Funkcjonalność wdrożona

Dodano możliwość wklejania obrazków bezpośrednio ze schowka (Ctrl+V / Cmd+V) w Strapi Admin Panel.

## 🎯 Jak używać

### Metoda 1: Automatyczne wklejanie w modal upload

1. **Otwórz modal dodawania obrazka**:
   - W edycji artykułu kliknij na pole obrazka (np. `gridImage`, `featuredImage`, `audioFile`)
   - Kliknij przycisk **"+ Add new assets"**

2. **Skopiuj obrazek do schowka**:
   - Zrób screenshot (Cmd+Shift+4 na Mac, Windows+Shift+S na Windows)
   - Lub skopiuj obrazek z dowolnego miejsca (prawy przycisk → Kopiuj obrazek)

3. **Wklej obrazek** (Ctrl+V / Cmd+V):
   - Naciśnij **Ctrl+V** (Windows/Linux) lub **Cmd+V** (Mac)
   - System automatycznie wykryje obrazek i doda go do uploadu

4. **Zobaczysz powiadomienie**:
   - ✅ **"Image pasted successfully!"** - jeśli upload się powiódł
   - 💡 **"Image ready to paste!"** - jeśli trzeba powtórzyć paste klikając w dropzone

### Metoda 2: Alternatywna (jeśli automatyczne nie działa)

1. Skopiuj obrazek do schowka
2. Otwórz modal "Add new assets"
3. Kliknij w obszar **"Drag & Drop here or"** (dropzone)
4. Naciśnij **Ctrl+V** / **Cmd+V**
5. Obrazek zostanie dodany

## 📊 Obsługiwane formaty

System rozpoznaje wszystkie formaty obrazków ze schowka:
- **PNG** - najbardziej popularny (screenshoty)
- **JPEG/JPG** - zdjęcia
- **GIF** - animacje
- **WEBP** - nowoczesny format
- **BMP** - starszy format

## 🎨 Wizualne potwierdzenie

Po wklejeniu zobaczysz elegancne powiadomienie w prawym górnym rogu:

- **Fioletowe powiadomienie** (✅): Upload się powiódł, plik został dodany
- **Różowe powiadomienie** (💡): Kliknij w dropzone i wklej ponownie

## 🔍 Jak to działa technicznie

System przechwytuje wydarzenia `paste` i:
1. Sprawdza czy w schowku jest obrazek
2. Konwertuje blob do File object
3. Dodaje automatyczną nazwę: `pasted-image-[timestamp].[extension]`
4. Symuluje upload do Strapi przez:
   - Ustawienie `input[type="file"].files`
   - Lub symulację `drop` event na dropzone
5. Wyświetla wizualne potwierdzenie

## 🛠️ Troubleshooting

### Problem: Paste nie działa
**Rozwiązanie**:
1. Upewnij się, że masz obrazek w schowku (nie link, nie plik)
2. Sprawdź czy jesteś w modalu "Add new assets"
3. Kliknij w obszar dropzone przed wklejeniem
4. Odśwież stronę admin panel (Ctrl+R / Cmd+R)

### Problem: Nie widzę powiadomienia
**Rozwiązanie**:
1. Otwórz konsolę przeglądarki (F12)
2. Szukaj loga: `📋 Pasted image detected`
3. Jeśli jest - funkcjonalność działa, ale upload może wymagać kliknięcia w dropzone

### Problem: Plik nie ma dobrej nazwy
**Rozwiązanie**:
Pliki wklejone automatycznie dostają nazwę:
```
pasted-image-1699012345678.png
```

Możesz zmienić nazwę później w:
1. **Media Library** → znajdź plik → **Edit** → zmień `name`
2. Lub podczas dodawania kliknij na miniaturkę i zmień nazwę

## 📝 Przykłady użycia

### Use case 1: Dodanie screenshota
```
1. Zrób screenshot (Cmd+Shift+4)
2. Screenshot jest automatycznie w schowku
3. Otwórz modal upload w Strapi
4. Ctrl+V / Cmd+V
5. ✅ Gotowe!
```

### Use case 2: Kopiowanie obrazka z przeglądarki
```
1. Prawy przycisk na obrazek → "Kopiuj obrazek"
2. Otwórz modal upload w Strapi
3. Ctrl+V / Cmd+V
4. ✅ Obrazek dodany!
```

### Use case 3: Obrazek z Photoshopa/Figmy
```
1. W Photoshop/Figma: Edit → Copy (lub Ctrl+C)
2. Przejdź do Strapi
3. Otwórz modal upload
4. Ctrl+V / Cmd+V
5. ✅ Design dodany!
```

## 🚀 Korzyści

- ⚡ **Szybsze workflow** - bez konieczności zapisywania plików na dysk
- 🎯 **Mniej kliknięć** - paste zamiast browse → select → open
- 📸 **Idealne dla screenshotów** - natychmiastowy upload bez zapisywania
- 🎨 **Wspiera designerów** - bezpośredni paste z Figma/Photoshop
- 💾 **Mniej plików tymczasowych** - nie zaśmiecasz dysku

## 📂 Lokalizacja kodu

Customizacja została dodana w:
```
/Users/a2141/NOW/ksef-strapi-backend/src/admin/app.tsx
```

## 🔄 Restart po zmianach

Jeśli wprowadzisz zmiany w `src/admin/app.tsx`:

```bash
cd /Users/a2141/NOW/ksef-strapi-backend
npm run build && npm run develop
```

Rebuild trwa ~20-30 sekund.

## ✨ Status

- ✅ Implementacja zakończona
- ✅ Strapi przebudowany
- ✅ Ready to use!

---

Gotowe! 📋 Możesz teraz wklejać obrazki bezpośrednio w Strapi Admin Panel używając **Ctrl+V** / **Cmd+V**.
