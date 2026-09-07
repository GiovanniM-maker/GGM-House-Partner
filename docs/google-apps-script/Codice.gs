/**
 * GGM Your Sicily Property Partner
 * Ricezione delle richieste del modulo "Valuta la tua casa".
 *
 * Cosa fa, per ogni richiesta che arriva dal sito:
 *   1. verifica il token condiviso;
 *   2. salva le eventuali foto in una cartella di Drive;
 *   3. aggiunge una riga al foglio di lavoro;
 *   4. invia l'email di conferma al proprietario;
 *   5. invia l'email di notifica a GGM.
 *
 * Le istruzioni di configurazione sono in docs/google-sheet.md.
 */

var PROPS = PropertiesService.getScriptProperties();

/** Intestazioni del foglio. L'ordine qui decide l'ordine delle colonne. */
var COLONNE = [
  'Data',
  'Riferimento',
  'Nome',
  'Email',
  'Telefono',
  'WhatsApp',
  'Comune',
  'Provincia',
  'Tipologia',
  'Superficie (mq)',
  'Camere',
  'Stato immobile',
  'Obiettivo',
  'Residenza proprietario',
  'Utilizzo attuale',
  'Caratteristiche',
  'Note',
  'Foto',
  'Consenso privacy',
  'Stato lavorazione',
];

/**
 * Endpoint chiamato dal sito. Va pubblicato come applicazione web
 * (Esegui come: me stesso; Chi ha accesso: chiunque).
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return rispondi({ ok: false, error: 'Richiesta vuota.' });
    }

    var dati = JSON.parse(e.postData.contents);

    var atteso = PROPS.getProperty('FORM_TOKEN');
    if (!atteso || dati.token !== atteso) {
      return rispondi({ ok: false, error: 'Token non valido.' });
    }

    if (!limiteRispettato(dati.email)) {
      return rispondi({ ok: false, error: 'Troppe richieste ravvicinate.' });
    }

    var riferimento = dati.reference || generaRiferimento();
    var foto = salvaFoto(riferimento, dati.foto);

    scriviRiga(dati, riferimento, foto);
    inviaConferma(dati, riferimento);
    inviaNotifica(dati, riferimento, foto);

    return rispondi({ ok: true, reference: riferimento });
  } catch (errore) {
    console.error(errore);
    return rispondi({ ok: false, error: 'Errore interno: ' + errore });
  }
}

/* -------------------------------------------------------------------------
   Foglio di lavoro
   ------------------------------------------------------------------------- */

function foglio() {
  var id = PROPS.getProperty('SHEET_ID');
  var libro = id
    ? SpreadsheetApp.openById(id)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!libro) {
    throw new Error('Nessun foglio configurato: imposta la proprietà SHEET_ID.');
  }

  var nome = PROPS.getProperty('SHEET_NAME') || 'Richieste';
  var scheda = libro.getSheetByName(nome);

  if (!scheda) {
    scheda = libro.insertSheet(nome);
  }

  if (scheda.getLastRow() === 0) {
    scheda.appendRow(COLONNE);
    scheda.getRange(1, 1, 1, COLONNE.length).setFontWeight('bold');
    scheda.setFrozenRows(1);
  }

  return scheda;
}

function scriviRiga(dati, riferimento, foto) {
  var scheda = foglio();

  scheda.appendRow([
    new Date(),
    riferimento,
    dati.nome || '',
    dati.email || '',
    dati.telefono || '',
    dati.whatsapp ? 'Sì' : 'No',
    dati.comune || '',
    dati.provincia || '',
    dati.tipologia || '',
    dati.superficie || '',
    dati.camere || '',
    dati.condizioni || '',
    dati.obiettivo || '',
    dati.residenza || '',
    dati.utilizzo || '',
    dati.caratteristiche || '',
    dati.note || '',
    foto.cartella || (foto.link.length ? foto.link.join('\n') : ''),
    dati.privacy ? 'Sì' : 'No',
    'Da analizzare',
  ]);
}

/* -------------------------------------------------------------------------
   Foto su Drive
   ------------------------------------------------------------------------- */

/**
 * Salva le foto in una sottocartella dedicata alla richiesta.
 * Se DRIVE_FOLDER_ID non è impostata, le foto vengono ignorate: la richiesta
 * viene comunque registrata e l'email lo segnala.
 */
function salvaFoto(riferimento, allegati) {
  var vuoto = { cartella: '', link: [], numero: 0 };

  if (!allegati || !allegati.length) return vuoto;

  var idCartella = PROPS.getProperty('DRIVE_FOLDER_ID');
  if (!idCartella) {
    console.warn('DRIVE_FOLDER_ID non impostata: foto non salvate.');
    return vuoto;
  }

  var radice = DriveApp.getFolderById(idCartella);
  var cartella = radice.createFolder(riferimento);
  var link = [];

  for (var i = 0; i < allegati.length; i++) {
    var allegato = allegati[i];
    if (!allegato || !allegato.dataBase64) continue;

    var blob = Utilities.newBlob(
      Utilities.base64Decode(allegato.dataBase64),
      allegato.mimeType || 'application/octet-stream',
      allegato.name || 'foto-' + (i + 1)
    );

    link.push(cartella.createFile(blob).getUrl());
  }

  return {
    cartella: cartella.getUrl(),
    link: link,
    numero: link.length,
  };
}

