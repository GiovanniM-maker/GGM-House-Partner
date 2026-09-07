# Prompt per generare le immagini del sito

Prompt pronti per gli slot immagine del sito, in inglese perché tutti i
generatori (Midjourney, Firefly, Flux, DALL·E, Ideogram) rispondono meglio.

Prima di usarli, leggi la sezione "Dove non si generano immagini": tre slot del
sito richiedono fotografie reali e nessun prompt li può sostituire.

## Dove non si generano immagini

Queste immagini vanno fotografate, non generate. Non è una preferenza estetica:
sono i punti in cui l'immagine funziona da prova, e una prova generata è una
prova falsa.

| Slot | Perché |
|---|---|
| Chi siamo, hero e due ritratti dei fondatori | Sono le persone del progetto. Una foto generata è una persona che non esiste presentata come te |
| Chi siamo, "persone della rete al lavoro" | Stessa ragione: sono professionisti reali |
| Ristrutturazione, le tre foto in "Esperienza tecnica" | Documentano lavori realmente eseguiti. Generarle significa inventare un portfolio |
| Ristrutturazione, "sopralluogo o confronto in cantiere" | Mostra GGM al lavoro. Genera solo la variante senza persone (prompt 6b) |

Finché mancano, il segnaposto sul sito è la scelta più onesta: dice cosa manca
senza affermare nulla di falso.

## Come usare gli altri slot

Gli slot rimanenti sono ambientazione: architettura, luce, materia, territorio.
Lì un'immagine generata è accettabile, con due accortezze.

1. **Niente persone riconoscibili.** Tutti i prompt sotto le escludono.
2. **Niente ambienti presentati come lavori GGM.** Un interno generato accanto
   a "i lavori li seguiamo noi" viene letto come portfolio. Per gli slot 2, 3, 4
   e 7 la scelta migliore resta una foto reale, anche non di GGM (archivio
   fotografico con licenza). Se generi, tieni l'inquadratura sul dettaglio
   architettonico e sull'atmosfera, non sul "prima e dopo".

## Blocco di stile comune

Da incollare in coda a ogni prompt, così le immagini sembrano una serie sola.

```
Photographic style: editorial architectural photography, natural daylight,
warm neutral palette of cream, sand and honey limestone with deep navy
shadows and occasional muted gold accents,
calm and understated, generous negative space, matte finish, subtle film
grain, shot on 35mm with a slight shallow depth of field.
Mood: contemporary Mediterranean, refined but lived in, never rustic
kitsch, never glossy real estate advertising.
No people, no faces, no text, no logos, no watermarks, no signage.
```

**Negative prompt** (dove il generatore lo prevede):

```
people, faces, hands, crowds, text, letters, logos, watermark, signage,
HDR, oversaturated colors, blue hour neon, fisheye, tilt shift, cluttered
composition, plastic furniture, generic hotel interior, stock photo look,
American suburban house, tropical vegetation, palm beach resort
```

## Formati

Il formato conta: gli slot hanno proporzioni fisse nel codice e un'immagine
tagliata male rovina la sezione.

| Slot | Proporzioni | Parametro Midjourney |
|---|---|---|
| Hero delle pagine | 3:4 verticale | `--ar 3:4` |
| Card servizio e card fase | 16:10 orizzontale | `--ar 16:10` |
| Immagini affiancate al testo | 4:3 orizzontale | `--ar 4:3` |
| Foto esperienza (quando reali) | 4:3 orizzontale | `--ar 4:3` |

Per Midjourney aggiungi anche `--style raw --v 7` per evitare la resa
illustrativa predefinita.

---

## 1. Home, hero

**Slot**: `src/app/(site)/page.tsx`, "Foto hero: esterno di una casa siciliana,
luce naturale". Formato 3:4.

```
Exterior of a contemporary Sicilian house in the Ragusa countryside, honey
coloured limestone walls, clean modern volumes with a traditional pitched
roof, dark framed windows, a low dry stone wall in the foreground, olive
trees and dry grass, late afternoon sun raking across the stone, deep soft
shadows, wide empty sky in the upper third of the frame.
```

Nota: la porzione di cielo in alto serve, il testo dell'hero le sta accanto e
l'immagine deve avere una zona calma.

## 2. Home, card Ristrutturazione

**Slot**: "Foto: cantiere o interno ristrutturato". Formato 16:10.

```
Interior of a Sicilian townhouse mid renovation, bare plastered walls in warm
grey, a restored stone arch, new pale terracotta floor tiles stacked neatly,
a wooden ladder against the wall, daylight from a tall window falling across
the floor, quiet and orderly building site, no workers present.
```

## 3. Home, card Property Management

**Slot**: "Foto: interno curato, pronto per gli ospiti". Formato 16:10.

```
Living room of a restored Sicilian house prepared for guests, white lime
plaster walls, pale terracotta floor, a linen sofa, a low travertine table,
a ceramic jug with dried branches, shuttered window half open casting warm
stripes of light on the floor, uncluttered and calm, no people.
```

