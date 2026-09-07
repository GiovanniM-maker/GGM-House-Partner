# Immagini

Cartella per le immagini reali del sito.

## Caricare il logo

Carica qui il file del logo con il nome esatto **`logo-ggm.png`**.

Non serve toccare il codice: il sito lo trova da solo. Se il file non c'è, o
non si carica, compare il lettering di riserva al posto dell'immagine, mai
un'icona rotta.

Consigli:

- Se hai il logo in **SVG**, caricalo come `logo-ggm.svg` e cambia
  l'estensione in `site.logo` dentro `src/content/site.ts`: resta nitido a
  ogni dimensione.
- Se hai solo il **PNG**, usalo con sfondo trasparente e almeno 600 px di
  larghezza.
- Per la **navbar** funziona meglio una versione orizzontale compatta (il
  marchio più la riga "Your Sicily Property Partner"). Il lockup completo con
  il payoff, ridotto a 45 px di altezza, diventa illeggibile.
- Nel **footer**, su fondo navy, il logo normale viene schiarito
  automaticamente. Se hai una versione chiara pronta, caricala come
  `logo-ggm-chiaro.png` e indicala in `site.logoDark`.

## Caricare le fotografie

Ogni immagine del sito è oggi un `<ImagePlaceholder>` che descrive cosa va
inserito. Per sostituirla:

1. carica il file qui (per esempio `cantiere-01.jpg`);
2. passa `src="/images/cantiere-01.jpg"` al componente;
3. aggiorna `alt` con una descrizione reale della fotografia.

Proporzioni, caricamento differito e impaginazione restano invariati.

**Regole.** Solo fotografie reali. Le foto di lavori precedenti dei fondatori
vanno usate esclusivamente dentro `ExperienceBlock`, che mostra il disclaimer
sull'esperienza pregressa. Non usare immagini di persone generate o di
archivio presentandole come il team.

I prompt per generare le immagini di ambientazione, e l'elenco degli slot in
cui le immagini generate non vanno usate, sono in `docs/prompt-immagini.md`.
