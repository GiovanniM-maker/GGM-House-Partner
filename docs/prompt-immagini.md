# Prompt per generare le immagini del sito

Set completo per sostituire tutti i segnaposto. I prompt sono in inglese perché
tutti i generatori (Midjourney, Flux, Firefly, DALL·E, Ideogram) rispondono
meglio.

Prima di usarli, leggi le due sezioni sotto: alcune immagini non vanno generate,
e le coppie prima/dopo hanno una regola in più.

## Dove non si generano immagini

Sette slot su venti richiedono fotografie reali. Non è una preferenza estetica:
sono i punti in cui l'immagine funziona da prova, e una prova generata è una
prova falsa.

| Pagina | Slot | Perché |
|---|---|---|
| Chi siamo | hero con le persone | Sono i fondatori. Una foto generata è una persona che non esiste presentata come te |
| Chi siamo | i due ritratti | Stessa ragione |
| Chi siamo | persone della rete al lavoro | Sono professionisti reali |
| Ristrutturazione | le tre foto in "Esperienza tecnica" | Documentano lavori realmente eseguiti. Generarle significa inventare un portfolio |
| Ristrutturazione | sopralluogo in cantiere | Mostra GGM al lavoro. Genera solo la variante senza persone, prompt 11 |

Finché mancano, il segnaposto è la scelta più onesta: dice cosa manca senza
affermare nulla di falso.

## La regola delle coppie prima/dopo

Un prima/dopo è la forma di immagine che promette di più: chi guarda legge
"questo lavoro l'hanno fatto loro". Due conseguenze pratiche.

**Non metterle dove sembrano un portfolio.** Sulle card servizio o accanto a
"i lavori li seguiamo noi" una coppia generata diventa una bugia. Il posto
giusto sul sito è la sezione "Esempio illustrativo" di *Ristruttura & Metti a
Reddito*, che è già dichiarata come scenario non reale.

**Dichiarale.** Una coppia generata va accompagnata da una dicitura visibile del
tipo "Simulazione, non un lavoro realizzato". Se vuoi, aggiungo al componente
immagine una didascalia in modo che sia impossibile dimenticarsene.

**Tecnicamente**: il prima e il dopo devono essere la stessa stanza. Generare
due prompt separati dà due stanze diverse e la coppia non funziona. Il metodo
che riesce:

1. genera prima il **dopo**, che è l'immagine più facile da controllare;
2. usa quell'immagine come riferimento (image-to-image, oppure `--cref` /
   "usa questa immagine come base") e chiedi la versione degradata;
3. tieni identici nei due prompt gli elementi fissi: posizione e numero di
   finestre, proporzioni della stanza, direzione della luce, punto di vista.

Nei prompt sotto quegli elementi fissi sono già scritti uguali nelle due
versioni. Cambia solo lo stato.

## Blocco di stile comune

Da incollare in coda a ogni prompt, così le immagini sembrano una serie sola.

```
Photographic style: editorial architectural photography, natural daylight,
warm neutral palette of cream, sand and honey limestone with deep navy
shadows and occasional muted gold accents, calm and understated, generous
negative space, matte finish, subtle film grain, shot on 35mm with a slight
shallow depth of field.
Mood: contemporary Mediterranean, refined but lived in, never rustic kitsch,
never glossy real estate advertising.
No people, no faces, no text, no logos, no watermarks, no signage.
```

**Negative prompt** (dove il generatore lo prevede):

```
people, faces, hands, crowds, text, letters, logos, watermark, signage, HDR,
oversaturated colors, blue hour neon, fisheye, tilt shift, cluttered
composition, plastic furniture, generic hotel interior, stock photo look,
American suburban house, tropical vegetation, palm beach resort
```

## Formati

Le proporzioni sono fisse nel codice: un'immagine tagliata male rovina la
sezione.

| Slot | Proporzioni | Midjourney |
|---|---|---|
| Hero delle pagine | 3:4 verticale | `--ar 3:4` |
| Card servizio e card fase | 16:10 orizzontale | `--ar 16:10` |
| Immagini affiancate al testo | 4:3 orizzontale | `--ar 4:3` |
| Coppie prima/dopo | 4:3 orizzontale, identico nelle due | `--ar 4:3` |

Per Midjourney aggiungi `--style raw --v 7` per evitare la resa illustrativa
predefinita.

---

# Coppie prima e dopo

