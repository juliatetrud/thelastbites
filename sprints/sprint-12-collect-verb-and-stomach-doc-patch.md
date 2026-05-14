# Sprint 12: Doc patch — collect verb, stomach model, treats, key remap, observation deck

## Documentation hygiene (applies to every sprint)

**Every sprint in this project maintains the design docs as a first-class deliverable, not an afterthought.** When a sprint creates, modifies, or supersedes anything that touches the canonical docs, those updates ship in the same commit as the sprint's primary work.

This sprint *is* a doc-hygiene sprint — no game code changes. The point is to write a coherent batch of design decisions into the canonical docs before the next implementation sprint builds against them.

---

## Goal

Patch the canonical design docs to reflect a coherent batch of decisions made in the design session of 2026-05-14: the `↓` collect verb, the stomach-coded strength model, the world-hazard-only drain rule, the blink-back failure mode, the treats system (scarce, hidden, per-region, refill-on-pickup), the `TAB`/`ESC` key remap, the warm-humming sparkle convention for collectibles, the addition of an Items section to the notebook, and a new locked Ch1 room: the **observation deck**, where Pip sees the northern lights between Henrik's kitchen and the dock farewell.

No game code changes. Doc patches only. The companion implementation sprint (Sprint 13) builds against these docs once they ship.

## Definition of done

- `02-game-design.md` has new sections documenting the collect verb, the stomach model (drain rules, refill rules, blink-back), and the treats system. The strength meter's role is locked: drained by world hazards only, never by puzzle failure.
- `03b-ui-spec.md` has updates: the strength indicator section's role is reframed as stomach/hunger; a new collectible-sparkle-convention section is added; the controls strip section is updated for the new keybindings; a new notebook Items section is added; the pickup tween animation is specified.
- `04-chapter-01-cabin-646.md` has two structural updates: (1) a new beat inserted after Henrik's kitchen scene where Pip finds the first Bamsemums treat on the counter and the `↓` verb is taught via in-dialogue narration; (2) a new locked room — the observation deck — added to the chapter's room list, positioned between kitchen and dock farewell, with its emotional purpose, the northern-lights visual hook, and a treat placement noted. The observation deck's implementation is deferred to a future sprint.
- `ch01-cabin-646-outline.md` (the outline doc) is updated to reflect the six-room chapter structure (was five rooms) and the four-treat treat list.
- `06-roadmap-and-open-questions.md` Decisions Log gets thirteen new entries dated 2026-05-14 covering everything above. The Open Questions list gains the item-use UI question (deferred), the cabin replay-treat specifics, the cleaning-cart and observation-deck specific treat choices, and the observation deck implementation. The previously-flagged "Babcia's suitcase tone risk" question is *not added* — that placement is dropped entirely.
- `art-asset-list.md` is updated to reference the new sparkle convention, add a placeholder entry for the Bamsemums treat sprite, add a new room background entry for the observation deck, and add placeholder entries for the remaining three Ch1 treats (names TBD per chapter content sprint).
- All changes ship in a single commit.

## Context from prior decisions

This sprint encodes a multi-turn design conversation. The decisions are summarized below; this section is the source of truth for what each doc patch should say.

### Decision: `↓` is the collect verb

The down arrow is now `↓ COLLECT`. Built-in, not discovered. Pip crouches and pockets the nearest sparkling collectible. When nothing is nearby, `↓` makes Pip squat in place — a useful brake action and visible "I tried" feedback.

The verb is taught diegetically the first time it's used in-game (see Ch1 patch below). The inspect-text for the first collectible contains the instruction inline; no floating tutorial UI.

### Decision: collect target sparkle is warm and humming

Inspectable objects keep their existing cool moonlit shimmer (`var(--warm-pool-amber)` at standard sparkle intensity, drifting upward).

Collectibles get a *distinct* visual marker: a warm, radiating, slightly pulsing glow — closer to a hum than a sparkle. Same amber family but more saturated, broader, and *pulsing slowly* rather than drifting. The player learns two visual vocabularies: cool shimmer = `↑ INSPECT`, warm hum = `↓ COLLECT`.

Exact specification deferred to implementation, but the design language is "warm pool, humming, present rather than darting."

### Decision: `TAB` opens the notebook; `ESC` is for pause

Previously `ESC` opened the journal. Now:

- `TAB` opens the notebook (renamed from journal — see below).
- `ESC` is reserved for pause menu (already planned in Sprint 05).

This is a clean swap. All existing references in docs to `ESC` opening the journal must be updated.

### Decision: rename "journal" to "notebook"

Throughout the project, the player's book is now called the **notebook**, not the journal. This better matches what it is — Henrik gives Pip an *empty notebook* in Ch1, which Pip then fills with recipes, memories, and items. The word "journal" carried a diary connotation; "notebook" is more accurate.

Existing references to "journal" in design docs should be updated to "notebook" in patches authored by this sprint. The game's in-fiction object remains the same — only the term changes.

### Decision: stomach model

The strength indicator is reframed:

