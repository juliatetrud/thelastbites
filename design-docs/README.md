# The Last Bites

*A haunted appetite. A play on "last rites."*

A side-scrolling, narrative-driven adventure game about a friendly ghost-boy traveling the world on a haunted cruise ship, tasting his way through regional cuisines so he can finally move on.

The game lives on a recipe website. Each chapter completed by the player unlocks a real recipe on the site — the game and the kitchen are part of the same project.

---

## Tagline
> "Mmmm. That was a perfect last bite."

That line is also the game's final line — Pip's last words after his perfect last bite, before he steps through the door. We won't need it for a long while, but it's the destination.

---

## Document Index

This folder is the canonical design package. Read in roughly this order:

| Document | What it covers |
|---|---|
| `README.md` | (this file) Project overview and pointers |
| `01-story-bible.md` | Premise, characters, world, lore, the seven-beat arc |
| `02-game-design.md` | Mechanics, gameplay loops, puzzle types, level structure |
| `03-art-and-aesthetic.md` | Visual direction, references, art commission specs |
| `03b-ui-spec.md` | Interface chrome: dialogue box, HUD, menus, screens, animations |
| `04-chapter-01-cabin-646.md` | Full beat-by-beat for the first chapter |
| `05-tech-architecture.md` | How the prototype is built, how to extend it |
| `06-roadmap-and-open-questions.md` | What's next, what's undecided |

---

## Quick Facts

- **Title:** The Last Bites
- **Chapter 1:** Cabin 646
- **Protagonist:** Pip — full name Filip ("Filipek" to his grandmother). A 10-12 year old ghost.
- **Setting:** A world-cruising ship called **The Mnemosyne** *(Nem-OSS-uh-nee)*, perpetually in motion, and the ports it visits.
- **Genre:** Narrative side-scrolling adventure with light puzzles
- **Vibe references:** Luigi's Mansion (warm-spooky), The 7th Guest (CGI darkness), Mario (side-scrolling movement), Tetris (light puzzle accents), Coraline / Over the Garden Wall (tone)
- **Tech:** Single HTML file, vanilla JS, Canvas. No frameworks. Embeddable on any website.
- **Build philosophy:** Open-ended chapters. Add ports as recipes are added. Never finished, always growing.

---

## Working Method

The game is being designed in conversation between Julia (creator, recipe-site owner) and Claude. The first prototype (Cabin 646) was built in claude.ai. From here forward, development continues in Claude Code, with this document set as the source of truth.

When extending the project: **read the story bible first.** Mechanics serve the story. Pip's emotional arc is the spine.
