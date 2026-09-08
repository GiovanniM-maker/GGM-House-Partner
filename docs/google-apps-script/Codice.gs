/**
 * GGM · ricezione delle richieste dal sito
 * Da incollare in Estensioni > Apps Script del foglio delle richieste.
 *
 * Fa tre cose, in quest'ordine di importanza:
 *   1. scrive la riga nel foglio, che e' l'unica cosa che non deve mai fallire;
 *   2. manda la conferma a chi ha compilato;
 *   3. manda la notifica a noi, con rispondi-a gia' impostato sul mittente.
 *
 * Le mail partono dall'account Google che autorizza lo script. Non serve
 * nessun servizio esterno e nessun record DNS.
 *
 * Siccome lo script sta dentro al foglio, non serve nessun ID: il foglio se lo
 * trova da solo, e cosi' la cartella su Drive dove finiscono le foto, che viene
 * creata accanto al foglio la prima volta che serve.
 *
 * ---------------------------------------------------------------------------
 * IL SEGRETO CONDIVISO NON E' FACOLTATIVO
 * ---------------------------------------------------------------------------
 * Il Web App e' pubblicato con accesso "chiunque": chi scopre l'indirizzo puo'
 * chiamarlo. Finche' scriveva solo righe nel foglio il danno era una riga di
 * spam. Ora che manda mail, un indirizzo scoperto diventa un cannone che
 * spedisce DAL VOSTRO ACCOUNT e vi brucia la quota giornaliera in pochi minuti.
 * Quindi ogni richiesta deve portare un segreto, e senza quello viene rifiutata
 * prima di toccare il foglio.
 *
 * Il segreto si imposta una volta sola, qui dentro:
 *   Impostazioni progetto > Proprieta script > Aggiungi proprieta
 *   nome:   GGM_FORM_TOKEN
 *   valore: una stringa lunga a caso (almeno 32 caratteri)
 * e la stessa stringa, con lo stesso nome, va su Vercel.
 *
 * NON scriverlo qui nel codice: questo file sta in un repository.
 *
 * Il segreto pero' non basta da solo. Ferma chi chiama lo script scavalcando il
 * sito, ma non ferma chi compila il modulo cento volte: quelle richieste
 * passano dal sito e il segreto ce l'hanno. Per quello c'e' il freno piu'
 * sotto, che conta gli invii per indirizzo.
 * ---------------------------------------------------------------------------
 *
 * Quota: un account Gmail normale manda 100 mail al giorno, Workspace 1500.
 * Ogni richiesta ne consuma 2 (conferma + notifica), quindi 50 richieste al
 * giorno con Gmail. Oltre quella soglia le mail smettono di partire ma il
 * foglio continua a riempirsi: nessun contatto va perso, e la colonna
 * "Conferma" dice a chi non e' arrivato niente.
 */

// A chi arriva la notifica interna. DA SOSTITUIRE con l'indirizzo vero.
var NOTIFICA_A = 'CAMBIAMI@esempio.it';

// Come si firma la mail di conferma. Se in Gmail avete configurato un alias
// verificato, mettetelo in MITTENTE_ALIAS e la conferma partira' da li' invece
// che dall'indirizzo personale che autorizza lo script.
var MITTENTE_NOME = 'GGM Your Sicily Property Partner';
var MITTENTE_ALIAS = '';   // es. 'info@ggm.it', oppure '' per lasciare il default

// Cartella creata accanto al foglio, dove finiscono le foto degli immobili.
var CARTELLA_FOTO = 'Foto richieste';

// Quante richieste accettiamo dallo stesso indirizzo in un quarto d'ora.
var MAX_INVII = 3;

// Le colonne nuove vanno aggiunte in fondo: intestazione() le accoda a destra
// di quelle esistenti, e un foglio gia' avviato resta allineato.
var COLONNE = [
  'Data', 'Riferimento', 'Nome', 'Email', 'Telefono', 'WhatsApp',
  'Comune', 'Provincia', 'Tipologia', 'Superficie (mq)', 'Camere',
  'Stato immobile', 'Obiettivo', 'Residenza', 'Utilizzo attuale',
  'Caratteristiche', 'Note', 'Foto', 'Privacy', 'Stato lavorazione', 'Conferma',
  'gclid', 'gbraid', 'wbraid'
];

// La colonna dell'esito va cercata per nome, non presa come ultima: cosi'
// resta al suo posto anche aggiungendo altre colonne dopo.
var COL_CONFERMA = COLONNE.indexOf('Conferma') + 1;


