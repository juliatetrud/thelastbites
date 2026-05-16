# UI Spec

The locked specification for every UI element in *The Last Bites*. This document is the source of truth for layout, dimensions, typography, color tokens, and behavior of the game's interface. Sibling to `03-art-and-aesthetic.md`. Where the aesthetic doc covers *look*, this doc covers *interface*.

All measurements assume the 480×270 internal resolution rendered into a 16:9 viewport. Where dimensions are given in `clamp()` or `%`, they match the pattern established in `three-doors-demo.html`.

---

## Universal Principles

1. **The screen is quiet by default.** UI elements appear when needed and recede when not. The strength indicator and setting label are the only persistent gameplay HUD.
2. **Controls hints are always visible** in a faint bottom strip. They update per context. This is the player's anchor — they should never have to guess which key does what.
3. **Typography is locked.** Special Elite for any chrome (labels, prompts, buttons). Cormorant Garamond italic for narration. Cormorant Garamond regular for character speech.
4. **Color tokens are locked.** See `:root` block at the bottom of this doc. Region tokens swap per chapter (see `03-art-and-aesthetic.md` for chapter palettes); universal tokens never change.
5. **Every panel uses the same chrome.** Dark translucent fill, single thin outer border, single thin inner border 4px inset. The double-border treatment is the game's signature panel style — established in the three-doors demo and reused everywhere.
6. **Animation is gentle.** Fades over 0.4–0.8s. No bounces, no slides, no flourishes. Things appear and disappear like memory.

---

## 1. The Controls Strip

A persistent context-sensitive hint at the bottom of the screen. The player's anchor.

### Position and sizing

- Fixed to bottom of viewport
- Horizontally centered
- Bottom margin: `2%` of viewport height
- Height: auto (single line of text)
- Width: auto, padded `0 18px`

### Appearance

- No background panel — text floats on the game's vignette
- Font: `Special Elite`, `clamp(9px, 1.1vw, 12px)`
- Letter-spacing: `0.25em`
- Text-transform: `uppercase`
- Color: `var(--text-faint)` at opacity `0.7`
- Text-shadow: `0 0 8px rgba(0,0,0,0.95)` for readability over light backgrounds

### Content patterns

Each context defines its own hint string. Keys shown in arrow glyphs (`←` `→` `↑` `↓`) or as words (`SPACE`, `ESC`). Action verb after, spaced with `   ` (three spaces):

*(Sprint 12: `TAB` opens the notebook; `ESC` is for pause. `↓ COLLECT` added. `← BACK` added to dialogue strips. "Journal" renamed "notebook" throughout.)*

- **Room mode, pre-float:** `← →  MOVE     ↑  LOOK     ↓  COLLECT     TAB  NOTEBOOK     ESC  PAUSE`
- **Room mode, pre-float, near collectible:** `← →  MOVE     ↑  LOOK     ↓  COLLECT [TREAT NAME]     TAB  NOTEBOOK     ESC  PAUSE` *(name shown in warm amber)*
- **Room mode, post-float:** `← →  MOVE     ↑  LOOK     ↓  COLLECT     SPACE  FLOAT     TAB  NOTEBOOK     ESC  PAUSE`
- **Atmospheric dialogue (no choices):** `←  BACK     SPACE  CONTINUE`
- **Interactive dialogue (with choices):** `←  BACK     ↑↓  CHOOSE     SPACE  SELECT`
- **Cinematic:** `SPACE  CONTINUE     ESC  SKIP`
- **Wordless traversal:** `← →  MOVE     SPACE  FLOAT` (no LOOK or NOTEBOOK — nothing to inspect)
- **Notebook open:** `← →  TURN PAGE     TAB  CLOSE`
- **Pause menu:** `↑↓  CHOOSE     SPACE  SELECT     ESC  RESUME`
- **Title screen:** `↑↓  CHOOSE     SPACE  SELECT`

### Behavior

- Updates instantly when context changes (no transition)
- Hidden during cinematics for the first 800ms after fade-in (so the cinematic lands before the chrome reappears)
- Hidden entirely during the blink-back sequence

---

## 2. The Dialogue Box

The game's primary interaction surface. Used for atmospheric inspections, interactive inspections, monster puzzles, and chef puzzles. Position and chrome stay constant; contents change.

### Position and sizing