/* -------------------------------------------------------------------------
   Email
   ------------------------------------------------------------------------- */

function inviaConferma(dati, riferimento) {
  if (!dati.email) return;

  var mittente = PROPS.getProperty('SENDER_NAME') || 'GGM Your Sicily Property Partner';
  var nome = (dati.nome || '').split(' ')[0];
  var saluto = nome ? 'Ciao ' + nome + ',' : 'Ciao,';

  var testo = [
    saluto,
    '',
    'abbiamo ricevuto la tua richiesta. Da qui in avanti il lavoro è nostro:',
    'analizziamo le informazioni e ti ricontattiamo.',
    '',
    'Cosa succede adesso:',
    '1. Leggiamo quello che ci hai raccontato e guardiamo la zona.',
    '2. Ti ricontattiamo per approfondire i punti che mancano.',
    '3. Se serve vedere la casa, organizziamo un sopralluogo.',
    '4. Definiamo insieme il percorso più sensato, o ti diciamo se non è il caso di procedere.',
    '',
    'Riepilogo di quello che ci hai scritto',
    'Riferimento: ' + riferimento,
    'Immobile: ' + [dati.tipologia, dati.comune, dati.provincia].filter(Boolean).join(', '),
    'Stato: ' + (dati.condizioni || 'non indicato'),
    'Obiettivo: ' + (dati.obiettivo || 'non indicato'),
    '',
    'Due cose che diciamo sempre, anche adesso: compilare il modulo non ti',
    'impegna a nulla, e non promettiamo rendimenti. Prima guardiamo la casa,',
    'poi ti diciamo cosa vediamo.',
    '',
    'Se nel frattempo ti vengono in mente dettagli utili, rispondi pure a',
    'questa email citando il riferimento.',
    '',
    'A presto,',
    mittente,
  ].join('\n');

  MailApp.sendEmail({
    to: dati.email,
    subject: 'Abbiamo ricevuto la tua richiesta (rif. ' + riferimento + ')',
    body: testo,
    htmlBody: confermaHtml(dati, riferimento, saluto, mittente),
    name: mittente,
    replyTo: PROPS.getProperty('NOTIFY_EMAIL') || undefined,
  });
}

