# Cabin 646

Pip's cabin aboard the Mnemosyne. The room he doesn't quite want to enter. He starts the chapter in the hallway and finds the cabin later; the bed contains a lump under the covers that he chooses not to investigate until the mirror forces him to.

## Purpose

Two roles, played in sequence:

1. **First visit (Beat 2)** — Pip enters the cabin he just learned is his. The lump in the bed registers as ambient dread. He can leave without investigating. The room communicates "this is your room, and something here is wrong, but you don't have to look yet."
2. **Return visit (Beat 3)** — After the grandparents' cabin lands its gut-punch, the cabin's mirror and bed glow with elevated breadcrumb auras. Pip approaches the mirror; the truth lands. The bed reveal follows. The cabin becomes the room where Pip realizes what has happened.

Between those two visits the player understands the cabin shifted from "Pip's room" to "the room where Pip's body is." The cabin's draw state changes after the bed-reveal cinematic: the lump is removed (the body lives in the player's head, not on screen), and the mirror's reflective surface permanently shows Pip's ghost-face.

## Spatial layout

Single-screen room (no horizontal scroll required). Internal coordinates use `ROOM_W` per the standard room system.

- **First-visit entry — shared wall from grandparents' cabin (Beat 6 continuation):** Pip phases through the shared wall between cabin 644 and cabin 646. He arrives on the left side of the room, facing right. The shared-wall entry point is distinct from the hallway door — there is no visible door frame; it is simply the wall. The doctor-exit cinematic fires immediately on this first entry (`cabinState.doctorSeen` gates it).
- **Return-visit entry — hallway door at world-x `120`:** After Pip has entered and exited Cabin 646 via the panic glide, the hallway door at world-x 120 is the return entry point. Width 32, height 110, top at y=58. Brass handle, kickplate. Pip phases through this door normally on all subsequent visits. The doctor-exit cinematic does not replay (`cabinState.doctorSeen === true`).
- **Pip exits to the left** via the hallway door on first-visit exit (the panic glide carries him through) and on all return-visit exits.
- **A second door at world-x `450`** — the doctor's exit door, added Sprint 14 for the doctor-exit cinematic. **Not interactable.** Pip cannot use it. After the doctor-exit cinematic plays once on first entry, the door appears closed; it has no further function. A code comment makes this explicit.
- **The cabin has end walls** (Sprint 11): a 36-px left wall cap at world-x `0` and a 48-px right wall cap at world-x `ROOM_W`. The cabin reads as enclosed, not as a hallway segment. Both walls have rivet strips.
- **A small brass plaque on the right wall** reads "CABIN 646."

Camera does not scroll — the cabin fits in the 480-pixel window.

## Parallax layers

The cabin is single-screen, so no foreground/background parallax is needed in the traversal sense. However, the wall-panel system uses **half-speed scrolling** (`panelOffset = (camX * 0.5) % panelSpacing`) inherited from the hallway draw pattern. This is visually inert when the camera doesn't move, but consistent with the corridor system.

## Lighting

- **Wall gradient:** lifted cool blue (`#1e2e54` at top, `#2e3e72` middle, `#1e2e54` bottom). Dim but legibly lit.
- **Ambient edge darkening:** a radial gradient pulls the room's corners into deeper shadow, focusing visual weight at center.
- **Color register:** cool-base palette per `03-art-and-aesthetic.md` — no warm pools except the porthole's moonlight (cool itself, but distinct from the wall blue).

## Props and inspectables

All positions are world-x coordinates in cabin room space.

### Bed (inspectable)

- **Position:** world-x somewhere left-center; runs along the wall. Specific bedGW/bedH constants in `drawCabin`.
- **Pre-reveal state (default):** A long lump under the covers, drawn as two layered curves in `rgba(20,18,48,0.45)` and `rgba(50,46,88,0.55)`. The lump suggests a small body — slightly larger toward where a head would be. No facial features, hair, or limbs drawn. The lump is implied, not displayed.
- **Post-reveal state (after Sprint 11 bed-reveal cinematic, `cabinState.bedRevealed === true`):** The lump is not drawn. The bed appears made.
- **Aura:** Standard warm-amber aura, baseline ~0.15. **Not breadcrumb-elevated by default.** After grandparents' cinematic plays (Sprint 11), the aura becomes breadcrumb-elevated to ~0.45 with slow pulse, signaling "come back to this."
- **Inspect dialogue (pre-reveal, italic):** *I wonder what that lump is. Maybe I don't want to know.*
- **Inspect dialogue (post-reveal, italic):** *Hmm, my old bed.*

### Mirror (inspectable)

- **Position:** world-x `280`, on the wall opposite the bed. Frame width 24, height 32, hung at eye-height (`baseboardY - 32 - 24`).
- **Frame:** dark wood/bronze (`#3a2810`) with brass corner rivets.
- **Pre-cinematic reflective surface:** dark blue (`#182038`) with a faint highlight sheen at the top.
- **Post-cinematic reflective surface (`cabinState.mirrorRevealed === true`):** cool-white tint (`#8ab8d8`) with a small Pip-ghost outline drawn inside the mirror — head and body shape in `rgba(240,248,255,0.9)`.
- **Aura:** Standard until grandparents' cinematic plays; then breadcrumb-elevated alongside the bed.
- **Interaction:** Triggers Cinematic 2 (mirror melt) on approach with `↑`. The cinematic runs once; the post-cinematic state persists.

### Child's drawing on wall (ambient, possibly inspectable)

- **Position:** world-x `160`, on the wall.
- **Identifying detail per Sprint 11:** a small framed child's drawing — a boat at sea, crayoned bright. Pinned to the wall panel.
- **Purpose:** marks this as Pip's specific room. Babcia packed it for him.
- **Inspectability status:** ambient/decorative in current code. If we want it inspectable for treats/notebook purposes, that's a small addition — flag for later decision.