- Anchored to the bottom of the play area
- Bottom offset: `10%` of viewport height
- Horizontally centered, `transform: translateX(-50%)`
- Width: `76%` of viewport width, `max-width: 700px`
- Padding: `16px 24px`
- Border-radius: `0` (sharp corners — this is a ship, not a webapp)
- `backdrop-filter: blur(2px)`

### Chrome

- Background: `var(--panel-bg)` — `rgba(8, 6, 12, 0.92)`
- Outer border: `1px solid var(--panel-border)` — `#3a4068`
- Inner border: `1px solid var(--panel-border-soft)` at `inset: 4px` (achieved via `::before` pseudo-element, matches demo pattern)

### Speaker line

Optional top line identifying who's talking. Omitted for pure narration.

- Font: `Special Elite`, `clamp(10px, 1.3vw, 13px)`
- Letter-spacing: `0.18em`
- Text-transform: `uppercase`
- Color: `var(--text-speaker)` — `#f0c898`
- Margin-bottom: `8px`
- Examples: `PIP`, `HENRIK`, `THE HALDJAS`, `THE PORTHOLE` (objects can speak in inspect text)

### Narration line(s)

The main body. Italic for environmental/third-person narration, regular for dialogue.

- Font: `Cormorant Garamond`, `clamp(13px, 1.95vw, 19px)`
- Color: `var(--text-narration)` — `#fff4d8`
- Line-height: `1.5`
- Italic when speaker is the environment / unattributed narration
- Regular weight when speaker is a named character
- Up to 3 lines of narration before the box requires a `SPACE` press to continue

### Typewriter behavior

- Reveal speed: **28ms per character** (existing prototype value)
- Punctuation pauses: `,` and `;` add 120ms, `.` and `?` and `!` add 280ms
- Pressing `SPACE` mid-reveal completes the current line instantly
- Pressing `SPACE` after reveal completes advances to the next line or to choices

### Choice list

When a node has 2–4 choices, they appear inside the same box, below the narration, after the narration finishes typing.

- Top margin above first choice: `14px`
- Each choice is a single row:
  - Numeral prefix: `1.` `2.` `3.` `4.` — `Special Elite`, `var(--text-prompt)`, fixed-width gutter
  - Arrow glyph: `→` — `var(--text-prompt)`, margin `0 8px`
  - Choice text: `Cormorant Garamond` regular, `clamp(13px, 1.85vw, 18px)`, `var(--text-narration)`
- Vertical gap between choices: `6px`
- Choices fade in together over `0.4s` after narration completes (not staggered)

### Selection state

The currently-selected choice (via keyboard up/down or hover) gets:

- Numeral and arrow shift from `var(--text-prompt)` to `var(--warm-pool-amber)` — `#ffc868`
- Choice text shifts from `var(--text-narration)` to `var(--warm-pool-glow)` — `#ffe088`
- A `2px` left-padding shift (text nudges right)
- Transition: `0.15s ease` on all three

Default selection: first choice highlighted on choice-list appearance.

### Mouse/tap support

Hovering a choice selects it. Clicking selects-and-confirms. Mouse selection overrides keyboard cursor position.

### Number-key shortcuts

`1` through `4` immediately select-and-confirm the corresponding choice. Useful for replays and for desktop players who prefer keys.

### Closing behavior

- Atmospheric box (no choices): `SPACE` closes
- Interactive box: closes after choice resolves
- All closes fade over `0.3s`

---

## 3. The Strength Indicator (Stomach Meter)

