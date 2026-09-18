# Brief immagini: cosa c'è e cosa manca

Stato al primo lotto consegnato (5 coppie prima e dopo di un appartamento).

## Cosa dicono i file consegnati

Tutte e dieci le immagini portano una credenziale C2PA firmata da Google che
dichiara `c2pa.created`, "Created by Google Generative AI", con
`digitalSourceType = trainedAlgorithmicMedia`. Le cinque "ristrutturata"
portano in più un `c2pa.ingredient`, cioè sono derivate dalla corrispondente
immagine "da ristrutturare": è il motivo per cui le coppie combaciano così
bene.

Tradotto: sono immagini generate, non fotografie di un immobile reale. Non è
un problema di per sé, ed era il piano. Il punto è che **la credenziale viaggia
dentro il file**: chi salva l'immagine e la controlla con un verificatore di
Content Credentials, o con "Informazioni su questa immagine" di Google, legge
che è generata. Una coppia prima e dopo pubblicata senza dirlo non è solo
scorretta verso chi guarda: è verificabile da chiunque in dieci secondi.

Per questo le coppie vanno usate solo dove il sito dichiara già di mostrare uno
scenario, cioè la sezione "Esempio illustrativo" di *Ristruttura & Metti a
Reddito*, e con una dicitura visibile.

## Cosa coprono, e cosa no

Le immagini sono orizzontali, 1200 x 896 (proporzione 1,34). Vanno bene per gli
slot 4:3 e, con un ritaglio, per quelli 16:10. **Non funzionano per i quattro
hero**, che sono verticali 3:4: ritagliarle significherebbe buttare via due
terzi della stanza.

C'è anche una questione di contenuto. L'appartamento è credibile e coerente
(stessi infissi, stesse maniglie, stessa luce in tutte le stanze), ma non dice
Sicilia: tapparelle, vista su condominio, termosifoni a colonna, finiture
neutre. Il sito promette "architettura mediterranea" e "Sicilia contemporanea".
Come interni di servizio reggono; come immagini che devono dare il senso del
luogo, no.

## Cosa serve ancora

Diciassette slot su venti restano scoperti. Sette non si generano, dieci sì.

### Priorità 1 · I quattro hero verticali

Sono le immagini che si vedono per prime, e oggi sono tutte segnaposto.
Formato **3:4 verticale**, almeno 1600 px sul lato lungo.

| Pagina | Soggetto | Nota |
|---|---|---|
| Home | Esterno di casa siciliana in pietra dorata, campagna ragusana, luce di tardo pomeriggio | Serve cielo calmo nel terzo superiore: il titolo ci sta accanto |
| Ristrutturazione | Interno appena consegnato, ancora vuoto, finestra alta, luce radente sul pavimento | Nessun mobile: deve leggersi "finito, non ancora abitato" |
| Property Management | Camera da letto preparata per gli ospiti, lino bianco, persiane socchiuse | Curata ma non da catalogo |
| Ristruttura & Metti a Reddito | Stanza vuota non ristrutturata, pavimento in cementine consumate, una lama di luce | È il "prima" del percorso |

### Priorità 2 · Il territorio

Tre slot che oggi sono i più vuoti di tutti, e sono quelli che dicono Sicilia.
Formato **4:3**.

- Veduta di paese collinare del sud est siciliano all'ora dorata, tetti barocchi, cupola, uliveti che scendono a valle.
- Dettaglio architettonico barocco: mensola in pietra calcarea sotto un balcone, luce laterale forte, composizione grafica.
- Facciata in pietra su strada stretta, persiane, ferro battuto. Serve anche come "prima" della coppia facciata.

### Priorità 3 · Cantiere e dettagli

Formato **16:10** per i primi due, **4:3** per il terzo.

- Lavori in corso: intonaco nuovo, trabattello pulito, attrezzi ordinati, nessuna persona.
- Dettaglio di ospitalità: chiavi su un davanzale in pietra, panno di lino, rametto di rosmarino.
- Sopralluogo senza persone: disegni arrotolati, metro, misuratore laser su un cavalletto in una stanza vuota.

### Non generabili

Sette slot richiedono fotografie vere e nessun prompt li sostituisce:

- Chi siamo: hero con le persone, i due ritratti dei fondatori, le persone della rete al lavoro.
- Ristrutturazione: le tre foto in "Esperienza tecnica", che documentano lavori realmente eseguiti.

Finché non ci sono, il segnaposto resta la scelta onesta: dichiara cosa manca
senza affermare niente di falso.

## Requisiti tecnici comuni

- **Proporzioni esatte** della tabella. Un ritaglio approssimativo si vede.
- **Lato lungo**: 2000 px per gli hero, 1600 px per le card.
- **Peso**: sotto i 300 KB dopo compressione in WebP o JPEG di qualità alta.
- **Coerenza**: stesso blocco di stile per tutte, così sembrano una serie sola.
  Il blocco è in `prompt-immagini.md`.
- **Nessuna persona riconoscibile** in nessuna immagine generata.
- **Nessun testo, logo o insegna** dentro l'immagine.

## Da decidere

1. Le cinque coppie vanno nella sezione "Esempio illustrativo" con la dicitura,
   oppure restano fuori dal sito? Se vanno dentro, serve aggiungere al
   componente immagine una didascalia, così la dichiarazione è strutturale e
   non dipende dal ricordarsene.
2. Le immagini generate di interni si possono usare sulle card servizio, dove
   non affermano un lavoro specifico ma illustrano un servizio? La differenza
   con la coppia prima e dopo è che lì non c'è una trasformazione da attribuire
   a nessuno.
