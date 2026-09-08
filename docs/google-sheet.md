# Collegare il modulo a Google Sheet

Il modulo "Valuta la tua casa" scrive su un foglio Google, salva le foto su
Drive e invia due email: la conferma a chi ha compilato e la notifica a GGM.

## Come sono collegati i pezzi

```
Browser
   │  POST /api/valutazione  (solo dati del modulo)
   ▼
Route Next.js  src/app/api/valutazione/route.ts
   │  valida, normalizza, aggiunge il segreto condiviso
   │  POST all'URL dello script
   ▼
Google Apps Script  docs/google-apps-script/Codice.gs
   ├─ scrive la riga nel foglio
   ├─ salva le foto in una cartella accanto al foglio
   ├─ invia la conferma a chi ha compilato
   └─ invia la notifica a GGM
```

L'URL dello script e il segreto non arrivano mai al browser: il sito parla solo
con la propria route interna. Questo evita anche i problemi di CORS che si
incontrano chiamando Apps Script direttamente dal client.

## 1. Crea il foglio e incolla lo script

1. Crea un foglio Google nuovo, per esempio "GGM | Richieste".
2. Dal foglio: **Estensioni → Apps Script**.
3. Incolla il contenuto di `docs/google-apps-script/Codice.gs` al posto del
   codice di esempio e salva.

Non serve nessun ID: lo script è dentro al foglio e lo trova da solo. Anche la
cartella per le foto viene creata accanto al foglio la prima volta che serve.

## 2. Compila le due costanti in cima al file

```js
var NOTIFICA_A = 'CAMBIAMI@esempio.it';   // dove vuoi ricevere le notifiche
var MITTENTE_ALIAS = '';                  // alias Gmail verificato, se ne hai uno
```

`MITTENTE_ALIAS` è facoltativo. Se lo lasci vuoto, la conferma parte
dall'indirizzo dell'account che autorizza lo script.

## 3. Genera il segreto condiviso

Nell'editor scegli la funzione `mostraToken` ed eseguila. Genera una stringa
casuale, se la salva nelle proprietà dello script e la stampa nel log:
è il valore che ti servirà al punto 5.

Al primo avvio Google chiede l'autorizzazione ad accedere a Fogli, Drive e
Gmail: è normale, lo script gira con il tuo account.

## 4. Pubblica come applicazione web

Distribuisci → "Nuovo deployment" → tipo "Applicazione web":

- **Esegui come**: me stesso
- **Chi ha accesso**: chiunque

Copia l'URL che termina con `/exec`.

> Ogni volta che modifichi il codice devi creare una **nuova versione** del
> deployment, altrimenti resta attiva quella vecchia.

## 5. Configura il sito

Su Vercel, in Settings → Environment Variables, aggiungi per tutti gli ambienti:

| Variabile | Valore |
|---|---|
| `GOOGLE_SCRIPT_URL` | l'URL `/exec` del punto 4 |
| `GGM_FORM_TOKEN` | la stringa stampata al punto 3 |

In locale bastano le stesse righe in un file `.env.local`.

Poi fai un nuovo deploy: le variabili vengono lette a ogni richiesta, ma il
deployment già pubblicato non le vede.

## Verifiche

1. Nell'editor esegui `provaInvio`: crea le intestazioni del foglio e ti manda
   una mail di prova, scrivendo nel log la quota rimasta per oggi.
2. Dal sito, compila il modulo per intero e controlla foglio, cartella e posta.

## Comportamento senza configurazione

- **In sviluppo**, se le variabili mancano, la richiesta finisce nel log del
  server e il modulo mostra comunque la conferma: si può lavorare
  sull'interfaccia senza collegare nulla.
- **In produzione**, se mancano, il modulo risponde con un errore esplicito
  invece di far credere che la richiesta sia partita.

## Come è fatto lo script

L'ordine delle operazioni non è casuale. Prima si scrive la riga, che è l'unica
cosa che non deve mai fallire, poi partono le mail. Se una mail non parte, il
contatto resta salvato e la colonna **Conferma** dice cosa è successo: si vede
a colpo d'occhio a chi non è arrivato niente.

Sulla notifica interna il "rispondi a" è già impostato sull'indirizzo di chi ha
compilato, così rispondendo scrivi direttamente alla persona.

Le ultime tre colonne (`gclid`, `gbraid`, `wbraid`) contengono l'identificativo
del clic quando la richiesta arriva da un annuncio Google, e servono per
caricare le conversioni offline su Google Ads. Restano vuote per il traffico
organico. Le colonne nuove vanno sempre aggiunte in fondo all'elenco `COLONNE`:
lo script le accoda a destra di quelle esistenti, così un foglio già avviato
resta allineato.

## Limiti da conoscere

- **Foto**: massimo 8 file per 3,5 MB complessivi. Il limite viene dal tetto sul
  corpo delle richieste delle funzioni Vercel. Oltre quella soglia il modulo lo
  dice e chiede di allegarne meno.
- **Email**: un account Gmail gratuito invia circa 100 email al giorno, un
  account Workspace circa 1500. Ogni richiesta ne consuma due, quindi circa 50
  richieste al giorno con Gmail. Superata la quota le mail si fermano ma il
  foglio continua a riempirsi.
- **Invii ripetuti**: lo script accetta al massimo 3 richieste ogni 15 minuti
  dallo stesso indirizzo email. Il segreto ferma chi chiama lo script
  scavalcando il sito, non chi compila il modulo cento volte: per quello serve
  questo freno.

## Se qualcosa non funziona

- **"Il modulo non è ancora collegato"**: mancano `GOOGLE_SCRIPT_URL` o
  `GGM_FORM_TOKEN`, oppure non hai rifatto il deploy dopo averle aggiunte.
- **`{"ok":false,"error":"auth"}`**: il segreto sul sito e quello nello script
  non coincidono.
- **`{"ok":false,"error":"sheet"}`**: lo script non è collegato a un foglio.
  Va incollato da Estensioni → Apps Script del foglio, non come progetto a sé.
- **Modifiche che non hanno effetto**: non hai creato una nuova versione del
  deployment.
