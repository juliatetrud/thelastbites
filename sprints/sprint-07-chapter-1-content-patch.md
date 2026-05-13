# Sprint 07: Chapter 1 Content Patch

## Goal

Reconcile every narration line, choice label, and cinematic line currently in Chapter 1 to the new voice rules locked in `01-story-bible.md` (third-person, active, present-tense, full sentences, attributed dialogue). Text only — no mechanics, art, scale, or system changes.

## Definition of done

- Every cabin inspectable (door + 3 sub-choices, porthole, bed) renders new text per the table below.
- Every hallway inspectable (bulletin board, luggage cart, oil lamp, grandparents' door) renders new text per the table below.
- The grandparents' cinematic plays the new 9 lines (was 9 — same line count, all text replaced or restructured).
- Every grandparents'-room inspectable (Babcia, Dziadek, photograph, suitcase) renders new text per the table below.
- The grandparents' door return-state line renders new text.
- All `italic: true` flags reviewed and adjusted per rule 5/6 — italic only for direct interior thought, roman for all narration.
- Choice labels updated to third-person where they currently use "you" (e.g. "Press your ear" → "Press his ear").
- Hallway oil-lamp inspectable text updated to use "oil lamp" not "brass wall sconce" (matches Sprint 06 visual change).
- Polish typo (`flikers` → `flickers`) corrected.
- Game playable end-to-end from cabin → hallway → grandparents' room → hallway return state, with no broken dialogue, missing fields, or layout overflow.

## Out of scope

- **No mirror cinematic.** Beat 3 (mirror) is its own Sprint 08 — adding the cabin mirror inspectable, the cinematic, the post-mirror sprite state change. Don't touch.
- **No new inspectables.** No new objects added (the mirror is Sprint 08). No new transition lines (the "optional thought-line at corridor entry" question is deferred).
- **No passenger thought-line.** The "did he walk right through me?" question is deferred.
- **No grandparents'-room exit thought-line.** Deferred.
- **No NPC scale reconciliation.** Babcia, Dziadek, the passenger stay at their current pixel sizes. That's a separate fix.
- **No game code changes outside narration text and italic flags.** Don't refactor dialogue plumbing. Don't change choice routing logic. Don't touch the cinematic system.
- **No mechanics changes.** Phase-through behavior stays. The door-sub-dialogue choice structure stays.
- **No new beats.** Beats 7+ (radio, dark corridor, kitchen, dock) are not in scope.

## Context from design docs

### Voice rules (from `01-story-bible.md` § Voice rules, locked 2026-05-13)

1. **Third person.** Narration always refers to Pip by name or as "he" — never as "you."
2. **Active voice, present tense.** "Babcia is on the bed," not "Babcia was on the bed."
3. **Full sentences, not fragments.** No "Soft. Familiar."-style phrase fragments.
4. **Spoken dialogue uses quotes and attribution.** `"Babcia, what's wrong?" Pip asks.`
5. **Italics still = interior thought**, in full sentences, often with attribution: `How could that be? Pip wonders.` **Italics stay first-person** (Pip's own voice). The trailing attribution ("Pip wonders") is the narrator naming it from outside.
6. **Roman = narration.** Outside Pip's head. Most lines.
7. **Sensation has texture.** Specific physical detail.

### First-person inside italics (locked 2026-05-13)

The open question from the audit doc is settled: **italics stay first-person.** Italic = Pip's interior voice in his own head, in his own grammar. Roman = third-person narrator describing him from outside. The italic marker does the work of signaling the register shift; the trailing attribution ("Pip wonders," "Pip thinks") bridges back to the narrator's voice when used.

This means:
- `That looks just like the bear Babcia gave me.` (italic) stays first-person.
- `Pip remembers Babcia laughing. He does not remember if he said thank you.` (roman) stays third-person.
- Mixed patterns are allowed: `He almost feels like it's reacting to him. How could that be? Pip wonders.` (roman, then italic with attribution).

## The patch — full content table

The table below is the **canonical source of truth** for every text change in this sprint. Where a row says "Status: No change," the existing text already conforms — leave it. Where a row gives proposed text, replace the current `text:` field exactly as written.

| ID | Object | Speaker | Italic? | Proposed text |
|---|---|---|---|---|
| 2.1 | `door-inspect` line 1 | `null` | `false` | `From the other side of this door, Pip can hear a man talking. It sounds like bad news.` |
| 2.1a | `door-handle` sub-node line 1 | `null` | `false` | `Pip reaches for the handle. His hand passes through it.` |
| 2.1b | `door-ear` sub-node line 1 | `null` | `false` | `Through the door, a man says, "There was nothing we could do. He's gone."` |
| 2.1c | `door-wait` sub-node line 1 | `null` | `false` | `Pip listens. A sob breaks through the air.` |
| — | Choice label `try-handle` | n/a | n/a | `Try the handle.` (no change) |
| — | Choice label `press-ear` | n/a | n/a | `Press his ear to the door.` (was: "Press your ear to the door.") |
| — | Choice label `wait` | n/a | n/a | `Wait.` (no change) |
| 2.2 | `porthole-inspect` line 1 | `null` | `false` | `Through the porthole, dark water sparkles and dances in the lights of a far shore. Norway, the brochure had said. The first stop.` |
| 2.2a | `porthole-inspect` line 2 | `null` | `false` | `"I never even got to see it," Pip says.` |
| 2.2b | `porthole-inspect` line 3 (NEW LINE) | `null` | `true` | `Next port, I'm determined to visit.` |
| 2.3 | `bed-inspect` line 1 | `null` | `false` | `Pip peeks inside. The bed is rumpled. Someone slept here recently. There's a small shape under the covers, but Pip doesn't look any closer.` |
| 5.2 | `hallway-bulletin-inspect` line 1 | `null` | `false` | `A bulletin board sits near the stairwell to let the passengers know the ship's itinerary.` |
| 5.2a | `hallway-bulletin-inspect` line 2 | `null` | `false` | `It says, "The Mnemosyne (Nem-OSS-uh-nee) welcomes you aboard. Today's port: Bergen."` |
| 5.3 | `hallway-luggage-inspect` line 1 | `null` | `true` | `Hmm. Looks like someone packed in a hurry…` |
| 5.3a | `hallway-luggage-inspect` line 2 | `null` | `false` | `A stuffed bear sticks out of the top of the suitcase.` |
| 5.3b | `hallway-luggage-inspect` line 3 | `null` | `true` | `That looks just like the bear Babcia gave me…` |
| 5.4 | `hallway-sconce-inspect` line 1 | `null` | `false` | `An oil lamp flickers, not quite in time with itself.` |
| 5.4a | `hallway-sconce-inspect` line 2 | `null` | `false` | `When Pip steps close, it falters. When he steps back, it steadies. It almost feels like it's reacting to him.` |
| 5.4b | `hallway-sconce-inspect` line 3 (NEW LINE) | `null` | `true` | `How could that be? Pip wonders.` |
| 5.5 | `hallway-grandparents-door-inspect` line 1 (FIRST visit) | `null` | `false` | `From inside, someone is crying softly. The sound is familiar.` |
| 5.5a | `hallway-grandparents-door-inspect` line 2 | `null` | `false` | `Pip reaches for the handle.` |
| — | (existing phase-through trigger line, wherever it lives — currently fires after door inspection in current code) | `null` | `false` | `Pip's hand goes through. He steps closer. He steps through the door.` |
| — | (line immediately after phase-through, before cinematic loads) | `null` | `true` | `…oh.` |
| 6.1 | Cinematic line 1 | `null` | `false` | `Babcia is on the bed with her head in her hands. She is making a sound Pip has never heard her make. She is sobbing.` |
| 6.1b | Cinematic line 2 (NEW LINE — Pip's first attempt) | `PIP` | `false` | `"Babcia, what's wrong?" Pip asks.` |
| 6.2 | Cinematic line 3 | `null` | `false` | `Dziadek stands at the window. His shoulders are shaking. He says nothing. Tears stream down his face.` |
| 6.3 | Cinematic line 4 | `null` | `false` | `On the nightstand sits a photograph. It shows Pip on his sixth birthday, holding a pierogi as big as his face.` |
| 6.4 | Cinematic line 5 | `PIP` | `false` | `"Babcia? Dziadek?"` |
| 6.5 | Cinematic line 6 | `null` | `false` | `They do not look up.` |
| 6.6 | Cinematic line 7 | `PIP` | `false` | `"Hello! I'm here. I'm right here. What's wrong?" Pip's stomach turns.` |
| 6.7 | Cinematic line 8 | `null` | `false` | `They continue to cry.` |
| 6.8 | Cinematic line 9 | `null` | `false` | `Dziadek turns. For a moment, just a moment, he looks toward the doorway. He frowns. He shakes his head and turns back to the window.` |
| 6.9 | Cinematic line 10 — CLOSING | `null` | `false` | `"Dziadek…" Pip tries. But Dziadek does not hear him.` |
| 7.1 | `gp-babcia-inspect` line 1 | `null` | `false` | `Babcia is on the bed. Her hands are folded around her red face. She is making the smallest sounds.` |
| 7.1a | `gp-babcia-inspect` line 2 | `null` | `false` | `Pip stands right next to her. But she does not look up.` |
| 7.1b | `gp-babcia-inspect` line 3 | `PIP` | `false` | `"Babciu, jestem tutaj," Pip says.` |
| 7.2 | `gp-dziadek-inspect` line 1 | `null` | `false` | `Dziadek's back is to Pip. He has not turned. His shoulders are very still.` |
| 7.2a | `gp-dziadek-inspect` line 2 | `null` | `false` | `On the windowsill sits the small radio he listens to in the evenings. It is off, now.` |
| 7.2b | `gp-dziadek-inspect` line 3 | `null` | `false` | `Pip waits, in case he turns. He does not turn.` |
| 7.3 | `gp-photo-inspect` (or current id) line 1 | `null` | `false` | `Pip's sixth birthday photograph shows him holding a pierogi nearly as big as his face. He remembers it tasted like butter and onions and being allowed to use the big knife.` |
| 7.3a | (same node) line 2 | `null` | `false` | `Pip remembers Babcia laughing. He does not remember if he said thank you.` |
| 7.4 | `gp-suitcase-inspect` line 1 | `null` | `false` | `The suitcase is open. Nothing is folded. A shirt of his is on top — the one with the boat on it.` |
| 7.4a | `gp-suitcase-inspect` line 2 | `null` | `false` | `They didn't have time to unpack. They didn't think they would need to.` |
| 9.0 | `hallway-grandparents-door-inspect` line 1 (AFTER cinematic — return state) | `null` | `false` | `Babcia and Dziadek are still inside. Pip can go in, but they cannot hear him.` |

### Italic flag changes (rule 5/6 reconciliation)

Several existing lines currently have `italic: true` but the new rule says italic is for direct interior thought only. Flip these to `italic: false`:

- `gp-photo-inspect` line 1 (was italic — now narration of what the photo shows)
- `gp-photo-inspect` line 2 (was italic — now narration of memory)
- `gp-suitcase-inspect` line 2 (was italic — now narration: "They didn't have time…")
- `gp-dziadek-inspect` line 3 (was italic per Sprint 05 — now flipped: "Pip waits" is narration of action, not interior)

Keep italic on these (they are interior thought):

- `hallway-luggage-inspect` line 1 ("Hmm. Looks like someone packed in a hurry…")
- `hallway-luggage-inspect` line 3 ("That looks just like the bear Babcia gave me…")
- `hallway-sconce-inspect` line 3, NEW ("How could that be? Pip wonders.")
- `porthole-inspect` line 3, NEW ("Next port, I'm determined to visit.")
- The new "…oh." after grandparents' door phase-through

### Cinematic line-count change

The grandparents' cinematic was 9 lines (Sprint 04). The new version is **10 lines** — one new Pip-spoken line inserted after the opening narration ("Babcia, what's wrong?" Pip asks). This is the only structural change to the cinematic script. The 1.2s hold and 600ms fade after the final line stay unchanged.

### A note on Pätu the cat / Pip's spoken Polish

The line `"Babciu, jestem tutaj," Pip says.` keeps the Polish untranslated. A translation footnote or journal entry is deferred. The line is meant to be opaque-but-emotionally-clear to a non-Polish-speaking player.

## Implementation notes

### Where the text lives

All Chapter 1 narration lives in `game/index.html` in three structures:

1. **`cabinObjects` array** — door, porthole, bed inspectables, plus the three door sub-nodes (`door-handle`, `door-ear`, `door-wait`).
2. **`hallwayObjects` array** — bulletin, luggage, sconce, grandparents' door inspectables.
3. **`grandparentsObjects` array** — Babcia, Dziadek, photograph, suitcase inspectables. (Note: photograph node id may currently be `gp-photo-inspect` or similar — find it.)
4. **`CINEMATIC_SCRIPTS.grandparents` array** — the 9 (now 10) cinematic lines.

### Adding new lines to existing nodes

For nodes that gain a new line (porthole, oil-lamp sconce, cinematic), add a new `{ speaker, text, italic }` object to the `lines:` array at the correct position. Don't touch `choices` or `onEnd`.

### Choice label updates

The cabin door's `press-ear` choice currently has `text: 'Press your ear to the door.'`. Change to `text: 'Press his ear to the door.'`. Don't change the choice's `id` — that's how the routing works.

If any other choice labels in the current code use "you" / "your," flip to "Pip" / "his" per rule 1. There shouldn't be many — most labels are imperative verbs like "Try the handle."

### Pseudocode for one inspectable rewrite (porthole)

This is illustrative — actual implementation should follow the existing patterns. **Don't include full functions in the actual code commit; just patch the text/italic/lines fields.**

```
// Current shape:
{
  id: 'porthole-inspect',
  lines: [
    { speaker: null,  text: '<old line 1>', italic: false },
    { speaker: 'PIP', text: 'I never even got to see it.', italic: false },
  ],
  choices: null, onEnd: null,
}

// Updated shape (rows 2.2, 2.2a, 2.2b):
{
  id: 'porthole-inspect',
  lines: [
    { speaker: null,  text: 'Through the porthole, dark water sparkles and dances in the lights of a far shore. Norway, the brochure had said. The first stop.', italic: false },
    { speaker: 'PIP', text: 'I never even got to see it,', italic: false },  // attribution handled inline
    { speaker: null,  text: 'Next port, I\'m determined to visit.', italic: true },
  ],
  choices: null, onEnd: null,
}
```

**Wait** — there's a question about how `speaker: 'PIP'` lines currently render. If the current rendering produces `PIP: I never even got to see it.` then attribution like `"... " Pip says.` needs to be handled differently. Verify how PIP lines render before deciding whether to keep `speaker: 'PIP'` with bare quoted text, or switch to `speaker: null` with full attribution inline. **Choose one approach and apply it consistently to all PIP-spoken lines in this sprint.**

Two options, pick one:

- **Option A (preserve `speaker: 'PIP'` system) — CHOSEN:** Keep the PIP prefix; line text is the quoted speech only, wrapped in `"..."`: `text: '"I never even got to see it."'`. Renders as `PIP: "I never even got to see it."`. Attribution tails with texture ("his stomach turning," "Pip tries") become a separate following `speaker: null` narration line. Speaker labels are information architecture for every character (PIP, HENRIK, etc.), not chrome.
- **Option B (move all dialogue to `speaker: null`):** Rejected. See decision above.

**Split-line pattern (locked):** Every PIP-spoken line that had an attribution tail in the audit doc becomes two entries: one `speaker: 'PIP'` line with just the quoted speech, followed by one `speaker: null` narration line carrying the texture. Applied to cinematic lines 6.6 and 6.9 below (adds 2 lines; final cinematic is 12 lines, not 10 as originally estimated).

### Italic field

The `italic: true/false` flag controls how the dialogue typewriter renders the line. No new system work; just set the flag correctly per row.

## Files to modify

- `game/index.html` (text only — `lines:` arrays inside `cabinObjects`, `hallwayObjects`, `grandparentsObjects`, `CINEMATIC_SCRIPTS.grandparents`, plus the `try-handle` / `press-ear` / `wait` choice nodes; plus the choice label text for `press-ear`)

## Files NOT to modify

- Any draw function (`drawCabin`, `drawHallway`, `drawGrandparents`, `drawGrandparentsCinematic`, sprite rigs, primitives)
- Any room geometry, world dimensions, or object x-coordinates
- Any scale, font, or layout constant
- `design-docs/*` (voice rules already locked there)
- Any sprint spec other than this one

## Test checklist

1. **Cabin door, all three branches.** Approach door, press ↑. Read line 2.1. Pick "Try the handle." — read 2.1a. Re-inspect door; pick "Press his ear to the door." — read 2.1b (label text reads "his," not "your"). Re-inspect; pick "Wait." — read 2.1c. All three sub-lines render as roman (not italic).
2. **Cabin porthole.** Approach, press ↑. Read three lines in sequence: 2.2 (roman narration), 2.2a (PIP's spoken line per Option A or B), 2.2b ("Next port, I'm determined to visit." in italic).
3. **Cabin bed.** Approach, press ↑. Read 2.3 (single line, roman, "Pip peeks inside…").
4. **Cabin → hallway transition.** Walk right, transition fades correctly. (No new text expected in transition.)
5. **Hallway bulletin board.** Approach, press ↑. Read 5.2 + 5.2a (roman; the second line includes the new "Mnemosyne welcomes you aboard" phrasing with the "It says, …" frame).
6. **Hallway luggage cart.** Approach, press ↑. Three-line sequence: 5.3 (italic), 5.3a (roman), 5.3b (italic, "the bear Babcia gave me" stays first-person).
7. **Hallway oil lamp.** Approach, press ↑. Read three lines: 5.4 ("oil lamp flickers," roman), 5.4a (roman, "When Pip steps close…"), 5.4b ("How could that be? Pip wonders." italic). Confirm no "brass wall sconce" wording remains.
8. **Hallway grandparents' door, first visit.** Approach, press ↑. Read 5.5 ("someone is crying softly. The sound is familiar.") + 5.5a ("Pip reaches for the handle."). Pick the handle choice. Read the phase-through line + "…oh." italic tag. Cinematic loads.
9. **Grandparents' cinematic.** Plays through 10 lines. Confirm new Pip line "Babcia, what's wrong?" appears as line 2 (after Babcia opening). Confirm "They do not look up" + "They continue to cry" replace the original "She does not look up" repetition. Confirm closing line is `"Dziadek…" Pip tries. But Dziadek does not hear him.` Confirm 1.2s hold + 600ms fade still works.
10. **Grandparents' room — Babcia.** Approach, press ↑. Three lines: 7.1 (roman, "folded around her red face"), 7.1a (roman, "Pip stands right next to her"), 7.1b (PIP: "Babciu, jestem tutaj," Pip says.).
11. **Grandparents' room — Dziadek.** Three lines: 7.2 (roman, "Dziadek's back is to Pip"), 7.2a (roman, "On the windowsill sits the small radio…"), 7.2b (roman, "Pip waits, in case he turns. He does not turn.").
12. **Grandparents' room — photograph.** Two lines: 7.3 (roman — flipped from italic), 7.3a (roman — flipped from italic).
13. **Grandparents' room — suitcase.** Two lines: 7.4 (roman, "A shirt of his is on top"), 7.4a (roman — flipped from italic — "They didn't have time to unpack…").
14. **Return to hallway, re-inspect grandparents' door.** Approach, press ↑. Read 9.0 ("Babcia and Dziadek are still inside. Pip can go in, but they cannot hear him."). Roman, not italic.
15. **Search the index.html** for the strings: `"your"` (lowercase, with quotes around it as in choice labels or narration), `"you "`, `"you'"`, `" Soft."`, `" Familiar."`, `"flikers"`, `"brass wall sconce"`. Each search should return zero or only contextually-valid hits (e.g. "you" inside in-fiction dialogue like "welcomes you aboard" or "Hello!" is fine).
16. **Walk the whole chapter** start-to-finish. No dialogue box overflow, no missing fields, no JS errors in console.

## Open follow-ups (not blocking this sprint)

- **Sprint 08: Mirror cinematic (Beat 3).** Adds the cabin mirror inspectable, the Cinematic 2 (MIRROR) implementation with melting-face art, and the post-mirror Pip transparency state. Substantially bigger — touches art, cinematic system, sprite rig, and cabin objects.
- **NPC scale reconciliation.** Babcia, Dziadek, passenger still need to bump from ~22-30px to ~60-72px per the Scale Anchor rule. Was paused while content patch ran.
- **Optional thought-lines** at corridor entry, after passenger walks through, on first grandparents'-room exit. Deferred — these are quiet polish moments that can wait until the chapter feels right end-to-end.
- **Polish translation** for "Babciu, jestem tutaj." Either a journal entry (Sprint 09+) or inline parenthetical. Deferred.

## Commit guidance

One commit for the whole patch. Suggested message:

```
Sprint 07: Chapter 1 content patch — voice rules reconciliation

All Chapter 1 narration, choice labels, and the grandparents' cinematic
reconciled to the new voice rules locked in 01-story-bible.md (third-
person, active, present-tense, full sentences, attributed dialogue,
first-person inside italics). New lines added to porthole, oil lamp,
and grandparents' cinematic. Italic flags flipped on photo + suitcase
nodes. "Brass wall sconce" → "oil lamp" everywhere. No mechanics, art,
or scale changes.

Issue: <create new GitHub issue and reference here>
```

After committing, create a GitHub issue for tracking, then stop. Don't open Sprint 08.
