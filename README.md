📈 Min aksje- og markedsoversikt
Min aksje- og markedsoversikt er en interaktiv frontend-applikasjon laget med React og Vite.
Den er bygget som et personlig verktøy og læringsprosjekt, og gir brukeren en enkel oversikt over:

Egen aksjeportefølje

Dagens kurser og endringer

Markedsverdi og avkastning

Tilrettelegging for fremtidig markedsdata og råvareindekser

Appen er i aktiv utvikling og planlagt for utvidelse med caching, ønskelister og bredere markedsdekning.

🔧 Funksjoner
✅ Viser aksjer med navn, ticker, antall, GAV og valuta
📊 Henter sanntidskurser via EOD Historical Data API
📉 Viser endring (%) med grønn/rød fargestyling
💰 Kalkulerer markedsverdi og viser avkastning i NOK og %
✍️ Brukeren kan klikke direkte på GAV og Antall for å redigere
💡 Automatisk utregning ved redigering
📦 Planlagt støtte for caching av daglige markedsdata
📱 Responsiv design – tilpasset både desktop og mobil
🎨 Moderne og minimalistisk finansinspirert tema

🧪 Teknologi brukt
⚛️ React
⚡ Vite
📦 Axios for API-kall
🎨 CSS Modules + global theme.css
🧠 JavaScript-logikk for kalkulasjon og tilstandshåndtering
💾 Tilrettelegging for bruk av localStorage (ikke aktivert ennå)

🧠 Hvordan jeg har jobbet
Jeg startet med å sette opp prosjektet med Vite + React, og bygde strukturen slik at alt skulle være lett å dele opp i komponenter.
Appen henter sanntidskurser fra EOD Historical Data sitt API, og forsøker fallback til siste sluttkurs dersom live-data ikke er tilgjengelig.

Hovedkomponenten (App.jsx) holder porteføljen i state, henter data fra API, og sender det ned til PortfolioTable.
Der vises informasjonen i en ryddig tabell, og feltene GAV og antall er gjort redigerbare med EditCell, som lar brukeren skrive inn nye verdier direkte.
Avkastning og markedsverdi kalkuleres automatisk ved hver endring.

Stylingen er laget med CSS Modules og globale variabler i theme.css.
Appen er laget for meg personlig, men alt bygges med tanke på mulig fremtidig utvidelse.

🧱 Filstruktur

src/
├── App.jsx           ← hovedkomponent med portefølje og logikk
├── main.jsx          ← inngangspunkt
├── components/
│   ├── PortfolioTable.jsx  ← viser all porteføljeinformasjon
│   └── EditCell.jsx        ← redigerbare tabellceller
├── styles/
│   ├── PortfolioTable.module.css ← styling for tabellen
│   └── theme.css                ← globale farger og fonter

📈 Neste steg
🔐 Lagre siste markedsdata i localStorage for fallback
📝 La brukeren selv legge til og fjerne aksjer
📊 Ny seksjon med relevante markedsindekser og råvarepriser
💾 Lagre/redigere ønskeliste
🎯 Konverter porteføljen til å lagres automatisk i nettleseren
🔁 Klargjøre proxy/backend for trygg API-bruk ved deling
🎨 Light/dark-mode toggle og visuelle forbedringer
📱 Videre optimalisering for små skjermer

✍️ Laget av
Marcus @ Kodehode
"Frontend-nerd med lidenskap for design, data og detaljer."

// 💍 One bug to find them,
// 🔥 One fix to bring them all,
// 💡 And in the darkness bind them.

📄 Lisens
Dette prosjektet er laget som en del av egenlæring og utvikling.
Bruk det som inspirasjon, bygg videre – og ikke vær redd for å gjøre det til ditt eget ✨
