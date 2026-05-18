---

# The Hallway

The chapter's home base. Pip wakes here (the neutral plane). He returns here between rooms. Every other room in Ch1 is entered from the hallway. The hallway holds the chapter's mood — quiet, slightly wrong, full of small things to notice — without holding any of its weight.

## Purpose

Across the chapter, the hallway plays multiple roles:

1. **The materialization room (Beat 1).** Pip pixelates into existence at the leftmost end, mid-yawn. The opening narration plays. The hallway is the first ground he stands on.
2. **The "no one sees me" room (Beat 5).** The passenger walks through Pip's space. The rule lands — Pip is invisible to the living. Establishes the contract Henrik will break.
3. **The hub.** Cabin 646 (right side), grandparents' cabin (further right), and the corridor onward to the dark corridor / stairwell — all entered from here.
4. **The crying room.** A faint sound of weeping grows louder near the grandparents' door. The hallway is where Pip first hears it.

The hallway is comfortable. The dread is ambient, never aggressive. The *Mnemosyne* presents as a real ship someone would book passage on — brass, crimson, wood, warm light — with one or two quiet wrongnesses (the flickering sconce, the wing of cool light through portholes, the unanswered crying).

## Spatial layout

A long side-scrolling corridor — 1440 px wide in world coordinates. The camera scrolls horizontally as Pip walks.

**Left boundary (world-x `0`):** A visible left wall (added Sprint 10.7). Pip cannot move further left than his start position. This is the corridor's terminus; everything is to the right.

**Right boundary (world-x ~`1320–1440`):** A far-right dark zone. The corridor visibly continues into darkness — too dark to enter normally. This becomes accessible after the kitchen beat (it leads to the dark corridor / stairwell). Pre-kitchen, walking right into it returns no progress.

**Door positions (world-x) and cabin numbers (Sprint 21 canonical sequence — ascending left-to-right):**

| World-x | Cabin № | Role |
|---|---|---|
| `80` | `636` | Generic stateroom (decorative, no interaction) |
| `280` | `638` | Generic stateroom (decorative) |
| `480` | `640` | Generic stateroom (decorative) |
| `700` | `642` | Generic stateroom (decorative) |
| `920` | `644` | **Grandparents' cabin** (interactive — Beat 6 cinematic) |
| `1180` | `646` | **Cabin 646, Pip's cabin** (interactive — Beat 3 mirror/bed) |

Numbering convention: numbers ascend left-to-right, with Pip's 646 at the rightmost active door and grandparents' 644 immediately before it. The four generics (636–642) are to the left — wall-dressing, not interactive. *(Sprint 21 corrected the earlier 640–650 sequence in which 648 and 650 appeared to the right of Pip's 646. Pip's cabin is now canonically the last door on this side of the corridor.)*

**Pip's start position:** world-x `~40`, leftmost playable area, facing right. The materialization + yawn sequence runs here once per hard load.

## Parallax layers

The hallway uses three layered systems:

- **Wall panels at half camera speed.** `panelOffset = (camX * 0.5) % panelSpacing` creates a gentle parallax — the panels appear to scroll slower than Pip walks, suggesting depth. Riveted ship-panel motif.
- **Floor planks at full camera speed.** Pip walks directly on the planks; they move with him.
- **Porthole scenes at custom parallax.** Within each porthole, scene layers drift at their own rates per the `PORTHOLE_SCENES` registry (Sprint 16). Star parallax is `0.008` — just-perceptible drift across the full scroll range. Horizon and water are time-based, parallax `0`.

The combined effect is layered depth without overwhelming motion. The hallway feels like a real space, not a slideshow.

## Lighting

- **Wall gradient:** lifted cool blue (`#1a2848` top, `#263460` mid, `#1c2a50` bottom). Slightly cooler than the cabin's wall palette.
- **Ambient edge darkening:** radial vignette pulling corners into shadow.
- **Warm pools from sconces:** the two sconces (world-x `390` and `810`) cast warm-amber floor pools beneath them. Pool radius ~38px, alpha `bracketB * 0.20` (flicker-driven). Subtle — atmospheric rather than dramatic.
- **Sconce flicker:** the second sconce at world-x `810` deliberately flickers. This foreshadows Pip's electricity-flicker ability (taught in the dark corridor at Beat 8).
- **Cool pools from portholes:** the three portholes (`180`, `600`, `1050`) show indigo-dark night ocean. They read as cool-light counterpoints to the sconces.

The alternating warm/cool rhythm — porthole, sconce, porthole, sconce, porthole — gives the hallway a steady visual heartbeat as Pip walks.

## Props and inspectables

### Cabin doors (6 total, plaqued)

Per the door positions above. Brass cabin-number plaques sit on each door's upper panel, centered. Plaques are 18×9 px brass plates with engraved 3-digit numerals in a 3×5 pixel bitmap font.

