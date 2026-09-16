# WolverinesEye.com

The canonical front door of the Wolverines Eye ecosystem.

## Current implementation

This repository currently contains a minimal Next.js home page and an experimental
server-side policy classifier. It is not yet the complete creative website.
The classifier has unit tests, but end-to-end compatibility with the configured
shox service must be verified before use. See [PHASE_1.md](PHASE_1.md).

## Planned architecture

The routes below are planned; they are not implemented in this checkout.
- `/music` — Music Universe
- `/art` — Visual works
- `/webi3` — Webi3 Framework
- `/lab` — Quantum Lab
- `/archive` — The Archive
- `/philosophy` — The Wolverines Philosophy
- `/about` — The Story
- `/contact` — The Next Door

Built with a restrained editorial system: identity over trends, timelessness over convenience, technology in service of creativity.

## Local verification

```bash
npm ci
npm test
npm run lint
npm run build
```

Keep service credentials in server-side environment variables. Unit tests mock
the classifier and do not establish live-model accuracy or deployment readiness.
