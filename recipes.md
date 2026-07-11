# Recipe URLs — the one place to edit

The game links each completed chapter's recipe out to Julia's recipe site. **These URLs are the
only thing that needs to change to point at real pages.** Two mirrors kept in sync:

1. **This file** — the human-readable source of truth (fill in the real URLs below).
2. **`game/index.html` → the `RECIPE_URLS` map** (search for `@@RECIPE-URLS@@`) — the values the
   game actually uses. Keep the two identical.

## How to point at the real site

- Set **`RECIPE_SITE_HOME`** (top of the `RECIPE_URLS` block in `game/index.html`, and the
  homepage row below) to the recipe site's homepage.
- Replace each per-recipe `…#PLACEHOLDER` value with that recipe's real page URL. Until you do,
  every recipe link falls back to the homepage — the unlock still works, it just lands on the
  home page instead of the exact recipe (this is the R16 default; **must be filled before the
  R18 go-live gate**).
- URLs open in a **new browser tab**, so the game and its save are never navigated away.

> ⚠️ No real recipe-site URL was on record when this file was created, so every value below is a
> placeholder. **Nothing here is a real link yet.** — R16, 2026-07-11

| # | Chapter · Port | Recipe (notebook id) | URL — fill in |
|---|----------------|----------------------|---------------|
| — | Homepage (`RECIPE_SITE_HOME`) | — | `https://REPLACE-WITH-RECIPE-SITE-HOME/` |
| 1 | Ch1 · Bergen | Norwegian lefse & gravlaks (`recipe-lefse-gravlaks`) | `RECIPE_SITE_HOME + "#lefse-gravlaks"` |
| 2 | Ch2 · Käsmu | Kodused kotletid (`recipe-kotletid`) | `RECIPE_SITE_HOME + "#kotletid"` |
| 3 | Ch3 · Southampton | Sandy's red curry (`recipe-red-curry`) | `RECIPE_SITE_HOME + "#red-curry"` |
| 4 | Ch4 · Istanbul | Muhittin's grandmother's muhammara (`recipe-muhammara`) | `RECIPE_SITE_HOME + "#muhammara"` |
| 5 | Ch5 · Saldanha Bay | Potjiekos (`recipe-potjie`) | `RECIPE_SITE_HOME + "#potjiekos"` |
| 6 | Ch6 · Kolonodale | Lemper ayam (`recipe-lemper`) | `RECIPE_SITE_HOME + "#lemper"` |
| 7 | Ch7 · Alter do Chão | Bahian moqueca (`recipe-moqueca`) | `RECIPE_SITE_HOME + "#moqueca"` |
| 8 | Ch8 · Greenpoint | Babcia's pierogi (`recipe-pierogi`) | `RECIPE_SITE_HOME + "#pierogi"` |

The per-recipe values above use hash anchors on the homepage as the placeholder scheme; swap each
for a real page URL when the pages exist.
