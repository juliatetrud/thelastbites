# Sprint 04: Helga / Bad-Ghost-Detector Cleanup

## Goal
Remove all stale references to "Helga" (the cat was renamed to Pätu; the rename was only partially propagated) and to "Pätu's bad-ghost-detector beat" (retired as canon; framing not yet patched out of the docs).

## Definition of done
- Zero occurrences of "Helga" remain in any canonical doc in the project root.
- Zero occurrences of "bad-ghost-detector" or "detector beat" remain framing Pätu's hiss as a *canonical reserved beat*. (The hissing pose itself stays canon — only the framing-as-reserved-beat is being removed.)
- The verification `grep` (see Test checklist) returns nothing in canonical docs.
- All affected files still read cleanly after the edits — no orphaned section headers, no dangling cross-references, no broken sentence structures left behind.

## Context from design docs

Two cleanups, both already decided in `06-roadmap-and-open-questions.md` but not yet propagated:

**Helga = Pätu.** The cat had two working names early in the project. Pätu was locked. Helga is stale and was already partially removed from `01-story-bible.md` and the "Forward Reference" section of `03-art-and-aesthetic.md`. Several other locations were missed.

From `06-roadmap-and-open-questions.md` line 253 (2026-05-08 Decisions Log):
> Doc 03 stale-canon fix. "Forward Reference: Helga the Cat" section updated to "Forward Reference: Pätu the Cat" with corrected canon (Estonian, not Norwegian; not hostile to Pip; the wariness in Ch2 is the Haldjas's). Cross-references the bible for full character details.

That fix propagation is what this sprint completes.

**Bad-ghost-detector beat.** Pätu was originally supposed to have a canonical mid-game beat where her hiss formally registers a bad ghost for the first time. That framing was retired.

From `06-roadmap-and-open-questions.md` line 277 (2026-05-09 Decisions Log):
> Pätu's "bad-ghost-detector" beat retired. Earlier bible language reserved a canonical mid-game beat where Pätu's hiss formally registers a bad ghost. That framing is dropped. Pätu is simply a good judge of character — she hisses at things that are wrong, doesn't hiss at things that are fine. No reserved beat. Supersedes the 2026-05-09 entry above (Pätu's bad-ghost-detector beat is not in Ch4) — there is no such canonical beat to assign anywhere. Bible language to be patched accordingly.

The phrase to patch out in each location is the *"canonical bad-ghost-detector beat"* framing — wherever an outline says *her hiss here doesn't count, the canonical beat is later, unassigned*, that whole framing comes out. She just hisses when she senses something wrong. The hissing sprite-pose itself remains canon and should not be removed from sprite-need lists; only its label as "the detector beat" changes.

## Implementation notes

### Files affected and exact edits

#### 1. `02-game-design.md`

Has the most substantive Helga content in the project — an entire section.

- **Lines 368 and 378–386:** delete the entire "Helga the Cat" section and the line on line 368 that mentions her in passing. Pätu's full canon already lives in `01-story-bible.md`'s "Pätu the Cat" section; that's the authoritative source. Doc 02 doesn't need a duplicate.
- If the doc references "Helga" elsewhere outside that section (one-off mentions in puzzle examples, etc.), replace each instance with "Pätu."
- Read the surrounding paragraphs after each deletion to ensure flow still works. If the deleted section was referenced by a "see below" or "as described above," fix or remove those pointers.

#### 2. `03-art-and-aesthetic.md`

- **Line 338:** the line reading something like *"Helga the cat (28-36 pixels): NOT an echo. Real, alive, recurring NPC. First appearance Chapter 2."* — replace "Helga the cat" with "Pätu the cat" and verify the remaining facts (first appearance Ch2, not-an-echo, real-alive-recurring) are all consistent with current Pätu canon. They are. Keep the sprite-scale note.
- **Line 465:** the sprite-needs list line that mentions a *"hissing-pose (for the bad-ghost-detector beat later in the game)"* — keep the hissing-pose, change the parenthetical. Suggested replacement: *"hissing-pose (for moments when Pätu reads something as wrong)."*

#### 3. `06-roadmap-and-open-questions.md`

This file has the most touches but they're surgical.

- **Line 24** (the architecture-pivot summary): *"recurring cat NPC (Helga)"* — change "Helga" to "Pätu."
- **Line 85** (roadmap checkbox): *"Introduce Helga the cat in this chapter's traversal (first appearance)"* — change "Helga" to "Pätu." Verify the chapter assignment (Ch2 traversal) is still correct per current canon. It is.
- **Line 240** (Decisions Log entry establishing Helga as Norwegian/Henrik's cat): this entire entry is now stale and contradicts later Pätu canon (Estonian, Leida's adoption story). **Delete the entry entirely.** The replacement canon for Pätu lives in `01-story-bible.md`; this Decisions Log entry was the working-version that got superseded.
- **Line 253** (the 2026-05-08 entry noting the doc 03 forward-reference was fixed): **keep this entry**. It's a useful breadcrumb showing the rename happened. Just verify it still reads correctly after the surrounding edits.
- **Line 262** (the 2026-05-09 entry saying the bad-ghost-detector beat is "not in Ch4" and "unassigned"): **delete this entry entirely.** It's superseded by line 277. Optionally replace with a one-liner noting it was superseded, but cleaner to just delete since line 277 is now the authoritative entry.
- **Line 277** (the 2026-05-09 retirement entry): keep, but trim the "supersedes the entry above" phrase if the superseded entry has been deleted. The decision itself stays.

