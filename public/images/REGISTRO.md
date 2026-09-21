# Registro delle immagini generate — GGM House Partner

Ventisei immagini: le venti generate da `docs/prompt-immagini.md` di questo repo, prompt per
prompt e blocco di stile compreso, piu' sei con persone al lavoro aggiunte dopo
(`prompt-usati-persone.py`). Modello **gemini-3-pro-image**. Nessuna ritoccata a mano.

**Tutte le immagini di questo elenco sono generate con intelligenza artificiale.** Nessun immobile
reale, nessun lavoro realmente eseguito, e **nessuna persona reale**: nelle sei con figure umane
nessun volto e' leggibile, apposta. Il registro serve a questo: sapere quali parti del sito
poggiano su materiale non fotografico, e poterle sostituire quando arrivano le foto vere.

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

| Rete al lavoro · preparazione casa | `persone-preparazione-casa.jpg` | 4:3 |
| Rete al lavoro · consegna chiavi | `persone-consegna-chiavi.jpg` · `persone-consegna-chiavi-alt.jpg` | 4:3 |
| Rete al lavoro · controllo casa | `persone-controllo-casa.jpg` | 4:3 |
| Rete al lavoro · gestione online | `persone-gestione-online.jpg` | 4:3 |
| Sopralluogo, variante con persona | `persone-sopralluogo.jpg` | 4:3 |

Le coppie hanno `esempio` nel nome apposta: il brief dice che stanno **solo** nella sezione
«Esempio illustrativo» di *Ristruttura & Metti a Reddito*, già dichiarata come scenario non reale,
e che vanno accompagnate da una dicitura visibile tipo «Simulazione, non un lavoro realizzato».
Il nome del file serve a non dimenticarsene mettendole altrove.

## Cosa NON è stato generato, e resta segnaposto

I sette slot con persone reali elencati nel brief: hero e ritratti di Chi siamo, la rete al lavoro,
le tre foto di «Esperienza tecnica», il sopralluogo con persone. Lì serve una fotografia vera:
un'immagine generata in quei punti è una prova falsa. Per il sopralluogo c'è la variante senza
persone (slot 11), da usare solo finché manca la foto.

## Le sei immagini con persone

Sei immagini in piu' rispetto alle venti, generate dopo, con i prompt di `prompt-usati-persone.py`.
Coprono la «rete al lavoro» **entro il vincolo del brief**, non in deroga: nessun volto e'
leggibile, perche' la persona sta di spalle, in silhouette contro la luce, lontana nella stanza o
tagliata agli avambracci. Il vincolo non e' scritto come divieto ma come inquadratura, perche'
vietare un volto non funziona: il modello legge «face» e lo disegna. Toglierlo dal quadro
funziona.

Il motivo non e' estetico: **una persona riconoscibile e generata, su una pagina che parla di chi
lavora per te, e' un membro del team che non esiste.** Una sagoma in controluce sulla soglia non
afferma nessuno.

Restano immagini generate come tutte le altre, credenziale C2PA di Google compresa: valgono come
illustrazione di un servizio, non come documentazione di un lavoro o di una persona. Gli slot che
il brief dichiara non generabili — hero e ritratti di Chi siamo, le tre foto di «Esperienza
tecnica» — restano segnaposto: li' serve una fotografia vera.

Di `consegna-chiavi` ci sono due versioni, `-alt` e' la seconda opzione: la scelta e' di Juan.
`persone-sopralluogo.jpg` sta accanto a `ristrutturazione-sopralluogo.jpg`, che e' lo stesso slot
senza nessuno dentro.

## Formati e peso

**Le sei immagini con persone sono a specifica**: 4:3 esatto, 1600×1200, sotto i 300 KB. Sono
nate a 2400 px, quindi il lato lungo si e' raggiunto scendendo. Lo strumento e'
`strumenti/stile-misurato/alla-specifica.py`.

**Le venti no, e non possono esserlo senza rigenerare.** Uscita nativa fra 896 e 1228 px sul lato
lungo, contro i 2000 px degli hero e i 1600 delle card che chiede il brief: **non ho ingrandito**,
perché ingrandire non aggiunge dettaglio, aggiunge solo peso. Sono anche sopra i 300 KB, e le
proporzioni sono approssimate (1,339 invece di 1,3333; 1,599 invece di 1,600): peso e proporzioni
si sistemano in un comando, il lato lungo no. Otto delle venti hanno gia' una sorgente a 2K
pronta; le altre dodici vanno rigenerate.
Il 16:10 e il 1200×630 non sono formati nativi del modello: generati in 16:9 e ritagliati al
centro.

## Come rigenerarle

I prompt usati sono quelli del brief, con il blocco di stile in coda. Per le coppie: si genera
prima il **dopo**, poi il **prima** passando il dopo come riferimento visivo (image-to-image).
Descrivere le due versioni separatamente dà due stanze diverse.
