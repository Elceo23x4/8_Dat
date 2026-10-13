# 8 DAT motion handoff — earth and craft

13 October 2026. This version implements the requested revision with a default Three.js arrival, independent paper/vector objects and the supplied portfolio screenshots. No finished video is required for the default scenes to function.

## Input and ownership

Native scrolling remains the main input. GSAP controls the long scene reveals; CSS controls individual file/card hover and the fabric marquees; Three.js controls the camera, doors and male figure. The moving file-entry wrapper and its hoverable child are separate, as are the handwriting paths and the pencil. Reduced motion exposes content directly and stops long animations.

| Scene | Motion |
| --- | --- |
| Arrival | Artistic city poster establishes the scene; the live tower and grounded male appear, the camera completes a full orbit, then approaches and crosses an opening glass portal. The wordmark recedes and the coffee interior transition arrives. |
| Investigation | Papers land first; connecting threads draw between their pin locations. Printed requirements fade, the paper enlarges into a readable viewport sheet, and a pencil traces the four handwritten points. |
| Operation | Request, confirmation, invoice, fulfilment, records and delivery appear sequentially. Hover/focus opens a pasted detail note clamped within the paper. A kraft envelope drops into the van before dispatch. |
| Creative studies | Five composed artworks advance with desktop scroll and remain directly scrollable on touch. No presentation numbering, repeated ticket logo or generic instruction captions. |
| Deliverables | Perforated paper stamp and braided jute retire; four grained kraft panels part, exposing richer strategy/brand/technology/operations content. |
| Skills | The metal bucket tips clockwise, shifts left and pours chips to the right. Its brand mark follows the surface’s curved baseline and etched shading. |
| Portfolio | A metal drawer advances into the room and exits the view; the supplied Liahona images appear as hanging files. Their catalog tabs, clips and hover/focus depth remain interactive; click or keyboard activation opens a full image view. |
| Marketing | Fabric banners unroll behind their text with travelling lower rollers, grommets and sewn edges. Opposed tilted marquees carry marketing platforms and tools. |
| Contact | The telephone owns the full viewport first, shakes and separates, then reveals the contact note. The form is inert until revealed. Clicking the phone or using Contact us can go directly to the form. |
| Footer | Per-letter liquid color on hover, with a small displacement and solid readable fallback. No pointer-position spotlight or hide-on-hover behavior. |

## Arrival geometry and walking

`lib/scene/architecture.mjs` authors the curved/tapered glass loft, terraces, ribs, crown, lobby, hardware and beveled metal sign letters. Static surfaces are merged/instanced by material. `lib/scene/consultant.mjs` authors the figure’s torso, head, suit, arms, shoes and briefcase. `locomotion.mjs` defines the camera progression and stride targets.

A stance foot keeps a constant arc-distance target while the body advances. A swing foot lifts up to 0.13 metres and lands continuously at the next target. Knees solve from hip to ankle; the shoe’s offset uses the planted tangent, so turning the body does not move the contact target. This is walking-contact animation, not a collision-enabled game engine.

| Normalised arrival progress | Camera/action |
| --- | --- |
| 0–0.12 | Poster-to-scene establishing blend, low street view and consultant approach. |
| 0.12–0.26 | Camera rises and widens from street scale to architectural scale. |
| 0.22–0.69 | Full 360-degree orbit, within the clear foreground ring. |
| 0.70–0.94 | Return to the front portal and approach; the doors open during 0.85–0.94. |
| 0.94–1.00 | Camera enters the lobby, at a final 1.7 metre eye height, then transitions to the investigation wall. |

The exact constants are in `docs/SCENE_CONTRACT.json`. Human visual acceptance, real-device FPS and software-renderer evidence are separate; no universal 60 FPS is inferred.

## Optional film production

The revised poster is `public/art/headquarters-artistic.webp`. It is an art/lighting direction, not a claim that the procedural model matches every architectural detail.

For a cinematic replacement, commit either:

- `public/media/arrival-with-consultant.mp4`: a complete shot including the person; it replaces the rendered arrival.
- `public/media/arrival.mp4` or `arrival.webm`: architecture only; the Three.js person and contact-shadow overlay stay on top. Match the same camera path and floor scale so foot contact aligns with the footage.

Use the table above as the shot timing. Keep the camera path continuous, window grids coherent and doors open before crossing. Do not bake in interface text or cursor movement. The adapter maps scroll progress to clip time and adds only ±5px/±3px pointer compositing.

Prefer 12–16 seconds, 1920×1080, H.264/yuv420p, fast-start metadata, frequent keyframes and a file below 25 MB, ideally below 8 MB. Keep the action safe in a portrait crop. Commit the file; the build detects it automatically. A different filename can be configured with `NEXT_PUBLIC_ARRIVAL_VIDEO=/media/your-film.mp4`.

The media adapter checks both native events and current ready/error state, avoiding early-event races. Invalid media recovers to the authored scene; reduced motion uses the poster. It seeks forward and backward without timed autoplay and pauses work offscreen/hidden.

## Contact and supplied references

The prepared WhatsApp brief still targets +234 911 571 6254; X, Instagram and TikTok use @8dat_work. The visible phone number and Nigeria sentence were removed as requested. No message is sent automatically by the website.

The four attached Liahona screenshots are used as supplied portfolio images. The five new gallery artworks are illustrative creative studies; no fictional project result, testimonial or client metric is asserted. Font licences and full image prompts/provenance are in `docs/licenses` and `docs/asset-provenance.json`.