- **644 (grandparents, x=920):** Interactive. From the hallway side, `↑` triggers Cinematic 3 (grandparents' room reveal via phase-through). Post-cinematic, the door is enterable as a regular room transition. Always has a warm glow.
- **646 (Pip's cabin, x=1180):** Interactive. Gated — pre-grandparents' cinematic: `↑` offers "Listen at the door" / "Not now" only. Post-grandparents': "Go in" appears and the door warms visually. Entering plays the doctor-exit cinematic on first entry.
- **636, 638, 640, 642:** Non-interactive. Pure visual.

### Bulletin board (inspectable)

- **Position:** mounted on the wall somewhere in the early-mid hallway. (Specific world-x in current code TBD — flag for verification.)
- **Visual:** a wooden bulletin board with paper postings, headed "WELCOME ABOARD THE MNEMOSYNE."
- **Interaction:** `↑` triggers inspection narration. The text re-reinforces the pronunciation joke (Mnemosyne = Nem-OSS-uh-nee) and lists Today's Port: Bergen, plus a small itinerary preview (Norway, Iceland, Scotland, Ireland... seeding future chapters even though the game won't visit all of them).
- **Inspect narration (rough):**
  > *The Mnemosyne (Nem-OSS-uh-nee) Welcomes You Aboard. Today's Port: Bergen. Tomorrow: Tallinn.*

### Wall decor (5 pieces, ambient, non-interactive)

Five decorative pieces distributed along the hallway, hung at eye-line height. From Sprint 16:

- World-x `230` — **ship photograph** (framed black-and-white photo of a sister ship)
- World-x `435` — **barometer** (brass-cased instrument)
- World-x `650` — **botanical print** (small framed Norwegian wildflower print)
- World-x `865` — **map** (framed navigational chart of the North Sea)
- World-x `1115` — **mirror** (small ornate wall mirror)

Each piece is ~24–32px on canvas with an ornate frame outline. Positioned to avoid overlap with portholes and sconces. **None are inspectable** — they're set-dressing.

### Luggage trolley (ambient)

- **Position:** world-x `530`, between the decorative door at x=480 (cabin 640) and the grandparents' door at x=920. *(The earlier description "between Pip's door and a porthole" was stale after the beat-order correction moved Pip's door to x=1180. Trolley position is unchanged.)*
- **Visual:** `drawLuggageTrolley(x, groundY)` — two small wheels, a metal frame, a lower rigid suitcase, an upper soft bag with clasp, an upright handle.
- **Significance:** Pip notes the trolley in inspection — there's a stuffed bear sticking out, and Pip recognizes it as one Babcia gave him. This trolley belongs to his grandparents.
- **Interaction:** `↑` triggers inspection narration:
  > *Someone packed in a hurry. There's a stuffed bear sticking out — it looks like one Babcia gave me.*

The trolley is a gentle planted seed — it's their luggage, and Pip is about to realize why their cabin is full of grief.

## NPCs present

### The Passenger (scripted walk-through, Beat 5)

- **Trigger:** Pip walks past a specific world-x mid-hallway. The passenger sprite enters from one side, walks toward and through Pip's position, and exits the other side.
- **Visual:** older traveler in evening clothes — formal collar, white shirt-front, dark coat. Adult NPC scale (door-fraction ~0.60). See gallery for current sprite.
- **Behavior:** the passenger walks through the spot Pip was just in. Pip drifts to the side instinctively. The passenger never blinks, never slows.
- **Post-event dialogue (italic, Pip's thought):**
  > *…they didn't see me.*
- **One-shot:** plays once per chapter. Re-entering the hallway does not retrigger.

### The Janitor (scripted, Beat 8 — appears later)

- **Status:** the janitor's appearance is in Beat 8, after Pip has used the radio in the radio room to page him. The janitor walks through the hallway, moves the luggage trolley, and walks away. Pip stands next to him; the janitor does not see him.
- **This Beat 8 event currently lives in code but the hallway doc should note it.** The janitor walks the hallway, not the dark corridor, despite being a "dark corridor / Beat 8" character.

### Pip himself

Pip's starting position is world-x `~40`, leftmost. After the materialization + yawn (Sprint 10.7), he is fully player-controlled.

## Ambient life

The hallway has the most ambient life of any Ch1 room:

- **Flickering sconce** at world-x `810`. Pulse irregular, foreshadows Beat 8 electricity ability.
- **Sconce light-pool flicker.** The warm-amber floor pools breathe with the flame, alpha tied to `bracketB`.
- **Porthole scene animations.** Stars drift slowly with camera; water-wave streaks drift on a 3.1s sine cycle; occasional warm-amber shimmer on the water.
- **Wall panel rivets and seams** static. No motion.

The hallway feels alive in a quiet way. None of the animation is fast enough to demand attention — it's slow ship-breathing.

## Treat placement

**No treat in the hallway during first playthrough.** The hallway has historically held a **debug Bamsemums** for testing the collect verb, but per Sprint 12 this isn't a canonical treat — it's a developer artifact. Flag for cleanup or repositioning.

If we want to add a real hallway treat for replay value:
- It would need to be tucked in the luggage trolley (in the bear's pocket? wrapped in a sleeve of clothing visible in the trolley?)
- Or behind one of the wall decor pieces (the barometer? the map?)
- Or on a side table near the bulletin board

**My read:** the hallway doesn't need a treat. It's a transit room. The Bamsemums tutorial happens in the kitchen, and the cabin/dark-corridor/observation-deck treats fill the chapter's quota. Flag for Julia.

## Porthole scenes

The hallway has **three portholes** at world-x `180`, `600`, `1050`, all rendering the `ch1-ocean-night` scene:

- `sky-stars` layer (parallax `0.008`) — indigo gradient + 9 seeded stars, slow drift
- `horizon-line` layer (parallax `0`) — dark band, slow sine pulse
- `water-waves` layer (parallax `0`) — dark base, 3 drifting streaks, occasional warm-amber shimmer

The scene is the only world-view Pip has of where the ship is. He's not on deck yet; the portholes are his windows out. The Bergen lights on the far shore aren't visible from this depth — the ocean stretches uninterrupted.

For Ch2 onward, the porthole scene id swaps based on chapter (Tallinn lights, Southampton dock, etc.), but the corridor itself doesn't change. Same hallway, different views.

## What this room communicates

The hallway is the chapter's emotional ground state — comfortable, slightly off, busy with small details. Pip is in a real space, and the space is real to him. He can walk it freely.

The hallway also teaches the player the chapter's two foundational rules:

1. **Pip is invisible to the living.** The passenger walks through him.
2. **Pip cannot ignore his grandparents.** The crying gets louder near 644.

Once those two rules land, the chapter pivots. The hallway becomes the *transit* room — the connective tissue between Cabin 646's truth, the grandparents' cabin's grief, and the kitchen's first warmth.

The hallway is also the chapter's **only ship-corridor space** — the one the player walks most. Sprint 16's detail work was specifically about making this room hold up to repeated traversal without flattening.

## Visual research references

From `design-docs/visual-research-tracker.md` (Ch1 section):

- **Ship corridor / hallway aesthetic — brass fittings, crimson runner, sconces:** Narrow corridor, deep crimson carpet runner, mahogany or oak paneling, brass wall sconces at intervals, brass-numbered stateroom doors. Edwardian liner deck-corridor reference.
- **Ship wall decor — barometer, ship photo, botanical print, navigational map:** Brass-cased barometer; framed black-and-white photograph of a sister ship; small botanical print of Norwegian wildflowers; framed navigational chart of the North Sea.
- **Luggage trolley with worn suitcases:** Period brass-handled luggage trolley, stacked with leather and canvas Edwardian-era suitcases, hat boxes, steamer trunks. Travel-worn, varied labels.
- **Echo-spiders, echo-mice, echo-bats:** ambient ghost-vermin treatment. *(Not currently rendered in the hallway — would be added if/when we want vermin to scuttle along the baseboards or near the dark zone.)*

## Open questions

1. **Echo-vermin in the hallway.** The visual research tracker calls for ghost-spiders along sconces, ghost-mice along baseboards, ghost-bats up near the deckhead. Current code shows no echo-vermin in the hallway. Are they an addition we want, or are they reserved for the dark corridor (Beat 8)? My read: the hallway should stay clean — the dark corridor is where ambient wrongness escalates. Vermin belong there, not here.

2. **Debug Bamsemums cleanup.** A developer Bamsemums has been in the hallway for testing the collect verb. Per Sprint 12 it's not canonical. Flag: remove it, or formally promote it to a real hallway treat (with placement and lore)?

3. **Wall decor inspectability.** Currently five wall-decor pieces are pure decoration. Making one or two inspectable would surface small character moments (the ship photograph showing the Mnemosyne's launch; the navigational chart showing Bergen circled). Worth it for replay/notebook value, or keep them decorative?

4. **Bulletin board location.** Current code may not have a discrete bulletin-board object at a specific world-x — the inspection text exists, but is the visual asset there? Flag for verification when we walk the hallway code carefully in `art-checklist.md`.

5. **Far-right dark zone presentation.** The corridor visibly continues into darkness past world-x `~1320`. Currently this is just "darkness" rendered as a darker overlay. Should this region get a specific visual treatment (a stairway descending? a doorway with no light coming through?) to signal "this is where you go next, but not yet"? Or is the current darkness enough?

