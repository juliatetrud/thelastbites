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

- **Room mode, pre-float:** `← →  MOVE     ↑  LOOK     ESC  JOURNAL`
- **Room mode, post-float:** `← →  MOVE     ↑  LOOK     SPACE  FLOAT     ESC  JOURNAL`
- **Atmospheric dialogue (no choices):** `SPACE  CONTINUE`
- **Interactive dialogue (with choices):** `↑↓  CHOOSE     SPACE  SELECT`
- **Cinematic:** `SPACE  CONTINUE`
- **Wordless traversal:** `← →  MOVE     SPACE  FLOAT` (no LOOK or JOURNAL — nothing to inspect)
- **Journal open:** `← →  TURN PAGE     ESC  CLOSE`
- **Pause menu:** `↑↓  CHOOSE     SPACE  SELECT     ESC  RESUME`
- **Title screen:** `↑↓  CHOOSE     SPACE  SELECT`

### Behavior

- Updates instantly when context changes (no transition)
- Hidden during cinematics for the first 800ms after fade-in (so the cinematic lands before the chrome reappears)
- Hidden entirely during the death sequence and game-over screen

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

## 3. The Strength Indicator

The chewing-boy stomach meter. Persistent in screen corner during gameplay; hidden during cinematics, the title screen, and the journal.

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

- **Eating** (strength gained): a small amber blob travels from the mouth down to the stomach over `600ms`, then stomach fill animates up to new level over `400ms ease-out`. Trigger from `gainStrength()` calls.
- **Hit** (strength lost): stomach fill animates down over `400ms ease-in`, accompanied by a single horizontal shake of the whole indicator (`±2px`, 200ms).
- **Chewing**: idle 2-frame loop, 600ms per frame. Pauses during eating/hit animations.

### Hiding

- Hidden during cinematics — fade out over `0.4s` at cinematic fade-in start, fade in over `0.4s` at cinematic fade-out end
- Hidden during title screen and chapter cards
- Hidden when journal is open
- Hidden during death sequence

---

## 4. The Lives Display

**This is a fresh decision — flag for the log if you approve.**

Three lives per chapter. The display is a small row of three Pip-icons next to the strength indicator. Each life is a tiny ghost-silhouette.

### Position and sizing

- Immediately right of the strength indicator
- Vertically centered against the strength indicator
- Each life icon: ~`12×16px`
- Horizontal gap between icons: `4px`

### Visual

- Each icon: a tiny version of Pip's silhouette (placeholder = small white ghost shape with soft glow)
- Active life: full opacity (`0.85`), soft cool glow
- Spent life: opacity `0.15`, no glow — like a faint imprint
- No counter numerals — the three icons *are* the count

### Animation on death

When a life is lost:
- The rightmost active icon flickers (3 quick opacity pulses over `400ms`)
- Then fades to spent state over `0.6s`
- A faint glow trails downward from the icon over `1s` (a small "leaving" gesture)

### Refilling

Lives refill to 3 at the start of each chapter. No mid-chapter refill mechanic.

### Hiding

Same hide rules as the strength indicator (cinematics, title, journal, death sequence).

---

## 5. The Journal Screen

Triggered by `ESC` during gameplay (when no dialogue is active). Full-screen overlay. The thematic object of the game; should feel like opening a real book.

### Entry behavior

- Triggered by `ESC` or by clicking a journal icon (TBD whether a persistent icon exists)
- Game pauses (strength indicator, lives, controls strip all hide)
- Journal fades in over `0.6s`
- Background: the game world dims to 20% brightness behind the journal
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

### Exiting

- `ESC` closes journal, fades back to game over `0.4s`
- Game state resumes exactly where it was

### Controls strip during journal

`← →  TURN PAGE     ESC  CLOSE`

---

## 6. The Pause / Menu Screen

**Refinement: `ESC` opens the journal directly, not a pause menu.** This matches the docs' existing decision (`ESC` = Pause / journal).

For a more traditional pause menu, we use a different gesture. Proposal: **`ESC` opens journal; pressing `ESC` *again* from inside the journal opens the menu**. This keeps the journal as the primary affordance while still surfacing the menu.

Alternative: a small pause icon in the journal's corner that opens the menu. Designer call; defaulting to the double-ESC pattern below.

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

The game's front door. The first thing the player sees.

### Layout