## Coppia A · Soggiorno

**A1 · Dopo** (genera per prima)

```
Living room of a restored townhouse in south eastern Sicily, seen straight on
from the doorway. One tall arched window on the left wall reaching almost to
the ceiling, a smaller square window on the back wall to the right of centre.
High ceiling with exposed painted beams. Pale terracotta tiled floor. Smooth
white lime plaster walls. A low linen sofa against the right wall, a round
travertine coffee table, a ceramic jug with dried branches, a woven rush rug.
Morning light entering from the left and falling in a long band across the
floor. Calm, uncluttered, warm.
```

**A2 · Prima** (stessa stanza, stessa inquadratura)

```
The same living room before restoration, identical viewpoint from the doorway,
identical room proportions, same tall arched window on the left wall and same
smaller square window on the back wall to the right of centre, same high
ceiling with exposed beams. Now completely empty and neglected: bare patchy
plaster with damp stains, exposed stone where the plaster has fallen away, a
worn and cracked cement tile floor, dust on every surface, an old electrical
cable running along the wall, shutters half closed so the light is dimmer and
flatter. No furniture. Documentary and honest, dignified rather than
derelict.
```

## Coppia B · Bagno

**B1 · Dopo**

```
Small bathroom in a restored Sicilian house, seen straight on. One window with
a deep sill in the centre of the back wall. Micro cement walls in warm sand
colour, a wall hung washbasin in pale stone on the left, a round mirror above
it, matte black tapware, a walk in shower on the right closed by a simple
glass panel, terracotta floor tiles. A folded linen towel on a brass rail.
Soft daylight from the window. Quiet and contemporary.
```

**B2 · Prima**

```
The same small bathroom before renovation, identical viewpoint, identical room
proportions, same window with a deep sill in the centre of the back wall.
Now dated and worn: old glossy wall tiles in a dull green up to shoulder
height, cracked grout, a small pedestal basin on the left with limescale
marks, an old chrome tap, a chipped tub on the right, a stained vinyl floor,
a bare bulb hanging from the ceiling. Same daylight from the same window but
duller. Empty of people, documentary framing.
```

## Coppia C · Facciata

**C1 · Dopo**

```
Facade of a restored two storey stone house on a narrow street in a Sicilian
hill town, seen straight on. Ground floor with a wooden door on the left and
one window on the right, first floor with two matching windows and a small
iron balcony above the door. Honey coloured limestone cleaned and repointed,
new shutters in a soft dark green, restored ironwork, a stone threshold step.
Late afternoon light raking across the stone from the left. Calm and
composed.
```

**C2 · Prima**

```
The same facade before restoration, identical viewpoint straight on, identical
building proportions, same wooden door on the left and window on the right at
ground floor, same two windows and small iron balcony above. Now neglected:
cement render peeling off in patches to reveal the stone beneath, shutters
faded and split with paint flaking, rusted balcony railing, a dark stain
running down from a broken gutter, weeds at the base of the wall. Same late
afternoon light from the left. Nobody in the street.
```

---

# Gli altri slot, pagina per pagina

## Home

**1 · Hero**, 3:4. Segnaposto: "esterno di una casa siciliana, luce naturale".

```
Exterior of a contemporary Sicilian house in the Ragusa countryside, honey
coloured limestone walls, clean modern volumes with a traditional pitched
roof, dark framed windows, a low dry stone wall in the foreground, olive trees
and dry grass, late afternoon sun raking across the stone, deep soft shadows,
wide empty sky in the upper third of the frame.
```

Lo spazio di cielo in alto serve: il testo dell'hero sta accanto e l'immagine
deve avere una zona calma.

**2 · Card Ristrutturazione**, 16:10.

```
Interior of a Sicilian townhouse mid renovation, bare plastered walls in warm
grey, a restored stone arch, new pale terracotta floor tiles stacked neatly, a
wooden ladder against the wall, daylight from a tall window falling across the
floor, quiet and orderly building site, no workers present.
```

**3 · Card Property Management**, 16:10.

```
Living room of a restored Sicilian house prepared for guests, white lime
plaster walls, pale terracotta floor, a linen sofa, a low travertine table, a
ceramic jug with dried branches, shuttered window half open casting warm
stripes of light on the floor, uncluttered and calm.
```

**4 · Card percorso integrato**, 16:10.