### Porthole (inspectable)

- **Position:** world-x `380`, radius 18.
- **Treatment:** `drawPorthole(phSX, 58, 18, { moonlight: true, divider: true })`. Brass ring, dark glass, pane divider, moonlit night-water beyond.
- **Inspect dialogue:** Roman narration then a Pip line:
  > *Through the porthole, dark water sparkles and dances in the lights of a far shore. Norway, the brochure had said. The first stop.*
  > PIP: *"I never even got to see it."*

### Door — entry/exit (inspectable from hallway, transition on use)

- **Position:** world-x `120` (entry door, the one from the hallway). The far door at `450` is the doctor's; not interactable.
- **Visual:** standard cabin door — wood, brass fittings.
- **Interaction from inside cabin:** `↑` near the entry door returns Pip to the hallway.
- **(The three-choice dialogue at this door — "Try the handle / Press your ear / Wait" — is from Sprint 02 and triggers from the hallway side, not from inside the cabin.)**

## NPCs present

**None during normal gameplay.** The cabin is a solo space.

**Exception: doctor-exit cinematic (one-shot, Sprint 14).** On first entry to the cabin after grandparents' cinematic plays, a doctor sprite appears center-room and walks to the far door (world-x `450`), exits, and the door closes behind him. Pip is at the entry side, watching silently. Player input is locked for ~3s during the cinematic. After it plays once, `cabinState.doctorSeen = true` and the cinematic never replays.

## Ambient life

The cabin is unusually still. No echo-creatures, no drifting dust visible in current code. Two ambient elements:

- **Wall panel rivets:** small dark circles repeating along the wall panels at standard intervals. Static.
- **Floor planks:** the standard `drawFloorPlanks` treatment with cabin-specific line color (`rgba(18,30,58,0.24)`).

If we want to add ambient life later — drifting dust, a slow gravitational drift of cool particles — that's a polish pass, not a Ch1 requirement.

## Treat placement

**One treat lives here:** a cabin treat — early in the chapter, accessible as a replay-reward.

- **Status:** TBD specific treat per Sprint 12 decision. Suggested: Smørbukk (Norwegian caramel toffee), tucked in the bedside drawer.
- **Visibility:** the aura is visible from chapter start, but Pip cannot collect it on first playthrough — `↓ COLLECT` hasn't been taught yet (it's taught in the kitchen with Bamsemums). On replay (or return after kitchen), it becomes collectible.
- **Position:** to be settled in Ch1 content sprint. The bedside drawer is the working assumption; a small drawer-detail would need adding to the bed geometry.

## Porthole scene

The porthole shows the **Ch1 ocean-night scene** registered in `PORTHOLE_SCENES['ch1-ocean-night']`:
- `sky-stars` layer (slow camera drift, indigo gradient + 9 seeded stars)
- `horizon-line` layer (dark band, slow sine pulse)
- `water-waves` layer (dark base, 3 drifting streaks, occasional warm-amber shimmer)

The shimmer is the only warm note in the cabin. Atmospheric, not directive.

## What this room communicates

The first time Pip enters, the cabin is **unfinished, intimate, slightly wrong.** The lump in the bed is the wrongness; Pip can choose not to confront it. The room reads as *his* — the child's drawing, the porthole onto the Norway he was coming to see — but it has a quiet weight he's pretending isn't there.

The second time Pip enters, the cabin is **the room that holds the truth.** The auras have pulled him back. The mirror is unavoidable. The bed waits.

After both cinematics, the cabin is **empty in a new way** — Pip understands, the player understands, and the room becomes a place Pip can revisit but doesn't need to return to. Subsequent visits can be plain; the freight has been carried.

## Visual research references

From `design-docs/visual-research-tracker.md` (Ch1 section):

- **Cabin 646 interior — early 1900s liner stateroom:** Mid-range stateroom (not first-class palatial, not steerage). Bunk or single bed with brass fittings, washstand, oval or rectangular wall mirror, porthole, small writing desk, wood paneling, brass sconce. Cunard/White Star period interiors as reference.
- **Ship porthole — brass-rimmed, ocean-night view:** Round brass-rimmed porthole with heavy hinged glass and iron clasp.
- **Northern lights / aurora over the Mnemosyne:** Green-and-violet aurora ribbons over dark ocean. (Currently the porthole shows only night-water + stars; aurora is reserved for the observation deck. Decide later whether faint aurora belongs in the cabin porthole or is observation-deck-exclusive.)

## Open questions

1. **The washstand and writing desk** mentioned in the visual research aren't in current code. The cabin has bed, mirror, porthole, child's drawing, two doors — but no other furniture. Should the cabin gain a washstand or desk for fidelity to period? Or does the room read as it should now without them? My read: it works as it is. The emptiness is part of the emotional register. Flag for Julia.

2. **Aurora in the porthole.** The visual research notes "occasional aurora reflection" for the cabin porthole, but the current `ch1-ocean-night` scene only renders stars and water. The aurora is a strong observation-deck moment. Decide: does the cabin porthole get a faint aurora reflection, or is aurora reserved for the deck?

3. **Bedside drawer.** Treat placement assumes a drawer. The bed has no drawer in current code. Add a drawer-detail to bed geometry, or place the treat elsewhere in the cabin (under the bed? on the desk if we add a desk?).

4. **Inspectable child's drawing.** Currently ambient. Making it inspectable would surface a small Pip-narration line about Babcia packing it. Worth doing, or leave as decoration? My read: making it inspectable would land emotionally. Even one line — *Babcia made me pin it up. She said I'd want to see Norway in my drawing before I saw it through the window.*
