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

Copy `.env.example` to `.env.local`. Set the WhatsApp recipient in international digits including country code, with no leading zero. Configure the real address and HTTPS social profile URLs. These public values are embedded at build time; rebuild after changing them. Until a valid recipient exists, submission gives an email fallback instead of sending to an invented number.

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
