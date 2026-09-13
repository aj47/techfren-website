# Timeline content

Edit `src/timeline.js` to add or update milestones. The page is at `/timeline`, linked from the homepage. Each group contains an approximate period and project entries. A project supports a YouTube `videoId`, optional `seconds`, `linkLabel`, and a screenshot `crop` (x, y, width, height). A plain `url` is also supported. Without a destination, the UI offers the screenshot viewer instead.

## Homepage entry

The original homepage layout, social links, copy, and project archive remain in place. Its existing Quick Links section now includes a Build Timeline card that opens `/timeline`. The standalone route is registered in `src/App.jsx`; `public/_redirects` provides the static-host SPA fallback for direct visits. Timeline milestones are in `src/timeline.js`, with existing repository links enriched by `src/portfolio.js`.

Timeline entries and approximate periods remain separate from the homepage project archive; exact build days are not invented.

## Screenshot provenance

`public/timeline-assets/build-timeline-reference.png` is AJ's supplied September 8 sketch. The SVG viewBoxes isolate its eight genuine screenshots; no product UI was recreated. These are low-resolution source crops, including in the enlargement dialog. For sharper previews, replace them with original screenshots and update the Screenshot component to accept individual image paths.

## Demo links verified September 8, 2026

Latest stream: [What I’m Building + What’s Happening in Tech](https://www.youtube.com/watch?v=e6eIZd1zHOQ), channel Tech Friend AJ (`@techfren`), September 8, 2026. It was live during implementation. The first 3,220.004 seconds were captured from YouTube's live-start audio, checked with ffprobe, and transcribed with the local Parakeet CoreML backend. This is partial coverage of an active stream, sufficient for the linked demo starts; it is not a completed-stream ingest.

| Milestone | Destination | Evidence |
| --- | --- | --- |
| AgentBattler | [34:11](https://www.youtube.com/watch?v=e6eIZd1zHOQ&t=2051s) | “We got Agent Battler” at 2051.92; leaderboard at 2062.64. |
| Ultra Live Transcribe | [Short](https://www.youtube.com/watch?v=_7YmZIomwW0) | “I Built a Live Co-Host Into My Transcribe App”; public description explicitly identifies Ultra Live Transcribe, live mic demo, and co-host mode. |
| TechFren Discord bots | [Short](https://www.youtube.com/watch?v=LYPTe4tpV3Q) | “How One Bot Bridges Discord and My Web App”; description covers the relay bot and existing X-link behavior. |
| Hook Ledger | [25:48](https://www.youtube.com/watch?v=e6eIZd1zHOQ&t=1548s) | “This is my custom web app hook ledger” at 1548.16; full editing and scheduling walkthrough follows. |
| OpenCourt | [37:11](https://www.youtube.com/watch?v=e6eIZd1zHOQ&t=2231s) | Tennis app introduction at 2231.12, followed by its debug view and analysis; named OpenCourt at 2408.48. |
| Tech Friend Community | [1:20](https://www.youtube.com/watch?v=e6eIZd1zHOQ&t=80s) | Result shown at 80.32; domain at 86.64; Discord messages and leaderboard follow. |
| 200k+ views on X | [Short](https://www.youtube.com/watch?v=yYGrFcTdjhk) | “An $80 Reset on My $200 ChatGPT Plan: Worth It?” Its description links the [original X post](https://x.com/techfrenAJ/status/2096781683060343100). The 200k+ milestone is supplied in AJ's sketch; AJ reports 240k in the stream at 3159.44. It is not a live analytics counter. |
| 3D Pocoj avatar | [13:10](https://www.youtube.com/watch?v=e6eIZd1zHOQ&t=790s) | Avatar demonstration and character explanation at 790.64–808.40. |

Dates describe approximate build milestones, not release or video-publication dates. AJ places AgentBattler on August 8 at stream time 2854.88, Ultra Live Transcribe around August 12 at 2829.36, and OpenCourt around September 1 at 2413.60. The remaining periods follow the supplied sketch.

## Verification

- `npm run build` passes; Vite emits its existing large-bundle advisory.
- Focused ESLint passes for the route, timeline page/data, and sitemap generator. Repository-wide lint still reports 17 errors and 1 warning in existing/unrelated files.
- Local dev and production preview both serve `/timeline` directly and return the renamed screenshot asset.
- Browser checked the homepage at 375px and 1440px, and the timeline at 375px, 900px, and 1440px. The Build Timeline card appeared in Quick Links and opened the route; direct reload at `/timeline` also worked. No browser console errors were present.
- Canonical/description fallback tags in `index.html` are marked as Helmet-managed to avoid duplicate homepage metadata on `/timeline`; navigation back restores homepage metadata.
- Production is served by the Git-connected Cloudflare Pages project `techfren-website` on `main`.
