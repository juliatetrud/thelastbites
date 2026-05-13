# Sprint 03: The Hallway and the Passenger

## Goal

Build the second room of Chapter 1: the ship's hallway. Pip walks east out of his cabin and finds himself in a long corridor with multiple inspectables and one scripted-walk NPC — a wealthy passenger who walks down the hall and *through Pip's position* without ever seeing him. This is the chapter's first concrete establishment of the "no one can see me" rule that gets broken by Henrik in the kitchen later.

## Definition of done

### The hallway room exists as a separate scrollable scene

- A new room named `hallway` is defined alongside the existing cabin
- The hallway is wider than the cabin — at least 2× canvas width, ideally 3× (`ROOM_W` ≥ 1440) so it feels like a long corridor
- The hallway has its own background art (procedural placeholder, same palette family as the cabin): a long ship corridor with a faint deep-red carpet floor accent, doors lining the upper wall (a few distinct door silhouettes spaced along the corridor), brass-tinted sconce silhouettes between doors, the same parallax-panel feel as the cabin
- The grandparents' cabin door is visually distinct from the other doors (slightly more emphasis: a small warm glow under it, suggesting the lit room behind)
- The far right end of the hallway is visually dark — a deep shadowed area Pip cannot pass into yet (collision wall just before the dark zone — the dark band fades from corridor-blue to near-black). This forward-references Beat 8's dark corridor without implementing it.
- The bottom 30% UI zone convention from Sprint 02.5 is respected — all hallway content stays above `FLOOR_Y`

### Pip transitions from cabin to hallway

