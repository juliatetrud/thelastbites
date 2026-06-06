---

# The Dark Corridor / Stairwell

The chapter's first real puzzle room. Ominouos and dark hallway, broken items in disrepair, and echo spiders mischeviously bounce from webs, crawl on the floors. Where Pip earns electricity and float as full abilities, where the "no one can see me" rule lands its final confirmation, and where the chapter pivots from grief into discovery.

## Purpose

A single room playing three roles in sequence:

1. **The dark room (Beat 8 opening).** Pip enters from the hallway's far-right dark zone. The corridor is pitch black. Standard movement and inspection don't work. The player has to *do something* before they can proceed.
2. **The puzzle room (Beat 8 middle).** Pip finds the broken sconce with exposed wiring. He uses his nascent electricity ability to spark the lights. **Float is also increased here so he can float from floor to cieling** — broken glass on the floor triggers an involuntary panic-rise that becomes a controlled ability. The corridor reveals itself.
3. **The "no one can see me" room (Beat 8 end).** Pip discovers the janitor's cart blocking the stairwell. The cart has a name tag — "J. Henriksen, Maintenance." Pip backtracks to the grandparents' cabin, uses Dziadek's radio to page the janitor over the ship's intercom, returns to the corridor. The janitor walks in, mutters in Norwegian, looks right past Pip, moves the cart, and walks away. The rule locks in.

This is the chapter's **first integrated multi-step puzzle** — clue (name tag) → ability (radio in grandparents' cabin) → outcome (path opens) → bonus story beat (the rule reinforced).

After Beat 8, the dark corridor remains accessible but quiet. The lights stay on. The cart is gone. Pip can use it as a transit room to and from the kitchen.

## Spatial layout

Side-scrolling corridor. Service-deck aesthetic — narrower than the passenger hallway, lower ceiling implied through tighter vertical framing.