*(Sprint 12: This section is now explicitly the **stomach** — Pip's hunger, not abstract HP. Drained only by world hazards. Refilled by treats and chef meals. At zero: blink-back, not death. See `02-game-design.md` §"Strength (the stomach model)" for the complete rules.)*

The chewing-boy stomach meter. Persistent in screen corner during gameplay; hidden during cinematics, the title screen, and the notebook.

### Position and sizing

- Top-left corner of the play area
- Top offset: `4%`
- Left offset: `5%`
- Total element size: ~`44px × 56px` at 1× scale, scaling with viewport

### Frame

- Ornate oval pewter frame — placeholder is a CSS oval with double-border treatment matching dialogue panel chrome
- Frame fill: `var(--panel-bg)` — `rgba(8, 6, 12, 0.92)`
- Outer border: `1px solid var(--panel-border)`
- Inner border: `1px solid var(--panel-border-soft)` at `inset: 3px`
- The frame is *commissioned art* eventually (`03-art-and-aesthetic.md` flags it as signature). The placeholder is a clean double-bordered oval.

### Internal layout

Stacked vertically inside the frame:

1. **Boy's face** (top half): pixel-art chewing animation, 2 frames (mouth open / mouth closed), ~24×20px region. Animation runs continuously at 600ms per frame when strength > 0.
2. **Stomach pouch** (bottom half): semicircle silhouette ~24×16px. Fill level represents current strength.

### Five visual states

Mapped to strength value (0–100):

| State | Range | Face | Stomach |
|---|---|---|---|
| Full | 76–100 | Contented (mouth round, eyes soft) | Round, full, warm amber fill |
| Mid | 51–75 | Neutral (mouth half, eyes neutral) | 2/3 full |
| Low | 26–50 | Concerned (mouth slack, eyes wide) | 1/3 full |
| Critical | 1–25 | Worried (mouth small, eyes wide, slight flicker every 800ms) | Trace amount, dim |
| Dying | 0 | Fading (face desaturated to ghost-white) | Empty |

### Color of stomach contents

- Default: `var(--warm-pool-amber)` — `#ffc868` with `var(--warm-pool-deep)` — `#c87830` shadow at base
- Critical: shifts cooler, toward `#a87830` (drained amber)
- Dying: `var(--text-faint)` — `#8a7858`

### Animations

- **Eating** (strength gained): triggered by `↓` collect of a treat. Two chained animations: (1) the treat sprite tweens from Pip's position to the notebook icon in the HUD corner over ~`0.6s`; (2) a separate amber pulse travels from the notebook icon down into the stomach pouch, and the stomach fill animates up to new level over `400ms ease-out`. *(Sprint 12: was triggered from generic `gainStrength()` calls; now scoped to treat pickup.)*
- **Hit** (strength lost): stomach fill animates down over `400ms ease-in`, accompanied by a single horizontal shake of the whole indicator (`±2px`, 200ms). Triggered only by world hazards — *never by wrong puzzle choices.*
- **Chewing**: idle 2-frame loop, 600ms per frame. Pauses during eating/hit animations.

### Hiding

- Hidden during cinematics — fade out over `0.4s` at cinematic fade-in start, fade in over `0.4s` at cinematic fade-out end
- Hidden during title screen and chapter cards
- Hidden when notebook is open
- Hidden during blink-back sequence

---

## 4. The Lives Display — RETIRED

*(Sprint 12: The three-lives display is retired. The game's failure mode is now blink-back (see Section "Blink-back" below). There is one continuous Pip, who gets gently returned to the last room threshold when his stomach is empty. No lives counter. The faint-imprint "leaving" gesture from the icon is visually recycled into the blink-back fade animation.)*

*The art asset `ui-pip-icon-life.png` in the art asset list is also retired. The HUD in gameplay mode shows only: strength indicator (top-left) + controls strip (bottom). Nothing else.*

---

## 5. The Notebook Screen

*(Sprint 12: Renamed from "Journal Screen". Triggered by `TAB`, not `ESC`. Three sections now: Recipes, Memories, Items. "Journal" → "Notebook" throughout.)*

Triggered by `TAB` during gameplay (when no dialogue is active). Full-screen overlay. The thematic object of the game; should feel like opening a real book.

### Entry behavior

- Triggered by `TAB` or by clicking a notebook icon (TBD whether a persistent icon exists in the HUD)
- Game pauses (strength indicator, controls strip all hide)
- Notebook fades in over `0.6s`
- Background: the game world dims to 20% brightness behind the notebook
- A subtle paper-rustle SFX plays on open (deferred — see `03-art-and-aesthetic.md` sound section)

### Layout

The journal is a two-page spread, like an open book:

- Outer container: `position: absolute; inset: 0`, centered flex
- Page spread: `width: 86%`, `max-width: 900px`, `aspect-ratio: 16/10`
- Background: a parchment texture (placeholder = `#e8dcc0` flat fill with subtle inner shadow simulating page curl at the spine)
- Spine: a `2px` darker vertical line down the center
- Pages: split 50/50 left and right of the spine

### Page content (one chapter per spread)

**Left page — the recipe:**
- Chapter number and title at top: `Special Elite`, `clamp(11px, 1.5vw, 15px)`, dark brown `#3a2410`
- Recipe name below: `Cormorant Garamond` bold, `clamp(16px, 2.4vw, 22px)`, dark brown
- Sketched recipe placeholder: a centered box with `[recipe sketch]` placeholder text; eventually commissioned art per chapter
- Ingredient list: `Cormorant Garamond` regular, bulleted with `·`
- A "View full recipe →" link at the bottom, linking out to the recipe site

**Right page — the memories:**
- Section header: `MEMORIES` in `Special Elite`, dark brown
- Two memory cards, stacked:
  - **Monster moment** (top): small icon + 2–3 line description in italic `Cormorant Garamond`
  - **Meal moment** (bottom): small icon + 2–3 line description
- Each memory card has the universal double-border treatment in dark brown tones
- Empathy stat readout at page bottom: `EMPATHY  •••○○` (filled circles = current empathy on a 5-pip scale)

### Strength stat

Shown on the left page beneath the recipe: `STRENGTH  ████░` (4 of 5 bars, placeholder). Or as a small chewing-boy icon with a fill bar. Either works — designer call at implementation time.

### Page navigation

- `←` / `→` arrow keys: turn to previous / next chapter spread
- Page-turn animation: a `0.5s` horizontal slide + brief opacity dip, simulating a page flipping. Optional flourish; can ship without.
- Currently-active chapter (the one being played) is the default page on open

### Locked future pages

Chapters not yet reached appear as **blank parchment spreads** with only a faint silhouette where the recipe sketch will go and a single line in `Special Elite` `var(--text-faint)`:

> `CHAPTER ${N}  —  ${PORT NAME}  —  NOT YET TASTED`

The chapter title and port name are visible (no spoiler risk — the chapter list is structural, not narrative). What's hidden is the recipe and the memories.

### Current chapter

The chapter Pip is currently in shows as a **partially-filled spread**:
- Recipe page: dimmed sketch placeholder with `RECIPE NOT YET LEARNED` overlay in `Special Elite` `var(--text-faint)`
- Memory page: any memories collected so far in this chapter are visible; the not-yet-collected slot shows `MEMORY NOT YET FOUND` in faint type

### Paired-memory inventory (Chapter 5+)

From Chapter 5 onward, an additional page surfaces at the back of the journal: an **inventory spread** showing all collected paired memories in a grid (monster moments on left, meal moments on right, matched chapter-by-chapter). This is the inventory the player will use at the climax.

- Accessed by paging past the most recent chapter spread
- Grid layout: small thumbnail + chapter number for each memory
- Currently-paired memories show a faint connecting line between left and right

### Third page — Items

*(Sprint 12: New section. Accessed by paging right past Memories.)*

A growing record of every treat Pip has eaten and every useful item he has pocketed. Grid of small pixel-art icons, each ~`16×16px`, Register A (same pixel grid as Pip's gameplay sprite). Below each icon: a one-line annotation in Pip's handwriting (`Cormorant Garamond` italic, small).

- **Treats (eaten):** displayed at full opacity. Annotation reads like a memory — *"Bamsemums — from Henrik, in the kitchen."*
- **Useful items (unused):** displayed at full opacity. Annotation reads like inventory — *"A candle — from Henrik."*
- **Useful items (already used):** displayed at `40%` opacity with a faint strikethrough.

When a dialogue scene allows an item to be used, the relevant item glows softly in the notebook icon corner of the HUD. The item also appears as a dialogue choice in the scene — the notebook display is the *record*; dialogue choices are the *interaction*.

### Exiting

- `TAB` closes notebook, fades back to game over `0.4s`
- `ESC` from inside notebook opens the pause menu
- Game state resumes exactly where it was

### Controls strip during notebook

`← →  TURN PAGE     TAB  CLOSE     ESC  PAUSE`

---

## 6. The Pause / Menu Screen

*(Sprint 12: `TAB` now opens the notebook, not `ESC`. `ESC` is reserved for the pause menu. The earlier refinement below is superseded.)*

~~**Refinement: `ESC` opens the journal directly, not a pause menu.**~~ *(Retired — see Sprint 12 TAB/ESC remap.)*

The current key map: `TAB` opens the notebook; `ESC` opens the pause menu directly. From inside the notebook, `ESC` opens the pause menu (the notebook stacks below the pause overlay).

Alternative: a small pause icon in the notebook's corner that opens the menu. Designer call; defaulting to the layered pattern above.

### Layout

- Full-screen overlay above the journal
- Background: `radial-gradient(ellipse at center, rgba(20, 14, 32, 0.96) 0%, rgba(0,0,0,0.98) 100%)` (matches the demo's summary-view treatment)
- Centered vertically and horizontally

### Title

`PAUSED` in `Special Elite`, `clamp(18px, 2.6vw, 26px)`, letter-spacing `0.18em`, uppercase, `var(--text-narration)`. Margin-bottom `4%`.

### Menu options

Stacked vertically, same chrome as choice list:

1. `Resume`
2. `Restart from last checkpoint`
3. `Restart chapter`
4. `Sound  ►  ON / OFF`  *(toggles in place)*
5. `Return to title`

Each option uses the same double-bordered panel as dialogue choices. Selection state matches dialogue choice selection (amber highlight).

### Controls strip during pause

`↑↓  CHOOSE     SPACE  SELECT     ESC  RESUME`

### Quit?

No "Quit" option — this is a browser game. Closing the tab is the quit gesture. `Return to title` is the equivalent.

---

## 7. The Title Screen

**Sprint 15 implementation — this section reflects shipped state as of 2026-05-16 (gate added 2026-05-16).**

The game's front door. The first thing the player sees.

### Pre-title gate

On cold load, the game shows a pure black screen before the title. A single line — *"Press any key to begin."* — fades in over 1.2s (Cormorant Garamond, `clamp(13px, 1.9vw, 18px)`, `var(--text-narration)`, letter-spacing `0.12em`). Any keypress, mouse click, or touch dismisses the gate.

**Why it exists:** browser autoplay policy blocks audio until a user gesture occurs. The gate guarantees that the title track can start the moment the player engages — no blocked-autoplay fallback needed.

**Transition:** gate fades out over 0.4s (`#gate-overlay.hidden` class → `opacity: 0; pointer-events: none`). Simultaneously, `gameMode` switches to `'title'` and the title canvas starts rendering. The title track begins at volume 0 and ramps to `music.baseVolume` over 0.6s. The gate DOM element is removed from display after the fade completes.

**DOM element:** `#gate-overlay` — `position: absolute; inset: 0; background: #000; z-index: 80`. Contains `#gate-text`.

**Controls strip:** empty during gate mode. Set to the title strip string once the gate is dismissed.

### Visual composition

Six-layer parallax canvas scene, drawn in z-order back-to-front:

1. **Sky** — deep indigo gradient (`#05071a` → `#10182c`) with 110 seeded cold-white twinkling stars
2. **Aurora** — dominant green vertical curtains (`rgba(56,152,104,...)`) drawn row-by-row with sinusoidal edge wobble; brightness fades toward the bottom of each curtain; three curtains of varying width drift slowly on independent sine cycles (~14s, ~11s); a very faint violet radial haze sits behind the green as a subtle accent; overall brightness pulses at ~7.5s
3. **Horizon** — barely-visible indigo glow at the waterline
4. **Mnemosyne** — procedurally drawn early-1900s ocean liner (Lusitania/Mauretania silhouette): dark charcoal hull, three cream-topped raked funnels, two masts, two porthole rows (~35% lit warm amber)
5. **Smoke plumes** — discrete burst particles from each chimney; spawn every 4–8s per chimney, expand and dissipate over 3.5–5s, drift slightly left
6. **Water** — very dark indigo with faint amber ripple reflections below lit portholes

Heavy vignette and grain (persistent `#grain` overlay, same as gameplay).

### Title

- `THE LAST BITES` — DOM overlay, `Special Elite`, `clamp(36px, 6vw, 64px)`, letter-spacing `0.18em`, `var(--text-narration)`
- Soft text-shadow: `0 0 30px rgba(255, 244, 216, 0.4)`
- Centered horizontally, ~26% from top of `#game`

### Subtitle

> *A ghost-boy. A haunted ship. One last meal.*

DOM overlay, `Cormorant Garamond` italic, `clamp(14px, 2vw, 20px)`, `var(--text-speaker)`. Margin-top `2%`.

### Menu (v1 — two items)

Double-border panel (matching dialogue-box chrome) beneath the subtitle. Two items:

1. **Play** — fades title screen to black over ~0.8s, crossfades title track → `main` track, loads hallway
2. **About** — opens About overlay (see below)

Save/continue/chapter-select/credits are deferred until save state exists. Sound toggle is the existing music icon — no separate menu item.

Navigation: `↑`/`↓` keys move selection; `SPACE`/`ENTER` confirms. Mouse hover and click also work.

### About overlay

Full-screen panel (`z-index 75`, above controls strip). Content is locked:

> Pip is a young ghost on a haunted cruise ship. [… full text in sprint-15-title-screen-parallax.md]

Title in `Special Elite`; body in `Cormorant Garamond` at generous line-height. Final line "Press `SPACE` or `ENTER` to begin." renders in `Special Elite`, small, letter-spaced — visually distinct as an instruction.

`ESC` or `←` returns to title menu. `SPACE`/`ENTER` from About also starts the game.

### Music

Dedicated title track at `game/assets/audio/title.mp3`. Starts at volume 0 and ramps to `music.baseVolume` over 0.6s after the gate is dismissed (see Pre-title gate above). Crossfades to `main` track when Play is selected. Mute state shared with gameplay audio.

### Controls strip

- During title menu: `↑↓  CHOOSE   SPACE  SELECT`
- During About panel: `←  BACK   SPACE / ESC  RETURN`

---

## 8. Chapter Card Screens

Shown at the start of each chapter, between cinematics, as a brief setting card.

### Layout

- Full-screen, black background
- Subtle drifting sparkles for visual life
- Centered content, fades in over `1.5s`, holds for ~`3s` after player can act, fades out over `1s`

### Content

Three stacked lines, centered:

1. **Chapter numeral** in roman: `Special Elite`, `clamp(14px, 1.8vw, 18px)`, letter-spacing `0.3em`, `var(--text-faint)`. E.g. `CHAPTER II`
2. **Chapter title**: `Special Elite`, `clamp(28px, 4.2vw, 44px)`, letter-spacing `0.2em`, uppercase, `var(--text-narration)`. E.g. `TALLINN`
3. **Subtitle** (optional, italic flavor): `Cormorant Garamond` italic, `clamp(14px, 2vw, 20px)`, `var(--text-speaker)`. E.g. *the haldjas of the smoke sauna*

### Behavior

- Card holds; `SPACE` advances to the next thing (cinematic, room, etc.)
- If player doesn't press `SPACE`, card auto-advances after `6s`

### Controls strip

`SPACE  CONTINUE`

---

## 9. Blink-Back (replaces Death Sequence and Lives)

*(Sprint 12: The three-lives death sequence and puddle-ghost game-over are retired and replaced by blink-back. No lives lost. No terminal fail state. One continuous Pip, gently returned.)*

### When it triggers

Stomach reaches 0. No other trigger — wrong puzzle choices do not cause blink-back.

### Sequence

1. **Pip fades**: sprite fades over `1.2s` to nearly transparent. A faint cool-blue glow trails softly downward (quiet, not dramatic).
2. **Brief black pause**: `0.4s` on black.
3. **Respawn**: Pip reappears at the *last room threshold he crossed* (the doorway or edge where he entered the current room). Stomach restored to `60/100` (baseline — Pip is recovering, not refreshed).
4. **Narration appears**: a single italic narration line in the dialogue box, centered, no panel, no speaker tag: *"The ship lets him back in."* (Exact wording is content, not spec — can be refined at implementation.)
5. **Narration fades**: over `2s`. Player has control.

### Tone

Quiet. Not punitive. No flash. No shake. No fail audio cue. Pip gets put back. He keeps going.

### Controls strip during blink-back

Hidden entirely. Returns when respawn narration fades.

---

## 10. The Collectible Sparkle Convention

*(Sprint 12: New section. Inserted here to sit alongside the game's visual vocabulary decisions.)*

Inspectable objects and collectibles use two visually distinct sparkle modes so the player learns by sight which verb applies:

- **Inspect sparkle (cool shimmer):** the existing sparkle behavior. A small drifting upward sparkle in `var(--warm-pool-amber)` at standard intensity. Gentle, dartlike, upward motion. Used for all `↑ INSPECT` targets.
- **Collect aura (warm hum):** a softer, broader, *pulsing* aura. Larger radius than the inspect sparkle. Slower pulse (1.2s cycle). Saturated warm amber — no drift, no dart — just present and steady, like something breathing. Used for all `↓ COLLECT` targets (treats and useful items).

The visual vocabulary should read distinctly even at small sizes: a player glancing at a room should be able to tell at a glance which objects to inspect and which to pocket without consciously thinking about it.

The breadcrumb aura (elevated-intensity sparkle used for story-critical objects, e.g. the mirror after the grandparents cinematic) remains distinct from both: it uses the standard inspect shimmer elevated to a higher baseline (~0.45 + pulse), not the collect-aura's warm-hum character. A breadcrumb is an invitation to inspect; the collect aura is an invitation to pocket.

---

## 11. The Game-Over Screen — RETIRED

*(Sprint 12: The puddle-ghost game-over has been retired. With blink-back as the universal failure mode (see Section 9), no terminal game-over state exists for stomach loss. Players can quit from the pause menu if they want to stop playing. The game itself never tells them they have failed.)*

*The three-lives terminal trigger (third death in a chapter) no longer exists. The puddle-ghost image (`cin-puddle-ghost.png`) and its associated art note are also retired. The one-continuous-Pip model replaces it.*

---

## 12. Mobile Tap Layer (Placeholder Decision)

Deferred to a later sprint, but locking the *approach* now so future implementation has direction:

- **No on-screen virtual joystick.** It clutters and breaks the screen's quiet.
- **Tap-to-move:** tapping the left or right half of the screen moves Pip in that direction. Holding moves continuously.
- **Tap-and-hold center:** floats (when float is unlocked).
- **Tap on a sparkle-highlighted object:** inspects (equivalent to `↑`).
- **Tap on a dialogue choice:** selects and confirms it.
- **Tap on the strength indicator area:** opens the notebook (equivalent to `TAB`).
- **Swipe down anywhere:** opens the pause menu.

These map naturally onto the keyboard scheme and don't require dedicated UI chrome. The controls strip is hidden on touch devices (gestures replace the need for it; a brief tutorial overlay on first session covers discovery).

This is a *direction*, not a spec. A full mobile sprint will refine.

---

## Color Tokens Reference

The universal tokens. Regional tokens swap per chapter; see `03-art-and-aesthetic.md`.

```css
/* Universal text */
--text-narration:    #fff4d8;
--text-speaker:      #f0c898;
--text-prompt:       #c8a878;
--text-faint:        #8a7858;

/* Universal panels */
--panel-bg:          rgba(8, 6, 12, 0.92);
--panel-bg-deeper:   rgba(20, 16, 32, 0.92);
--panel-border:      #3a4068;
--panel-border-soft: rgba(140, 160, 200, 0.22);

/* Warm pools (home, food, safety) */
--warm-pool-amber:   #ffc868;
--warm-pool-deep:    #c87830;
--warm-pool-glow:    #ffe088;

/* Spirits */
--spirit-pip:        #f0f8ff;
```

---

## Open Questions Surfaced by This Spec

To add to the Decisions Log / Open Questions in `06-roadmap-and-open-questions.md`:

- **Lives display** as three Pip-icon ghosts adjacent to strength indicator. *Confirm.*
- **Controls strip** as a persistent bottom hint. *New decision — confirm.*
- **`ESC` opens journal directly; second `ESC` opens pause menu** (vs. journal icon + dedicated pause gesture). *Confirm.*
- **Single save slot** for v1. *Confirm or revisit if you want multi-slot later.*
- **Sound toggle in pause menu** even though sound isn't implemented yet (forward-compatible). *Confirm.*
- **Mobile tap layer** as described — tap halves, hold-center to float, swipe-down for pause. *Confirm direction; full spec deferred.*

---

## What This Spec Doesn't Cover

- **Cinematic art frames.** Covered by `03-art-and-aesthetic.md`.
- **Dialogue *content*.** Per-chapter outlines and chapter specs cover what's said.
- **Sound design.** Flagged throughout but covered by `03-art-and-aesthetic.md` and a future audio spec.
- **Settings beyond sound** (contrast, motion-reduce, font size). Accessibility flagged in `06-roadmap-and-open-questions.md`; not yet specced.
