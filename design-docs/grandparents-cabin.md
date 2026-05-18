---

# The Grandparents' Cabin (Cabin 644)

The room that lands the chapter's grief. Babcia weeping on the bed. Dziadek at the window. The unpacked suitcase on the floor. A photograph of Pip on his sixth birthday. Pip walks among them, invisible, and the cabin gives him nothing — except, for a held second, Dziadek almost-turns.

## Purpose

A single room playing one role, twice:

1. **First entry (Beat 6).** A scripted cinematic. Pip phases through the door, the wide cinematic frame lands the scene (Babcia / suitcase / Dziadek / lamp / nightstand-photo), the dialogue plays through the held silence, the cinematic fades.
2. **Room-mode aftermath (Beat 6, continued).** The cinematic fades to room mode. Pip stands at the left edge. He can walk among them. He can inspect four objects (Babcia, Dziadek, the photograph, the suitcase). Each inspection is a small repetition of the unseen-ness. Babcia and Dziadek do not respond. Pip can leave whenever he wants.

After the first entry, subsequent visits skip the cinematic. The post-cinematic door dialogue ("Babcia and Dziadek are still inside…" with "Go in / Not now") gates returns. Returning to the room finds it the same — they have not moved.

The room is also the **phase-through ability discovery** moment (narratively). The cabin door from the hallway is the first wooden door Pip's hand passes through. The discovery is the cinematic itself; there's no menu unlock, no journal entry. Just the moment of "your hand goes through" and the screen fading to the wide shot.

## Spatial layout

Single-screen room. The cabin is slightly larger than Pip's cabin — wider playable space to accommodate the five compositional elements.

- **Pip enters from the left** (at the left edge of the room, facing right). This entry is *narrative* — the door he phased through is on the left wall, leading back to the hallway. He returns to the hallway by walking off the left edge.
- **The bed runs along the right wall** — wide bed, headboard, rumpled bedding. Babcia is seated on it. Per `drawGrandparents`, the bed is wider than Pip's cabin bed (`bedGW=158` vs Pip's `bedGW=100`). The right wall is the shared wall between cabin 644 and cabin 646. A phase-through trigger point is positioned to the right of the bed on this wall (see "Phase-through to Cabin 646" section below).
- **Dziadek stands at the window on the left side**, facing left toward the window. The window is a wood-framed rectangular window (not a porthole). The window itself is wider than Pip's porthole — the visual research tracker calls for a four-pane wooden-framed window.
- **The suitcase sits mid-room on the floor** — open, half-packed. Pip's boat-shirt on top.
- **The nightstand sits between the bed and Dziadek** — small, with the framed photograph on it. A bedside lamp on the nightstand is the room's single warm-amber light source.
- **Camera does not scroll** — the cabin fits in the 480-pixel window. Per Sprint 04, the room is intentionally laid out to hold the cinematic's framing in room mode too.

## Parallax layers

Single-screen, so traversal parallax is minimal. The same half-speed wall-panel system from cabin/hallway runs in the background, visually inert when the camera doesn't move.

## Lighting

The grandparents' cabin is the **warmest room in Ch1 so far** (per Sprint 04). It deliberately reads as a *home*, not a hotel — the warmth communicates that they were planning to live here for the trip.

- **Wall gradient:** cool base with a warmer pool toward the bed area, where the bedside lamp lives. Slightly softer cool than Pip's cabin.
- **Bedside lamp:** the single dominant warm-amber light source. Procedural — small lamp shape on the nightstand with a warm radial gradient around it. Per Aesthetic Rule 4 (single warm light per scene).
- **Window light:** a faint cool blue-gray fill — moonlight through portside glass at night. Falls on Dziadek as he stands at the window.

The room's lighting register is the chapter's first warm-pool moment. After the cool-light cabin and the alternating warm/cool hallway, this is the first room with a sustained warm glow. The warmth is what makes the grief land — it's where they would have been comfortable, with Pip.

## Props and inspectables

### Babcia (inspectable, NPC fixture)