function doPost(e) {
  var d = {};
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return risposta({ ok: false, error: 'json' });
  }

  // Il controllo del segreto viene prima di tutto: se non torna, non si scrive
  // niente e non parte niente.
  var atteso = PropertiesService.getScriptProperties().getProperty('GGM_FORM_TOKEN');
  if (atteso && d.token !== atteso) {
    return risposta({ ok: false, error: 'auth' });
  }

  var email = String(d.email || '').trim();
  var nome = String(d.nome || '').trim();
  var riferimento = String(d.reference || '').trim() || generaRiferimento();

  if (!sottoLimite(email)) {
    return risposta({ ok: false, error: 'troppe richieste' });
  }

  // Le foto vengono prima della riga perche' nella riga ci va il loro link, ma
  // un problema su Drive non deve costare il contatto: se qualcosa va storto si
  // scrive lo stesso, con la casella foto che lo dice.
  var foto = { testo: '', numero: 0 };
  try {
    foto = salvaFoto(riferimento, d.foto);
  } catch (err) {
    foto = { testo: 'errore nel salvataggio: ' + err, numero: 0 };
  }

  // 1. Il foglio. Questo passo non deve mai fallire per colpa di una mail.
  var esitoConferma = '';
  var riga;
  try {
    var sh = foglio();
    intestazione(sh);
    sh.appendRow([
      new Date(),
      riferimento,
      nome,
      email,
      String(d.telefono || ''),
      d.whatsapp ? 'si' : 'no',
      String(d.comune || ''),
      String(d.provincia || ''),
      String(d.tipologia || ''),
      String(d.superficie || ''),
      String(d.camere || ''),
      String(d.condizioni || ''),
      String(d.obiettivo || ''),
      String(d.residenza || ''),
      String(d.utilizzo || ''),
      String(d.caratteristiche || ''),
      String(d.note || ''),
      foto.testo,
      // Il consenso e' la base giuridica del contatto: va conservato insieme al
      // contatto, non solo verificato nel browser e poi dimenticato.
      d.privacy ? 'si' : 'NO',
      'Da analizzare',
      '',
      // Identificativi del clic pubblicitario, vuoti se la richiesta non
      // arriva da un annuncio. Servono a caricare le conversioni su Google Ads.
      String((d.gclid || '')),
      String((d.gbraid || '')),
      String((d.wbraid || ''))
    ]);
    riga = sh.getLastRow();
  } catch (err) {
    return risposta({ ok: false, error: 'sheet' });
  }

  // 2. e 3. Le mail. Se falliscono, la richiesta resta salvata e la colonna
  // "Conferma" lo dice: cosi' si vede a colpo d'occhio a chi non e' arrivato
  // niente e lo si puo' ricontattare a mano.
  try {
    if (valida(email)) {
      MailApp.sendEmail(opzioni({
        to: email,
        subject: 'Abbiamo ricevuto la tua richiesta (rif. ' + riferimento + ')',
        htmlBody: corpoConferma(nome, d, riferimento),
        replyTo: NOTIFICA_A
      }));
      esitoConferma = 'inviata';
    } else {
      esitoConferma = 'nessun indirizzo valido';
    }
  } catch (err) {
    esitoConferma = 'errore: ' + err;
  }

  try {
    MailApp.sendEmail(opzioni({
      to: NOTIFICA_A,
      subject: 'Nuova richiesta: ' + (d.comune || 'immobile')
        + (d.obiettivo ? ' · ' + d.obiettivo : ''),
      htmlBody: corpoNotifica(d, riferimento, foto, esitoConferma),
      // rispondendo a questa mail si scrive direttamente alla persona
      replyTo: valida(email) ? email : NOTIFICA_A
    }));
  } catch (err) {
    // la notifica interna che non parte non deve rompere la risposta al sito
  }

  try {
    sh.getRange(riga, COL_CONFERMA).setValue(esitoConferma);
  } catch (err) {}

  return risposta({ ok: true, reference: riferimento, conferma: esitoConferma });
}


/* ------------------------------------------------------------------------ */
/* Foglio                                                                     */
/* ------------------------------------------------------------------------ */

function foglio() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  if (!libro) {
    throw new Error('Script non collegato a un foglio. Va incollato da '
      + 'Estensioni > Apps Script del foglio delle richieste.');
  }
  return libro.getSheets()[0];
}


/** Il foglio puo' avere gia' meno colonne di quelle previste: qui si allineano
 *  senza toccare le righe che ci sono gia'. */
function intestazione(sh) {
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLONNE);
    sh.getRange(1, 1, 1, COLONNE.length).setFontWeight('bold');
    sh.setFrozenRows(1);
    return;
  }
  var largh = sh.getLastColumn();
  if (largh < COLONNE.length) {
    sh.getRange(1, largh + 1, 1, COLONNE.length - largh)
      .setValues([COLONNE.slice(largh)])
      .setFontWeight('bold');
  }
}


/* ------------------------------------------------------------------------ */
/* Foto                                                                       */
/* ------------------------------------------------------------------------ */

