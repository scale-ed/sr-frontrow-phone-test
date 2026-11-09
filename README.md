# SR #1 pick — FrontrowMD widget phone test

Static mockup of the Smarter Reviews #1 pick (CholestMD and OsteoMD) with the FrontrowMD widget from Figma Version 3. For testing on phones; not production code.

## Publish with GitHub Pages

1. Put this folder's contents in a GitHub repo (the root of the repo, or a `/docs` folder).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, pick the branch and folder.
3. Open `https://<user>.github.io/<repo>/` on your phone.

## Files

- `index.html` — links to each test page
- `cholestmd.html`, `osteomd.html` — the #1 pick section; `?fit=extend` switches the mobile widget from "cut at card edge" to "extend past card padding"
- `assets/sr.css` — Smarter Reviews theme styles for this section (copied from the live site) plus the mockup additions at the bottom
- `assets/frontrow-host.js` — answers the widget's messages the way 1md.org does (open/close modal, minimize)
- `frontrow/` — copies of FrontrowMD's sticker and modal markup from the LiverMD PDP, recolored to #32457A with the SR copy

Images, fonts and the widget avatars load from their live URLs, so the pages need an internet connection.

## Updating

GitHub Pages lets browsers cache `assets/` files for 10 minutes. After changing `assets/sr.css` or `assets/frontrow-host.js`, bump the `?v=` on their links in `cholestmd.html` and `osteomd.html` so phones load the new copy.
