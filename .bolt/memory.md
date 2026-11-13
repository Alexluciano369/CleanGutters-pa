# Project memory

## Product intent & audience

- Google Ads landing page for **CleanGutters**, a gutter cleaning/services business
- Targets homeowners near **North Wales, Pennsylvania**
- Goals: lead capture, lead routing, and conversion tracking
- Live domain: **cleangutters-pa.com**, deployed via **Netlify**

## Brand personality & voice

- Local, trustworthy, straightforward home-services tone
- Promotional urgency used seasonally (e.g., limited-time offers) — deadlines are time-sensitive and need removal once expired

## Visual design & UX direction

- Built with **vite-react** and **TypeScript** (typecheck is part of the validation loop)
- Page structure includes multiple distinct placement zones:
  - Top announcement bar
  - Offer banner
  - Estimate form
  - Offer portal card
- Seasonal/offer copy may appear in several of these zones simultaneously; edits must cover all instances

## Decisions, constraints & rationale

- When removing expired promotional deadlines, remove only the date wording and keep the underlying offers/prices intact
- Assistant cannot publish or redeploy; publishing must be triggered by the user through Bolt (or Netlify). Build/typecheck must pass before handoff
- After publishing, live-site verification can confirm deployed copy changes

## Open questions & assumptions

- Assumes offers remain valid after their stated deadlines are removed; no replacement date has been requested
- No authoritative `.bolt/prompt` provided; all current context is inferred from this turn