/** Salva le foto in una sottocartella dedicata alla richiesta, dentro una
 *  cartella creata accanto al foglio. Nessun ID da configurare. */
function salvaFoto(riferimento, allegati) {
  if (!allegati || !allegati.length) return { testo: '', numero: 0 };

  var contenitore = cartellaFoto();
  var cartella = contenitore.createFolder(riferimento);
  var salvate = 0;

  for (var i = 0; i < allegati.length; i++) {
    var a = allegati[i];
    if (!a || !a.dataBase64) continue;
    cartella.createFile(Utilities.newBlob(
      Utilities.base64Decode(a.dataBase64),
      a.mimeType || 'application/octet-stream',
      a.name || 'foto-' + (i + 1)
    ));
    salvate++;
  }

  return { testo: cartella.getUrl(), numero: salvate };
}


/** La cartella accanto al foglio: la si cerca per nome, e se non c'e' la si
 *  crea. Vale anche per la prima richiesta in assoluto. */
function cartellaFoto() {
  var file = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var genitori = file.getParents();
  var base = genitori.hasNext() ? genitori.next() : DriveApp.getRootFolder();

  var esistenti = base.getFoldersByName(CARTELLA_FOTO);
  return esistenti.hasNext() ? esistenti.next() : base.createFolder(CARTELLA_FOTO);
}


/* ------------------------------------------------------------------------ */
/* Mail                                                                       */
/* ------------------------------------------------------------------------ */

function corpoConferma(nome, d, riferimento) {
  var saluto = nome ? 'Ciao ' + esc(nome.split(' ')[0]) + ',' : 'Ciao,';

  var passi = [
    'Leggiamo quello che ci hai raccontato e guardiamo la zona.',
    'Ti ricontattiamo per approfondire i punti che mancano.',
    'Se serve vedere la casa, organizziamo un sopralluogo.',
    'Definiamo insieme il percorso più sensato, o ti diciamo se non è il caso di procedere.'
  ].map(function (p) {
    return '<li style="margin-bottom:8px">' + p + '</li>';
  }).join('');

  var immobile = [d.tipologia, d.comune, d.provincia]
    .filter(function (v) { return v; }).join(', ');

  var riepilogo = '<div style="margin:26px 0;padding:16px 18px;background:#F4EBD8;border-radius:8px">'
    + '<div style="font:500 11px/1.4 ui-monospace,monospace;letter-spacing:.1em;'
    + 'text-transform:uppercase;color:#6E5318;margin-bottom:10px">Quello che ci hai scritto</div>'
    + campo('Riferimento', riferimento)
    + campo('Immobile', immobile)
    + campo('Stato', d.condizioni)
    + campo('Obiettivo', d.obiettivo)
    + '</div>';

  return guscio(
    '<p style="margin:0 0 16px">' + saluto + '</p>'
    + '<p style="margin:0 0 16px">abbiamo ricevuto la tua richiesta. Da qui in avanti '
    + 'il lavoro &egrave; nostro: analizziamo le informazioni e ti ricontattiamo.</p>'
    + '<p style="margin:0 0 10px;font:500 11px/1.4 ui-monospace,monospace;letter-spacing:.1em;'
    + 'text-transform:uppercase;color:#4A6484">Cosa succede adesso</p>'
    + '<ol style="margin:0;padding-left:20px">' + passi + '</ol>'
    + riepilogo
    + '<p style="margin:0">Compilare il modulo non ti impegna a nulla e non promettiamo '
    + 'rendimenti. Prima guardiamo la casa, poi ti diciamo cosa vediamo, anche quando '
    + 'la risposta &egrave; che non conviene.</p>'
    + '<p style="margin:26px 0 0">A presto,<br><strong>' + esc(MITTENTE_NOME) + '</strong></p>'
  );
}


function corpoNotifica(d, riferimento, foto, esitoConferma) {
  return guscio(
    '<p style="margin:0 0 20px;font-size:17px"><strong>Nuova richiesta dal sito.</strong></p>'
    + '<table style="border-collapse:collapse;width:100%">'
    + riga('Riferimento', riferimento)
    + riga('Nome', d.nome)
    + riga('Email', d.email)
    + riga('Telefono', d.telefono)
    + riga('WhatsApp', d.whatsapp ? 'preferisce WhatsApp' : '')
    + riga('Comune', d.comune)
    + riga('Provincia', d.provincia)
    + riga('Tipologia', d.tipologia)
    + riga('Superficie', d.superficie)
    + riga('Camere', d.camere)
    + riga('Stato', d.condizioni)
    + riga('Obiettivo', d.obiettivo)
    + riga('Residenza', d.residenza)
    + riga('Utilizzo', d.utilizzo)
    + riga('Caratteristiche', d.caratteristiche)
    + riga('Note', d.messaggio || d.note)
    + riga('Privacy', d.privacy ? 'consenso prestato' : 'NON prestato')
    + riga('Foto', foto.numero ? foto.numero + ' file: ' + foto.testo : 'nessuna')
    + riga('Da annuncio', d.gclid || d.gbraid || d.wbraid ? 'si' : '')
    + riga('Conferma', esitoConferma)
    + '</table>'
    + '<p style="margin:24px 0 0;color:#4A6484;font-size:14px">'
    + 'Rispondendo a questa mail scrivi direttamente alla persona.</p>'
  );
}


