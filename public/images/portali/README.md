# Loghi dei portali

Cartella per i loghi ufficiali di Airbnb e Booking.com.

**È vuota di proposito.** I loghi non si prendono da una ricerca immagini: vanno
richiesti ai due portali, che ne regolano l'uso.

## Airbnb

Le linee guida vietano a chi gestisce immobili di usare il marchio senza
autorizzazione esplicita, e vietano di presentarsi come "Airbnb Management
Company" o di lasciar intendere un rapporto privilegiato con Airbnb.

Quello che **è** consentito è dire che si gestiscono immobili pubblicati su
Airbnb, purché Airbnb non diventi il centro della comunicazione.

L'autorizzazione si chiede all'assistenza Airbnb, descrivendo l'uso previsto.

## Booking.com

Gli asset ufficiali e le regole di co-branding stanno nel portale partner,
nella sezione dei materiali di marketing. Vanno richiesti da lì.

## Quando hai i file

1. Mettili qui, per esempio `airbnb.svg` e `booking.svg`.
2. In `src/app/(site)/property-management/page.tsx`, nell'elenco `portali`,
   aggiungi `logo: "/images/portali/airbnb.svg"` alla voce corrispondente.
3. Il componente li mostra al posto del nome scritto, senza altre modifiche.

Rispetta le dimensioni minime e le aree di rispetto indicate dalle due
aziende: sono parte delle condizioni d'uso, non un suggerimento grafico.
