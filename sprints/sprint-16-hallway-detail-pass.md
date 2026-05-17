# Sprint 16: Hallway Detail Pass

## Goal

Make the hallway feel like a specific place on the *Mnemosyne* — not a generic corridor — by adding cabin number plaques, a runner carpet, wall decor, porthole scenery (Ch1: ocean at night), and refined sconce light pools.

## Definition of done

- Every door in the hallway has a small brass cabin-number plaque next to or above it
- Cabin numbers run sequentially in even integers along the corridor: 642, 644, 646 (Pip's), 648, 650, with the grandparents' room assigned one of these (designer's choice — recommend 644 so the grandparents are next door to Pip)
- The floor gains a red runner carpet running the length of the hallway, slightly worn, narrower than the corridor width so plank edges remain visible
- The hallway has 4–6 pieces of wall decor distributed along its length, readable as specific objects (e.g. a ship photograph, a botanical print, a small mirror, a barometer, a framed map). Each is small, hung at a sensible eye-line height, with simple frames
- Each sconce now casts a visible warm-amber light pool on the floor and lower wall beneath it, subtle but present
- A reusable porthole-scenery system is implemented: each porthole renders a small parallax scene clipped to its circular frame
- Ch1's porthole scene shows open ocean at night — dark water with very subtle horizontal motion, scattered cold-white stars, deep indigo sky, faint horizon line. Two parallax layers minimum (sky behind, water in front)
- The porthole-scenery system is structured so future chapter sprints can register their own scene (Tallinn lights for Ch2, Southampton dock for Ch3, etc.) without modifying core hallway code
- One or two pieces of ambient detail are added (e.g. a luggage trolley pushed against a wall, an abandoned newspaper on a side table, a forgotten teacup on a shelf) — these are decorative, not interactable
- Hallway remains fully playable: Pip can walk the full length, passenger encounter still fires, grandparents' door still works, Cabin 646 still gates correctly
- No regressions in cabin, grandparents' room, fullscreen, music, or notebook

## Context from design docs

### From `01-story-bible.md` (tone reference)

The *Mnemosyne* is "a hotel that floats" with "gentle dread." Edwardian luxury liner — brass fittings, wood paneling, red carpet, warm lights. Not a haunted house. Comfortable. The dread is gentle; the comfort is real.

### From `06-roadmap-and-open-questions.md` (Sprint 06 Decisions Log)

> "Hallway boat-flavor kit (Sprint 06): portholes between doors, riveted ship panels replacing flat parallax lines, brass door fittings (plaque/handle/kickplate), floor planks. Establishes the *Mnemosyne*'s visual identity. Future ship corridors (kitchen approach, dining halls, etc.) reuse the same kit."

Sprint 16 extends this kit with: cabin number plaques, runner carpet, wall decor, porthole scenery, sconce light pools. These details are also reusable across all future ship corridors (kitchen approach, dining halls, dark corridor in Beat 8).

### From `03-art-and-aesthetic.md` (palette)

- Wall base: warm-brown `~#322414` (post-Sprint 06 contrast lift)
- Brass: warm yellow-brown, `~#a89060` highlight, `~#5a4828` shadow
- Sconce amber: `#f0c898` glow, falling off into warm shadow
- Red runner suggestion: deep crimson, `~#5a2020` base, `~#7a3030` highlight, slightly worn (some texture variation)
- Porthole frame: brass (matches sconces and door fittings)
- Porthole scene (Ch1 ocean at night):
  - Sky: deep indigo `#0a0d1f` → `#1a2030`
  - Stars: cold white `#dde4f0`, low alpha, scattered
  - Water: very dark indigo `#040810`, with faint amber ripple highlights `#3a2818` at low alpha
  - Horizon line: a barely-visible darker band

### From the design conversation (locked this sprint)

- Cabin numbers sequential even integers (642, 644, 646, 648, 650). Pip = 646.
- Grandparents' door gets a cabin number too — designer's call which, recommend 644 so they're next door to Pip narratively.
- Porthole scenery system + Ch1 scene only this sprint. Future chapter sprints register their own scenes against the same system.
- Wall decor moderate scope: 4–6 pieces.

### From the parallax system (Sprint 15)

The parallax engine built for the title screen is for the title screen only. **Sprint 16 does NOT use the title-screen parallax engine.** The porthole-scenery system is its own simple thing — a small parallax effect clipped to circular frames, not the full layered title-screen treatment. Keep it lightweight.

## Implementation notes

### Cabin number plaques

A new primitive: `drawCabinNumberPlaque(screenX, screenY, number, opts?)`.

- Small brass rectangle, ~14×8 px
- Engraved or painted black numerals, 3-digit, centered
- Positioned to the right of each door at roughly mid-door height (eye-line for an adult), with a slight offset
- The plate has a subtle bevel — a 1px brass highlight on the top-left edge, 1px darker brass on the bottom-right
- Numbers render in a small bitmap-friendly font, drawn as filled rectangles (same approach as other in-game text)

A `cabinNumbers` array on the hallway room config maps each door's game-world x-position to a number:

```
[
  { doorX: 240,  number: 642 },
  { doorX: 480,  number: 646 },  // Pip's cabin
  { doorX: 720,  number: 644 },  // Grandparents
  { doorX: 960,  number: 648 },
  { doorX: 1200, number: 650 },
]
```

(Adjust to actual door positions in the current code. The grandparents' door is currently around x=1180 per recent sprint history; the cabin door is at x=480. Other doors may need to be added or repositioned for visual variety — designer's call within the existing 1440-wide hallway.)

If adding new doors is out of scope, use the existing door positions and apply numbers to those only.

### Runner carpet

A new primitive: `drawRunnerCarpet(camX, opts?)`.

- A horizontal band on the floor, centered vertically within the visible floor area
- Width: narrower than the full corridor — leave 8–12 px of plank visible on each side
- Color: deep crimson base with subtle texture (a few darker pixels scattered along its length to suggest wear)
- A subtle fringe on the leading edges (player-visible left and right ends if the carpet starts/stops; or seamless if it spans the full hallway)
- Drawn after the floor planks, before any objects/sprites

Recommended: the carpet spans the full hallway length, no breaks. Edge fringes only at the room boundaries (which the player generally doesn't see in motion).

### Wall decor

A new primitive: `drawWallArt(screenX, screenY, kind, opts?)` where `kind` is one of:

- `'ship-photo'` — small rectangle, sepia/grey, very subtle suggestion of a ship silhouette
- `'botanical'` — small rectangle, muted green/cream, suggestion of leaves
- `'mirror'` — small rectangle with reflective dark-blue interior, brass frame
- `'barometer'` — small circle with brass rim, white face, suggestion of a needle
- `'map'` — small rectangle, faded parchment color, suggestion of coastlines

Each piece is small (~14–18 px wide), framed simply in brass or dark wood, hung at adult eye-line (~30 px above floor level in game coordinates).

A `wallDecor` array in the hallway config specifies positions and kinds:

```
[
  { x: 180, kind: 'ship-photo' },
  { x: 350, kind: 'barometer' },
  { x: 600, kind: 'botanical' },
  { x: 880, kind: 'map' },
  { x: 1050, kind: 'mirror' },
]
```

(Exact positions and kinds at Claude Code's discretion — distribute along the hallway so any visible 480-px window of camera position has at least one piece visible.)

The pieces don't need to be hyper-detailed. The reads are: framed thing on wall, that color palette, that approximate shape. A passing glance should register "art" without needing to recognize what specifically.

### Sconce light pools

The existing `drawSconce` function flickers but doesn't cast a visible light pool. Extend with an additional draw call:

- Beneath each sconce, draw a warm-amber radial gradient on the floor and lower wall
- Gradient center: directly below the sconce, on the floor
- Inner color: `rgba(240, 200, 152, 0.25)` (warm but subtle)
- Outer color: `rgba(240, 200, 152, 0)` (transparent)
- Radius: ~35 px
- Alpha pulses gently in sync with the existing sconce flicker (so when the sconce dims, the pool dims with it)

This is one additional `radialGradient` per sconce per frame. Performance: negligible.

### Porthole scenery system

The current `drawPorthole` function draws a static brass-framed circular hole with dark interior. Sprint 16 extends it so each porthole displays a *clipped circular scene* — a small parallax composition rendered inside the frame.

New approach:

1. The porthole's interior (the dark circle) becomes a *clip region*.
2. Within that clip, draw a small scene composed of 2+ parallax layers.
3. Each layer can have its own scroll rate relative to camera or its own ambient motion.
4. The brass frame and rivets draw on top of the scene as before.

A new draw function: `drawPortholeScene(screenX, screenY, radius, scene, camX, now)` where `scene` is a config object describing the layers. The Ch1 scene config:

```
{
  id: 'ch1-ocean-night',
  layers: [
    { kind: 'sky-stars',   parallax: 0.05 },   // far back, tiny scroll with camera
    { kind: 'horizon-line', parallax: 0.15 },  // mid-distance
    { kind: 'water-waves', parallax: 0.30 },   // closer, gentle motion
  ],
}
```

Each layer kind has its own draw routine:

- `sky-stars` — fills the upper portion of the circle with indigo gradient, scatters ~6–10 cold-white pixel-stars at fixed pseudo-random positions
- `horizon-line` — a darker band where sky meets sea, with very faint ambient brightness change (slow sine, ~12s cycle)
- `water-waves` — fills the lower portion with very dark indigo, with 2–3 faint horizontal lighter streaks that drift slowly (suggesting waves), period ~8s

All motion is *very subtle*. The porthole is a small detail, not a feature. The player should glance and think "ocean at night" without the porthole pulling focus from the corridor.

A `porthole-scenes.js`-like registry pattern (but inline in `index.html` since we're single-file): a `PORTHOLE_SCENES` object keyed by chapter or scene id, with the current room's scene id stored in the room config. Future chapters register their own entries in this object.

### Ambient detail (1–2 pieces)

Pick one or two small set-dressing objects to place in the hallway. Suggestions:

- Luggage trolley with a leather suitcase or two stacked on it — positioned against a wall, mid-hallway
- An abandoned newspaper on the floor near a sconce
- A forgotten teacup on a small shelf attached to a wall

These are draw-only — no aura, no interaction, no dialogue. They're decoration. They should read as "someone was here and left."

Place them so they don't visually clash with the existing passenger walk-path or the wall decor.

### Where the new code lives

All new primitives (`drawCabinNumberPlaque`, `drawRunnerCarpet`, `drawWallArt`, `drawPortholeScene`) go into the existing VISUAL PRIMITIVES section of `game/index.html`, established in Sprint 06.

The `drawHallway` compose function gets new calls inserted in this order:

1. (existing) Base fill + wall gradient
2. (existing) Ship panels
3. (existing) Floor planks
4. **NEW**: Runner carpet (between floor planks and baseboard)
5. (existing) Baseboard
6. (existing) Portholes — **now calling `drawPortholeScene` inside each porthole's clip region**
7. (existing) Sconces — **now also drawing the light pool beneath each**
8. (existing) Doors
9. **NEW**: Cabin number plaques next to each door
10. **NEW**: Wall decor pieces
11. **NEW**: Ambient detail (luggage trolley, etc.)
12. (existing) Scene elements (bulletin board, debug Bamsemums, far-right dark zone)

### Performance check

The porthole-scenery system adds ~8–12 draw calls per porthole per frame. There are roughly 4 portholes in the hallway. That's ~50 draw calls added per frame. Canvas handles this without breaking a sweat. The runner carpet, wall decor, and cabin plaques are static and trivial.

Total added per frame: well under 100 draw calls. No performance concern.

## Files to create or modify

**Modify:**
- `game/index.html` — new primitives, extended `drawHallway`, porthole-scene system + Ch1 scene config
- `design-docs/06-roadmap-and-open-questions.md` — Sprint History row, Decisions Log entries (cabin numbering convention; porthole-scenery system + Ch1 scene; wall decor moderate-scope decision)
- `design-docs/03-art-and-aesthetic.md` — append a short subsection noting the hallway detail kit additions (cabin plaques, runner carpet, wall decor, light pools, porthole scenery system), so future ship-corridor rooms can reuse them

**No other files touched.**

## Out of scope

This sprint does NOT:

- Build porthole scenes for any chapter other than Ch1. Ch2's Tallinn-lights, Ch3's Southampton-dock, etc., land when those chapter sprints land.
- Add new interactables to the hallway. The new decor is decoration only — no `↑ LOOK`, no `↓ COLLECT`. Existing interactables (bulletin board, cabin door, grandparents' door, debug Bamsemums, sconces) are unchanged.
- Touch the cabin, grandparents' cabin, or any other room. Hallway only.
- Refactor the existing porthole or sconce primitives' structure. Extend them; don't rewrite them.
- Add new audio, music tracks, or sound effects.
- Address any of the audit/cleanup items (debug Bamsemums placement, Sprint 11 memory mist usage, etc.). Those remain pending for a future cleanup pass.
- Implement Sprint 17's interior conventions doc. The hallway-detail work informs that doc, but the doc itself is the next sprint.
- Add character/NPC density to the hallway. No new passengers, no janitor (that's a Beat 8 / dark-corridor sprint).
- Build mobile-specific layouts. Mobile remains Sprints M1–M2.

## Test checklist

After implementation, walk this in the browser:

### Cabin numbers

- [ ] Every door in the hallway has a brass plaque next to it
- [ ] Numbers are 642, 644, 646, 648, 650 (or the agreed sequence)
- [ ] Pip's cabin is 646
- [ ] Grandparents' room has a number (recommend 644)
- [ ] Numbers are legible at the game's render scale
- [ ] Plaques don't visually overlap door fittings or sconces

### Runner carpet

- [ ] A red carpet runs the length of the hallway floor
- [ ] Plank edges visible on both sides
- [ ] Carpet has subtle wear/texture, doesn't look like a flat block of color
- [ ] Pip walks over it normally — no z-order issues (Pip on top of carpet)

### Wall decor

- [ ] 4–6 decorative pieces distributed along the hallway
- [ ] Each piece reads as a specific kind of object (photo, botanical, mirror, barometer, map)
- [ ] At any camera position during a hallway walkthrough, at least one decor piece is visible
- [ ] Decor doesn't clash with doors, plaques, sconces, portholes
- [ ] Each piece sits at an appropriate eye-line height (not at floor level, not at ceiling)

### Sconce light pools

- [ ] Beneath each sconce, a warm-amber gradient is visible on the floor and lower wall
- [ ] Pool dims and brightens with the sconce flicker
- [ ] Pool is subtle — adds warmth without dominating the scene

### Porthole scenery (Ch1 ocean at night)

- [ ] Each porthole shows a dark ocean scene inside its circular frame
- [ ] Scene is clipped properly — no content leaks outside the brass frame
- [ ] Sky portion is deep indigo, with a few scattered stars
- [ ] Horizon visible as a subtle darker band
- [ ] Water portion shows very subtle horizontal motion (waves drifting)
- [ ] Brass frame and rivets still render correctly on top of the scene
- [ ] Watching a porthole for 20+ seconds: motion feels alive, not mechanically looping

### Ambient detail

- [ ] At least one set-dressing object (luggage trolley, newspaper, teacup, etc.) visible in the hallway
- [ ] Object reads as decoration — doesn't pulse, doesn't have an aura, can't be inspected

### Regressions

- [ ] Game starts as before: pixelate-in, yawn, opening narration
- [ ] Walk the hallway end to end — no missing pieces, no visual glitches
- [ ] Passenger walk-through still fires; the "…they didn't see me." beat still plays
- [ ] Cabin 646 door still gates correctly (pre-grandparents': listen/not now; post-grandparents': go in/listen/not now)
- [ ] Grandparents' door still triggers cinematic
- [ ] Re-entering cabin still triggers mirror/bed cinematics if Sprint 11 hasn't been retired
- [ ] Music toggle (M), fullscreen (F), notebook (TAB), pause (ESC) all work as before
- [ ] No console errors

## Report-back questions

When Claude Code finishes, please report on:

1. **Hallway visual density — too rich, too sparse, or right?** The combination of plaques + runner + 4–6 decor pieces + ambient detail + porthole scenes is a substantial detail layer. If the hallway now feels visually cluttered, flag which element to dial back.

2. **Cabin number readability.** 3-digit numerals at this pixel scale are tight. Report whether the plaques are actually readable or whether they read as "small brass blob with squiggles." If unreadable, suggest a fallback (larger plates? Different font approach?).

3. **Porthole scenery feel.** Does the ocean-at-night scene feel alive and contemplative, or static and mechanical, or busy and distracting? The right answer is the first; the failure modes are the other two.

4. **Light pool intensity.** The warm-amber sconce pools at 0.25 alpha may be too subtle to read or too bright. Adjust if needed and report which direction you tuned.

5. **Anything that fought you in implementation.** Particularly: the porthole clip region (canvas circular clipping has rendering quirks), the parallax inside the clip, or the runner carpet's z-order against floor planks.

When you've finished and walked the checklist, commit with a sprint-referencing message, update the Sprint History row and Decisions Log entries, push, then **stop and wait** for Julia's in-browser review.