- Full-screen
- Background: a cinematic still of *The Mnemosyne* at night — a hand-painted port-side shot of the ship from the dock, warm cabin lights in some portholes, deep blue night around it. Placeholder: a flat radial gradient using the universal palette (`#1a2030` deepening to `#02040a`).
- Subtle drifting sparkles (matching the demo's sparkle-drift animation)
- Heavy vignette and grain

### Title

- `THE LAST BITES` in `Special Elite`, `clamp(36px, 6vw, 64px)`, letter-spacing `0.18em`, `var(--text-narration)`
- Soft text-shadow: `0 0 30px rgba(255, 244, 216, 0.4)`
- Centered horizontally, ~30% from top

### Subtitle

A tagline beneath the title. Locked text:

> *A ghost-boy. A haunted ship. One last meal.*

`Cormorant Garamond` italic, `clamp(14px, 2vw, 20px)`, `var(--text-speaker)`. Margin-top `2%`.

### Menu options

Vertically stacked, centered horizontally, starting ~55% from top. Same chrome and selection state as dialogue choices.

1. **New voyage** (starts Chapter 1 fresh)
2. **Continue** (resumes most recent save — disabled/dimmed if no save exists)
3. **Chapter select** (lists completed chapters; only shows once at least one chapter is done)
4. **Sound  ►  ON / OFF**
5. **Credits**

### Save slots

Initial release: **one save slot.** Continue resumes from the last checkpoint. No multi-slot management.

(Multi-slot can be added later if needed. Flag this as a near-term decision.)

### Chapter select

When unlocked, shows a vertical list of completed chapters by title (`I. CABIN 646`, `II. TALLINN`, etc.). Locked chapters appear faint and unselectable.

### Credits screen

Triggered from `Credits` menu item. A simple scrolling list of names — Julia, the artist (when commissioned), composer (when commissioned), Anthropic for Claude, anyone else. Fades up over `1s`, scrolls slowly. `ESC` returns to title.

### Controls strip

`↑↓  CHOOSE     SPACE  SELECT`

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

## 9. The Death Sequence

When Pip dies (strength reaches 0, fright trigger, etc.).

### Sequence

1. **Hit beat** (the moment of death): screen punches white at `0.3` opacity for `100ms`, then drops to black
2. **Pip flickers**: 3 rapid opacity pulses over `600ms` (0.8 → 0.1 → 0.8 → 0.1 → 0.8 → 0)
3. **Soft fade-out**: the whole screen fades to black over `1.2s`
4. **Pause on black**: `1.5s` of silence on a fully black screen — a beat for the loss
5. **Respawn**: scene fades back in at the most recent checkpoint over `1.5s`; Pip materializes with the same fade
6. **Life icon updates**: the rightmost active life icon goes through its loss animation during steps 2–3

### Strength on respawn

Refills to full on respawn.

### Controls strip during sequence

Hidden entirely. Returns when respawn fade-in completes.

---

## 10. The Game-Over Screen (Puddle-Ghost)

Triggered on the third death in a chapter.

### Sequence

1. The death sequence plays as normal through step 4 (`1.5s` on black)
2. Then: a single cinematic-style image fades in over `2s` — Pip melted to a small luminous puddle on the floor of wherever he last stood
3. Narration types out below the image, in the dialogue box's narration style but centered and without a panel:

> *Even ghosts can lose their way.*
> *Pip will need to gather himself again.*

4. After narration completes, two centered choices fade in:

   1. `Restart from last checkpoint`
   2. `Restart chapter`

### Visual

- Full-screen black
- Puddle-Pip image: centered, ~`30%` of viewport height
- Soft cool glow around the puddle (the same `var(--spirit-pip)` glow Pip normally has)
- Subtle drifting sparkles around the puddle — he hasn't fully gone

### Controls strip

`↑↓  CHOOSE     SPACE  SELECT`

### After choice

Standard fade to chosen checkpoint or chapter start.

---

## 11. Mobile Tap Layer (Placeholder Decision)

Deferred to a later sprint, but locking the *approach* now so future implementation has direction:

- **No on-screen virtual joystick.** It clutters and breaks the screen's quiet.
- **Tap-to-move:** tapping the left or right half of the screen moves Pip in that direction. Holding moves continuously.
- **Tap-and-hold center:** floats (when float is unlocked).
- **Tap on a sparkle-highlighted object:** inspects (equivalent to `↑`).
- **Tap on a dialogue choice:** selects and confirms it.
- **Tap on the strength indicator area:** opens the journal (equivalent to `ESC`).
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
