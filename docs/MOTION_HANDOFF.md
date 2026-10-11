# 8 DAT portfolio — motion and media handoff

Date: 11 October 2026. Repository: `Elceo23x4/8_Dat`.

The portfolio follows a consultant from arrival to investigation, working systems, creative direction, strategy, tools, marketing and a conversation. Its visual language uses coffee, warm paper, near-black and restrained turquoise. Burgundy stamps and muted ink accents are supporting colours.

## Implemented scene sequence

| Chapter | Scene and motion | Input | Implementation |
| --- | --- | --- | --- |
| 01 Arrival | A glass headquarters and city, a full camera orbit, a consultant approaching from the left, sliding entry doors and camera approach into the lobby. The large wordmark shrinks and clears the scene. | Native scroll; restrained pointer parallax | Three.js architecture, layered SVG consultant, GSAP timeline |
| 02 Investigation | Notes appear on an evidence board. Pins and connecting threads establish relationships. A hand approaches the requirements note, which enlarges to cover the viewport. | Scroll, reversible | Independent paper layers, SVG hand and threads |
| 03 Workflow | Request, confirmation, invoice/payment, fulfilment, records and delivery appear in order. A package moves toward dispatch; the truck arrives and leaves. | Scroll, reversible | Semantic HTML process, vector parcel/truck, GSAP |
| 04 Creative | Identity, billboard, website, campaign and business playbook concepts have changing perspective. Desktop scroll carries all five cards through the scene. Touch layouts retain swipe; arrow buttons work in both modes. | Scroll, horizontal swipe, buttons, keyboard | CSS perspective, GSAP desktop pin and native mobile scroll-snap |
| 05 Deliverables | A rope-bound square parcel with a retro stamp separates into four panels. Strategy, brand, technology and operations emerge underneath. | Scroll, reversible | Four separately animated panels, ropes and stamp |
| 06 Tools | A metallic bucket tips and shifts left while tool labels pour right. Individual chips respond to hover. | Scroll and pointer | Layered SVG bucket, GSAP spill, Motion hover |
| 07 Marketing | Research → attention → personal selling → acquisition → delivery → learning. Thread connections and sequential cards show the campaign as a system. | Scroll | HTML cards with SVG network |
| 08 Contact | A retro telephone shakes, its receiver and base separate, and a worn-paper contact note appears. The form prepares a WhatsApp brief. | Scroll; form input | Independent phone parts and contact form |
| Footer | Oversized 8 DAT letters react individually; a turquoise watercolour-like light follows the pointer inside the wordmark. | Pointer, keyboard links | Motion letter animation and CSS masked radial colour |

The illustrative process and gallery are demonstrations, not claims of completed client projects or measured outcomes. Marketing copy deliberately avoids presenting assumptions about all Nigerian customers as established facts.

## Cinematic media still to produce

The arrival has a generated architectural poster at `public/art/headquarters-poster.webp`, a video indicator, a live procedural 3D option and an optional scroll-scrubbed film adapter. No finished cinematic video is included. The procedural renderer does not reproduce every detail of the generated architectural poster; the poster is the realism target for film production.

The consultant and hand are vector illustration layers. A fully photorealistic walking character, cloth simulation and hand-to-paper interaction require dedicated animation production; those are not represented as finished character rigs in this PR.

### Arrival film brief

- Produce a 12–16 second, silent, continuous architectural shot. Use the supplied poster as the lighting/material direction. Export 1920×1080 landscape first, with a separately framed portrait variant if later required.
- Keep architecture rigid and coherent. Avoid drifting window grids, sliding floors, changing signs, extra doors or deforming buildings. Do not burn copy, navigation or the website wordmark into footage.
- Keep the consultant out of the architectural clip when retaining the SVG consultant layer. If producing a realistic character-inclusive version, replace the consultant layer in code to avoid showing two people.
- The opening is an establishing frame, followed by a controlled full orbit, then a front approach to the entrance. Door opening must happen before crossing the threshold. End on the interior paper palette to support the evidence-board transition.
- Treat this as a previsualisation brief. A coherent 360° architectural orbit may need a modelled scene and conventional 3D rendering; a single image-to-video pass cannot be assumed to preserve unseen building geometry.

| Normalised scroll | Intended frame/action |
| --- | --- |
| 0.00–0.08 | Establish the city/headquarters; central 8 DAT wordmark has priority. |
| 0.08–0.30 | Consultant walks in from the left; the wordmark recedes; the scene establishes depth. |
| 0.30–0.62 | Complete the orbit and settle toward the entrance. |
| 0.62–0.84 | Move closer to the front door. Consultant nears the threshold. |
| 0.84–0.94 | Open the door; move through it; retire the consultant layer. |
| 0.94–1.00 | Resolve into the interior paper tone and crossfade into investigation. |

