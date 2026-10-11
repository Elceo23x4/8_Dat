# Arrival film drop-in

Put the finished film here as `arrival.mp4` (preferred) or `arrival.webm` and commit it. The next build detects it automatically; no application edits or credentials are needed. MP4 wins if both exist. You can override the filename with `NEXT_PUBLIC_ARRIVAL_VIDEO=/media/your-film.mp4`.

Produce an architecture-only film: the vector consultant remains a separate animated layer. Follow `docs/MOTION_HANDOFF.md` for the 360° orbit, entrance timing and scroll mapping. No baked-in logo, captions, cursor effects or audio. Keep the file below 25 MB; use H.264, yuv420p, fast-start and frequent keyframes for seeking. GitHub rejects files above 100 MB.

The image poster and live 3D scene remain available before the film is produced. Missing or undecodable films recover to the live scene. Reduced-motion visitors see the poster.
