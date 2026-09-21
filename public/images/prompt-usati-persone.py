"""I cinque slot con persone al lavoro, per il property management.

Il blocco di stile comune del brief finisce con "No people, no faces": appeso a
questi prompt si contraddirebbe. Qui si usa lo stesso blocco SENZA quella
clausola, e il vincolo sul volto e' riscritto in positivo - di spalle, in
lontananza, in controluce, tagliato agli avambracci - perche' vietare un volto
non funziona: il modello legge "face" e lo disegna. Toglierlo dall'inquadratura
funziona.

Il motivo non e' estetico, ed e' di Juan: una persona riconoscibile e generata,
su una pagina che parla di chi lavora per te, e' un membro del team che non
esiste.
"""
STILE = (
 "Photographic style: editorial architectural photography, natural daylight, warm neutral palette "
 "of cream, sand and honey limestone with deep navy shadows and occasional muted gold accents, calm "
 "and understated, generous negative space, matte finish, subtle film grain, shot on 35mm with a "
 "slight shallow depth of field. Mood: contemporary Mediterranean, refined but lived in, never "
 "rustic kitsch, never glossy real estate advertising. No text, no logos, no watermarks, no "
 "signage. The person stays small, turned away or in silhouette: the room is the subject."
)

SLOT = [
 ('persone-01-preparazione-casa',
  "Wide interior of a restored Sicilian house prepared for guests, seen from the doorway of an "
  "adjoining room so the space reads first and the person second. A single figure far back near the "
  "window, seen from behind, smoothing a linen bedcover, small in the frame and out of focus. Warm "
  "morning light, terracotta floor, white plaster walls. The room is the subject, the person is a "
  "sign of life. Face not visible."),
 ('persone-02-consegna-chiavi',
  "Doorway of a stone house in a Sicilian town seen from inside, strong backlight from the street. "
  "Two figures in silhouette on the threshold, one handing keys to the other, rendered as dark "
  "shapes against the bright opening, small in the lower third of the frame. Cool interior shadow, "
  "warm exterior light. Faces unreadable, no facial detail."),
 ('persone-03-controllo-casa',
  "Living room of a restored Sicilian house, wide shot. A single figure in the far background beyond "
  "an open doorway, seen from behind, checking a window latch. Shallow depth of field keeps the "
  "figure soft while the foreground room is sharp. Quiet, ordinary, unstaged. Face not visible."),
 ('persone-04-gestione-online',
  "Close view of a simple wooden desk near a window in a Sicilian house, a laptop open showing an "
  "abstract calendar grid with no legible text, a notebook and a cup. One pair of hands at the "
  "keyboard, cropped at the forearms, seen from the side. Warm daylight from the left. No face, no "
  "readable screen content, no logos."),
 ('persone-05-sopralluogo',
  "Empty room of an unrestored Sicilian house, wide shot with the far wall in sunlight. A single "
  "small figure standing with their back turned near the far window, looking up at the ceiling, "
  "occupying less than a tenth of the frame. Dust in the light. The emptiness of the room is the "
  "subject. Face not visible."),
]