The current procedural camera completes its full orbit during the first 62% of hero scroll, then approaches the lobby. For a film, time-remap the exported sequence to the table above if the film's orbit begins later. No mouse-led camera movement should be baked into footage: the film has one authored camera path. Any cursor depth effect should be a small compositing transform over the complete frame.

### Installation of the film

1. Add the approved file as `public/media/arrival.webm` or `public/media/arrival.mp4`.
2. The build detects `arrival.mp4` automatically, then `arrival.webm`. For another filename, set `NEXT_PUBLIC_ARRIVAL_VIDEO=/media/your-film.mp4`.
3. Commit the file. The existing Pages workflow rebuilds it. The film replaces the Three.js layer; missing or undecodable media recovers to the live scene and poster. The video is silent, inline and scroll-seeked, without timed autoplay.
4. Match the first film frame to the poster and inspect the 0%, 25%, 62%, 88% and 100% scroll positions on desktop and mobile.
5. Use short keyframe intervals for seeking. Prefer an appropriately compressed 1080p file under 25 MB, ideally below 8 MB; measure actual decoding/seek latency on phones. An MP4 export using a short GOP and a front-loaded metadata atom is a useful alternative when WebM seeking underperforms.
6. For reduced motion, show the poster and keep the narrative readable. Missing or invalid media must leave the poster in place.

`ArrivalFilm.js` only accepts a configured local `/media/…mp4` or `/media/…webm` path. It maps normalised hero progress to clip time, avoids seeking while an earlier seek is in flight, pauses work offscreen and stops its loop on cleanup.

### Optional later realistic overlays

| Layer | Production direction | Runtime rule |
| --- | --- | --- |
| Consultant | Side-walking loop with natural foot contact; coffee suit, pale shirt, restrained turquoise tie; neutral three-quarter perspective. | Preserve a clean alpha channel; animate position separately; replace the current consultant component. |
| Hand | A right hand approaches a pinned note, grips its upper corner and pulls it toward camera. Separate hand and paper when possible. | Align grip and paper pivot; keep headings/typesetting as HTML. |
| Bucket | PBR brushed-metal bucket with complete handle and lip; spill direction left to right. | Keep bucket and tool labels independent; labels stay HTML for readability. |
| Telephone | Coffee/black rotary phone; receiver, base and cord separable. | The shake and separation are visual metaphors, with no damaging-flash effect or audio requirement. |

The remaining scenes already use separately controlled vector and DOM objects. They do not require videos to function.

## Motion ownership and accessibility

GSAP owns scene-scale scroll transforms. Motion owns chip and footer-letter hover effects. Three.js owns the camera and architecture. The animation libraries do not write transforms to the same object. Native scrolling is preserved; no scroll-jacking or forced wheel interception is installed.

The system reduced-motion setting and a persistent manual toggle disable the long pinned motion sequence. The reduced layout exposes the deliverables directly and avoids the WebGL scene. All navigation, gallery buttons and form fields are real HTML controls, with a skip link, labels and visible focus states.

Mobile workflow becomes a normal-flow, two-column process so descriptions can remain readable. Other sections use dedicated mobile spacing and layouts. Scene timelines rebuild when crossing the mobile breakpoint.

## Contact configuration

The confirmed WhatsApp recipient is +234 911 571 6254. X, Instagram and TikTok use @8dat_work. These defaults are committed and can be overridden through `.env.example`. No physical street address or unverified mailbox is invented: the location reads Nigeria with remote collaboration. A business address and contact email are optional public build-time overrides. The form never sends automatically: it opens a prepared brief in WhatsApp for the visitor to review and send. There is no website-side storage.

## Production acceptance still required

Review the live Three.js scene on a WebGL2-capable device; check first-frame composition, every orbit angle, the lobby approach and door timing. Measure 60 FPS rather than assuming it from the library. This environment could render and inspect the browser fallback but could not initialise Vulkan/WebGL for the live 3D path. No GPU performance result, Blender approval, Meshy generation, paid-provider spend or final cinematic video is claimed.

## Reference interpretation

The attached Lagos Life teardown supplies a blueprint, not confirmed source code. This build takes its warm paper, editorial wordmark, tactile stamps/tickets, layered illustrations, explicit motion control and accessible native carousel techniques. It uses original 8 DAT content and assets. It does not reuse the Lagos Life brand, partner advertisements or imply exact font/easing parity.

Implementation documentation consulted: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), and [Three.js renderer](https://threejs.org/docs/pages/WebGLRenderer.html).