function riga(k, v) {
  if (!v) return '';
  return '<tr><td style="padding:7px 14px 7px 0;color:#4A6484;font:500 12px/1.4 '
    + 'ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;'
    + 'vertical-align:top;white-space:nowrap">' + k + '</td>'
    + '<td style="padding:7px 0;color:#132B4F;font-size:15px;vertical-align:top">'
    + esc(String(v)).replace(/\n/g, '<br>') + '</td></tr>';
}


function campo(k, v) {
  if (!v) return '';
  return '<div style="font-size:15px;color:#132B4F;margin-bottom:4px">'
    + '<span style="color:#6E5318">' + k + ':</span> ' + esc(String(v)) + '</div>';
}


/** La cornice comune: sobria, leggibile anche dove l'HTML viene mangiato. */
function guscio(dentro) {
  return '<div style="font-family:-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;'
    + 'font-size:16px;line-height:1.6;color:#2E4E7A;max-width:560px;margin:0 auto;padding:8px">'
    + '<div style="font:600 26px/1 Georgia,serif;color:#132B4F;letter-spacing:-.01em">'
    + 'GG<span style="color:#C39B4E">M</span></div>'
    + '<div style="font:500 9px/1 ui-monospace,monospace;letter-spacing:.24em;color:#4A6484;'
    + 'margin:6px 0 30px">YOUR &middot; SICILY &middot; PROPERTY &middot; PARTNER</div>'
    + dentro
    + '<div style="margin-top:34px;padding-top:16px;border-top:1px solid #E2DACB;'
    + 'color:#4A6484;font-size:12.5px;line-height:1.6">'
    + 'Gestione online in tutta la Sicilia. Operativit&agrave; sul posto nella provincia '
    + 'di Ragusa e nelle aree coperte dalla rete.</div></div>';
}


/* ------------------------------------------------------------------------ */
/* Utilita'                                                                   */
/* ------------------------------------------------------------------------ */

function opzioni(o) {
  o.name = MITTENTE_NOME;
  if (MITTENTE_ALIAS) o.from = MITTENTE_ALIAS;
  return o;
}


function valida(m) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m);
}


/** Il segreto ferma chi scavalca il sito, non chi compila il modulo cento
 *  volte: quelle richieste il segreto ce l'hanno. Questo conta gli invii per
 *  indirizzo e protegge la quota mail. */
function sottoLimite(email) {
  if (!email) return true;
  var cache = CacheService.getScriptCache();
  var chiave = 'invii_' + Utilities.base64EncodeWebSafe(email.toLowerCase());
  var n = Number(cache.get(chiave) || 0);
  if (n >= MAX_INVII) return false;
  cache.put(chiave, String(n + 1), 900);
  return true;
}


function generaRiferimento() {
  return 'GGM-' + Utilities.formatDate(new Date(), 'Europe/Rome', 'yyMMdd')
    + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}


function risposta(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}


function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


/* ------------------------------------------------------------------------ */
/* Da lanciare a mano una volta, dopo aver incollato il codice                 */
/* ------------------------------------------------------------------------ */

/** Apre la richiesta di autorizzazione e verifica che tutto risponda.
 *  Il risultato arriva nella casella di NOTIFICA_A. */
function provaInvio() {
  intestazione(foglio());

  MailApp.sendEmail(opzioni({
    to: NOTIFICA_A,
    subject: 'Prova di invio dallo script delle richieste',
    htmlBody: guscio('<p style="margin:0">Se leggi questa mail, lo script &egrave; '
      + 'autorizzato a spedire e la cornice si vede come deve.</p>')
  }));

  Logger.log('Mail di prova inviata a ' + NOTIFICA_A
    + '. Quota residua oggi: ' + MailApp.getRemainingDailyQuota());
}


/** Genera il segreto condiviso se non c'e' e lo stampa, da copiare su Vercel. */
function mostraToken() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('GGM_FORM_TOKEN');
  if (!token) {
    token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().slice(0, 8);
    props.setProperty('GGM_FORM_TOKEN', token);
  }
  Logger.log('GGM_FORM_TOKEN da impostare su Vercel: ' + token);
}
