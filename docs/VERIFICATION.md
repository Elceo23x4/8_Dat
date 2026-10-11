# Verification — 11 October 2026

This continuation builds on merged PR #1 and the user’s GitHub Pages workflow. PR #2 configures the confirmed contact destinations and completes the gallery, asset routing and video integration.

## Verified locally

- Four unit tests pass: root/project asset paths, international WhatsApp recipient normalization, complete brief encoding, invalid recipient rejection and safe social protocols.
- Next.js production static export passes with `/8_Dat` as the base path. Earlier root export also passed.
- Browser journey checks passed individually at 1440×1000 desktop, 390×844 mobile and 320×740 reduced motion, with the constrained local browser’s GPU fallback.
- The real configured form prepares a brief for `/2349115716254`, preserving business names, newlines, ampersands and plus signs. Tests intercept outgoing navigation; no message is sent.
- Social links use the user’s @8dat_work profiles. No street address or unverified mailbox is invented.
- Temporary verification footage was generated outside the committed deliverables. Forward/reverse seeking and live reduced-motion changes passed. The fixture was removed after testing.
- Screenshots were inspected for hero, workflow, gallery and contact composition. Document width stays within the viewport at each sampled chapter.

## GitHub browser verification

The workflow builds a project-path export, installs Chromium and exercises live WebGL2 using SwiftShader. The first successful continuation run was [38115400107](https://github.com/Elceo23x4/8_Dat/actions/runs/38115400107), with three passing journey tests and inspected 3D screenshots.

Additional camera-angle captures exposed unnecessary continuous drawing on the software GPU. The renderer now draws only when scroll, pointer or viewport changes. It uses instanced static geometry, a shared box mesh and environment illumination. Further checks cover every chapter, five camera checkpoints, video seeking, reduced-motion cleanup and missing-media recovery. Final results are recorded in `verification-results.json` and the PR checks; screenshot evidence is available in the workflow’s `browser-evidence` artifact.

## Evidence boundaries

Software WebGL establishes functional rendering, not a hardware-wide 60 FPS guarantee or parity with the generated photographic poster. The live scene and SVG character are authored illustrations. The cinematic arrival film is the remaining production asset. The other chapters require no video.

The Game Development Studio CLI is unavailable; no game-dev capture receipt, Blender approval, paid mesh generation or human room-gate approval is claimed. The site is a decorative scroll scene, not a navigable game room.
