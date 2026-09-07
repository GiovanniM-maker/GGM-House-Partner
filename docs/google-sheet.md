# Collegare il modulo a Google Sheet

Il modulo "Valuta la tua casa" scrive su un foglio Google, salva le foto su
Drive e invia due email: la conferma al proprietario e la notifica a GGM.

## Come sono collegati i pezzi

```
Browser
   │  POST /api/valutazione  (solo dati del modulo)
   ▼
Route Next.js  src/app/api/valutazione/route.ts
   │  valida, normalizza, aggiunge il token
   │  POST all'URL dello script
   ▼
Google Apps Script  docs/google-apps-script/Codice.gs
   ├─ salva le foto in una cartella di Drive
   ├─ aggiunge una riga al foglio
   ├─ invia l'email di conferma al proprietario
   └─ invia l'email di notifica a GGM
```

L'URL dello script e il token non arrivano mai al browser: il sito parla solo
con la propria route interna. Questo evita anche i problemi di CORS che si
incontrano chiamando Apps Script direttamente dal client.

## 1. Crea il foglio e la cartella

1. Crea un foglio Google nuovo, per esempio "GGM richieste". Copia l'ID
   dall'indirizzo: `docs.google.com/spreadsheets/d/`**`ID`**`/edit`.
2. Crea in Drive una cartella per le foto, per esempio "GGM foto richieste".
   Copia l'ID dall'indirizzo: `drive.google.com/drive/folders/`**`ID`**.

## 2. Crea lo script

1. Vai su [script.google.com](https://script.google.com) e crea un progetto
   nuovo, per esempio "GGM modulo".
2. Incolla il contenuto di `docs/google-apps-script/Codice.gs` al posto del
   codice di esempio e salva.

## 3. Imposta le proprietà dello script

Nell'editor: Impostazioni progetto, poi "Proprietà script".

| Proprietà | Obbligatoria | Valore |
|---|---|---|
| `SHEET_ID` | sì | ID del foglio del punto 1 |
| `NOTIFY_EMAIL` | sì | indirizzo GGM che riceve le notifiche |
| `DRIVE_FOLDER_ID` | no | ID della cartella foto. Senza, le foto non vengono salvate |
| `SHEET_NAME` | no | nome della scheda, predefinito `Richieste` |
| `SENDER_NAME` | no | nome mittente delle email |
| `FORM_TOKEN` | no | generato automaticamente al passo 4 |

## 4. Prepara il foglio e genera il token

Nell'editor scegli la funzione `preparaFoglio` ed eseguila. Al primo avvio
Google chiede l'autorizzazione ad accedere a Fogli, Drive e Gmail: è normale,
lo script gira con il tuo account.

La funzione crea le intestazioni e stampa nel log il token da copiare. Tienilo
a portata di mano per il punto 6.

## 5. Pubblica come applicazione web

Distribuisci, poi "Nuovo deployment", tipo "Applicazione web":

- **Esegui come**: me stesso
- **Chi ha accesso**: chiunque

Copia l'URL che termina con `/exec`.

> Ogni volta che modifichi il codice devi creare una **nuova versione** del
> deployment, altrimenti resta attiva quella vecchia.

## 6. Configura il sito

Su Vercel, in Settings, Environment Variables, aggiungi le due variabili per
tutti gli ambienti:

| Variabile | Valore |
|---|---|
| `GOOGLE_SCRIPT_URL` | l'URL `/exec` del punto 5 |
| `GGM_FORM_TOKEN` | il token del punto 4 |

In locale bastano le stesse righe in un file `.env.local`.

Poi fai un nuovo deploy: le variabili vengono lette a ogni richiesta, ma il
deployment già pubblicato non le vede.

## Comportamento senza configurazione

- **In sviluppo**, se le variabili mancano, la richiesta viene registrata nel
  log del server e il modulo mostra comunque la conferma: si può lavorare
  sull'interfaccia senza collegare nulla.
- **In produzione**, se mancano, il modulo risponde con un errore esplicito
  invece di far credere all'utente che la richiesta sia partita.

## Verifiche

1. Nell'editor dello script esegui `provaInvio`: scrive una riga di prova sul
   foglio e manda le due email. Cancella poi la riga.
2. Dal sito, compila il modulo per intero e controlla foglio, cartella Drive e
   casella di posta.

## Limiti da conoscere

- **Foto**: massimo 8 file per 3,5 MB complessivi. Il limite viene dal tetto
  sul corpo delle richieste delle funzioni Vercel. Oltre quella soglia il
  modulo lo dice e chiede di allegarne meno.
- **Email**: un account Gmail gratuito invia circa 100 email al giorno, un
  account Workspace circa 1500. Ogni richiesta ne consuma due.
- **Invii ripetuti**: lo script accetta al massimo 3 richieste ogni 15 minuti
  dallo stesso indirizzo email. Il modulo è pubblico e manda una email a un
  destinatario scelto da chi compila, quindi il freno serve.

## Se qualcosa non funziona

- **"Il modulo non è ancora collegato"**: mancano `GOOGLE_SCRIPT_URL` o
  `GGM_FORM_TOKEN`, oppure non hai rifatto il deploy dopo averle aggiunte.
- **"Non siamo riusciti a registrare la richiesta"**: guarda i log della
  funzione su Vercel e le esecuzioni dello script su Apps Script. Le cause più
  frequenti sono un token diverso fra le due parti e un deployment non
  aggiornato dopo una modifica al codice.
- **Foto assenti nel foglio**: manca `DRIVE_FOLDER_ID`.
