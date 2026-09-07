# GGM Your Sicily Property Partner

Prima bozza funzionante del sito (V1). Frontend completo, navigabile e
responsive, pensato per essere iterato: copy, immagini e proof sono
sostituibili senza rifare i layout.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguaggio | TypeScript (strict) |
| Stile | Tailwind CSS v4 (design token in `src/app/globals.css`) |
| Font | Inter + Fraunces via `next/font/google` (self-hosted a build time) |
| Backend | route Next.js che inoltra a Google Apps Script |

## Comandi

```bash
npm install
npm run dev        # sviluppo su http://localhost:3000
npm run build      # build di produzione (include il typecheck)
npm start          # serve la build
npm run lint       # ESLint
npx tsc --noEmit   # typecheck isolato
```

## Struttura

```
src/
├─ app/
│  ├─ layout.tsx              # <html>, font, metadata di base, JSON-LD
│  ├─ globals.css             # DESIGN SYSTEM: palette, tipografia, animazioni
│  ├─ opengraph-image.tsx     # immagine OG generata (placeholder di brand)
│  ├─ robots.ts / sitemap.ts
│  ├─ api/valutazione/        # route che inoltra il modulo a Google
│  ├─ (site)/                 # pagine con navbar e footer completi
│  └─ (conversion)/           # conversion page con header/footer minimali
├─ components/
│  ├─ layout/   Navbar, MobileMenu, Footer, MinimalHeader, MinimalFooter, Logo
│  ├─ ui/       Container, Section, Button, ImagePlaceholder, Breadcrumbs
│  ├─ sections/ Hero, SectionHeader, CTASection, ServiceCard, RouteCards,
│  │            ProcessSteps, FeatureBlock, CheckList, FAQAccordion,
│  │            ExperienceBlock, CoverageBlock, TransparencyBlock, LegalPage
│  └─ form/     PropertyEvaluationForm, Field, ChoiceGroup, OptionCard
├─ content/     site.ts (brand, nav, CTA, copertura), faq.ts, evaluation.ts
├─ lib/         seo.ts, schema.ts, submitEvaluation.ts
└─ ../docs/     google-sheet.md, google-apps-script/, prompt-immagini.md
```

I contenuti trasversali (navigazione, CTA, copertura, FAQ) vivono in
`src/content/`: modificarli lì aggiorna tutte le pagine.

## Design system

Palette e tipografia sono token Tailwind v4 definiti in
`src/app/globals.css`. Cambiando i valori nel blocco `@theme` si aggiorna
l'intero sito.

| Token | Valore | Uso |
|---|---|---|
| `ink` | `#132B4F` | navy del logo: testo principale, sezioni scure, bottone primario |
| `gold` | `#C39B4E` | oro del logo: segni grafici, badge, bottone accento |
| `gold-700` | `#8A6820` | sopratitoli e link su fondo chiaro (contrasto AA) |
| `gold-900` | `#6E5318` | testo su fondo `gold-50` |
| `gold-50` | `#F4EBD8` | fasce e badge chiari |
| `cream` | `#F7F3EA` | fondo pagina e testo sulle sezioni navy |
| `sand` / `line` | `#EFE8D9` / `#E2DACB` | fasce alternate, bordi |

Nel logo l'oro non porta mai testo: disegna la casa, l'onda e i filetti,
mentre le scritte sono navy. Sul sito vale la stessa regola. `gold` puro non
regge il testo su fondo chiaro, per quello ci sono `gold-700` e `gold-900`.

## Cosa è PLACEHOLDER

Tutti i punti seguenti sono segnalati anche nel codice.

1. **Immagini**: nessuna foto reale nel progetto. Ogni immagine è un
   `<ImagePlaceholder>` che descrive cosa va inserito. Per sostituirla basta
   mettere il file in `public/images/` e passare `src="/images/nome.jpg"`:
   proporzioni e layout restano identici.
2. **Logo**: il file non è ancora nel repository. Mettilo in `public/images/`
   e compila `site.logo` in `src/content/site.ts` con percorso e dimensioni:
   il lettering di riserva sparisce da solo. Per la navbar conviene una
   versione orizzontale compatta, il lockup completo sta meglio nel footer.
3. **Immagine OG**: generata da `src/app/opengraph-image.tsx`. Per usare una
   grafica definitiva basta sostituire quel file con un `opengraph-image.jpg`
   nella stessa cartella.
4. **Dominio**: `NEXT_PUBLIC_SITE_URL` (vedi `.env.example`) alimenta
   canonical, Open Graph e sitemap. Il default è un dominio fittizio.
5. **Recapiti**: `contact` in `src/content/site.ts` è `null`. Finché resta
   così, email e telefono non compaiono nel footer.
6. **Pagine legali**: privacy, cookie e termini sono strutture di riferimento
   con un avviso visibile, non documenti definitivi.
7. **Fondatori**: `chi-siamo` descrive due ambiti di competenza senza nomi,
   ruoli o biografie inventati, e senza foto di persone.

## Cosa richiede dati reali prima della pubblicazione

- Fotografie reali dell'immobile, dei cantieri e delle persone.
- Nomi, ruoli e biografie dei fondatori.
- Dati del titolare del trattamento e testi legali verificati.
- Recapiti (email, telefono, WhatsApp) e dati societari.
- Dominio definitivo.
- Modello economico del property management, quando sarà definito.

## Invio del form

Il modulo scrive su un foglio Google, salva le foto su Drive e invia due email
(conferma al proprietario, notifica a GGM). Il percorso è:

`PropertyEvaluationForm` → `src/lib/submitEvaluation.ts` →
`src/app/api/valutazione/route.ts` → Google Apps Script.

La route interna valida i dati, traduce i valori in testo leggibile e aggiunge
il token: URL dello script e token restano lato server e non raggiungono mai il
browser.

Configurazione completa in [`docs/google-sheet.md`](docs/google-sheet.md).
Servono due variabili d'ambiente, `GOOGLE_SCRIPT_URL` e `GGM_FORM_TOKEN`.
Senza, in sviluppo l'invio è simulato e in produzione il modulo risponde con un
errore esplicito invece di fingere che la richiesta sia partita.

## SEO e indicizzazione

La V1 **non è indicizzabile**: `robots.ts` restituisce `Disallow: /` e il
layout radice imposta `robots: { index: false }`. Al lancio vanno rimossi
entrambi.

Ogni pagina ha title, meta description, canonical, Open Graph e un unico `<h1>`.
Le pagine con FAQ espongono dati strutturati `FAQPage`; il layout radice espone
un `Organization` che contiene solo informazioni già presenti sul sito.

## Regole di contenuto

Il sito non contiene case study, clienti, recensioni, numeri, rendimenti o
risultati attribuiti a GGM, e non contiene prezzi del property management.
L'esperienza professionale pregressa dei fondatori è sempre dichiarata come
tale, separata dai risultati del progetto (`ExperienceBlock`). La distinzione
fra gestione online (tutta la Sicilia) e operatività fisica (provincia di
Ragusa e aree coperte) è centralizzata in `coverage` (`src/content/site.ts`) e
ripetuta su tutte le pagine rilevanti.
