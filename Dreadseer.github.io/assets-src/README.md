# assets-src — original image masters

These are the full-resolution originals. They are **kept in the repository but
deliberately not in `public/`**, because everything under `public/` is copied
verbatim into every GitHub Pages deploy.

The site loads the optimized `.webp` versions in `public/assets/` instead —
together they are roughly 0.5 MB against ~20 MB for these masters.

Keep these files. Re-export from here whenever an image needs to change, then
regenerate the `.webp` in `public/assets/` (any encoder is fine; these were
produced with `sharp` at quality 72–80, max width 2000px for backgrounds).

| Master | Published as |
|---|---|
| `bg-home.png`, `bg-portfolio.png`, `bg-links.png`, `bg-contact.png` | `public/assets/bg-*.webp` |
| `chris-portrait.jpg` | `public/assets/chris-portrait.webp` |
| `project-*.png` | `public/assets/project-*.webp` |
| `Christopher Clarke Logo Color.png` | `public/assets/logo-emblem*.png/webp` + the favicon set |
| `Christopher Clarke Logo Full.png` | not currently published — stacked lockup, unreadable at header size |
| `portfolio-education.png` | not currently published |