- **Pip enters from the left** via the dark zone transition from the hallway. The hallway's far-right dark zone is now passable; Pip steps from the polished passenger corridor into the rough service corridor and the camera shifts.
- **The corridor runs right** for roughly ~960 px (suggested, smaller than hallway's 1440 — the dark corridor is less explorable, more puzzle-focused).
- **The stairwell sits at the right end** of the corridor — a descending stair into the kitchen below. The stairs are visible but blocked by the janitor's cart pre-puzzle.
- **The broken sconce sits roughly mid-corridor**, world-x ~`420`. Fallen from the wall, hanging by exposed wiring. Broken glass on the floor beneath it.
- **The janitor's cart sits at the right end**, world-x ~`840`, blocking the stairwell descent.
- **Camera scrolls** as Pip moves. The dark zone treatment in the pre-puzzle state limits visible content to a small radius around Pip; the room reveals progressively as the player advances and then fully when the lights come on.

## Parallax layers

The dark corridor uses the same wall-panel system as the passenger hallway but with different palette tokens (painted iron, not polished wood). The half-speed panel scroll is consistent with cabin/hallway.

**Pre-puzzle (lights off):** No parallax visible — the dark zone overlay hides most of the background. Only a small radius around Pip is rendered.

**Post-puzzle (lights on):** Full parallax visible — wall panels, exposed pipes overhead, scuffed floor planks.

## Lighting

The most lighting-dramatic room in Ch1.

### Minimum-visibility rule (Decision D, 2026-06-02)

**The dark corridor must be visibly navigable — gently dark and atmospheric, never frustrating-dark.** The player must always be able to see: the room, the cart, the broken sconce, and the path. Atmospheric darkness never costs the player the ability to see where they are and where they're going.

**Game-wide principle:** *Every level stays fun and visible, even when the mood is dark.* This applies to all rooms in the game that carry a "dark" register.

The pre-puzzle state stays *darker* than the post-puzzle (lit) state — the puzzle still meaningfully changes the lighting — but the floor of visibility rises.

### Pre-puzzle state (gently dark)

- **Base fill:** dark but navigable — suggested `#0e1418` or similar. Visibly dim, not invisible.
- **Wall gradient:** low but present — the room shape, walls, and floor should be legible without the player squinting.
- **The one flickering light:** a single working sconce barely flickering mid-corridor. Casts a weak-amber pool, ~12px radius. Together with Pip's aura it gives enough visibility to navigate.
- **Pip's own faint glow:** Pip's spectral aura supplements the sconce. The player can see Pip, roughly 30–40px around him, *and* the sconce pools.
- **The fallen sconce:** dimly visible even before Pip approaches — it should be legible at moderate distance so the player understands there is something broken in the room to investigate.
- **Mood register:** the corridor feels atmospheric and unsettling, but the player is never navigating near-blackness.

### Post-puzzle state (lights on)

After Pip uses electricity on the wiring, the sconces buzz back on. The room transitions from near-black to dim-but-legible.

- **Wall gradient:** lifted to a desaturated cool — painted iron palette, not the warm-wood cabin/hallway. Suggested: `#1e2438` top, `#2a3048` mid, `#1c2230` bottom. Cooler and less inviting than the passenger corridor.
- **Sconce light pools:** weak amber pools beneath restored sconces. Less saturated than the hallway's — the bulbs are old, the wiring is patched. Pulse irregular.
- **The fallen sconce:** still on the floor, but no longer flickering. The wiring sparked it once; it's done its job.
- **Mood register:** the room is now navigable but never *welcoming*. It remains a service space.

## Props and inspectables

### The broken sconce (inspectable, key puzzle object)

- **Position:** world-x ~`420`, on the wall about chest-height to Pip. Fallen partially off the wall; the sconce body hangs at an angle, wires exposed.
- **Visual:** brass sconce frame tilted off the mounting, broken glass shade scattered below on the floor. A thin sparking line where the wires are exposed.
- **Aura:** breadcrumb-elevated. The aura pulses to draw Pip in — this is the primary puzzle target.
- **Interaction:** approaching within Pip's aura range, `↑` triggers a small interaction sequence:
  - Pre-electricity-ability: italic Pip thought line (something like *the wires are sparking. Maybe I can…*)
  - Post-interaction: a short rapid-input or held-button sequence (TBD in `puzzles.md` — see open questions)
  - Successful interaction: **electricity ability unlocks** and the corridor's lights come on
- **Post-puzzle state:** sconce is still on the floor (the fixture is broken, the wiring is fixed). Inspectable but with a simpler post-state line.

### The broken glass on the floor (ambient, triggers float discovery)

- **Position:** world-x ~`420`, on the floor directly beneath the fallen sconce.
- **Visual:** small scatter of glass shards, drawn as light-catching specks. Subtle but visible once lights are on.
- **Interaction:** stepping on the glass tile (or passing through it) triggers the **float ability discovery** — Pip panics, involuntarily rises, then resettles as a player-controlled ability. The mechanic transitions from the cinematic panic-float (Beat 3) into player control.
- **Open question:** is float-discovery a separate moment from the electricity interaction, or does it happen as a continuation of the sconce sequence? My read: they should be sequential and tight — fix the lights, see the glass, float-discovery. One coherent multi-step. Flag for `puzzles.md`.

### The janitor's cart (inspectable, key puzzle object)

- **Position:** world-x ~`840`, at the right end of the corridor, blocking the stairwell descent.
- **Visual:** a worn metal cart with a mop bucket, a broom, cleaning supplies. Plus a clipboard or name plate.
- **Aura:** breadcrumb-elevated after lights come on. Pip is drawn toward it.
- **Inspection:** `↑` triggers narration:
  > *A janitor's cart, abandoned mid-shift. A name tag on the clipboard reads: "J. Henriksen, Maintenance."*
  > *Pip wonders how to get past it.*
- **Behavior:** Pip can phase through the cart (it's wood and canvas, not metal — phase-through ability applies, which Pip has already used mechanically at the shared wall in Beat 6), but he cannot push it (he's a ghost; he has no mass). The cart is not a teaching moment for phase-through; by the time Pip reaches Beat 8, the ability is fully understood.
- **Resolution:** after Pip pages the janitor via radio (in grandparents' cabin) and returns, the janitor walks in, moves the cart, and exits. The cart is then gone from the corridor permanently.

### The stairwell (passage to kitchen)

- **Position:** world-x ~`880` — just past the cart's position.
- **Visual:** a narrow service stairway descending into shadow. The kitchen is implied below.
- **Pre-puzzle state:** blocked visually by the cart. Pip cannot use the stair.
- **Post-puzzle state:** the cart is gone. Pip can descend the stairs to enter the kitchen.
- **Stair art:** per `09-component-scale-reference.md`, ship stairwell is a proposed component at 0.70–0.90 H (~77–99 px), narrow ship-stair style.

### Exposed pipes (ambient, non-interactive)

- **Position:** running along the upper portion of the corridor, world-x ~`200` to ~`760`.
- **Visual:** thin horizontal pipes overhead, painted metal, with occasional joint flanges. Read as service-deck infrastructure.
- **Interaction:** none. Pure visual flavor.

## NPCs present

### The Janitor (J. Henriksen) — scripted walk, one-shot

- **Trigger:** Pip pages "J. Henriksen to the front desk" via Dziadek's radio in the grandparents' cabin. On returning to the dark corridor, the janitor's scripted walk fires.

- **Important:** per the latest outline and the hallway doc, **the janitor walks the hallway, not the dark corridor.** The cart is in the dark corridor; the janitor enters from the hallway's far-right dark zone, walks across the dark corridor's full width, takes the cart, and exits with it back toward the hallway.

  **Open question:** is the janitor's walk in the dark corridor itself (he appears, moves the cart, leaves) or in the hallway (he appears at the far-right dark zone, walks down the hallway and out)? The hallway-doc says "the janitor walks through the hallway." The Beat 8 outline says the janitor "walks in, mutters to himself in Norwegian, looks right past Pip, grabs the cart, and pushes it away." Both can be true if the janitor crosses the room boundary, but we should clarify in `puzzles.md`. My read: the janitor's primary visible walk happens in the dark corridor (where the cart is), with the hallway as offstage transit. The "no one can see me" line lands in the dark corridor.

- **Visual:** crew-level work uniform — coverall or work shirt with ship insignia, cap, work boots. Per visual research: "Crew-level uniform — coverall or work shirt with ship insignia, cap, mop and bucket on the cart."
- **Color tone:** same of-this-world tone as the passenger and grandparents (`#2a2438`-ish), not Pip's spectral palette.
- **Behavior during scripted walk:**
  - Enters from the left edge of the dark corridor (from the hallway side).
  - Walks to the cart at world-x `840`.
  - Pauses at the cart. Mutters in Norwegian — flagged in `dialogue.md` for actual line. Suggested: a short under-breath line like *"Hvor i alle dager…"* ("Where in the world…") or similar.
  - Looks *right past Pip* if Pip is in his line of sight. No registration, no glance.
  - Takes the cart handles and pushes it back toward the left, exiting off the left edge.
- **Post-walk dialogue (italic, Pip's thoughts):**
  > *No one can see me.*
  > *(can they?)*
- **One-shot:** plays once per chapter. The cart is gone after; the janitor does not reappear in this corridor.

## Ambient life

The dark corridor escalates ambient wrongness. This is where the visual research tracker's echo-vermin belong (deferred from the hallway).

### Echo-creatures — echo-spiders only (locked Sprint 41, 2026-06-03)

Ch1's echo creature is the **echo-spider** — warm-amber translucent, mischievous, bouncy, never creepy. Echo-mice and echo-bats are NOT in the Ch1 dark corridor. Mice belong to Ch2; bats are unassigned as of Sprint 41. The prior visual-research note listing all three is superseded.

Two staging types in the dark corridor:

**Floor spiders:** One or two spiders skittering along the baseboards at floor level. Low-to-floor, scuttle with a start-stop rhythm. Drains a small breath of strength on contact.

**Ceiling danglers:** One or two spiders hanging from silk threads attached to the overhead pipes, **bobbing up and down on their threads**. This makes Float a timing choice rather than a blanket "rise above everything" — Pip floating up must time his rise between the bobbing spiders, threading the gaps. The bobbing phases should be staggered so the spiders don't sync up (mischievously independent). Drains strength if Pip floats into one.

**Density:** Sparse — one or two per staging type at most, placed deliberately. The dark corridor is unattended, not infested. The spiders are the chapter's only ambient wrongness; they should read as a discovery, not a swarm. *(OQ #6 resolved here.)*

**Float-timing interaction:** The ceiling danglers specifically create the hazard the float ability is designed to navigate. The player learns Float in this room (at the broken glass), then immediately has to use it to avoid bobbing ceiling hazards. This is the chapter's teaching moment for Float as a *timing* skill, not just "hold Space to rise above things."

**Gallery design:** Approved `character-gallery.html` (Sprint 41). **In-game implementation:** Sprint 46. `echoSpiders` state object (2 floor, 2 ceiling); `updateEchoSpiders(dt)` handles movement + collision; `_drawDCSpider(cx, cy, r, now, phase)` + `drawEchoSpiders(camX, now)` render them. Collision: floor spiders drain 1 strength when `pip.float.altitude < 10`; ceiling danglers drain when Pip floats into their bob height. Visible in both dark and lit states (warm-amber, always-on). **Corridor lighting also fixed Sprint 46:** overlay lowered from 96%→80% black; aura radius 38→55px; 3 ambient candles + 2 small service portholes always visible; stairwell warm-glow hint at world-x 880 even in dark state.

### The flickering working sconce (pre-puzzle)

- **Position:** world-x ~`240`, on the wall.
- **Visual:** single working sconce, barely lit. Weak amber. Flicker register erratic (similar to the hallway's flickering sconce at `810` but more degraded).
- **Significance:** the only natural light in the room pre-puzzle. Hints "something is broken here" without being the puzzle object itself.
- **Post-puzzle state:** restored to normal sconce behavior — still slightly flickering but stable.

### Dripping water (optional)

- **Source:** somewhere off-screen, periodically. A faint *drip… drip…* sound effect if audio is wired.
- **Visual:** none. Audio-only.
- **Status:** not yet implemented. Flag for sound-design pass.

## Treat placement

**One treat lives here:** the **cleaning-cart treat** per Sprint 12. Tucked among the janitor's supplies on the cart.

- **Status:** TBD specific treat per Sprint 12 decision. Suggested: a **skillingsboller** (Bergen-style cinnamon bun) — half-eaten, wrapped in waxed paper, sitting on top of the cart. The janitor's end-of-shift snack.
- **Visibility:** the treat aura is on the cart pre-cart-movement. After the janitor moves the cart, the treat is gone (the janitor takes it with him).
- **Collectability:** Pip can collect the treat between when the cart is discovered and when the janitor moves it. This is a small risk-window puzzle in itself — the player has to pocket the snack *before* using the radio.
- **Alternative timing:** the treat could be collectible *only* on a replay or via specific timing. Decide in Ch1 content sprint.

## Porthole scenes

**No portholes.** The dark corridor is a service-deck space, below the passenger waterline. No windows out.

If we want to add a vent or grate showing the engine room or boiler room beyond, that's an option — but it would risk overloading the chapter with imagery. My read: keep the dark corridor closed-in. The lack of any view out reinforces "you are deep in the ship."

## What this room communicates

The dark corridor is the chapter's **first room where Pip earns abilities through doing**, not through being shown. The cabin and grandparents' cabin handed Pip information (he is dead; his family grieves him). The dark corridor demands Pip *act*.

The room teaches the player:

1. **Abilities are tools, not gifts.** Electricity isn't unlocked at a menu — it's discovered by inspecting wires. Float isn't unlocked from a tutorial — it's triggered by stepping on glass.
2. **The world has problems you can solve.** This is the first room with a non-trivial puzzle structure.
3. **The "no one sees me" rule is total.** The passenger was the first instance; the grandparents' almost-turn was a near-miss; the janitor is the lock-in. Pip can stand directly in front of him and not register.

The room also communicates **scale**. The ship has parts of it that aren't dressed up for passengers. The Mnemosyne is a *working vessel*, not just a luxury hotel. Pip is entering its underside.

The post-puzzle state — lights on, cart gone, stairwell open — communicates **passage**. The room has done its job. It becomes a corridor of transit between the hallway and the kitchen.

## Visual research references

From `design-docs/visual-research-tracker.md` (Ch1 section):

- **Dark corridor / stairwell — service-deck aesthetic:** Less polished than passenger corridors. Painted iron walls, exposed pipes, a fallen sconce with broken glass on the floor, working light fixtures flickering. The janitor's cleaning cart abandoned mid-shift.
- **The Janitor — ship crew, working uniform:** Crew-level uniform — coverall or work shirt with ship insignia, cap, mop and bucket on the cart. Working-class period reference.
- **Echo-spiders, echo-mice, echo-bats:** ghost-vermin treatment. Translucent ghost-rendered vermin — spiders along sconces, mice along baseboards, bats up near deckhead. Per the echo-creature canonical treatment (warm-amber translucence, drains strength on contact).
- **Skillingsboller — Bergen-style cinnamon bun (cleaning-cart treat, suggested):** Bergen's signature cinnamon bun — large, swirl-pattern, cinnamon-sugar filling, not as sticky as a Swedish kanelbulle. Half-eaten, wrapped in waxed paper.

## Open questions

1. **Stale `room-ch01-radio-room.png` art asset row.** `art-asset-list.md` still has a row for a separate radio room (small Edwardian ship's radio operator room with brass equipment). The latest outline retires this — the radio is in grandparents' cabin, not a dedicated room. **Flag for art-checklist.md cleanup.** The asset row should be removed or relabeled.

2. **Electricity puzzle interaction model.** The outline says "press space rapidly" or "held-button charge" as the puzzle interaction. Which feels better? Held-button is gentler and more in keeping with the chapter's tone; rapid-press would feel more frantic. **My read:** held-button. Pip holds his hand near the wires, sparks build, lights buzz on. Settle in `puzzles.md`.

3. **Float discovery timing.** Is the float discovery a separate trigger (Pip steps on broken glass after the lights are on) or a continuation of the electricity sequence (the wiring shock makes him rise)? **My read:** keep them separate. Two distinct discovery moments, both in this room, both small but earned. Electricity → lights on → Pip walks forward, steps on glass → panic-rise → float ability. Tight pacing, but each beat lands.

4. **Janitor's walk location.** Hallway doc says janitor walks the hallway; outline says janitor walks through the dark corridor. **My read:** the janitor's primary visible action is in the dark corridor (where the cart is). He may *enter* from the hallway side as offstage transit, but the player sees him in the dark corridor moving the cart. The "no one can see me" beat lands here, not in the hallway. **Flag for `puzzles.md` and `beats.md` to settle definitively.**

5. **Janitor's muttered Norwegian line.** Currently not written. Suggested: *"Hvor i alle dager…"* ("Where in the world…") or similar under-breath confusion. Native speakers can refine. **Flag for `dialogue.md`.**

6. ~~**Echo-vermin density.**~~ **Resolved Sprint 41 (2026-06-03):** Echo-spiders only (no mice, no bats). Density: sparse — one or two floor skitters, one or two ceiling danglers. Resolved in the Ambient life section above.

7. **Audio support for dripping water.** Atmospheric audio cue isn't wired. Flag for sound-design pass.

8. **Stairwell descent transition.** When Pip walks onto the stairs (post-puzzle), how does the transition to the kitchen play? Cut to black and reload? A short scripted "Pip descending" cinematic? **My read:** standard room transition (fade to black, fade in, Pip arrives at the top of the kitchen). The kitchen entry should feel like *arrival* somewhere new, not a continuation. Settle in `puzzles.md` and the Henrik kitchen build sprint.

