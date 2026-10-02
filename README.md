# portfolio

My personal portfolio, live at **https://lucantas.github.io/portfolio/**.

A single static page with a pixel-art / RPG flavor: hero, an "inventory" of skills, a list of
projects with screenshot carousels, and a contact form. Available in English and Portuguese.

## Stack

- Plain HTML, CSS and vanilla JavaScript — no framework, no build step
- Fonts from Google Fonts (Press Start 2P, Atkinson Hyperlegible)
- Pixel sprites drawn as inline SVG from character maps in `js/app.js`
- Contact form posts to [FormSubmit](https://formsubmit.co)
- Hosted on GitHub Pages from the `master` branch

## Structure

```
index.html      page markup (home, work list, project drawer, contact panel)
css/site.css    all styles
js/app.js       routing, i18n, project data and rendering
imgs/           favicon, background and project screenshots (webp)
```

Routing is hash-based:

| Route                 | Shows                                   |
| --------------------- | --------------------------------------- |
| `#/`                  | home                                    |
| `#/trabalhos`         | all projects                            |
| `#/trabalhos/<slug>`  | project drawer over the current page    |

## Editing content

Everything lives in `js/app.js`:

- `DICT` — all copy, one object per language (`en`, `pt`)
- `JOBS` — projects: slug, year, stack, live/repo links and screenshot paths
  (the first image is the card cover)

The chosen language is remembered in `localStorage` (`pf-lang`).

## Running locally

Any static server works:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Projects featured

- **Longa** — running app that adapts next week's plan to what you actually ran ([app.longa.run](https://app.longa.run))
- **Morada** — condominium management for admins and residents ([live](https://morada-a6g.pages.dev) · [repo](https://github.com/Lucantas/morada-app))
- **Diário SG** — searchable official gazettes of São Gonçalo ([repo](https://github.com/Lucantas/diario-sg))

## License

[MIT](LICENSE)
