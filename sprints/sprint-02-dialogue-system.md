# Sprint 02: Dialogue System and First Inspectable Object

## Goal

Build the dialogue box — the game's primary interaction surface — and wire it to a first inspectable object (the porthole in Pip's cabin). After this sprint, Pip can walk up to the porthole, press `↑`, and see real Cabin 646 narration appear in a styled dialogue box. The system supports both atmospheric inspections (narration only, dismissed with space) and interactive inspections (narration plus 2–4 numbered choices, navigable by arrows + space, by number keys, or by clicking).

This is the foundation every later interaction lives on: NPC dialogue, monster puzzles, chef puzzles, journal interactions. Get the chrome and behavior right here; later sprints just feed content into it.

## Definition of done

### Dialogue surface

- A dialogue box renders at the bottom of the play area when invoked, matching `03b-ui-spec.md` §2 specs (position, sizing, double-border chrome, backdrop-blur)
- Optional speaker line renders in `Special Elite`, uppercase, `var(--text-speaker)`
- Narration line renders in `Cormorant Garamond`, italic for environmental narration, regular for character dialogue
- Typewriter reveals text at 28ms per character with punctuation pauses (`,` `;` add 120ms; `.` `?` `!` add 280ms)
- Pressing `SPACE` mid-reveal completes the current line instantly
- Pressing `SPACE` after a line is fully revealed advances to the next line, to the choice list, or closes the box (per node type)
- A node may contain multiple sequential narration lines; player paces through with `SPACE`
- When a node has 2–4 choices, the choice list fades in over 0.4s below the narration after the last line finishes typing
- Choices render as numbered rows (`1. → text`) per §2 spec
- The currently-selected choice highlights amber (numeral, arrow, and text all shift); the highlight transitions over 0.15s
- Default selection on choice-list appearance: choice 1
- `↑` / `↓` keys navigate between choices
- `SPACE` (or Enter) confirms the selected choice
- Number keys `1`–`4` directly select-and-confirm the corresponding choice
- Mouse hover sets the selection; click selects-and-confirms
- Atmospheric boxes (no choices) close on `SPACE` press after the last line is revealed; fade out over 0.3s
- Interactive boxes close after a choice resolves; fade out over 0.3s

### Inspectable object (the porthole)

- A porthole inspectable exists in the cabin room at a defined x-coordinate
- When Pip is within ~18 game-world pixels of the porthole's x-coordinate, a small sparkle appears near it indicating it's inspectable
- Pressing `↑` (or `W`) while within range and not in dialogue triggers the dialogue node for the porthole
- The porthole's dialogue is the Cabin 646 atmospheric porthole node (text in Implementation Notes below)
- The sparkle hides while dialogue is open
- During dialogue, Pip cannot move (movement input is suspended)

### Controls strip