```
Facade of an unrestored stone house in a Sicilian hill town, weathered
shutters with peeling paint, iron balcony railing, a closed wooden door, worn
plaster showing the stone beneath, narrow street in soft shade, honest
documentary framing, dignified rather than derelict.
```

**5 · Esperienza, territorio**, 4:3.

```
Wide view of a hill town in south eastern Sicily at golden hour, layered
baroque rooftops in warm ochre stone, a church dome catching the last light,
dry stone walls and olive groves descending the valley below, hazy blue
distance, expansive and calm.
```

## Ristrutturazione

**6 · Hero**, 3:4. Segnaposto: "interno in lavorazione o appena consegnato".

```
Vertical interior of a Sicilian house just after renovation, tall window with
dark slim frames, white lime plaster walls, pale terracotta floor, a restored
stone doorway leading to a second room, no furniture yet, strong daylight and
long shadows across the empty floor, clean and quiet.
```

**11 · Sopralluogo, variante senza persone**, 4:3. Da usare solo se non hai una
foto reale.

```
Close view of a renovation survey laid out on a trestle table in an empty
room, rolled paper plans, a folding metre rule, a laser measure, a pencil and
a notebook, dusty stone floor, daylight from a window on the left, documentary
still life, no hands.
```

## Property Management

**7 · Hero**, 3:4. Segnaposto: "interno curato, luce naturale".

```
Vertical view of a bedroom in a restored Sicilian house prepared for guests,
white linen bedding, a pale plaster wall, a small dark wood side table with a
ceramic lamp, louvred shutters partly open onto a green view, warm morning
light, serene and simple.
```

## Ristruttura & Metti a Reddito

**8 · Hero**, 3:4. Segnaposto: "immobile prima dell'intervento".

```
Vertical shot of an empty room in an unrestored Sicilian house, bare stone and
old plaster walls, a worn cement tile floor with a faded pattern, a tall
shuttered window letting a single blade of light into the room, dust in the
air, quiet and full of potential.
```

**9a · Fase 1, lavori in corso**, 16:10.

```
Renovation work in progress in a Sicilian interior, new plaster being applied
to a wall, a clean scaffold tower, tools resting on a covered floor, daylight
from an open doorway, tidy and controlled building site, no workers present.
```

**9b · Fase 2, interno arredato e pronto**, 16:10.

```
Dining corner of a restored Sicilian holiday house, a solid wood table with
four simple chairs, a ceramic bowl of lemons, white plaster wall with a small
framed botanical print, terracotta floor, open shutters and warm afternoon
light, welcoming and unstyled.
```

**9c · Fase 3, dettaglio dell'ospitalità**, 16:10.

```
Close detail of a guest welcome setup on a stone windowsill, a set of keys on
a linen cloth, a small ceramic dish, a folded card without visible text, a
sprig of rosemary, soft daylight and shallow depth of field, warm neutral
tones.
```

## Chi siamo

**10 · Territorio**, 4:3. È l'unico slot generabile di questa pagina.

```
Architectural detail of a Sicilian baroque building, carved limestone corbel
under a stone balcony, worn surface with warm patina, strong side light and
deep shadow, tight and graphic composition against a plain wall.
```

## Immagine di anteprima social

Oggi è generata dal codice (`src/app/opengraph-image.tsx`) con i colori del
brand. Per usare una fotografia, genera in 1200 x 630 e sostituisci quel file
con un `opengraph-image.jpg` nella stessa cartella.

```
Wide horizontal view of a contemporary Sicilian stone house at golden hour,
warm limestone walls, olive trees, deep navy shadows, large calm area of sky
on the right side of the frame for text overlay, editorial and understated.
```

---

# Dopo la generazione

1. Ritaglia esattamente nelle proporzioni della tabella dei formati.
2. Ridimensiona a circa 2000 px sul lato lungo per gli hero, 1600 px per le
   card, e comprimi in WebP o JPEG di qualità alta. Un hero da 2 MB si vede.
3. Carica in `public/images/` e collega l'immagine passando `src`:
   `<ImagePlaceholder src="/images/home-hero.jpg" alt="..." />`.
4. Scrivi un `alt` che descriva la fotografia, non il prompt.
5. Tieni un registro di quali immagini sono generate. Serve per sostituirle con
   foto reali quando ci saranno, e per non perdere di vista quali parti del
   sito poggiano su materiale non fotografico.
