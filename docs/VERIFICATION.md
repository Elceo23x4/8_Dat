# Verification — 11 October 2026

## Passed

- `npm test`: 3 meaningful contact tests. Recipient normalisation and full-message encoding preserve newlines and special characters; invalid/unconfigured recipients cannot send; unsafe social protocols are rejected.
- `npm run build`: Next.js 16.4.0 production compilation and static export passed. No build-time failure.
- Browser checks on the production export: 1440×1000 desktop, 390×844 mobile, 320×740 mobile with motion, and 320×740 with system reduced motion.
- All eight sections were traversed in each run. Document scroll width equalled viewport width at every sampled section: no page-level horizontal overflow.
- No browser console errors or uncaught runtime exceptions in the final four runs.
- End-of-gallery counter reached `5 / 5` at every viewport, including native horizontal scrolling.
- All four form runs accepted a valid brief and displayed the intended email fallback for the unconfigured WhatsApp recipient. No invented recipient was opened.
- Motion toggling left no renderer canvas in the tested fallback/reduced state.
- Screenshots of the production export were visually inspected for desktop and mobile hero, process, parcel, skills, contact and supporting layouts. Small-screen deliverable headings and workflow copy were corrected after inspection.

Machine-readable observations: `verification-results.json`. Browser screenshots are internal review material, not included in the repository.

## Corrections verified during the pass

1. Reduced-motion initial rendering caused a hydration mismatch. System-preference dependent text and layout now change after mounting, preserving server/client parity. Final system-reduced run has no hydration error.
2. The gallery initially reported `4 / 5` at the desktop rail end. Explicit boundary handling fixes the end counter to `5 / 5`.
3. The phone cord remained after the base and receiver separated. The final reveal retires the whole decorative telephone.
4. Process descriptions were too small on mobile. The workflow is now a readable two-column normal-flow section with 12px descriptions.
5. Narrow-screen deliverable headings overflowed their cells. Responsive heading sizes now fit 320px layouts.
6. The mobile sticky logo competed with navigation in one row. It now appears centered beneath the links.

## Limits of the evidence

The test browser ran with GPU disabled because this environment could not initialise Vulkan/ANGLE. It exercised and visually rendered the poster fallback, SVG/DOM motion, gallery, contact form and reduced-motion paths. It did not establish live Three.js visual parity, camera fit, WebGL context recovery or hardware FPS. Software-renderer attempts failed before a usable graphics context existed. No 60 FPS, Lighthouse score or cross-browser claim is made.

The native Game Development Studio CLI is unavailable. No game-dev capture bundle, GPU receipt, Blender mesh audit, generated GLB, Meshy credits or human room-gate approval is included.

A valid WhatsApp recipient, business address and social URLs were deliberately left for later configuration at the user's request. The verified form path is the unconfigured fallback; actual WhatsApp delivery remains an acceptance check after configuration. Cinematic video production and real-device WebGL performance review remain pending.