#### 4. `sprint-00-art-pipeline-test-patu.md`

- **Line 34:** the sprite-needs sentence that mentions *"hissing-pose (for the bad-ghost-detector beat later in the game)"* — same fix as `03-art-and-aesthetic.md` line 465. Change parenthetical to *"hissing-pose (for moments when Pätu reads something as wrong)."*
- **Line 84:** the AI prompt that describes the pose as *"the bad-ghost-detector pose"* — replace with simply *"the alert-defensive pose"* or *"the warning pose."* The visual description of the pose itself (fluffed-up, arched, ears flat, hissing) stays unchanged — only the *label* for what the pose represents shifts.

#### 5. `ch03-southampton-outline.md`

- **Line 100:** the parenthetical *"(Note: this is generic guard-cat behavior, not Pätu's canonical bad-ghost-detector beat. The Shuck is a folkloric omen, not a bad ghost. Her detector beat lands in a later chapter, against an actual bad ghost.)"* — replace with a simpler note: *"(Note: the Shuck is a folkloric omen, not a haunting bad ghost — Pätu's hiss here reads as guard-cat behavior rather than a deeper alarm.)"* The framing-as-canonical-reserved-beat language is what's being removed.
- **Line 315** (in the "What this chapter is NOT" section): the bullet *"Not where the bad-ghost-detector beat lands. Pätu hisses at the Black Shuck in Beat 2, but the Shuck is a folkloric omen, not a bad ghost. Her hiss here is generic guard-cat behavior. Her canonical bad-ghost-detector beat still lands in a later chapter, against an actual bad ghost. Unassigned."* — **delete this entire bullet.** The retirement of the canonical beat makes the whole bullet obsolete.

#### 6. `ch04-turkiye-outline.md`

- **Line 368** (in the "What this chapter is NOT" section): the bullet *"Not the bad-ghost-detector beat. Pätu hisses at the Karakoncolos in Beat 2, but the Karakoncolos is a folkloric monster, not a haunting bad ghost. Her canonical bad-ghost-detector beat is not in Ch4 — it lands in a later chapter against an actual bad ghost. (Decision logged.)"* — **delete this entire bullet.** Same reason as Ch3 line 315.

### Notes on the edits

- **Do not touch `08-character-reference-sheets.md`** if it exists in the project root. That draft document is being rewritten separately in a follow-up pass and should not be edited by this sprint. (It contains its own copies of these stale references — they'll be cleaned up in the rewrite.)
- **Do not touch any sprint-NN docs other than `sprint-00-art-pipeline-test-patu.md`.** Other sprint docs are historical artifacts of how the project got here; they're not canonical reference and don't need cleanup.
- **Do not edit `art-asset-list.md`** unless it has a Helga reference that came up in the grep (it shouldn't, but verify). If it does, only fix the Helga reference, nothing else.
- **Do not "improve" any other content** while you're in these files. Mechanical edits only. Anything you spot that looks wrong but isn't on the edit list above should be noted in a comment at the end of the session, not changed.

## Files to create or modify

Modify:
- `02-game-design.md`
- `03-art-and-aesthetic.md`
- `06-roadmap-and-open-questions.md`
- `sprint-00-art-pipeline-test-patu.md`
- `ch03-southampton-outline.md`
- `ch04-turkiye-outline.md`

Create: none.

## Out of scope

- Editing `08-character-reference-sheets.md` (rewritten separately).
- Editing any other sprint-NN doc besides Sprint 00.
- Any other doc improvements, typo fixes, or restructurings.
- Story or design changes — this is purely a stale-canon cleanup.
- Adding new content anywhere. If a deletion leaves a gap, fix the gap by adjusting surrounding sentences only — do not write new paragraphs.

## Test checklist

After all edits:

1. Run `grep -rn -i "helga" .` from the project root.
   - **Expected:** zero results in canonical docs (`*.md` files in project root).
   - If anything still matches, fix it.

2. Run `grep -rn -i "bad-ghost-detector\|bad ghost detector\|detector beat" .` from the project root.
   - **Expected:** zero results in canonical docs *except* possibly in the retained 2026-05-09 retirement entry in `06-roadmap-and-open-questions.md` line 277, which *describes* the retired framing. That single occurrence is fine.
   - If anything else still matches, fix it.

3. Read each modified file's affected section end-to-end. Confirm:
   - No orphaned section headers ("## Helga the Cat" followed by nothing)
   - No dangling cross-references ("see Helga section above")
   - No broken sentence flow at edit boundaries
   - No accidentally-deleted adjacent content

4. Verify `01-story-bible.md` was **not** modified by this sprint. The bible's Pätu section is the authoritative canon and was already correct — it should be untouched.

5. Report any references found that weren't in the edit list above — they're new findings worth noting.
