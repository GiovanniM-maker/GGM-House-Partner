# Registro delle immagini generate — GGM House Partner

Venti immagini generate da `docs/prompt-immagini.md` di questo repo, prompt per prompt, blocco di
stile compreso. Modello **gemini-3-pro-image**. Nessuna ritoccata a mano.

**Tutte le immagini di questo elenco sono generate con intelligenza artificiale.** Nessun immobile
reale, nessun lavoro realmente eseguito, nessuna persona. Il registro serve a questo: sapere quali
parti del sito poggiano su materiale non fotografico, e poterle sostituire quando arrivano le foto
vere.

## Dove vanno

Copiare in `public/images/` e collegare con `src`:
`<ImagePlaceholder src="/images/home-hero.jpg" alt="..." />`. L'`alt` descrive la fotografia, non
il prompt.

| Slot del brief | File | Proporzioni |
|---|---|---|
| 1 · Home, hero | `home-hero.jpg` | 3:4 |
| 2 · Card Ristrutturazione | `card-ristrutturazione.jpg` | 16:10 |
| 3 · Card Property Management | `card-property-management.jpg` | 16:10 |
| 4 · Card percorso integrato | `card-percorso-integrato.jpg` | 16:10 |
| 5 · Esperienza, territorio | `home-territorio.jpg` | 4:3 |
| 6 · Ristrutturazione, hero | `ristrutturazione-hero.jpg` | 3:4 |
| 7 · Property Management, hero | `property-management-hero.jpg` | 3:4 |
| 8 · Ristruttura & Metti a Reddito, hero | `reddito-hero.jpg` | 3:4 |
| 9a · Fase 1, lavori in corso | `reddito-fase-1-lavori.jpg` | 16:10 |
| 9b · Fase 2, interno arredato | `reddito-fase-2-arredato.jpg` | 16:10 |
| 9c · Fase 3, dettaglio ospitalità | `reddito-fase-3-ospitalita.jpg` | 16:10 |
| 10 · Chi siamo, territorio | `chi-siamo-territorio.jpg` | 4:3 |
| 11 · Sopralluogo, variante senza persone | `ristrutturazione-sopralluogo.jpg` | 4:3 |
| Anteprima social | `opengraph-image.jpg` | 1200×630 |
| Coppia A · Soggiorno | `esempio-soggiorno-prima.jpg` · `esempio-soggiorno-dopo.jpg` | 4:3 |
| Coppia B · Bagno | `esempio-bagno-prima.jpg` · `esempio-bagno-dopo.jpg` | 4:3 |
| Coppia C · Facciata | `esempio-facciata-prima.jpg` · `esempio-facciata-dopo.jpg` | 4:3 |

Le coppie hanno `esempio` nel nome apposta: il brief dice che stanno **solo** nella sezione
«Esempio illustrativo» di *Ristruttura & Metti a Reddito*, già dichiarata come scenario non reale,
e che vanno accompagnate da una dicitura visibile tipo «Simulazione, non un lavoro realizzato».
Il nome del file serve a non dimenticarsene mettendole altrove.

## Cosa NON è stato generato, e resta segnaposto

I sette slot con persone reali elencati nel brief: hero e ritratti di Chi siamo, la rete al lavoro,
le tre foto di «Esperienza tecnica», il sopralluogo con persone. Lì serve una fotografia vera:
un'immagine generata in quei punti è una prova falsa. Per il sopralluogo c'è la variante senza
persone (slot 11), da usare solo finché manca la foto.

## Formati e peso

Uscita nativa fra 896 e 1228 px sul lato lungo. Il brief chiede 2000 px per gli hero e 1600 per le
card: **non ho ingrandito**, perché ingrandire non aggiunge dettaglio, aggiunge solo peso. Se
servono davvero quelle misure vanno rigenerate a risoluzione più alta, non interpolate.
Il 16:10 e il 1200×630 non sono formati nativi del modello: generati in 16:9 e ritagliati al
centro.

## Come rigenerarle

I prompt usati sono quelli del brief, con il blocco di stile in coda. Per le coppie: si genera
prima il **dopo**, poi il **prima** passando il dopo come riferimento visivo (image-to-image).
Descrivere le due versioni separatamente dà due stanze diverse.
