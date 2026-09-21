# Loghi dei portali

Qui stanno i loghi usati nella fascia "Il tuo immobile, sui canali che contano"
della landing Property Management.

| File | Marchio | Formato |
| --- | --- | --- |
| `airbnb.svg` | Bélo + lettering "airbnb", coral `#FF5A5F` | 320 x 100 |
| `booking.svg` | Lettering "Booking.com", blu `#273b7d` e `#499fdd` | 119 x 20 |

Sono i marchi nella loro forma corrente, ripuliti dai metadati dell'editor con
cui erano stati salvati. Non sono ridisegnati a mano e non sono stati ricolorati:
alterare un marchio è una violazione più seria che usarlo.

## Cosa manca ancora, e non è un dettaglio

Questi file sono l'artwork giusto, ma non sono un'autorizzazione all'uso.

**Airbnb** nelle sue linee guida sui marchi vieta espressamente l'uso del logo e
del Bélo senza permesso scritto, e cita proprio le società di gestione immobili
come caso a cui il divieto si applica. Quello che resta consentito senza
permesso è la parola "Airbnb" nel testo, per dire che si gestiscono immobili
pubblicati lì. Il permesso per il logo si chiede all'assistenza Airbnb
descrivendo l'uso previsto.

**Booking.com** distribuisce asset ufficiali e regole di co-branding nell'area
partner, nella sezione materiali di marketing. Se da lì arriva una versione
diversa da questa, sostituisci il file: vince la loro.

Finché le autorizzazioni non ci sono, la fascia resta accompagnata dalla nota
che dice che i marchi sono dei rispettivi proprietari e che GGM non è affiliata,
sponsorizzata o approvata da loro. Quella nota non va tolta.

## Come si cambia un logo

1. Sostituisci il file qui, tenendo lo stesso nome.
2. Se cambiano le proporzioni, aggiorna `larghezza` e `altezza` nella voce
   corrispondente dell'elenco `portali` in
   `src/app/(site)/property-management/page.tsx`.
3. `classeLogo`, nella stessa voce, decide a che altezza viene mostrato. Non è
   uguale per tutti: un logo con simbolo occupa in verticale più spazio del solo
   lettering, quindi sta più basso perché le due scritte appaiano della stessa
   misura.

Rispetta le dimensioni minime e le aree di rispetto indicate dalle due aziende:
sono parte delle condizioni d'uso, non un suggerimento grafico.