function confermaHtml(dati, riferimento, saluto, mittente) {
  var passi = [
    'Leggiamo quello che ci hai raccontato e guardiamo la zona.',
    'Ti ricontattiamo per approfondire i punti che mancano.',
    'Se serve vedere la casa, organizziamo un sopralluogo.',
    'Definiamo insieme il percorso più sensato, o ti diciamo se non è il caso di procedere.',
  ];

  var elenco = passi
    .map(function (passo) {
      return '<li style="margin-bottom:8px">' + escapeHtml(passo) + '</li>';
    })
    .join('');

  var riepilogo = [
    ['Riferimento', riferimento],
    ['Immobile', [dati.tipologia, dati.comune, dati.provincia].filter(Boolean).join(', ')],
    ['Stato', dati.condizioni || 'non indicato'],
    ['Obiettivo', dati.obiettivo || 'non indicato'],
  ]
    .map(function (riga) {
      return (
        '<tr>' +
        '<td style="padding:6px 16px 6px 0;color:#4a6484;white-space:nowrap">' +
        escapeHtml(riga[0]) +
        '</td>' +
        '<td style="padding:6px 0;color:#132b4f">' +
        escapeHtml(riga[1]) +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  return [
    '<div style="font-family:Helvetica,Arial,sans-serif;background:#f7f3ea;padding:32px">',
    '<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e2dacb;border-radius:14px;overflow:hidden">',
    '<div style="background:#132b4f;padding:24px 28px">',
    '<span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.02em">GGM</span>',
    '<span style="color:#c39b4e;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;margin-left:12px">Your Sicily Property Partner</span>',
    '</div>',
    '<div style="padding:28px">',
    '<p style="margin:0 0 16px;color:#132b4f;font-size:16px">' + escapeHtml(saluto) + '</p>',
    '<p style="margin:0 0 24px;color:#4a6484;font-size:15px;line-height:1.6">abbiamo ricevuto la tua richiesta. Da qui in avanti il lavoro è nostro: analizziamo le informazioni e ti ricontattiamo.</p>',
    '<p style="margin:0 0 8px;color:#132b4f;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase">Cosa succede adesso</p>',
    '<ol style="margin:0 0 24px;padding-left:20px;color:#4a6484;font-size:15px;line-height:1.6">' + elenco + '</ol>',
    '<p style="margin:0 0 8px;color:#132b4f;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase">Riepilogo</p>',
    '<table style="width:100%;border-collapse:collapse;font-size:15px;margin-bottom:24px">' + riepilogo + '</table>',
    '<p style="margin:0;padding:16px;background:#f4ebd8;border-radius:8px;color:#6e5318;font-size:14px;line-height:1.6">Compilare il modulo non ti impegna a nulla e non promettiamo rendimenti. Prima guardiamo la casa, poi ti diciamo cosa vediamo.</p>',
    '</div>',
    '<div style="padding:18px 28px;border-top:1px solid #e2dacb;color:#4a6484;font-size:12px;line-height:1.6">',
    escapeHtml(mittente),
    '<br>Gestione online in tutta la Sicilia. Operatività sul posto nella provincia di Ragusa e nelle aree coperte dalla rete.',
    '</div>',
    '</div>',
    '</div>',
  ].join('');
}

function inviaNotifica(dati, riferimento, foto) {
  var destinatario = PROPS.getProperty('NOTIFY_EMAIL');
  if (!destinatario) {
    console.warn('NOTIFY_EMAIL non impostata: notifica interna non inviata.');
    return;
  }

  var righe = [
    ['Riferimento', riferimento],
    ['Nome', dati.nome],
    ['Email', dati.email],
    ['Telefono', dati.telefono],
    ['WhatsApp', dati.whatsapp ? 'Sì' : 'No'],
    ['Comune', dati.comune],
    ['Provincia', dati.provincia],
    ['Tipologia', dati.tipologia],
    ['Superficie', dati.superficie],
    ['Camere', dati.camere],
    ['Stato immobile', dati.condizioni],
    ['Obiettivo', dati.obiettivo],
    ['Residenza', dati.residenza],
    ['Utilizzo attuale', dati.utilizzo],
    ['Caratteristiche', dati.caratteristiche],
    ['Note', dati.note],
    ['Foto', foto.numero ? foto.numero + ' file: ' + foto.cartella : 'nessuna'],
  ];

  var testo = righe
    .map(function (riga) {
      return riga[0] + ': ' + (riga[1] || '');
    })
    .join('\n');

  MailApp.sendEmail({
    to: destinatario,
    subject:
      'Nuova richiesta: ' +
      (dati.comune || 'immobile') +
      ' (' +
      (dati.obiettivo || 'obiettivo non indicato') +
      ')',
    body: testo,
    replyTo: dati.email || undefined,
  });
}

/* -------------------------------------------------------------------------
   Utilità
   ------------------------------------------------------------------------- */

/**
 * Freno agli invii ripetuti dallo stesso indirizzo: il modulo è pubblico e
 * manda un'email a un destinatario scelto da chi compila.
 */
function limiteRispettato(email) {
  if (!email) return true;

  var cache = CacheService.getScriptCache();
  var chiave = 'invii_' + Utilities.base64EncodeWebSafe(String(email).toLowerCase());
  var conteggio = Number(cache.get(chiave) || 0);

  if (conteggio >= 3) return false;

  cache.put(chiave, String(conteggio + 1), 900);
  return true;
}

function generaRiferimento() {
  var oggi = Utilities.formatDate(new Date(), 'Europe/Rome', 'yyMMdd');
  var casuale = Math.random().toString(36).slice(2, 6).toUpperCase();
  return 'GGM-' + oggi + '-' + casuale;
}

function escapeHtml(valore) {
  return String(valore == null ? '' : valore)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rispondi(dati) {
  return ContentService.createTextOutput(JSON.stringify(dati)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/* -------------------------------------------------------------------------
   Da eseguire una volta a mano dall'editor
   ------------------------------------------------------------------------- */

/** Crea le intestazioni del foglio e mostra il token da copiare nel sito. */
function preparaFoglio() {
  foglio();

  var token = PROPS.getProperty('FORM_TOKEN');
  if (!token) {
    token = Utilities.getUuid().replace(/-/g, '');
    PROPS.setProperty('FORM_TOKEN', token);
  }

  console.log('Foglio pronto. GGM_FORM_TOKEN da impostare su Vercel: ' + token);
}

/** Invia una richiesta di prova senza passare dal sito. */
function provaInvio() {
  var risposta = doPost({
    postData: {
      contents: JSON.stringify({
        token: PROPS.getProperty('FORM_TOKEN'),
        reference: 'GGM-TEST-0001',
        nome: 'Prova Prova',
        email: PROPS.getProperty('NOTIFY_EMAIL'),
        telefono: '',
        whatsapp: false,
        comune: 'Modica',
        provincia: 'Ragusa',
        tipologia: 'Casa indipendente',
        superficie: '110',
        camere: '3',
        condizioni: 'Da ristrutturare completamente',
        obiettivo: 'Voglio fare entrambe le cose',
        residenza: "All'estero",
        utilizzo: 'È vuota',
        caratteristiche: 'Terrazzo, Vista mare',
        note: 'Invio di prova.',
        privacy: true,
        foto: [],
      }),
    },
  });

  console.log(risposta.getContent());
}