## 4. Home, card percorso integrato

**Slot**: "Foto: immobile prima dell'intervento". Formato 16:10.

```
Facade of an unrestored stone house in a Sicilian hill town, weathered
shutters with peeling paint, iron balcony railing, a closed wooden door,
worn plaster showing the stone beneath, narrow street in soft shade, honest
documentary framing, dignified rather than derelict, no people.
```

## 5. Home e Chi siamo, territorio

**Slot**: "Foto: territorio, paesaggio o dettaglio architettonico reale" e
"Foto reale: territorio, paese o architettura locale". Formato 4:3.

```
Wide view of a hill town in south eastern Sicily at golden hour, layered
baroque rooftops in warm ochre stone, a church dome catching the last light,
dry stone walls and olive groves descending the valley below, hazy blue
distance, expansive and calm, no people.
```

Variante dettaglio, utile per alternare le due occorrenze:

```
Architectural detail of a Sicilian baroque building, carved limestone corbel
under a stone balcony, worn surface with warm patina, strong side light and
deep shadow, tight and graphic composition against a plain wall.
```

## 6. Ristrutturazione, hero

**Slot**: "Foto hero: interno in lavorazione o appena consegnato". Formato 3:4.

```
Vertical interior of a Sicilian house just after renovation, tall window with
dark slim frames, white lime plaster walls, pale terracotta floor, a restored
stone doorway leading to a second room, no furniture yet, strong daylight and
long shadows across the empty floor, clean and quiet.
```

## 6b. Ristrutturazione, sopralluogo senza persone

**Slot**: "Foto: sopralluogo, rilievo o confronto in cantiere". Formato 4:3.
Da usare solo se non hai una foto reale.

```
Close view of a renovation survey laid out on a trestle table in an empty
room, rolled paper plans, a folding metre rule, a laser measure, a pencil and
a notebook, dusty stone floor, daylight from a window on the left, documentary
still life, no people, no hands.
```

## 7. Property Management, hero

**Slot**: "Foto hero: interno curato, luce naturale". Formato 3:4.

```
Vertical view of a bedroom in a restored Sicilian house prepared for guests,
white linen bedding, a pale plaster wall, a small dark wood side table with a
ceramic lamp, louvred shutters partly open onto a green view, warm morning
light, serene and simple, no people.
```

## 8. Ristruttura e metti a reddito, hero

**Slot**: "Foto hero: immobile prima dell'intervento". Formato 3:4.

```
Vertical shot of an empty room in an unrestored Sicilian house, bare stone
and old plaster walls, a worn cement tile floor with a faded pattern, a tall
shuttered window letting a single blade of light into the room, dust in the
air, quiet and full of potential, no people.
```

## 9. Ristruttura e metti a reddito, tre fasi

Formato 16:10 per tutte e tre.

**Fase 1, lavori in corso**

```
Renovation work in progress in a Sicilian interior, new plaster being applied
to a wall, a clean scaffold tower, tools resting on a covered floor, daylight
from an open doorway, tidy and controlled building site, no workers present.
```

**Fase 2, interno arredato e pronto**

```
Dining corner of a restored Sicilian holiday house, a solid wood table with
four simple chairs, a ceramic bowl of lemons, white plaster wall with a small
framed botanical print, terracotta floor, open shutters and warm afternoon
light, welcoming and unstyled, no people.
```

**Fase 3, dettaglio dell'ospitalità**

```
Close detail of a guest welcome setup on a stone windowsill, a set of keys on
a linen cloth, a small ceramic dish, a folded card without visible text, a
sprig of rosemary, soft daylight and shallow depth of field, warm neutral
tones.
```

## 10. Immagine Open Graph

Oggi l'immagine di anteprima social è generata dal codice
(`src/app/opengraph-image.tsx`) con i colori del brand. Se preferisci una
fotografia, genera in 1200 x 630 e sostituisci quel file con un
`opengraph-image.jpg` nella stessa cartella.

```
Wide horizontal view of a contemporary Sicilian stone house at golden hour,
warm limestone walls, olive trees, deep teal shadows, large calm area of sky
on the right side of the frame for text overlay, editorial and understated.
```

## Dopo la generazione

1. Ritaglia esattamente nelle proporzioni della tabella dei formati.
2. Ridimensiona a circa 2000 px sul lato lungo per gli hero, 1600 px per le
   card, e comprimi in WebP o JPEG di qualità alta.
3. Salva in `public/images/` e collega l'immagine passando `src` al componente:
   `<ImagePlaceholder src="/images/home-hero.jpg" alt="..." />`.
4. Scrivi un `alt` che descriva la fotografia vera, non il prompt.
5. Tieni un registro di quali immagini sono generate. Serve se un giorno vorrai
   sostituirle con foto reali, e serve a non perdere di vista quali parti del
   sito poggiano su materiale non fotografico.
