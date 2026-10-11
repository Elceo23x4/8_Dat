# Asset inventory and provenance

All brand artwork, SVG scene layers, card designs and architectural geometry were authored for this 8 DAT build. No prior repository assets or Lagos Life advertising images are reused.

| Asset | Location | Construction and editable layers |
| --- | --- | --- |
| Architectural poster | `public/art/headquarters-poster.webp` | Generated with built-in image generation; resized and encoded to WebP. Exact prompt and SHA-256 are in `asset-provenance.json`. Used as the film reference and fallback; it is not a completed film. |
| Social sharing image | `public/art/social.jpg` | A landscape crop of the generated headquarters visual. 1200×630 JPEG for sharing metadata. |
| Alternate brand sharing vector | `public/art/social.svg` | Original 1200×630 8 DAT wordmark composition with agency service labels. |
| Favicon | `public/art/favicon.svg` | Original coffee, paper and turquoise mark. |
| Paper texture | `public/art/paper-grain.svg` | Deterministic fractal-noise SVG filter, applied at low opacity. |
| Headquarters and city | `components/Headquarters.js` | Procedural Three.js meshes; facade bands, glass surfaces, structural frames, street, lighting, sliding door leaves and backed lobby. Label is a runtime canvas texture. |
| Consultant | `components/Illustrations.js` | Original layered SVG, with independent legs, body, suit and briefcase. |
| Hand | `components/Illustrations.js` | Original SVG hand; separately animated from the requirements paper. |
| Delivery truck | `components/Illustrations.js` | Original coffee/paper/turquoise vehicle with wheels and body. |
| Bucket | `components/Illustrations.js` | Original SVG with metallic gradient, lip, handle and brand label. Skills remain separate HTML objects. |
| Telephone | `components/Illustrations.js` | Original SVG with receiver, base, dial and cord; separate animated groups. |
| Investigation | `components/Story.js` + `app/globals.css` | Semantic HTML paper, pins and SVG connecting threads. Text remains editable and accessible. |
| Creative examples | `WorkArt` in `components/Story.js` | Five original layered DOM compositions: identity, billboard, browser, campaign and playbook. Each is labelled as an illustrative concept. |
| Strategy parcel | `components/Story.js` + `app/globals.css` | Four separate flaps, two ropes, retro stamp and four underlying deliverable cards. |
| Marketing network | `components/Story.js` | HTML nodes with original SVG connector path. |
| Optional future film | `components/ArrivalFilm.js` | Adapter only. No video bytes are shipped. Configure a local `/media/` MP4 or WebM after production. |

Generated raster assets are flattened images. Layer independence for scroll/mouse control comes from separate SVG and DOM objects, rather than pretending the poster contains editable 3D geometry.

The selected Build 3D Game Rooms plugin's design doctrine informed arrival depth, deliberate camera framing, architectural function and fallback planning. This is a decorative website scene, not a Blender-exported playable room. Its paid Meshy workflow was not run, and its human Function/Form/Runtime gates are not represented as passed. The Game Development Studio CLI was absent; no canonical game-dev asset package, GPU receipt or hardware frame-time evidence is claimed.
