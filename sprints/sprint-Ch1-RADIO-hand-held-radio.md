# Sprint Ch1-RADIO: Hand-Held Radio in the Coat

Child of the Ch1 verbatim goal (#132). Tracking issue: **#133**.

## Goal

Build Julia's hand-held radio version. **Ruling reversal:** the item-3 carve-out held open
through #111 → #129 → #130 → #132 is lifted. The radio moves from the windowsill into
Dziadek's coat pocket, the `radioDiscovered` / `janitorPaged` chain is re-homed so every gate
stays satisfied, and the beat's dialogue is verbatim from the playscript.

## Why it needed a sprint rather than a text swap

The playscript describes a hand-held radio in a coat pocket; the shipped design was a
windowsill cabinet radio (`gp-radio`, world-x 200) with three gated dialogue states. A
verbatim text apply would have left two radios in the room **and deleted the choice block that
sets `chapterState.janitorPaged`** — leaving the janitor unpaged, the cart unmoved and the
stairwell shut. That risk is what produced the carve-out; this sprint discharges it properly.

## What changed

### Stage 1 — the armchair hosts the chain (`5c2d1de`)

`gp-armchair` (world-x 280) gains a `get node()` carrying the three states the windowsill
object used to own:

| State | Condition | Node | Sets |
|---|---|---|---|
| 3 | `cartFound` (tested **first**) | `gp-radio-page-choice` | `janitorPaged`, + CP-2b backstop `radioDiscovered` / `talkThroughSpeakers` |
| 1 | `!radioDiscovered` | `gp-armchair-inspect` | `radioDiscovered`, `talkThroughSpeakers` |
| 2 | otherwise | `gp-armchair-passive` | — |

Dialogue is verbatim from the playscript. `"(not dialogue)"` staging notes are not applied as
lines, consistent with the convention used across the goal.

The windowsill `gp-radio` object is removed. The playscript's Scene-3 inspectable list —
"armchair, framed photo, suitcase, Babcia, Dziadek" — corroborates it.

**CP-2b preserved deliberately:** `cartFound` is tested before the discovery state, so the page
is reachable on the first inspect post-cart; and paging grants the radio ability even if the
discovery beat was never seen.

### Stage 2 — the false line goes (`b8a4a0a`)

`gp-dziadek-inspect` loses *"On the windowsill sits the small radio he listens to in the
evenings. It is off, now."* — now false, and leaving it would point the player at a radio that
does not exist (a false direction under the goal's hard stop 1). The playscript lists this node
with no dialogue, which is ambiguous, so only the line the ruling falsifies was removed; the
other two stand.

### Stage 3 — render + affordance (`46bb4f8`)

`drawDziadekRadio()` rewritten as a small hand-held set (7×10, stub antenna) tucked into the
coat's right lapel at world-x 280, anchored to `FLOOR_Y`, drawn after the armchair/coat block
so it reads as sitting in the pocket. The proximity-crackle shimmer re-keys from `pip.x - 200`
to `pip.x - 280`, so the discoverability affordance moves with the object.

## Verification

- **Conformance: 108 structural comparisons, ZERO divergence — with no exemptions.** The
  carve-out is fully closed; all of Ch1 now matches the playscript verbatim.
- **Traversal proved by simulation, not reading.** The real `gp-armchair` object was lifted out
  of the built file and its getter executed against stub state:
  - Order A (radio → cart): discovery → passive → paging, all flags set.
  - Order B (cart first, radio never discovered): paging on first-ever inspect, CP-2b backstop
    grants the ability.
  - **No-strand sweep:** all 8 combinations of `cartFound` × `radioDiscovered` × `janitorPaged`
    yield a node, and paging is reachable from every post-cart state.
- Downstream chain unchanged: `janitorPaged` → janitor walk (`:4028`) → `janitorWalked` →
  `dc-stairwell` gate, which still nudges rather than dead-ends when blocked.
- Backtrack intact: `gp-door-return` → "Go in." → `startTransition('grandparents')`.
- No windowsill-radio reference remains outside explanatory comments.
- `node --check` PARSE OK.

## Judgment calls, flagged not buried

1. **The paging beat has no Listen / Not-now choices** — the script gives it one spoken line.
   Post-cart inspection now pages immediately, which satisfies CP-2b's intent and removes a
   decline path that could only delay progress.
2. **`gp-dziadek-inspect`'s other two lines were kept** despite the playscript showing the node
   empty — silence is not evidence they should go, and deleting them was not required by the
   ruling.

## Out of scope

Ch2–Ch8; room layout; the backtrack structure (the player still returns to the cabin to page,
exactly as the script's Scene-5 ACTION describes); any new art beyond repositioning the
existing radio sprite.

## Test checklist

1. Conformance zero divergence, no exemptions. ✅ static
2. Both orderings complete; all flags set. ✅ simulated
3. No stranded state. ✅ simulated (8/8)
4. No windowsill reference. ✅ static
5. `node --check`. ✅
6. Push verified; tag on remote; live hash matches committed file.
7. **Julia walks Ch1 in-browser** — the radio has moved from the windowsill to the coat, and
   the paging beat is now a single line with no choices.