- When Pip walks to the right edge of the cabin (within ~12 pixels of `ROOM_W`), the game transitions to the hallway
- Transition is a quick fade-out / fade-to-black / fade-in over ~600ms total. *(Suggested: 200ms cabin fade-out, 200ms black hold, 200ms hallway fade-in. Keep it brisk so it doesn't feel laborious.)*
- During the transition, input is disabled and Pip's movement is paused
- Pip enters the hallway at the left edge, facing right
- Reverse: walking to the left edge of the hallway transitions back to the cabin (Pip enters the cabin at the right edge, facing left)
- The same transition feel applies both directions
- The transition is *not* an inspectable — there's no `↑` prompt. It's automatic on walking into the edge.

### Four inspectables in the hallway

Each is a proximity-sparkle inspectable just like the cabin's. Use the existing dialogue system; no new patterns. Real Cabin 646 narration is in **Implementation Notes**.

1. **The bulletin board** (early in the hallway): atmospheric, 2 lines
2. **The luggage cart** (middle of the hallway): atmospheric, 2 lines — emotionally weighty
3. **The flickering sconce** (between the cart and the grandparents' door): atmospheric, 2 lines — this is a story hook for Pip's future electricity ability; the inspection text *hints at* the sconce being weird, but no ability is unlocked this sprint
4. **The grandparents' cabin door** (later in the hallway): atmospheric placeholder, 2 lines — Pip can hear crying through the door; he reaches for the handle, his hand passes through, but he can't bring himself to enter yet. *No room change, no cinematic this sprint.*

### The passenger NPC walks through Pip

- A scripted-walk passenger NPC enters the hallway from the right (off-screen), walks left toward Pip, walks *through Pip's position* (not around him; through), exits off-screen left
- The passenger is a single procedural-placeholder sprite (similar approach to Pip's three-layer rig but simpler — a dark formal silhouette is enough for now). Spec him as: tall thin silhouette in dark formal coat, top hat or formal hair, ~28px tall (taller than Pip's 24px so he reads as an adult)
- The passenger's body is rendered in a deep cool tone (`#2a2438` or similar — distinct from Pip's pale `#dce8ff` and from the corridor wall). No glow on the passenger — he is *of this world*, not Pip's spectral one
- He walks at a steady human-paced pace (similar to Pip's `PIP_SPEED` of 90 px/s, maybe slightly faster — 100–110 px/s)
- He does *not* react to Pip in any way: no slowing, no looking, no acknowledgment
- His sprite passes *over* Pip's sprite in the render order when their x-positions overlap — visually conveying "through"
- **Trigger condition:** the passenger walks once, the first time Pip enters the hallway. After he exits left, he does not return (until a future sprint adds repeated passing-bys or other NPC traffic). This is a one-shot.
- *(Optional but recommended)*: A second beat after the walkthrough: a brief automatic dialogue fires — *PIP: "…they didn't see me."* — atmospheric, no choices, dismisses with space. This is the narrative payoff; without it the walkthrough is just a sprite animation. Spec the dialogue in **Implementation Notes**.

### The controls strip context

- The hallway uses the same room-mode controls strip as the cabin (pre-float: `← →  MOVE     ↑  LOOK     ESC  JOURNAL`; floatable in dev mode: `← →  MOVE     ↑  LOOK     SPACE  FLOAT     ESC  JOURNAL`)
- During the passenger walkthrough, the strip optionally hides or dims briefly (this is your call — if it feels right to leave it as-is, leave it as-is)

### No regressions

- All Sprint 01, 01.5, 02, 02.5, and tune-up behaviors still work
- Pip can still walk left/right, blink, float (in dev mode), and inspect cabin objects
- The cabin's three inspectables still trigger their dialogues correctly
- The dialogue system handles hallway inspections identically to cabin inspections
- No console errors at any point

## Context from design docs

### From `04-chapter-01-cabin-646.md` Beat 5 — The Hallway

> A long ship corridor. Side-scrolls. Pixel art of a Hurtigruten-style narrow hallway, doors lining one side, brass fixtures, deep red carpet, a flickering wall sconce.
>
> The hallway has multiple inspectables:
> - A bulletin board with the ship's day-by-day itinerary, headed: "WELCOME ABOARD THE MNEMOSYNE" (Norway, Iceland, Scotland, Ireland… planting seeds for future chapters). Inspecting it triggers a small narrator beat that re-reinforces the pronunciation joke for any player who skipped the opening narration. "Mnemosyne (Nem-OSS-uh-nee) Welcomes You Aboard. Today's Port: Bergen."
> - A luggage cart halfway down: "Someone packed in a hurry. There's a stuffed bear sticking out — it looks like one Babcia gave me."
> - A flickering sconce that responds to Pip — first hint of his electricity ability
> - The grandparents' cabin door (the next story trigger)
> - The far end of the hallway — leads to the rest of the ship, but is currently dark

### From `04-chapter-01-cabin-646.md` Beat 5 — The Two Strangers

> THE TWO STRANGERS. Establishing the rule that Henrik will later break. Two scripted moments in the hallway:
>
> 1. The Passenger. A wealthy older traveler in evening clothes walks down the corridor. As they approach, Pip drifts to the side instinctively. The passenger walks through the spot Pip was just in, never blinks, never slows. Pip watches them go.
>    > PIP: …they didn't see me.

*(Note: the design doc has Pip "drifting to the side instinctively" before the walkthrough. For this sprint, skip that — Pip stays where the player puts him. The passenger walks *through Pip's actual position*. More visceral, and avoids a complicated scripted Pip-movement-during-NPC-script. Reconsider in a polish sprint.)*

The Janitor is the second of the two strangers and is part of Beat 8 — not this sprint.

### From `03-art-and-aesthetic.md` — The Passenger NPC

> The Passenger: Wealthy older traveler in evening clothes, walking down the corridor. Walks past Pip without noticing — second confirmation of the rule.

*(The art doc calls him "second confirmation" because the janitor is the first in the design — but in player time, the passenger comes first. This sprint is the player's first confirmation.)*

### From `06-roadmap-and-open-questions.md` — Decisions Log

> Bottom ~30% of the canvas is the UI zone. The dialogue box and controls strip live here. Every room must leave game-world content above `FLOOR_Y`. Established Sprint 02.5.

The hallway must respect this.

## Implementation notes

### Room data structure

Currently the cabin's data (background draw call, `cabinObjects` array) lives at the top level of the game file. To support multiple rooms, refactor into a `rooms` object keyed by id:

```javascript
const rooms = {
  cabin: {
    width: 960,            // existing ROOM_W
    objects: cabinObjects, // existing array
    draw: drawCabin,       // renamed from drawRoom
    pipEntryX: { fromLeft: PIP_HALF_W + 8, fromRight: 960 - PIP_HALF_W - 8 },
  },
  hallway: {
    width: 1440,           // or 1920 if you want it really long
    objects: hallwayObjects,
    draw: drawHallway,
    pipEntryX: { fromLeft: PIP_HALF_W + 8, fromRight: 1440 - PIP_HALF_W - 8 },
  },
};

let currentRoom = 'cabin';
```

The game loop uses `rooms[currentRoom].width` instead of the bare `ROOM_W`, `rooms[currentRoom].objects` instead of `cabinObjects`, and `rooms[currentRoom].draw(camX, now)` instead of the bare `drawRoom`.

Floor `FLOOR_Y` stays a global — every room has the same floor line.

### Room transition trigger

In `update()`, after the existing room-bound clamp:

```javascript
// Edge-trigger room transition
if (!transitioning) {
  if (currentRoom === 'cabin' && pip.x >= rooms.cabin.width - PIP_HALF_W - 1) {
    startTransition('hallway', 'fromLeft');
  } else if (currentRoom === 'hallway' && pip.x <= PIP_HALF_W + 1) {
    startTransition('cabin', 'fromRight');
  }
}
```

`startTransition(toRoom, entryEdge)` sets a `transitioning` flag, schedules a `setTimeout` (or uses time-based state) for the fade-out, then a swap, then fade-in. During `transitioning`, movement input and dialogue input are both suppressed.

### Fade overlay

A full-screen black overlay div (or canvas-drawn rectangle) with CSS opacity. Animate via timed transitions:

```javascript
const transition = {
  active: false,
  phase: null,    // 'out' | 'hold' | 'in'
  startTime: 0,
  toRoom: null,
  entryEdge: null,
};
```

In `update(dt)`, advance `transition.phase` based on elapsed time. Each phase is ~200ms. At the end of the 'out' phase, swap the room. At the end of the 'in' phase, clear the transition state and re-enable input.

A DOM overlay div is simpler than canvas-draw: opacity goes 0 → 1 → 1 → 0 driven by class changes plus CSS transitions.

### Passenger NPC

A simple object on the hallway state:

```javascript
const passenger = {
  active: false,         // currently walking?
  triggered: false,      // has he walked once?
  x: 0,                  // current game-world x
  speed: 105,            // px/s, slightly faster than Pip
  startX: null,          // off-screen right
  endX: null,            // off-screen left
};
```

Trigger condition: the first time `currentRoom === 'hallway'`, the player has been in the hallway for ~1.5 seconds (give them a moment to orient), and `!passenger.triggered`. Start him just off the right edge of the visible canvas, walking left.

In `update(dt)` while `passenger.active`:
- Decrement `passenger.x` by `passenger.speed * dt`
- When `passenger.x < passenger.endX`, set `active = false`, then fire the optional follow-up dialogue beat: `showDialogue({ id: 'passenger-aftermath', lines: [{ speaker: 'PIP', text: '…they didn't see me.', italic: false }], choices: null })`

In render, draw the passenger sprite after drawing Pip, so the passenger appears *in front of* Pip (over him) when their positions overlap. This is the visceral "through Pip" moment.

### Passenger sprite (procedural)

A tall thin dark figure. Suggested approach (~16 wide, ~28 tall):
- A dark coat silhouette extending from shoulders to mid-thigh
- Slim trousers below
- Slightly elongated head with a top-hat suggestion or formal slick-back
- All in a deep cool gray-purple (`#2a2438` or similar) — no glow, no warm light on him
- Walks with a slight up-down bob at ~400ms period (gentle, not goofy)

For a polished version later we'd extend the sprite-rig pattern (`body`, `eyes`, `mouth`) to NPCs — but for this sprint, the passenger doesn't need an animatable face. He's a silhouette. He never looks at Pip.

### Hallway inspectable dialogue text

Use these verbatim, pulled from the Cabin 646 outline.

**Bulletin board** (id `hallway-bulletin`, atmospheric, 2 lines, x ≈ 180):
```
Line 1 (italic, no speaker): "A bulletin board near the stairwell. The ship's itinerary is pinned up like a guest of honor."
Line 2 (italic, no speaker): "Mnemosyne (Nem-OSS-uh-nee) Welcomes You Aboard. Today's Port: Bergen."
```

*(The pronunciation parenthetical is intentional — it re-establishes the joke from the cabin opening for any player who missed it. Don't drop the italics on line 2; it's still narration about what's pinned, not Pip speaking.)*

**Luggage cart** (id `hallway-luggage`, atmospheric, 2 lines, x ≈ 540):
```
Line 1 (italic, no speaker): "Someone packed in a hurry. A bag, half-zipped, leaks a sleeve onto the floor."
Line 2 (italic, no speaker): "A stuffed bear sticking out of the top. It looks like one Babcia gave you, once."
```

*(The second-person "you" here is deliberate — it's narration directed at Pip-as-the-player, the way the Cabin 646 doc uses it. Keep the gentle melancholy. Don't add a Pip-speaker line; the silence sits better.)*

**Flickering sconce** (id `hallway-sconce`, atmospheric, 2 lines, x ≈ 820):
```
Line 1 (italic, no speaker): "A brass wall sconce, flickering. Not quite in time with itself."
Line 2 (italic, no speaker): "When you step close, it falters. When you step back, it steadies. *(It almost feels like it's reacting to you.)*"
```

*(That trailing parenthetical is the narrator's voice — it's the gentle wink Doc 03 specifies for narration. Render the parenthetical in italics with the rest. This is the first whisper that Pip might be doing something — not a discovery, a hint.)*

**Grandparents' door** (id `hallway-grandparents-door`, atmospheric, 2 lines, x ≈ 1180):
```
Line 1 (italic, no speaker): "From inside, the sound of someone crying. Soft. Familiar."
Line 2 (italic, no speaker): "You reach for the handle. Your hand passes through it. You step back. You can't bring yourself to go in. Not yet."
```

*(Last line is the in-game justification for not entering this sprint. Future sprint replaces "Not yet" with the cinematic trigger.)*

**Passenger aftermath dialogue** (id `passenger-aftermath`, atmospheric, 1 line — fires automatically after walkthrough):
```
Speaker: PIP
Text: "…they didn't see me."
italic: false
```

### Hallway background art (procedural)

Same color tokens and gradient pattern as the cabin's `drawCabin`. Differences:
- Slightly warmer red tint to the floor band — suggestion: blend `#1a2848` → `#2a1c30` (whisper of red) → `#080e20` over the 20px floor surface band
- Door silhouettes drawn into the wall: ~24px wide × 64px tall darker rectangles at intervals of ~200 game-world pixels along the corridor. Maybe 5 doors plus the grandparents' door (which gets the warm under-glow).
- Brass sconce silhouettes between doors: small 4×8px vertical fixtures in `#a08664` warm-tinted. *Quiet detail.*
- Far-right ~120 game-world pixels: gradient from corridor color to `#02060e` (very dark), suggesting the unexplorable dark corridor. Pip's room-bounds clamp prevents him from walking into this zone.

### Sparkle Y values for the hallway

Match each object's vertical placement:
- Bulletin board sparkle: y ≈ 95 (chest height for the player to read)
- Luggage cart sparkle: y ≈ 140 (low, on the cart)
- Sconce sparkle: y ≈ 80 (high, on the wall)
- Grandparents' door sparkle: y ≈ 110 (door handle height)

All comfortably above `FLOOR_Y = 180`.

## Files to create or modify

**Modify:**
- `game/index.html` — refactor cabin data into `rooms` object, add hallway data, add room-transition system, add passenger NPC state and render, add fade overlay (CSS + DOM)

**No new files.** Single-file constraint holds.

## Out of scope

This sprint does **not** include:

- Phase-through ability discovery — the grandparents' door is placeholder text per Beat 6, but the *cabin door* in the existing dialogue stays as it is (no new phase-through hook this sprint)
- Cinematic 3 (Grandparents) — handled in a future sprint
- The radio ability hook (Beat 7) — separate sprint
- The dark corridor / fallen sconce / janitor puzzle (Beat 8) — separate sprint
- The flickering sconce *granting* electricity ability — just the visual flicker and the inspection text this sprint
- A second NPC walking by (the janitor) — Beat 8 sprint
- NPC sprite layer system (body/eyes/mouth like Pip) — the passenger uses a simpler one-piece silhouette
- Repeated NPC traffic — the passenger is a one-shot
- Audio cues for room transitions or the passenger's footsteps
- Mobile / touch support for room transitions
- Save state across rooms (which room Pip is in is not persisted; refresh starts in cabin)
- Camera changes between rooms — same follow logic applies

If implementation reveals one of these is unavoidable, **stop and ask**.

## Test checklist

After implementing, list the checklist split between code-confirmed items and items needing browser verification.

Items to walk through in the browser:

- [ ] Game starts in the cabin as before; cabin behaviors unchanged
- [ ] Walk Pip all the way to the right edge of the cabin — screen fades to black over ~200ms
- [ ] Black hold for ~200ms
- [ ] Fade back in to the hallway — Pip is at the left edge, facing right
- [ ] During the fade, Pip can't be moved with left/right
- [ ] The hallway visibly looks different from the cabin: longer, red carpet accent, doors lining the wall, a warmer-glowing door for the grandparents' cabin, a dark zone on the far right
- [ ] Walk back to the left edge — fade transitions back to cabin, Pip enters from the right, facing left
- [ ] Cabin inspectables still work (porthole, bed, door) after returning from the hallway
- [ ] About 1.5 seconds after entering the hallway for the first time, a dark formal-coat figure appears at the right edge of the visible canvas, walking left
- [ ] The passenger walks at a steady pace, slightly faster than Pip's walk speed
- [ ] When the passenger reaches Pip's position, his sprite passes *over* Pip (in front)
- [ ] The passenger does not slow, react, or acknowledge Pip in any way
- [ ] The passenger exits off-screen to the left
- [ ] Immediately after, an automatic dialogue appears: PIP "…they didn't see me." — space dismisses it
- [ ] The passenger only walks once; returning to the hallway later does not retrigger him (refresh the game to reset)
- [ ] Walk near the bulletin board, sparkle appears, ↑ triggers its 2-line inspection
- [ ] Walk near the luggage cart, sparkle appears, ↑ triggers its 2-line inspection
- [ ] Walk near the flickering sconce, sparkle appears, ↑ triggers its 2-line inspection
- [ ] Walk near the grandparents' door — sparkle appears, ↑ triggers the placeholder dialogue ("Not yet")
- [ ] After grandparents' door dialogue closes, Pip can still walk — no permanent state-block
- [ ] Far right end of the hallway: Pip walks toward it but is clamped before entering the dark zone
- [ ] Controls strip is correct in both rooms; switches contexts during dialogues; switches back to room mode after each dialogue closes
- [ ] In dev mode (`?dev=1`), float works in both the cabin and the hallway
- [ ] No console errors at any point
- [ ] No regressions in any prior sprint behavior

## Notes for after completion

When closing the Sprint 03 issue, include:
- Screenshots of: the hallway at first entry, the passenger mid-walkthrough (overlapping Pip), one inspectable triggered (bulletin board or sconce works well), the fade transition mid-frame
- A note for the Decisions Log entry to add to `06-roadmap-and-open-questions.md`: *"Multi-room architecture established Sprint 03. Rooms are keyed by id in a `rooms` object; transitions between named rooms use a fade-out/fade-in pattern with input suppressed during the transition. Pattern extends to all future rooms (Grandparents' Cabin, Kitchen, Dock, Tallinn, etc.)."*
- A second Decisions Log note: *"Scripted-walk NPCs use a one-shot trigger pattern: on entering a room, after a short delay, an NPC walks across and exits. Used for the Passenger; the Janitor (Beat 8) and future scripted-walk NPCs will follow the same pattern. The NPC does not have a sprite-rig (body/eyes/mouth) yet — that's reserved for NPCs who speak or react. Pure rule-establishing walks use one-piece silhouettes."*
- Any open questions about feel: does the fade transition feel right? Is the passenger's pace right? Does the "they didn't see me" beat land?

After this sprint, the world has two rooms, a first NPC, and the central rule of Chapter 1 ("no one can see me") is *shown*, not just told. The hallway is where the game starts to feel haunted.