- **Position:** seated on the bed, world-x ~`560` (toward the bed's center, on the right side of the room).
- **Visual:** procedural `drawBabcia`. Per Sprint 04: hunched-on-bed pose, wider at the bottom (skirt/legs folded), narrower at top (head bowed, shoulders rounded). Apron suggested as a slightly lighter horizontal band at her waist. Hair pulled back in a small bun.
- **Color:** `#2a2438` (cool-dark tone, of-this-world, not Pip's spectral palette). Sprint 08.5 + 09 polish work updated proportions to standard Adult NPC scale (~60 px tall, 0.55–0.65 H).
- **Animation:** very slow sob-bob, ~1500ms period, ~1px amplitude. Sob breath, not walking.
- **Crying overlay:** available per `08-character-reference-sheets.md` — light-blue tear pools form under her eyes, drip slowly, cycle ~3.5 s per eye, eyes slightly out of sync. (Currently dev-toggleable; whether it plays in the cinematic by default is a Sprint 11+ polish question.)
- **Inspect dialogue (italic narration + Pip's whispered line):**
  > *Babcia is on the bed. Her hands are folded in her apron. She is making the smallest sound.*
  > *You can stand right next to her. She will not look up.*
  > PIP: *Babciu, jestem tutaj.*
  
  (Polish: "Babcia, I'm here." Per Sprint 04 spec: Polish version was Babcia's language with him, so it lands harder. English fallback: *"Babcia, I'm here. Right here."* — settle in `dialogue.md` session.)

### Dziadek (inspectable, NPC fixture)

- **Position:** standing at the window, world-x ~`160` (left side of the room).
- **Visual:** procedural `drawDziadek`. Per Sprint 04: standing tall, back to player, square shoulders, head tilted slightly down (looking at water). Flat cap suggested as squared shape at top of head. Faces left toward the window; this is his only direction (don't mirror).
- **Color:** same `#2a2438` cool-dark tone.
- **Animation:** none. Stillness is the read.
- **Inspect dialogue (italic narration):**
  > *Dziadek's back is to you. He hasn't turned. His shoulders are very still.*
  > *On the windowsill, the small radio he listens to in the evenings. Off, now.*
  > *You wait, in case he turns. He does not turn.*
  
  (The radio is a deliberate forward-reference to Beat 7's talk-through-speakers ability discovery. The inspection line plants the prop without explaining it.)

### The photograph (inspectable, prop)

- **Position:** on the nightstand next to the bed, world-x ~`620`.
- **Visual:** small framed rectangle on the nightstand. A tiny child-shape visible inside the frame — recognizable as Pip-as-six-year-old, abstractly drawn. Pixel-art-tiny.
- **Subject:** Pip on his sixth birthday, holding a pierogi nearly as big as his face.
- **Inspect dialogue (italic narration + Pip's interior memory):**
  > *Your sixth birthday. The pierogi was nearly as big as your face. You remember it tasted like butter and onions and being allowed to use the big knife.*
  > *You remember Babcia laughing. You don't remember if you said thank you.*

### The suitcase (inspectable, prop)

- **Position:** mid-room floor, world-x ~`380`.
- **Visual:** open suitcase, half-packed. Pip's boat-shirt visible on top. Per `drawGrandparents`: `scW2=54, scH2=13` (body), with an open lid adding ~14px of height at an angle.
- **Significance:** this is the suitcase whose contents Pip's stuffed bear is sticking out of, in the hallway luggage trolley. They're the same suitcase (or related to it). The grandparents were packing for the trip *with Pip*; the contents speak to a journey that's no longer happening.
- **Inspect dialogue (italic narration):**
  > *The suitcase is open. Nothing is folded. A shirt of yours is on top — the one with the boat on it.*
  > *They didn't have time to unpack. They didn't think they would need to.*

The "Babcia's pierogi recipe card sticking out" detail from `04-chapter-01-cabin-646.md` is a foreshadow toward Ch8. Not currently in code; consider adding to the suitcase inspect dialogue or leave for Ch8 callback.

### The window (background prop)

- **Position:** world-x ~`120–180`, on the left wall.
- **Visual:** four-pane wood-framed window, ~58×90 px. Dziadek stands at this window.
- **Inspectable:** not currently — it functions as scenery for Dziadek's pose. Could become inspectable if Julia wants a "Pip looks at the night water" moment here, but the hallway portholes already serve that function.

### The bedside lamp (ambient, non-interactive)

- **Position:** on the nightstand near the bed.
- **Visual:** small trapezoidal lampshade (~21 px wide at bottom, 13 px wide at top, 18 px tall) on a stem extending to the floor. Warm-amber glow radiating from it.
- **Significance:** the room's single warm light source. Not inspectable; pure atmosphere.

### The door (entry/exit)

- **Position:** left wall of the room, off-screen at the left edge.
- **Interaction:** walking off the left edge of the room transitions Pip back to the hallway, positioned just outside door 644 facing left.
- **Phase-through:** the cinematic plays once; subsequent re-entries via the hallway's "Go in" choice skip the cinematic and drop Pip directly into the room at the left edge.

## NPCs present

- **Babcia** on the bed.
- **Dziadek** at the window.

Both are fixtures, not characters Pip can talk to. Neither sees him. Both have a single inspection dialogue and an animation register (Babcia sob-bobs; Dziadek does not move). Dziadek's *almost-turn* happens only in the cinematic, not in room mode.

## Ambient life

Very still. The room is paused.

- **Babcia's sob-bob** — the only consistent motion, very slow.
- **Lamp light pulse** — subtle warm flicker per Aesthetic Rule 8. Not distracting.
- **Dust motes in the lamp's light cone** — optional, per Sprint 04. A few particles in slow random motion. Adds to the *held-still* quality. (Current code TBD on whether this is implemented; flag for verification.)

No echo-vermin, no parallax movement, no porthole drift. The room is intentionally muffled.

## Treat placement

**No treat in this room.** Per Sprint 12, the grandparents' cabin is **grief-coded** and treats are excluded by design. The earlier draft considered a krumkake in Babcia's suitcase; that was dropped because the gesture would feel like Pip eating a snack his grandmother packed while she sits sobbing nearby. Tone trumps placement convenience. This rule is canonical.

## Porthole scene

**No porthole.** The grandparents' cabin has a **window** instead — a four-pane wood-framed rectangular window, not a circular brass-ringed porthole. The window shows the same general night-water beyond, but without the `PORTHOLE_SCENES` registry treatment. The window is a static moonlight gradient.

Whether the window gains an animated scene (parallel to porthole scenery) is a possible future polish pass. Currently it's a static fill.

## What this room communicates

The first cinematic entry communicates: **your family is broken. You did this to them. You cannot fix it from here.** The held silence after Dziadek's almost-turn is the chapter's emotional center of gravity. Pip realizes something fundamental — *they almost saw me, but didn't, and that's worse than total invisibility.*

The room-mode aftermath communicates: **the grief is real, persistent, ongoing.** Pip can walk among them, but he cannot help them. Each inspectable is a small repetition of his powerlessness. The four-line dialogue with the photograph (the pierogi memory) is the chapter's first foreshadow of the final pierogi dinner at the climax — *the memory at the bottom of the well.*

Subsequent visits communicate: **time has stopped in this room.** Babcia is still on the bed. Dziadek is still at the window. The suitcase is still open. The room is paused, and Pip is the only one moving.

## Visual research references

From `design-docs/visual-research-tracker.md` (Ch1 section):

- **Grandparents' cabin — same ship, slightly larger:** Same period stateroom vocabulary as 646 but a step up: two beds, a wardrobe, a small armchair, a radio on a side table. Babcia and Dziadek's belongings strewn — a coat over a chair, his flat cap on the bed, her kerchief on the washstand. Grief-coded.
- **Reference photos of Babcia (if Julia has any she's willing to share):** Julia's grandmother — reference photos if available. Polish immigrant Brooklyn aesthetic, working-class, kerchief and apron.

The visual research tracker mentions "two beds, a wardrobe, a small armchair." **Current code shows one bed only.** Flag for decision: do we add the second bed, wardrobe, and armchair for fidelity, or accept the current simpler layout?

## Phase-through to Cabin 646 (Beat 6 continuation)

The right wall of the grandparents' cabin is the shared wall between cabin 644 and cabin 646. After the cinematic and room-mode inspectables, Pip can walk right past the bed toward this wall.

**Visual cue:** A faint cool-blue glow patch appears on the right wall — similar in visual register to the glow at the hallway-side door on the left, but subtler and positioned on the right wall. It signals that something is here without labeling what it is. The wall texture is otherwise identical to the rest of the cabin's right wall.

**Traversal trigger:** Walking into the right wall fires the phase-through. This is not an inspectable — there is no `↑` interaction, no dialogue box. It is a traversal trigger: Pip walks into it and passes through. His hand reaches the surface, the wall shimmers briefly, and the screen transitions. Pip arrives in Cabin 646 at its left side, facing right.

**Doctor-exit cinematic on arrival:** The doctor-exit cinematic fires immediately on Pip's first entry to Cabin 646, regardless of entry method. `cabinState.doctorSeen` gates it. The doctor walks from center-room toward the far door, exits, the door closes. Pip stands at the left side watching. Control restores after ~2–3 seconds.

**This is the first mechanical use of the phase-through-wood ability.** The narrative discovery was the grandparents' door at the start of Beat 6. The shared-wall traversal is the moment the player uses phase-through as an active verb — Pip walks into a wall and comes out the other side. The ability is no longer just something that happened in a cinematic; it is something the player did.

**Return path:** After the Cabin 646 sequence (mirror → bed → panic), Pip exits Cabin 646 via the hallway door (the panic glide carries him through). Subsequent entries to Cabin 646 are via the hallway door at x=1180. The shared wall is not used again after the first-visit traversal.

## Open questions

1. **The Polish line.** Babcia's inspection line was drafted with two versions in Sprint 04 — Polish ("Babciu, jestem tutaj.") or English ("Babcia, I'm here. Right here."). Sprint 04 deferred the call. **Lock this in `dialogue.md` session.** My read: the Polish lands harder, and the player can intuit the meaning from context. Worth doing.

2. **Two beds vs one.** Visual research tracker calls for two beds (grandparents traveling together). Current code shows one wider bed. Either is realistic; the question is whether the visual asymmetry of "two distinct sleep spaces" helps land "two specific people grieving together" or whether one bigger bed lets Babcia and the room read as more focused. **My read:** keep one bed for now. Two beds split visual attention; one bed concentrates the grief on Babcia.

3. **The radio prop.** Dziadek's inspection mentions a radio on the windowsill. Beat 7 (radio room) is currently a separate room. Is the radio in Dziadek's room the same one Pip later uses to talk through the ship's intercom, or are these two different radios? **My read:** Dziadek's windowsill radio is a domestic radio (he listens to it in the evenings). The Beat 7 radio is a ship's intercom system in the radio operator's room. They're different. The Dziadek prop is a character detail; the Beat 7 radio is a mechanic. Worth clarifying in `puzzles.md`.

4. **The pierogi recipe card.** Sprint outline mentions "Babcia's pierogi recipe card is sticking out of the suitcase" as foreshadowing toward Ch8. Currently not in code. Add to the suitcase inspection as a third line? Or save for Ch8? **My read:** add it. Even one line — *A handwritten recipe card is poking out from under the boat-shirt. Pierogi.* — plants the seed without explaining it.

5. **The wardrobe and armchair.** Per visual research tracker, the room should contain a wardrobe and a small armchair (with a coat over it). Currently not in code. Adding them would densify the room. **My read:** add the coat over the armchair as a small visible prop — Dziadek's coat, signaling "they were going to wear these together." Skip the wardrobe; it adds furniture without earning emotional weight.

