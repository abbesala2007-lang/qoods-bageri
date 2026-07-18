# Qoods Bageri – webbplats

Hemsida för Qoods Bageri, ett arabiskt konditori i Åstorp.

## Filstruktur

```
index.html      Sidans innehåll
css/style.css   All styling
js/script.js    Mobilmeny, formulär och "Beställ"-knappar
images/         Alla bilder (se filnamn nedan)
```

## Förhandsgranska sidan lokalt

Ingen server krävs. Öppna bara `index.html` direkt i webbläsaren:

- **Windows:** dubbelklicka på `index.html`
- **Mac:** dubbelklicka på `index.html`, eller högerklicka → Öppna med → valfri webbläsare
- **Via terminal:** `open index.html` (Mac) eller `start index.html` (Windows)

Alla sökvägar till CSS, JS och bilder är relativa, så sidan fungerar även när
den öppnas direkt som fil (`file://...`) utan att en lokal server behöver köras.

Om du ändå vill köra en lokal server (t.ex. för att undvika webbläsarens
säkerhetsbegränsningar för vissa funktioner) kan du använda:

```
python3 -m http.server 8000
```

och sedan öppna `http://localhost:8000` i webbläsaren.

## Bilder som ska laddas upp i /images

Lägg exakt dessa filnamn i `images`-mappen så dyker de upp automatiskt på
sidan (ingen kodändring behövs):

| Filnamn                  | Används till                          |
|---------------------------|----------------------------------------|
| `hero-bg.jpg`              | Bakgrundsbild i hero-sektionen         |
| `box-luxury.jpg`           | Om oss-bild + Qoods Signature Box – 300 kr |
| `choco-cookies.jpg`        | Chokladdoppade Kakor – 150 kr          |
| `pistachio-cookies.jpg`    | Pistagekakor – 150 kr                  |
| `baklava-tray.jpg`         | Baklava Original – 150 kr              |
| `halawet-jibn.jpg`         | Halawet el-Jibn – 120 kr/kg            |
| `knafe.jpg`                | Knafe – 200 kr/kg                      |
| `chocolate-cake.jpg`       | Chokladtårta – 20 kr/st                |
| `mabroume.jpg`             | Mabroume – 350 kr/kg                   |

Tills bilderna laddats upp visas en enkel platshållarbild automatiskt.

## Anpassa innehåll

- **Färger och typsnitt:** ändras i `css/style.css` under `:root` (variabler i toppen av filen).
- **Texter:** ändras direkt i `index.html`.
- **Priser/produkter:** varje produkt är ett `<article class="product-card">`-block i `index.html`, sök efter `id="bakverk"`.