- **What it represents:** Pip's stomach. He is a hungry ghost-boy. Empty stomach = unable to continue. Full stomach = ready for the world.
- **What drains it:** *World hazards only.* Echo-creature bumps, snail slime, dark-corridor lingering, and similar gentle environmental costs. *Never* drained by puzzle failure. Wrong choices in puzzles reveal information; they don't cost stomach.
- **What refills it:** Eating treats (`↓` collect → auto-eat → stomach refills by the treat's value). Eating a chef's meal at chapter end refills to full.
- **Failure mode:** At zero stomach, Pip *blinks back*. A short cinematic of him fading, then reappearing at the *last room threshold* he crossed, with stomach restored to a baseline. **No life lost. No chapter restart.** The ship is kind. This replaces the lives system from `03b-ui-spec.md` Section 4 — see "Lives system retired" below.

### Decision: lives system retired

The three-lives display from `03b-ui-spec.md` Section 4 is retired in favor of the blink-back model. With blink-back as the failure mode, there is no longer a need for a discrete "lives lost" mechanic. The game has *one continuous Pip*, who gets gently put back when he's lost his way.

The retirement is *clean*: the lives display is removed entirely, not hidden. The HUD chrome becomes simpler — strength indicator + controls strip + notebook icon, nothing else.

The puddle-ghost game-over from `03b-ui-spec.md` Section 10 is also retired (no third-death-trigger remains).

### Decision: treats system

Treats are small, hidden, on-theme items scattered through each chapter. Per the design conversation:

- **Quantity:** 3–6 treats per chapter from Ch2 onward. **Chapter 1 has fewer (4)** because the collect verb is taught mid-chapter — there's less of the chapter where treats can be placed before the player knows how to pick them up.
- **Distribution:** Chapters 2 onward have treats placed from chapter beginning to chapter end, including at least one treat in the early-chapter zone for replay value. **Ch1 follows this same beginning-to-end rule** but with the constraint that the *first treat the player can collect* is the tutorial Bamsemums in the kitchen. Earlier-placed treats (e.g. the cabin treat) become *replay rewards* — invisible on first playthrough until the player has learned `↓`, then discoverable on a return visit or a replay.
- **Discovery locations:** Tucked in drawers, behind objects, on balconies, under things, in cleaning carts, on observation decks. Some accessible only with later-earned abilities (so a Ch5 treat in Ch1 *can't yet* be reached). Scarcity is the rule; the player should feel them as *gifts the ship left out for him.*
- **Regional theming:** Each chapter's treats are drawn from the chapter's regional cuisine — candies, pastries, cheeses, small folk foods. The treats brainstorm for Ch1 is in this sprint's "Ch1 treat list" section below.
- **Pickup behavior:** Pressing `↓` near a humming collectible plays a short pickup animation — the treat tweens into the notebook icon in the HUD corner. The treat is immediately consumed (refills stomach) *and* recorded in the notebook's Items section as a small pixel-art icon with a journal-style annotation.
- **Notebook record vs. consumption:** This is a single moment, not two. The treat is consumed *and* recorded in the same gesture. The Items section is a *record of what Pip has eaten*, not an inventory of unused snacks. Compare with non-food items below.
- **Tone constraint.** Treats are never placed in locations that would feel emotionally wrong for Pip to take from. *The grandparents' cabin contains no treat.* The early-version plan to put a krumkake in Babcia's suitcase is dropped — the room is grief-coded and the gesture would feel like Pip eating his grandmother's packed-for-him snack while she sits sobbing nearby. This is the standing rule: tone trumps placement convenience.

### Decision: useful items (knife, matches, candle) are distinct from treats

Some collectibles are *not* treats — they're objects Pip pockets and uses later. The Ch1 candle, the Ch3 matches, the Ch4 candle-use, the climax knife (all already referenced in chapter outlines). These also go in the notebook's Items section, but they:

- Are *not* consumed on pickup — they sit in the section until used.
- Do *not* refill stomach.
- Become usable in dialogue choices contextually, as a fourth choice option when relevant (e.g. *"1. Stir / 2. Taste / 3. Watch / 4. Use the matches"*). The matches don't get a separate UI surface.

**Open question (deferred):** the exact UI behavior when an item *could* be used in a scene but the player hasn't yet realized it. Hint via highlighted choice? Just always-available? See Open Questions update below.

### Decision: notebook gets a third section

The notebook now has three sections (was two):

- **Left page — Recipes.** Per chapter. Unchanged.
- **Right page — Memories.** Per chapter. Unchanged.
- **New: Items page** (third spread, accessed by paging right past memories). Contains:
  - **Treats eaten:** small pixel-art icon of the treat + a one-line annotation in Pip's handwriting (*"Bamsemums — from Henrik, in the kitchen"*).
  - **Useful items:** small pixel-art icon + one-line annotation (*"A candle — from Henrik."*). Selectable for use when contextually relevant; greyed if already used.

Each item icon is the actual sprite of the treat/object, just rendered small in the pixel-art register matching Pip's gameplay sprite. No new art register needed.

### Decision: controls strip update

The controls strip is now context-sensitive across three verbs:

- **Default exploration:** `↑ INSPECT  •  ↓ COLLECT  •  TAB NOTEBOOK  •  ESC PAUSE`
- **Near a collectible:** the `↓ COLLECT` segment swaps to `↓ COLLECT [TREAT NAME]` — i.e., the strip *names the thing*. Examples: `↓ COLLECT BAMSEMUMS`. This is a small but real tutorial layer.
- **Near an inspectable but no collectible:** as default, but the player visually sees the cool shimmer over what they can interact with.
- **Existing contexts** (dialogue, choices, cinematics) unchanged.

### Decision: blink-back specification

When stomach reaches 0:

1. Pip's sprite fades over `1.2s` to nearly transparent. A faint cool-blue glow trails downward (the same vocabulary used for the now-retired lives "leaving" gesture).
2. Brief black-screen pause (`0.4s`).
3. Pip respawns at the *last room threshold he crossed* — i.e., the doorway or edge where he entered the current room. Stomach restored to a baseline of 60/100 (not full — Pip is recovering, not refreshed).
4. A single italic narration line appears in the dialogue box, centered, no panel: *"The ship lets him back in."* Or similar — the exact wording is content, not spec. Worth refining when implemented.
5. The narration fades after `2s`. Player has control.

The blink-back is *quiet*, not punitive. No flash, no shake, no fail jingle. Pip gets put back. He keeps going.

### Decision: new Ch1 room — the observation deck

A new room is added to Chapter 1, locked into the chapter's structure. Position: **between the kitchen and the dock farewell**. Emotional purpose: a *quiet wonder beat* between Henrik's warmth and the grief of watching the grandparents disembark. The chapter currently moves from kitchen-warmth directly to grandparents-leaving; the observation deck inserts a moment of beauty in between.

**The visual hook:** Pip drifts up to the observation deck and sees the **northern lights** through a wide curved viewport. Bergen is far enough north to see the aurora (this is real — Bergen sits at ~60°N, and northern lights are visible there, especially in winter). The aurora animates softly in cool greens and violets across the upper portion of the room; the lower portion is the deck itself with railings, a few wooden benches, a coiled rope, perhaps a small telescope.

**Emotional shape:** Pip is the only one on the deck. The room is wide and quiet. The aurora moves like slow breath above the ship. Pip can look at it; the player can let him stand there as long as they want. There is no urgency.

**Mechanically:**
- Pip enters the deck from the kitchen-side (left edge).
- The dock-farewell sequence triggers when Pip walks to the deck's right edge — the same way every chapter's exit currently triggers.
- The room contains at least one inspectable (the aurora itself, or the telescope, or the bench — exact inspectable list deferred to implementation).
- The room contains one treat collectible (Ch1's fourth treat — see treat list).

**Out of scope for this sprint:** the room's actual implementation. This sprint locks the room's existence and purpose in the docs. The room is built in a future Ch1 content sprint (likely the same sprint that places the remaining three treats and the cleaning-cart treat).

**Open implementation question (logged below):** what specifically is the treat on the observation deck? A regional Norwegian treat that fits the open-air, slightly contemplative tone of the room — possibly a packet of pastilles, a chocolate left by a stargazer, a small wrapped cake. Deferred to Ch1 content sprint.

### Decision: Ch1 treat list (4 treats)

Chapter 1 has **4 treats**, fewer than the standard 3–6 because the collect verb is taught mid-chapter. The placements are:

1. **A treat hidden in the cabin** (early-chapter, replay reward). Pip cannot collect this on first playthrough because he hasn't learned `↓` yet. The treat *exists* in the room from the start of the chapter, with its warm humming aura visible — but it's a quiet detail the player likely walks past. After learning `↓` in the kitchen, a player who returns to the cabin (or replays the chapter) can collect it. **Suggested treat:** a Smørbukk (Norwegian caramel toffee in yellow wrapper), tucked in the bedside drawer or behind a pillow. Specific treat TBD in Ch1 content sprint.

2. **Bamsemums on the kitchen counter** (the tutorial treat). Placed by Henrik. Discovered by Pip after the lefse-and-gravlaks scene. Teaches the `↓` verb via inline narration. **Locked.** Sprint 13 places this one.

3. **A treat in the janitor's cleaning cart in the dark corridor.** Pip's first encounter with the dark corridor is during the float-discovery sequence (Beat 8). On a return pass through the corridor — after he's learned both `↓` (from the Bamsemums) and float (from the broken-glass moment) — Pip can approach the abandoned cleaning cart and collect a treat tucked inside it. The treat is *placed in the world from the start of the chapter*, but most players will not have the verbs to collect it until they've cleared the kitchen scene. **Suggested treat:** a Skillingsboller (Bergen's signature cinnamon bun) wrapped in waxed paper — a half-eaten end-of-shift snack the janitor left behind. Specific treat TBD in Ch1 content sprint.

4. **A treat on the observation deck.** Found in the new locked observation deck room. Mood-appropriate to the room: open air, aurora overhead, quiet wonder. **Suggested treat:** to be brainstormed in the Ch1 content sprint — could be a chocolate left by a stargazer on a bench, a packet of Smørbukk from someone who came up for the cold and forgot it, or a regional Norwegian sweet that feels contemplative.

**Note on cabin treat as replay reward.** This is the *generalizable pattern* for chapters from Ch2 onward — each chapter has at least one early-chapter treat that's collectible on first playthrough (since by Ch2 the player already knows `↓`). Ch1 is the exception only because the verb is taught mid-chapter. The cabin treat being unreachable first time around is *part of Ch1's structure*, not a bug.

**Per-region treats brainstorm is a recurring sprint deliverable.** Each chapter's treat list will be brainstormed as part of that chapter's content sprint. Future chapters' treat brainstorms should:

- Include 3–6 treats from the chapter's region, distributed beginning-to-end.
- Mix candies, pastries, cheeses, small folk foods.
- Lean on real regional specialties.
- Include at least one cute pun or thematically-on-tone name where natural.
- Be reviewed against tone (no treats hidden in places that would feel emotionally wrong for Pip to take from — the Babcia's-suitcase example is the standing case-law here).

---

## Implementation notes

Each section below specifies *what doc to edit* and *what to add or change*. Use these as a checklist.

### 1. Patch `02-game-design.md`

Add a new section titled **"The collect verb"** (after the existing inspect-verb documentation). Content should cover:

- `↓` collects the nearest collectible (an object marked with the warm-humming sparkle).
- When nothing collectible is nearby, `↓` makes Pip squat — a small visible animation, useful as a brake action and as visible feedback.
- Pressing `↓` near a collectible plays the pickup tween (treat moves to notebook icon) and either consumes the treat (refilling stomach) or stores the item.
- The verb is taught in Ch1 via inline narration at the first collectible. No floating tutorial UI.

Add a new section titled **"The stomach model"** (replacing or superseding the existing strength-meter description, depending on where it lives in this doc). Content should cover:

- The meter represents Pip's stomach — he is a hungry ghost-boy.
- Drained only by *world hazards*: echo-creature bumps, snail slime, dark-corridor lingering, similar gentle environmental costs.
- *Never* drained by puzzle failure. Wrong puzzle choices reveal information, never cost stomach.
- Refilled by eating treats (`↓` collect → auto-eat) and by chapter-ending chef meals.
- At zero stomach: blink-back to last room threshold, restored to baseline (60/100). No life lost. No chapter restart. See `03b-ui-spec.md` for the visual sequence.

Add a new section titled **"Treats: gifts the ship left out for him."** Content should cover:

- 3–6 treats per chapter from Ch2 onward; Ch1 has 4 because the verb is taught mid-chapter.
- Drawn from the chapter's regional cuisine (candies, pastries, cheeses, small folk foods).
- Found in drawers, behind objects, on balconies, in cleaning carts, on observation decks; some require later-earned abilities to reach.
- Distributed beginning-to-end through each chapter, including at least one early-chapter treat for replay value.
- Picked up with `↓`, recorded in the notebook's Items section with a small pixel-art icon and a one-line journal-style annotation.
- Scarcity is the rule. Treats should feel like *gifts*, not Mario coins. If they're cheap, they stop mattering.
- **Tone constraint:** treats are never placed where collecting them would feel emotionally wrong. The grandparents' cabin contains no treat in Ch1; this is the standing case-law for tone-vs-placement decisions.

Add a brief subsection titled **"Useful items vs. treats"** distinguishing the two categories:

- **Treats:** food, consumed on pickup, refill stomach, recorded in notebook.
- **Useful items:** non-food objects (matches, candles, knife), pocketed on pickup, not consumed, used contextually as a fourth dialogue choice when relevant. Also recorded in the notebook's Items section.

Update any existing references to the strength meter being drained by puzzle failure (if any exist) — remove them. The strength meter and puzzle failure are decoupled.

### 2. Patch `03b-ui-spec.md`

**Section 3 (Strength Indicator):** Reframe the section's intro paragraph to make the stomach role explicit. The chewing boy face and stomach pouch already render this — just lock the *language*: this is Pip's hunger, not abstract HP. Reference `02-game-design.md`'s new "Stomach model" section.

Update the *eating* animation description: it now triggers on `↓` collect of a treat, not on any generic `gainStrength()` call. Treats animate as the actual treat sprite traveling from where Pip stood, into the notebook icon, then a separate amber pulse from the notebook icon into the stomach pouch. (Two animations chained — pickup tween, then eating tween.)

Update the *hit* animation description: triggered by world-hazard contact (echo-creature bump, snail slime, etc.). Not triggered by puzzle failure. Add a one-line note: *"Wrong puzzle choices do not affect the stomach meter."*

**Section 4 (Lives Display): RETIRED.** Replace this section's content with a brief note:

> The three-lives display has been retired. The game's failure mode is now blink-back (see Section 10). There is one continuous Pip, who gets gently returned to the last room threshold when his stomach is empty. No lives counter.

Leave the section in place as a placeholder noting the retirement, so future readers of the doc can see the decision and date.

**Section 5 (Journal Screen):** Rename throughout to **Notebook Screen.** Update the entry trigger: `TAB`, not `ESC`. Add a new third-section description:

> **Third page — Items.**
>
> Accessed by paging right past memories. Contains a grid of small pixel-art icons, each representing a treat Pip has eaten or an object he has pocketed. Each icon is sized ~`16×16px`, rendered in the same pixel-art register as Pip's gameplay sprite (Register A). Below each icon: a one-line annotation in Pip's handwriting (`Cormorant Garamond` italic, small).
>
> Treats (eaten): displayed at full opacity. The annotation reads like a memory — *"Bamsemums — from Henrik, in the kitchen."*
>
> Useful items (unused): displayed at full opacity. The annotation reads like inventory — *"A candle — from Henrik."*
>
> Useful items (already used): displayed at `40%` opacity with a small strikethrough.
>
> Selectable items: when a dialogue scene allows an item to be used, the relevant item glows softly in the corner of the notebook icon. The player can also see the available item appear as a dialogue choice — selection-from-notebook is *not* the primary way items are used. The notebook display is the *record*; dialogue choices are the *interaction*.

**Section 1 (Controls Strip):** Update the default-exploration strip to:

> `↑ INSPECT  •  ↓ COLLECT  •  TAB NOTEBOOK  •  ESC PAUSE`

Add a new context: **Near a collectible.** When Pip is within proximity range of a warm-humming collectible, the `↓ COLLECT` segment becomes `↓ COLLECT [TREAT NAME]` (or `↓ COLLECT [ITEM NAME]` for useful items). The name appears in `var(--warm-pool-amber)` to signal warmth and pickup-readiness.

**New Section (insert before current Section 10 game-over):** **"The collectible sparkle convention."** Content:

> Inspectable objects and collectibles use two visually distinct sparkle modes so the player learns by sight which verb is available:
>
> - **Inspect sparkle** (cool shimmer): existing behavior. A small drifting upward sparkle in `var(--warm-pool-amber)` at standard intensity. Used for all `↑ INSPECT` targets.
> - **Collect aura** (warm hum): a softer, broader, *pulsing* aura. Larger radius than the inspect sparkle. Slower pulse (1.2s cycle). Saturated warm amber, no drift — present and steady. Used for all `↓ COLLECT` targets.
>
> The visual vocabulary should read distinctly even at small sizes: a player glancing at a room should be able to tell which objects to inspect and which to pocket without thinking.

**Section 10 (Game-Over Screen): RETIRED.** Replace this section's content with a brief note:

> The puddle-ghost game-over has been retired. With blink-back as the universal failure mode, no terminal game-over state exists for stomach loss. Players can quit from the pause menu (Sprint 05) if they want to stop playing. The game itself never tells them they have failed.

**New Section (insert before retired Section 10): "Blink-back."** Content per the "Decision: blink-back specification" above. Include:

- Sprite fade timing: `1.2s`
- Black pause: `0.4s`
- Respawn location: last room threshold crossed
- Stomach restored to: 60/100
- Narration line displays for 2s after respawn
- No flash, shake, or fail audio cue

### 3. Patch `04-chapter-01-cabin-646.md`

#### 3a. Update the rooms list

Find the section listing Ch1's rooms. Update the count from **five rooms** to **six rooms**. The updated list:

> - **Cabin 646** — where Pip wakes (after the Sprint 10.7 opening restructure, Pip wakes in the hallway and the cabin becomes a destination)
> - **The hallway** — corridors, the passenger and the janitor
> - **Grandparents' cabin** — the gut-punch
> - **Dark corridor / stairwell** — the broken-light puzzle, the float discovery
> - **The kitchen** — Henrik
> - **The observation deck** *(new — see "The observation deck" section below)* — a quiet wonder beat between kitchen and dock farewell

The dock farewell still ends the chapter; it's a closing sequence, not a room.

#### 3b. Insert a new beat after Henrik's kitchen scene

After Henrik's kitchen scene (the scene where he feeds Pip lefse and gravlaks and gives him the notebook), insert a new beat:

> ### Beat [next number]: The Bamsemums on the counter
>
> Henrik is finishing cleaning up. Pip drifts around the kitchen, settling. On the counter, half-hidden behind a wooden cutting board, a small bag of Bamsemums sits. They emit a warm humming glow — different from the cool shimmer Pip has learned to recognize on inspectable objects.
>
> Pip approaches. The dialogue box opens:
>
> > *A small bag of Bamsemums, foam-and-chocolate bears, sits on the counter. Henrik didn't say they were for him. They are.*
> >
> > *He could pocket this. ↓ to collect. He'll find it later in his notebook.*
>
> Player presses `↓`. The Bamsemums tweens into the notebook icon in the HUD corner. The notebook icon pulses warm. Pip's stomach refills by a small amount (perhaps to 70 or 75/100 — exact value TBD).
>
> Internally: the Bamsemums is added as the first entry in the notebook's Items section, with the annotation: *"Bamsemums — from Henrik, in the kitchen."*
>
> If the player opens the notebook (`TAB`) at this point, they see their first Items page entry.
>
> The beat ends with Pip continuing toward the observation deck (the next room).

#### 3c. Insert a new section: "The observation deck"

After the Bamsemums beat, before the dock-farewell section, insert a new section describing the observation deck room. Content:

> ## The observation deck
>
> Position in the chapter: between Henrik's kitchen and the dock farewell. Pip exits the kitchen and drifts up a short stairway to the deck — or wanders out and finds himself there. Implementation detail of how he arrives is TBD.
>
> **Emotional purpose.** A quiet wonder beat. Pip has just been seen and fed by Henrik. He has just received the empty notebook. He has not yet seen his grandparents leave. The observation deck is the *breath* between those two moments. It is the chapter saying: *there is also beauty in this world; you can stop for it.*
>
> **The visual hook.** A wide curved viewport runs along the top half of the room. Beyond it: the northern lights — the aurora, in cool greens and violets, moving slowly across the dark sky. The room is open-air at one end (Pip can feel the cold without being affected by it). A few wooden benches. A coiled rope. Possibly a small telescope on a tripod. The deck's interior is dim; the warmth in this room is *cosmic*, not domestic — the aurora is the light source, faint and shifting.
>
> Bergen sits at ~60°N. The aurora is visible there, especially in winter. This is realistic, not invented.
>
> **Treat placement.** One treat is hidden somewhere on the deck (specific treat TBD in Ch1 content sprint). Plausible locations: tucked inside a bench's cushion, behind the telescope, in a coil of rope, on a railing where someone set it down.
>
> **Inspectables.** At least one. Likely candidates: the aurora itself (atmospheric narration about its movement and what it makes Pip feel); the telescope (Pip looks through it; sees a far shore or the ship's wake); the bench (someone was sitting here recently); the coiled rope (a working detail of the ship that Pip notices because the room is otherwise still). Exact inspectable list deferred.
>
> **Exit.** Walking to the right edge triggers the dock-farewell sequence. This is the same exit pattern every chapter uses.
>
> **Implementation status.** This room is *locked in the docs* as canonical Ch1 content. Its implementation — background art, navigation, the aurora visual, the beat dialogue, the treat — is deferred to a future Ch1 content sprint. Sprint 13 does not implement this room.

#### 3d. Update the "Abilities earned" section

Add `↓ COLLECT` as the verb earned at the Bamsemums beat (or note that it's a *built-in verb taught here*, distinguishing from discovered abilities).

#### 3e. Update the "What this chapter teaches the player" section

Add bullets:

- That the world contains hidden treats, scattered for him to find.
- That food picked up refills his stomach — *the verb is the system*.
- That the notebook keeps a record of what he's eaten.
- That the world also contains beauty without purpose — the northern lights, seen for their own sake.

### 4. Patch `ch01-cabin-646-outline.md`

This is the chapter's narrative outline doc (separate from `04-chapter-01-cabin-646.md`, which is the implementation-grade beat list).

#### 4a. Update the Setting section

Find the rooms list under "Setting" and update it to reflect the six-room structure. The new list mirrors the one in `04` (see 3a above).

#### 4b. Add a new section: "Treats in Ch1"

Insert a new section between "Abilities earned" and "Objects earned" (or wherever fits the doc's flow):

> ## Treats in Ch1
>
> Chapter 1 has four treats. Fewer than the 3–6 standard for later chapters because the collect verb is taught mid-chapter (Bamsemums on the kitchen counter); earlier placements function as replay rewards rather than first-playthrough finds.
>
> 1. **Cabin (early, replay-reward).** A hidden treat in the cabin Pip starts the chapter near. The aura is visible from the start of the chapter, but Pip cannot collect it on first playthrough because he hasn't learned `↓` yet. Specific treat TBD — suggested: Smørbukk, in the bedside drawer.
> 2. **Kitchen counter (tutorial).** Bamsemums, placed by Henrik. The treat that teaches the `↓` verb. Locked.
> 3. **Dark-corridor cleaning cart.** A treat tucked into the janitor's abandoned cleaning cart. Collectable on a return pass after Pip has learned both `↓` (kitchen) and float (broken-glass moment). Specific treat TBD — suggested: Skillingsboller, half-eaten and wrapped in waxed paper.
> 4. **Observation deck.** A treat on the new locked observation deck room. Mood-appropriate to the open-air aurora setting. Specific treat TBD — could be a chocolate left by a stargazer, or similar.
>
> No treat is placed in the grandparents' cabin. The room is grief-coded; the gesture of Pip eating a snack while Babcia sobs nearby would feel wrong. This is the standing case-law for treat-placement-vs-tone decisions across the whole game.

#### 4c. Update the "Provisional answers" or "Open questions" section (if present)

If the outline doc has an open-questions section, add:

- The specific treat for the cabin replay-reward (suggested Smørbukk).
- The specific treat for the cleaning cart (suggested Skillingsboller).
- The specific treat for the observation deck (TBD).
- The observation deck's inspectable list.
- The observation deck's specific position relative to the kitchen exit and dock-farewell entry.

If the section doesn't exist, these go into `06-roadmap-and-open-questions.md` open questions instead.

### 5. Patch `06-roadmap-and-open-questions.md`

#### Decisions Log additions (append to bottom of table, dated 2026-05-14)

> | 2026-05-14 | **`↓` is the collect verb.** Built-in, not discovered. Taught diegetically at first treat in Ch1. When nothing collectible is nearby, `↓` makes Pip squat — a brake action and visible feedback. |
>
> | 2026-05-14 | **Collectible sparkle is warm and humming, distinct from inspect sparkle.** Two visual vocabularies: cool shimmer = inspect, warm hum = collect. |
>
> | 2026-05-14 | **`TAB` opens the notebook; `ESC` is reserved for pause.** Was previously `ESC` for both. |
>
> | 2026-05-14 | **The "journal" is renamed "notebook" throughout the project.** Better matches Henrik's in-fiction gift and avoids diary connotation. |
>
> | 2026-05-14 | **Strength meter is the stomach model.** Drained only by world hazards (echo-creatures, slime, lingering). Never by puzzle failure. Refilled by treats and chef meals. |
>
> | 2026-05-14 | **Blink-back replaces lives.** At zero stomach: Pip fades, reappears at last room threshold, stomach restored to baseline (60/100). No life lost. No chapter restart. Quiet, never punitive. |
>
> | 2026-05-14 | **Lives system retired.** Three-lives display from `03b-ui-spec.md` Section 4 removed. Game has one continuous Pip. |
>
> | 2026-05-14 | **Puddle-ghost game-over retired.** No terminal failure state. Players quit via pause menu. |
>
> | 2026-05-14 | **Treats system locked.** 3–6 per chapter from Ch2 onward; Ch1 has 4 because verb taught mid-chapter. Hidden, on-theme to region, distributed beginning-to-end. Picked up with `↓`. Auto-consume on pickup, recorded in notebook Items section. Scarcity is the rule. Tone trumps placement — no treats in grief-coded locations. |
>
> | 2026-05-14 | **Notebook has three sections: Recipes, Memories, Items.** Items section includes both eaten treats (consumed, recorded) and useful items (knife, matches, candle — usable contextually). |
>
> | 2026-05-14 | **Ch1 tutorial treat: Bamsemums, left by Henrik.** Discovered in kitchen after the lefse-and-gravlaks scene. Teaches `↓` collect verb via inline narration. |
>
> | 2026-05-14 | **Ch1 has 4 treats total.** Cabin (replay-reward); kitchen Bamsemums (tutorial); dark-corridor cleaning cart (return-pass collectible); observation deck. No treat in the grandparents' cabin (tone). |
>
> | 2026-05-14 | **New Ch1 room locked: the observation deck.** Quiet wonder beat between kitchen and dock farewell. Northern lights through a wide viewport. Implementation deferred to future Ch1 content sprint. |

#### Open Questions list — additions

Add to the Open Questions list:

> - **Item-use UI behavior.** When a player has a useful item (matches, candle, knife) in the notebook, and a dialogue scene allows it to be used, how is that surfaced? Pulled by the dialogue offering it as a 4th choice, by the notebook glowing, by the item icon highlighting on the HUD? Flagged 2026-05-14. To be settled before Ch3 (first useful-item-use chapter).
>
> - **Ch1 cabin replay-treat: specific treat and exact placement.** Suggested Smørbukk in the bedside drawer; alternatives welcome. Flagged 2026-05-14. To be resolved in Ch1 content sprint.
>
> - **Ch1 cleaning-cart treat: specific treat.** Suggested half-eaten Skillingsboller wrapped in waxed paper. Flagged 2026-05-14. To be resolved in Ch1 content sprint.
>
> - **Ch1 observation deck treat: specific treat.** Mood-appropriate to open-air aurora setting. TBD. Flagged 2026-05-14. To be resolved in Ch1 content sprint.
>
> - **Observation deck implementation.** Background art, navigation, aurora visual, beat dialogue, inspectable list, exact arrival mechanism from kitchen. Locked in docs but not yet built. Flagged 2026-05-14. Will be its own sprint (or part of the broader Ch1 content sprint).
>
> - **Treat-eaten vs. treat-collected distinction.** The current decision is that treats are *consumed on pickup* (auto-eat). If playtest suggests players want to hold treats for later, this might need to flip to "pocket now, eat with a separate action." Watch in playtest. Flagged 2026-05-14.

#### Open Questions — resolved (move to Decisions Log)

The following items in the existing Open Questions list are now resolved by this sprint's decisions and should be removed from the open list:

- Anything referencing "what role does the strength meter play" (resolved — stomach, drained by world hazards only).
- Anything referencing "lives system" or "three-lives display" (resolved — retired).
- Anything referencing "what does `↓` do" or "down arrow" (resolved — collect verb).

Search the doc for these terms and remove the open-question entries; the new Decisions Log rows replace them.

### 6. Patch `art-asset-list.md`

Update the **Universal UI elements** table:

- **`ui-sparkle.png`** — update description to "Cool drifting sparkle for inspect targets. 4-frame loop." This is now one of *two* sparkle types.
- **NEW: `ui-collect-aura.png`** — add new row:

> | `ui-collect-aura.png` | UI animation set | Warm pulsing aura for collectible objects. 6-frame loop. Larger radius than inspect sparkle. Slow pulse (1.2s cycle). Saturated warm amber, no drift. | Pixel art animated soft aura, 6-frame cycle, broad warm amber radial glow pulsing slowly, ~12×12 pixels per frame, saturated and present, hard pixel edges, distinct from a sparkle — this is a hum, not a glint. |

Add a new **Treats** subsection (or category) at an appropriate place in the doc. Initial entries (one locked, three placeholder):

> | `treat-ch01-bamsemums.png` | Treat sprite | Small bag of Norwegian foam-and-chocolate bears, ~`12×16px`. Picked up in Ch1 kitchen. First treat the player learns the system with. | Pixel art tiny bag of gummy bears in primary colors (red, yellow, green, white), translucent twist-tied bag, ~12×16 pixels, hard pixel edges, cheerful and small, sits on a kitchen counter. |
>
> | `treat-ch01-cabin.png` | Treat sprite | TBD — suggested Smørbukk caramel toffee in yellow wrapper. Cabin replay-reward treat. ~`10×14px`. | TBD per Ch1 content sprint. |
>
> | `treat-ch01-cleaning-cart.png` | Treat sprite | TBD — suggested half-eaten Skillingsboller wrapped in waxed paper. Cleaning-cart treat in dark corridor. ~`14×16px`. | TBD per Ch1 content sprint. |
>
> | `treat-ch01-observation-deck.png` | Treat sprite | TBD — mood-appropriate to open-air aurora setting. Observation deck treat. ~`12×16px`. | TBD per Ch1 content sprint. |

Add a new **Ch1 rooms** entry for the observation deck (in whichever room-backgrounds table holds the Ch1 room art):

> | `room-ch01-observation-deck.png` | Room background | Ship observation deck, open-air. Wide curved viewport with the aurora visible across the upper portion in cool greens and violets. Dim interior, wooden benches, coiled rope, possibly a small telescope. Cosmic-lit, not domestic. | Pixel art side-scrolling room background at 480×270, an Edwardian cruise ship observation deck at night, wide curved viewport window taking the upper half, the northern lights visible beyond in slow cool greens and violets, dim wooden-paneled deck interior, two or three simple wooden benches, a coiled rope, a small brass telescope on a tripod, faint cold-blue ambient light from the aurora through the glass, no warm light sources, atmospheric quiet, painterly pixel art. |

Update any references to the journal cover/pages to call it "notebook" instead of "journal" (file names like `ui-journal-cover.png` may stay for now to avoid filename churn — but the *description* updates).

### 7. Decisions to log in this sprint's own commit message

The commit message should list every Decisions Log row added, so a grep of the git log can find them.

## Files to create or modify

**Modify:**

- `design-docs/02-game-design.md` — three new sections (collect verb, stomach model, treats), plus updates to existing strength references.
- `design-docs/03b-ui-spec.md` — Section 3 reframed; Section 4 retired; Section 5 renamed + Items page added; Section 1 controls strip updated; new "collectible sparkle convention" section; new "blink-back" section; Section 10 retired.
- `design-docs/04-chapter-01-cabin-646.md` — rooms list updated to six rooms; new Bamsemums beat inserted after Henrik kitchen scene; new "observation deck" section inserted; abilities-earned and chapter-teaches sections updated.
- `chapter-specs/ch01-cabin-646-outline.md` — rooms list updated; new "Treats in Ch1" section added; open-questions or provisional-answers section updated.
- `design-docs/06-roadmap-and-open-questions.md` — thirteen new Decisions Log rows; six new Open Questions; three Open Questions removed (now resolved).
- `art-asset-list.md` — sparkle row updated, collect-aura row added, treats subsection added with four Ch1 treat entries (one locked, three placeholder), observation deck room background entry added, journal→notebook description updates.

**No new files.** This sprint is patches, not new docs.

## Out of scope

This sprint does **not** include:

- Any game code changes. No `↓` handler, no stomach rework, no sparkle redesign, no notebook Items section, no blink-back, no observation deck implementation. All implementation work is Sprint 13 (the companion implementation sprint, for the collect verb + stomach + Bamsemums tutorial) plus future Ch1 content sprints (for the observation deck, cleaning-cart treat, cabin replay treat).
- Specific treat selection for the cabin, the cleaning cart, and the observation deck. Suggestions are noted; resolution is in the Ch1 content sprint.
- Brainstorming treats for Ch2 through Ch8. Those are each chapter's content-sprint deliverable.
- Resolution of the item-use UI behavior. Flagged in Open Questions; resolved before Ch3.
- Any new art commissions or placeholder sprite generation.
- Refining the exact blink-back narration line. Content, not spec.
- Refining the Bamsemums tutorial narration line. Content, not spec.
- The observation deck's exact inspectable list, beat dialogue, or arrival mechanism from the kitchen. The room is locked in the docs; details deferred.

If implementation reveals one of these is unavoidable, **stop and ask.**

## Test checklist

After Claude Code applies the patches:

1. **`02-game-design.md`** — search for "collect verb": present. Search for "stomach": present, with drain rules. Search for "treats": present, with scarcity rule, beginning-to-end rule, and tone constraint. No remaining language about strength being drained by puzzle failure.
2. **`03b-ui-spec.md`** — Section 3 reframes as stomach. Section 4 marked retired. Section 5 renamed to Notebook. Items section description present. Section 1 controls strip updated. New sparkle convention section present. New blink-back section present. Section 10 marked retired.
3. **`04-chapter-01-cabin-646.md`** — rooms list shows six rooms including observation deck. New Bamsemums beat present after Henrik kitchen scene. New observation deck section present, after Bamsemums beat and before dock farewell. Abilities-earned section mentions `↓ COLLECT`. Teaching section mentions treats and northern lights.
4. **`ch01-cabin-646-outline.md`** — rooms list updated to six. "Treats in Ch1" section present with four-treat list and tone-constraint note about no treat in grandparents' cabin.
5. **`06-roadmap-and-open-questions.md`** — thirteen new Decisions Log rows dated 2026-05-14 present at the bottom of the log. Six new Open Questions present. The three resolved Open Questions (strength role, lives, down-arrow) are removed.
6. **`art-asset-list.md`** — `ui-sparkle.png` description updated. `ui-collect-aura.png` row present. Treats subsection present with four Ch1 entries (Bamsemums locked; three placeholders). Observation deck room background entry present.
7. **Single commit.** `git log --oneline -1` shows one commit covering all of the above.
8. **No code changes.** `git diff --name-only HEAD~1` shows only `.md` files in `design-docs/`, `chapter-specs/`, and `art-asset-list.md`. No changes in `game/`.

## Report back

After Sprint 12 lands, Claude Code reports:

1. Confirmation that all six docs are patched.
2. The thirteen Decisions Log row dates and one-line summaries (for verification).
3. Any contradictions or stale references discovered during the patching pass (especially any places where the lives system, the puddle-ghost screen, the journal-not-notebook term, or the five-room Ch1 count appears outside the docs being patched here — e.g., in older sprint specs, in `08-character-reference-sheets.md`, in `github-structure.md`).
4. Any open questions surfaced that should be added to the Open Questions list beyond the six named above.
