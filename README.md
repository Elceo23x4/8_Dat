# 8 DAT — Business, with a better plot.

A scroll-led creative agency portfolio connecting strategy, branding, technology, operations and customer acquisition. Rebuilt from the previous site as a Next.js App Router project. The older source, compiled output and tracked dependencies are removed in this branch; Git history preserves them.

## Run

Requires Node.js 20.9 or newer. The quality workflow uses Node.js 24.

```sh
npm ci
npm run dev
npm test
npm run build
```

`next build` exports the website into `out/`. Serve that folder with a static host, or import the repository into Vercel. No backend, database, analytics or form storage is required. This PR does not deploy or merge itself.

## Contact configuration

The form opens the complete brief in WhatsApp at **+234 911 571 6254**, including name, business, email, service and message. X, Instagram and TikTok link to **@8dat_work**. No message is sent until the visitor reviews and sends it in WhatsApp.

Optional address/email and public configuration overrides are listed in `.env.example`. No physical street address or email mailbox is assumed.

## GitHub Pages and video

The existing Pages workflow reads its actual base path from `configure-pages`, so images, textures, video and Next.js assets work under `/8_Dat/` and custom-domain roots. It deploys only when main changes.

The only required production asset still to supply is the cinematic arrival film. Add it as `public/media/arrival.mp4` and commit; the build detects it automatically. See [the video brief](docs/MOTION_HANDOFF.md) for camera timing and export requirements. SVG/DOM animation covers the other scenes.

## Browser verification

```sh
npx playwright install chromium
npm run test:browser
```

Run after `npm run build`. The PR workflow also tests a `/8_Dat` export with software WebGL, desktop, mobile, reduced motion and intercepted WhatsApp navigation. It uploads screenshots and failure traces. Software WebGL checks establish functional rendering, not a device-wide 60 FPS guarantee.

## The story

1. Arrival: procedural headquarters, full camera orbit, consultant approach and opening doors.
2. Investigation: paper, pins, connecting thread and a hand pulling the brief into focus.
3. Workflow: request → confirmation → invoice/payment → fulfilment → recording → delivery.
4. Creative: five depth-styled, touch and keyboard accessible concept cards.
5. Deliverables: four parcel panels open to reveal strategy, brand, technology and operations.
6. Skills: a metal bucket tips and spills tool cards.
7. Marketing: research, attention, personal selling, acquisition, delivery and feedback.
8. Contact: the telephone shakes and separates into a contact-note reveal, followed by an oversized interactive wordmark.

Gallery designs are labelled illustrative concepts. They are not invented client testimonials or case studies.

See [motion and production handoff](docs/MOTION_HANDOFF.md), [asset provenance](docs/ASSETS.md), and [verification](docs/VERIFICATION.md).