- A persistent context-sensitive controls strip exists at the bottom of the screen per `03b-ui-spec.md` §1
- In room mode (default), it reads: `← →  MOVE     ↑  LOOK     ESC  JOURNAL`
- In atmospheric dialogue (no choices visible), it reads: `SPACE  CONTINUE`
- In interactive dialogue (choices visible), it reads: `↑↓  CHOOSE     SPACE  SELECT`
- The strip updates instantly when context changes
- The strip is faint (`var(--text-faint)` at opacity ~0.7), `Special Elite`, no background panel
- *(`ESC JOURNAL` shows in the room-mode hint per the spec even though the journal isn't built yet — pressing Esc does nothing this sprint; the hint is forward-compatible scaffolding. Note this in code.)*

### No regressions

- All Sprint 01 and Sprint 01.5 behaviors still work (Pip walks, faces correctly, blinks, etc.)
- Film grain, vignette, font loading all intact
- No console errors at any point

## Context from design docs

### From `03b-ui-spec.md` §2 — The Dialogue Box

Full position, chrome, typography, typewriter, choice list, selection state, and closing-behavior specs are in `03b-ui-spec.md` §2. The implementer should open that section and follow it as the source of truth for visual specifics. Highlights:

> Position: anchored to the bottom of the play area. Bottom offset `10%`. Horizontally centered. Width `76%`, max-width `700px`. Padding `16px 24px`. Border-radius `0`. `backdrop-filter: blur(2px)`.
>
> Chrome: background `var(--panel-bg)` `rgba(8, 6, 12, 0.92)`. Outer border `1px solid var(--panel-border)` `#3a4068`. Inner border via `::before` pseudo-element at `inset: 4px`, `1px solid var(--panel-border-soft)`.
>
> Typewriter reveal speed: 28ms per character. Punctuation pauses: `,` and `;` add 120ms; `.` `?` `!` add 280ms.
>
> Choice selection state: numeral and arrow shift from `var(--text-prompt)` to `var(--warm-pool-amber)` (`#ffc868`). Choice text shifts from `var(--text-narration)` to `var(--warm-pool-glow)` (`#ffe088`). A 2px left-padding shift on the highlighted row. Transition `0.15s ease`.

### From `03b-ui-spec.md` §1 — The Controls Strip

> Position: fixed to bottom of viewport, horizontally centered, bottom margin `2%`. Font: `Special Elite`, `clamp(9px, 1.1vw, 12px)`. Letter-spacing `0.25em`. Uppercase. Color `var(--text-faint)` at opacity `0.7`. Text-shadow `0 0 8px rgba(0,0,0,0.95)`.
>
> Behavior: updates instantly when context changes (no transition).

### From `02-game-design.md` — The Interaction Model

> The screen stays quiet until Pip approaches something. Then the dialogue box blooms with narration. Then choices appear.
>
> Atmospheric inspection: single-press up at a small object. The dialogue box appears with one or two lines of flavor text. No choices needed — there's nothing to choose. The box closes on space-press.
>
> Interactive inspection: press up at a meaningful object, NPC, or threshold. Narration plays. Then 2–4 choices appear inside the dialogue box, prefixed with numerals. Player picks with arrows + space, with number keys, or by clicking.

### From `05-tech-architecture.md` — The Inspection System

> Each room has an array of objects: `{ id, x, lines, triggerCinematic, inspected }`. When Pip is within 18 pixels of an object's x position, a sparkle is drawn and inspection is enabled. Pressing up triggers either dialogue or a cinematic based on the object's properties.

*(For Sprint 02 we extend this slightly: the object's dialogue data is no longer just `lines` but a richer node structure that supports speakers, choices, and multiple sequential lines. See Implementation Notes.)*

## Implementation notes

### Dialogue node data structure

A dialogue node is a JS object with this shape:

```javascript
const node = {
  id: 'porthole-inspect',
  lines: [
    { speaker: null,  text: 'Through the porthole, dark water and the lights of a far shore. Norway, the brochure had said. The first stop.', italic: true },
    { speaker: 'PIP', text: 'I never even got to see it.',                                                                                       italic: false },
  ],
  choices: null,  // null = atmospheric; closes on space after last line
  onEnd: null,    // optional callback when dialogue closes
};
```

For interactive nodes, `choices` is an array:

```javascript
choices: [
  { id: 'try-handle',   text: 'Try the handle.',          onSelect: () => { /* ... */ } },
  { id: 'press-ear',    text: 'Press your ear to the door.', onSelect: () => { /* ... */ } },
  { id: 'knock-softly', text: 'Knock softly.',             onSelect: () => { /* ... */ } },
],
```

### Engine functions to add

- `showDialogue(node)` — opens the dialogue box with the given node. Handles typewriter, line-paging, choice display, selection, and closing.
- `closeDialogue()` — fades the box out, restores movement, restores room-mode controls strip.
- `setControlsStrip(contextName)` — switches the strip's text. Contexts this sprint: `'room'`, `'atmospheric-dialogue'`, `'interactive-dialogue'`. Future sprints add more.

### Suggested state object

```javascript
const dialogue = {
  active:        false,
  node:          null,
  lineIndex:     0,      // which line of node.lines we're showing
  charIndex:     0,      // typewriter progress within the current line
  charTimer:     0,      // seconds until next character reveals
  lineComplete:  false,  // true when current line has finished typing
  showingChoices: false,
  selectedChoice: 0,
};
```

### Pause Pip during dialogue

When `dialogue.active === true`, the existing movement input branch in the game loop short-circuits — Pip doesn't move, his facing doesn't change. The eye-blink animation should continue (he's still "alive" on screen, just not controllable).

### The porthole inspectable

Add a room-objects array to the cabin room:

```javascript
const cabinObjects = [
  {
    id: 'porthole',
    x: 380,  // game-world x near the right wall — designer pick a sensible position
    sparkleY: 90,  // pixel-y for the sparkle indicator
    node: { /* the porthole dialogue node */ },
  },
];
```

The proximity check happens each frame: if `|pip.x - object.x| < 18`, the sparkle draws and `↑` is armed. The 18-pixel radius matches the existing prototype value.

### The sparkle

A small drifting warm-amber dot near the inspectable, ~3 pixels, with a soft glow. Drifts upward and back on a ~2s loop. Matches the demo's sparkle pattern. Hidden while dialogue is open.

### DOM vs canvas for the dialogue box

The dialogue box is an HTML overlay (a `<div>` positioned with CSS), not canvas-drawn. This matches `05-tech-architecture.md`'s display pipeline ("HTML overlays for dialogue, hints, controls, title screen"). The double-border treatment uses `::before` per the demo pattern.

### Test content for the porthole

This is the dialogue node for the porthole. Use this verbatim — it's the locked Cabin 646 text from `04-chapter-01-cabin-646.md` Beat 1.

```
Line 1 (italic narration, no speaker):
"Through the porthole, dark water and the lights of a far shore. Norway, the brochure had said. The first stop."

Line 2 (Pip speaking, regular weight):
Speaker: PIP
"I never even got to see it."
```

Two lines. Atmospheric. No choices. Closes on `SPACE`.

### Test content for a second inspectable — the bed (optional but recommended)

Adding a second atmospheric inspectable lets us test that the system handles multiple objects in a room and that inspection state resets between objects. Use this Cabin 646 text:

```
Line 1 (italic narration, no speaker):
"The bed is rumpled. Someone slept here recently. There's a small shape under the covers but you don't want to look closer."
```

One line. Atmospheric. No choices. Closes on `SPACE`.

*(If adding the bed makes the sprint feel too big, drop it. The porthole alone proves the system. Add the bed in Sprint 02.5 or as part of Sprint 03.)*

### Test content for an interactive 3-choice node (optional but recommended)

To test the choice-list behavior with real content, add a third inspectable: the cabin door. Use the locked door text from `04-chapter-01-cabin-646.md` Beat 4 / the dialogue box example in `02-game-design.md`:

```
Line 1 (italic narration, no speaker):
"The door to the hallway. From the other side, you can hear someone crying."

Choices:
1. Try the handle.
2. Press your ear to the door.
3. Wait.

Choice 1 onSelect:
  → Atmospheric follow-up line: "Pip reaches for the handle. His hand passes through it."
  → Closes after the follow-up line.

Choice 2 onSelect:
  → Atmospheric follow-up line: "Through the door, a woman crying. Pip knows the sound of that voice."
  → Closes after the follow-up line.

Choice 3 onSelect:
  → Atmospheric follow-up line: "Pip waits. The crying continues."
  → Closes after the follow-up line.
```

*(The original 4th choice "Knock softly" from the spec is omitted here to keep choices at 3 for variety in testing — the system supports up to 4 but should also behave correctly with 2 or 3.)*

The follow-up lines for each choice should reuse the same dialogue infrastructure — the choice's `onSelect` calls `showDialogue()` with a new atmospheric node. This pattern (choice → resolution dialogue) will repeat throughout the game.

*(If three inspectables is too much for one sprint, prioritize porthole > door > bed. The door is the second most valuable for testing because it exercises the choice system.)*

### What this sprint deliberately doesn't fully solve

- **Ability-gating of choices** (`02-game-design.md`) is locked behavior, but Pip hasn't earned any abilities yet, so no gating is exercised. The dialogue system should *support* gated choices structurally — but no test case demonstrates them this sprint. Add a comment in the code noting where the gate-check would go.
- **Cinematic trigger from a node** (`05-tech-architecture.md`'s `triggerCinematic` property) — Sprint 02 doesn't need cinematics. Leave the slot in the data structure (so Sprint 07 doesn't have to refactor) but don't implement.

## Files to create or modify

**Modify:**
- `game/index.html` — add dialogue box DOM/CSS, dialogue engine functions, inspection proximity check + sparkle, controls strip DOM/CSS + `setControlsStrip()`, the cabin's `objects` array with porthole (and door/bed if scope allows)

**No new files.** Single-file constraint holds.

## Out of scope

This sprint does **not** include:

- The strength indicator (Sprint 03)
- The lives display (Sprint 03)
- The journal (Sprint 04; `ESC` does nothing this sprint despite the strip's hint)
- The mirror cinematic, the door-phase ability discovery, or any other beat after the porthole/door inspection
- Cinematic mode entirely
- NPC sprites or NPC dialogue
- Float ability (still gated to Beat 8)
- Save/load (Sprint 04)
- Audio (no sound effects on typewriter, on selection, on close)
- Mobile tap support beyond the spec'd mouse-hover-selects behavior

If implementation reveals one of these is unavoidable, **stop and ask**.

## Test checklist

After implementing, list the checklist split between what you confirmed yourself (e.g., by reading the code, lint-style checks, visual screenshot) and what Julia needs to verify in the browser. Julia is the browser; hand her the test items that need a human eye.

Items to walk through in the browser:

- [ ] The controls strip is visible at the bottom of the screen and reads `← →  MOVE     ↑  LOOK     ESC  JOURNAL` on game load
- [ ] Walking Pip left/right does not change the strip
- [ ] When Pip walks near the porthole, a small drifting amber sparkle appears near it
- [ ] When Pip walks away from the porthole, the sparkle disappears
- [ ] Pressing `↑` while within porthole range opens the dialogue box
- [ ] The dialogue box appears at the bottom of the screen with double-bordered chrome over a semi-transparent dark panel
- [ ] The first line (italic narration about the porthole) types out character by character
- [ ] Punctuation in the line causes visible pauses (commas and periods)
- [ ] Pressing `SPACE` mid-reveal completes the line instantly
- [ ] After the line completes, pressing `SPACE` advances to line 2
- [ ] Line 2 shows `PIP` as the speaker (uppercase, typewriter font, amber color) and the text in regular weight (not italic)
- [ ] After line 2 completes, pressing `SPACE` closes the dialogue (fade out ~0.3s)
- [ ] While the dialogue is open, Pip cannot move
- [ ] While the dialogue is open, the controls strip reads `SPACE  CONTINUE`
- [ ] After dialogue closes, the controls strip returns to `← →  MOVE     ↑  LOOK     ESC  JOURNAL`
- [ ] Pip's eyes still blink while dialogue is open
- [ ] *(If the door inspectable is included)* Walking near the door triggers a sparkle and inspecting shows the door narration followed by a 3-choice list
- [ ] *(If the door inspectable is included)* Choice 1 is highlighted by default in amber
- [ ] *(If the door inspectable is included)* `↑`/`↓` arrow keys move the highlight between choices
- [ ] *(If the door inspectable is included)* Pressing `SPACE` confirms the highlighted choice and triggers its follow-up line
- [ ] *(If the door inspectable is included)* Pressing `1`, `2`, or `3` directly selects and confirms that choice
- [ ] *(If the door inspectable is included)* Hovering a choice with the mouse changes the highlight; clicking selects-and-confirms
- [ ] *(If the door inspectable is included)* During the choice list, the controls strip reads `↑↓  CHOOSE     SPACE  SELECT`
- [ ] *(If the bed inspectable is included)* The bed shows its own single-line narration
- [ ] All Sprint 01 / 01.5 behaviors still work: Pip walks, facing flips, eyes blink, idle bob, room bounds, camera follows
- [ ] No console errors on load, during inspection, during dialogue, during close

## Notes for after completion

When closing the Sprint 02 issue, include:
- Screenshots of the dialogue box at three states: typing in progress, line complete waiting for space, choice list visible with the first choice highlighted
- Any rough edges or follow-up issues to consider before Sprint 03 (e.g., "the typewriter feels slightly fast — should we make the 28ms tunable?")
- Confirmation that the dialogue engine is structured to accept future content (NPCs, monsters, chefs) without re-architecting

After this sprint, the room has a dialogue surface, two-to-three inspectable objects, and a working controls strip. The world is starting to *talk*.
