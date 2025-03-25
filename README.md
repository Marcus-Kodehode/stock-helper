📌 Hva er dette prosjektet?
En personlig frontend webapplikasjon for aksje- og markedsoversikt

Dette prosjektet er en egentreningsoppgave og personlig verktøy for å følge med på:

📈 Min egen aksjeportefølje (GAV, antall, live markedspris, avkastning)

🌍 Globale og norske indekser

💰 Relevante råvarepriser (f.eks. olje, jern, shipping)

Målet med prosjektet er å:

Øve på React + API-integrasjon

Forbedre frontendstruktur og styling

Utforske konsepter som datahenting, redigering i UI, caching og responsiv design

⚙️ Hvordan fungerer det – arkitektur og oppbygning så langt?

React + Vite

Applikasjonen er bygget med React (via Vite)

Moderne og rask dev-opplevelse

Komponentstruktur

App.jsx → hovedcontainer og state

PortfolioTable.jsx → viser aksjeporteføljen i en tabell

EditCell.jsx → redigerbare felter direkte i tabellen (GAV og antall)

PortfolioTable.module.css → modulær styling for tabellen

theme.css → globale farger, fonter og variabler

Datahenting

Bruker API fra EOD Historical Data

Henter sanntidskurser (real-time) og fallback (eod/) dersom førstnevnte feiler

Viser pris, endring %, markedsverdi og beregnet avkastning per aksje

Responsiv design

Appen er tilpasset både desktop og mobil

Zebra-striper, hover-effekt, auto-scroll ved liten skjerm

Sentralisert og moderne layout inspirert av økonomi/finans

Redigering i UI

Brukeren kan klikke direkte på antall og GAV for å redigere disse

Endringer oppdaterer verdier i sanntid via React useState

API-rate awareness

Prosjektet er bygget for å fungere selv når API-grensen er nådd

Planlagt forbedring: lagre data i localStorage som fallback når kvoten er brukt opp

🧪 Hva kommer etterhvert:
 
 Lagre porteføljen i localStorage (persistens)

 Egen oversikt for ønskeliste/følgeliste

 Oversikt over relevante markedsdata (indekser, råvarer)

 Brukertilpasning (legg til egne aksjer manuelt)

 Mulighet for å cache dagens markedstall

 Klargjøre for public bruk (uten å eksponere API-nøkler)
