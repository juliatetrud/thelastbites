# Sprint 05: Music System, Track Switching, and Italics Audit

## Goal

Add a per-scene music system with four tracks (main theme, chef encounters, two interchangeable monster tracks) and a toggle icon outside the canvas. Also do a small pass through existing dialogue to enforce the italics convention: italic = thought, roman = narration in active immediate voice.

## Definition of done

### Music files are in place

Four mp3s currently live at `~/Documents/the-last-bites/` (project root). They move to `game/assets/audio/` with lower-kebab-case filenames:

- `Stowaway Polka.mp3` → `game/assets/audio/stowaway-polka.mp3`
- `Chefs.mp3` → `game/assets/audio/chefs.mp3`
- `Monster1.mp3` → `game/assets/audio/monster-1.mp3`
- `Monster2.mp3` → `game/assets/audio/monster-2.mp3`

*(If the on-disk filenames differ slightly — e.g. spaces vs hyphens, capitalization — match what's there. The destination names stay as listed above.)*

Create `game/assets/` and `game/assets/audio/` directories if they don't exist. Commit the moved files.

### Music plays automatically on first keypress (browser autoplay policy)

- On page load: the `<audio>` element is created, source set to the appropriate track for the current scene, `loop` set to true, `volume` set to `0.4`, *not* yet playing
- On the player's first keypress (any key), the audio begins playing if the toggle is in the "on" state (default is on)
- Music loops indefinitely via the `loop` attribute. Seamless restart when the track ends
- A one-time `keydown` listener handles unlock and removes itself after firing

### A small ♪ toggle icon sits in the top-right margin, outside the canvas

- Small (~24px tall), unobtrusive, cool-palette color (`#a0b0d0` or similar)
- When music is on: full opacity (~0.85). When off: reduced opacity (~0.35) with a diagonal slash overlay
- Clickable. Click toggles on/off:
  - Off → on: resume from where the current track paused
  - On → off: pause the current track
- Hovering shows a `title` tooltip: "Music on (click to mute)" or "Music off (click to play)"
- No keyboard shortcut. Mouse-only — keyboard stays reserved for play
- Toggle state persists across reload via `localStorage` under key `tlb-music-on`

### Tracks switch by scene with a crossfade

A `playMusic(trackId)` function handles switching:

- `trackId` is one of: `'main'` (Stowaway Polka), `'chefs'` (Chefs), `'monster'` (auto-picks Monster1 or Monster2)
- If the requested track is already playing, no-op — don't restart it
- If a different track is playing, crossfade: ramp current track's volume from `0.4` to `0` over ~1.2s, swap the `src`, ramp new track from `0` to `0.4` over ~1.2s, set new track playing
- If the toggle is in the "off" state, still swap the underlying `<audio>` element's `src` (so the right track is queued) but don't actually play. When the player flips the toggle back on, the queued track resumes/begins
- Implementation note: easiest is two `<audio>` elements — track A and track B — alternating roles. One is "current" and one is "incoming" during a crossfade. Avoids choppy volume juggling on a single element

### Per-scene music assignment for Chapter 1

Chapter 1 uses `'main'` everywhere except inside the kitchen room (which doesn't exist yet — a future sprint). So for this sprint:

- Cabin: `'main'`
- Hallway: `'main'`
- Grandparents' cinematic + room: `'main'` *(the cinematic is the chapter's emotional peak; the polka under it is the right kind of dissonance — life going on while grief sits inside it. We don't switch tracks for the cinematic.)*
- Kitchen (future sprint): `'chefs'`

No monster encounters in Chapter 1, so `'monster'` doesn't fire this chapter. But the function and tracks should exist and be testable — see test checklist.

### `'monster'` picks between Monster1 and Monster2 randomly per call

When `playMusic('monster')` fires, randomly pick one of the two monster tracks (50/50). Same logic on subsequent monster encounters — fresh roll each time. This is the "interchangeable for variety" pattern from the design conversation.

### Italics audit — convention locked

Italics in dialogue lines now follow a strict rule:

- **Italic (`italic: true`)** = thought. Pip's internal voice. Pip remembering. Pip speaking only to himself. Other characters' thoughts if rendered (rare, only when a beat surfaces them).
- **Roman (`italic: false`)** = narration. Description of what's there, what's happening, what the world is doing. Active immediate voice ("Babcia is on the bed" not "Babcia was on the bed" not "you see Babcia on the bed").

Lines with `speaker: 'PIP'` always render with the "PIP:" prefix and are spoken-aloud — they stay roman regardless of the `italic` field. The italic flag matters most for `speaker: null` lines.

Walk every existing inspectable dialogue line and audit which should flip. Specific known fixes:

**Hallway luggage cart** — currently 2 italic lines, blanket-applied. Replace with 3 lines:

```javascript
lines: [
  { speaker: null, text: 'Hmm. Looks like someone packed in a hurry\u2026', italic: true },  // Pip thinking
  { speaker: null, text: 'A stuffed bear sticks out of the top of the suitcase.', italic: false },  // narration
  { speaker: null, text: 'That looks just like the bear Babcia gave me\u2026', italic: true },  // Pip thinking
],
```

**Grandparents' room photograph** — currently both lines italic. The "you remember" voice is Pip remembering — keep italic. The first line is half-narration half-memory; lean italic since the whole line is in Pip's voice ("you remember it tasted like…"). Both lines stay italic. No change.

**Grandparents' room suitcase** — currently both italic. First line is mostly narration ("The suitcase is open. Nothing is folded. A shirt of yours is on top — the one with the boat on it."), second line is closer to Pip's interpretation ("They didn't have time to unpack. They didn't think they would need to."). Update:

```javascript
lines: [
  { speaker: null, text: 'The suitcase is open. Nothing is folded. A shirt of yours is on top \u2014 the one with the boat on it.', italic: false },  // narration
  { speaker: null, text: 'They didn\u2019t have time to unpack. They didn\u2019t think they would need to.', italic: true },  // Pip's thought
],
```

**Grandparents' room Babcia** — currently 2 italic narration + 1 Pip line. The narration is description of the room; flip to roman:

```javascript
lines: [
  { speaker: null, text: 'Babcia is on the bed. Her hands are folded in her apron. She is making the smallest sound.', italic: false },  // narration
  { speaker: null, text: 'You can stand right next to her. She will not look up.', italic: false },  // narration
  { speaker: 'PIP', text: 'Babciu, jestem tutaj.', italic: false },  // spoken
],
```

**Grandparents' room Dziadek** — all 3 currently italic. The first and second are narration; the third ("You wait, in case he turns. He does not turn.") is closer to Pip's interior voice — the *waiting* is his, even though the rest describes the room. Update:

```javascript
lines: [
  { speaker: null, text: 'Dziadek\u2019s back is to you. He hasn\u2019t turned. His shoulders are very still.', italic: false },  // narration
  { speaker: null, text: 'On the windowsill, the small radio he listens to in the evenings. Off, now.', italic: false },  // narration
  { speaker: null, text: 'You wait, in case he turns. He does not turn.', italic: true },  // Pip's waiting voice
],
```

**Hallway bulletin board** — currently both italic. First is narration about what's pinned up; second is the literal text on the board. Both should be roman (narration):

```javascript
lines: [
  { speaker: null, text: 'A bulletin board near the stairwell. The ship\u2019s itinerary is pinned up like a guest of honor.', italic: false },
  { speaker: null, text: 'Mnemosyne (Nem-OSS-uh-nee) Welcomes You Aboard. Today\u2019s Port: Bergen.', italic: false },
],
```

**Hallway flickering sconce** — currently both italic. First is narration; second has Pip's voice in the parenthetical aside. Split the second line into two parts to honor the rule, or accept the mixed-voice line as italic since the Pip-voice dominates. Recommended:

```javascript
lines: [
  { speaker: null, text: 'A brass wall sconce, flickering. Not quite in time with itself.', italic: false },  // narration
  { speaker: null, text: 'When you step close, it falters. When you step back, it steadies. It almost feels like it\u2019s reacting to you.', italic: true },  // Pip's observation — the whole line is his perception now
],
```

*(Removed the parentheses around the Pip-voice clause. With italics doing the speaker-voice work, the parens are redundant and a little finicky.)*

**Cabin inspectables** (porthole, door, bed from Sprints 01–02) — review and audit using the same rule. Specific lines depend on what's there; trust the same logic. If a line is *clearly* narration ("Light from the window catches the dust") it goes roman. If it's *clearly* Pip ("You remember falling asleep here last night") it stays italic. Mixed lines: lean toward whichever voice carries the line.

**Cinematic dialogue (grandparents)** — the 9-line script. Re-audit:

- L1 "Babcia is on the bed. She is making a sound that Pip has never heard her make." — narration, roman
- L2 "Dziadek stands at the window. His shoulders are shaking. He says nothing." — narration, roman
- L3 "On the nightstand, a photograph. Pip on his sixth birthday, holding a pierogi as big as his face." — narration, roman
- L4 "Babcia…" — `speaker: 'PIP'`, spoken
- L5 "She does not look up." — narration, roman
- L6 "I'm here. I'm right here." — `speaker: 'PIP'`, spoken
- L7 "She does not look up." — narration, roman
- L8 "Dziadek turns. For a moment, just a moment, he looks toward the doorway. He frumns. He shakes his head and turns back to the window." — narration, roman
- L9 "…you almost saw me." — `speaker: 'PIP'`, spoken

All currently italic except the PIP-tagged lines. Flip narration lines to roman.

### No regressions

- All prior sprint behaviors work unchanged
- Music does not interfere with movement, dialogue typewriter, cinematic playback, room transitions, the passenger NPC, or float
- The toggle icon is *outside* the canvas — no visual interference with gameplay
- Cabin and hallway and grandparents' inspectables all still trigger correctly with their updated text/italics
- The cinematic plays through cleanly with the updated italics
- No console errors (one acceptable exception: a single autoplay-blocked warning on load, before the first keypress)

## Context from design docs

### From `03-art-and-aesthetic.md` — Aesthetic Rule 8

> Warm lights flicker. Subtle, not distracting. Adds life.

The music toggle is UI chrome, not in-world. Cool palette, no pulse, no flicker. Settings affordance, not a story element.

### From `04-chapter-01-cabin-646.md` — narrator voice

The chapter's narration is in active immediate voice — present tense, sensory, direct. "Babcia is on the bed" not "Babcia was on the bed." This sprint's italics audit assumes that voice is already in place; if any existing line drifted into past tense or distance, fix it as part of the audit.

### From `01-story-bible.md` — Pip's interior

> Personality: Curious, gentle, observant. A foodie's foodie. He's not afraid — he's interested.

Italic Pip-voice should sound like that — present-tense, sensory, with a kid's instinct for the specific. "Hmm. Looks like someone packed in a hurry…" is Pip noticing. "That looks just like the bear Babcia gave me…" is Pip remembering. Both land in his voice.

### Browser autoplay policy

Modern browsers block `audio.play()` calls until first user interaction. A one-time `keydown` listener calls `play()` on first keypress, then removes itself.

## Implementation notes

### File move

```bash
mkdir -p game/assets/audio
mv ~/Documents/the-last-bites/Stowaway\ Polka.mp3 game/assets/audio/stowaway-polka.mp3
mv ~/Documents/the-last-bites/Chefs.mp3 game/assets/audio/chefs.mp3
mv ~/Documents/the-last-bites/Monster1.mp3 game/assets/audio/monster-1.mp3
mv ~/Documents/the-last-bites/Monster2.mp3 game/assets/audio/monster-2.mp3
```

Adjust if on-disk names differ. Commit the moved files (they're mp3s, fine in the repo).

### DOM structure

Two `<audio>` elements (track A and track B) for crossfade, plus the toggle button:

```html
<audio id="bg-music-a" loop preload="auto"></audio>
<audio id="bg-music-b" loop preload="auto"></audio>

<button id="music-toggle" type="button" title="Music on (click to mute)">
  <span class="music-icon">♪</span>
</button>
```

### CSS

Toggle in the top-right margin, outside the canvas:

```css
#music-toggle {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: #a0b0d0;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.85;
  z-index: 100;
  transition: opacity 0.2s ease;
  font-family: inherit;
}
#music-toggle:hover { opacity: 1; }
#music-toggle.muted { opacity: 0.35; }
#music-toggle.muted::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 1.5px;
  background: currentColor;
  transform: translate(-50%, -50%) rotate(-30deg);
}
```

### JavaScript state

```javascript
const music = {
  audioA:       null,   // <audio> element A
  audioB:       null,   // <audio> element B
  current:      'a',    // which element is currently the active track
  trackId:      null,   // 'main' | 'chefs' | 'monster' — null on init
  on:           true,   // does the player want music?
  unlocked:     false,  // has the first keypress fired yet?
  baseVolume:   0.4,    // target volume when not crossfading
  crossfading:  false,
};

const MUSIC_TRACKS = {
  main:   'assets/audio/stowaway-polka.mp3',
  chefs:  'assets/audio/chefs.mp3',
};
const MONSTER_TRACKS = [
  'assets/audio/monster-1.mp3',
  'assets/audio/monster-2.mp3',
];
```

### `playMusic(trackId)` flow

```
playMusic('main'):
  1. Determine the target src (resolve 'monster' to a random pick)
  2. If music.current's src already equals target src → no-op (already playing this track)
  3. Otherwise crossfade:
     - other = whichever element is not music.current
     - other.src = target
     - other.volume = 0
     - other.play() (if music.on)
     - ramp music.current's volume from 0.4 → 0 over 1.2s (using a requestAnimationFrame loop or setInterval)
     - simultaneously ramp other's volume from 0 → 0.4
     - at end: pause music.current, set music.current = other, set music.trackId = trackId
```

If `music.on === false`, swap the src on the incoming element but don't actually play. Set `music.current` and `music.trackId` to the new values so when the toggle flips back on, the right track resumes.

### Where to call `playMusic`

Call it on room transitions in `startTransition()`, after the room swap and before the fade-in:

```javascript
// Inside startTransition, when currentRoom is updated:
const newTrack = ROOM_MUSIC[currentRoom] || 'main';
playMusic(newTrack);
```

With a small map:

```javascript
const ROOM_MUSIC = {
  cabin:        'main',
  hallway:      'main',
  grandparents: 'main',
  // kitchen:   'chefs',  // future sprint
};
```

The cinematic plays under whatever room is active — no special-case music change for cinematics in this sprint.

### Unlock-on-first-keypress pattern

```javascript
function unlockMusic() {
  if (music.unlocked) return;
  music.unlocked = true;
  if (music.on && music.trackId) {
    const current = music.current === 'a' ? music.audioA : music.audioB;
    current.volume = music.baseVolume;
    current.play().catch(() => { /* still blocked; ignore */ });
  }
}

window.addEventListener('keydown', unlockMusic, { once: true });
```

The first `playMusic('main')` call on game start should set the src on the appropriate `<audio>` element so the unlock-on-keypress play() call has the right source loaded.

### Toggle click

```javascript
function toggleMusic() {
  music.on = !music.on;
  localStorage.setItem('tlb-music-on', music.on ? 'true' : 'false');
  const btn = document.getElementById('music-toggle');
  const current = music.current === 'a' ? music.audioA : music.audioB;

  if (music.on) {
    btn.classList.remove('muted');
    btn.title = 'Music on (click to mute)';
    if (music.unlocked) current.play().catch(() => {});
  } else {
    btn.classList.add('muted');
    btn.title = 'Music off (click to play)';
    current.pause();
  }
}
```

### Italics audit — implementation

Walk the inspectable arrays (`cabinObjects`, `hallwayObjects`, `grandparentsObjects`) and the `CINEMATIC_SCRIPTS.grandparents` array. Update the `italic` field per the convention. The "Definition of done" section lists the specific changes for each.

If any cabin inspectable line is ambiguous (clearly mixed-voice or could go either way), default to **roman** — narration is the default; italic is for moments where the voice is unambiguously Pip's interior.

### File-rename caution

If filenames on disk have different capitalization or spaces than expected, `mv` won't fail — but `git status` and the audio element's `src` need to match what's actually committed. Use lowercase + hyphens for the in-game filenames regardless of source-disk names. Verify with `ls game/assets/audio/` after moving.

### Decisions Log update (add to `06-roadmap-and-open-questions.md` when complete)

When this sprint completes, add these entries to the Decisions Log:

- *"Music system established Sprint 05. Four tracks: main (Stowaway Polka), chefs (Chefs), monster (Monster1 or Monster2, picked randomly per encounter). `playMusic(trackId)` handles crossfade switching (~1.2s) via two `<audio>` elements. Per-room track assignment via `ROOM_MUSIC` map. Browser autoplay blocked until first keypress; one-time `keydown` listener unlocks audio. Music toggle (♪ icon, top-right outside canvas) persists state via `localStorage` under key `tlb-music-on`. Pattern extends to chapters 2+: each room declares its track, monster encounters fire `playMusic('monster')`, chef encounters fire `playMusic('chefs')`."*
- *"Italics convention locked Sprint 05. Italic = thought (Pip's interior voice, his remembering, anyone's thought when surfaced). Roman = narration in active immediate voice (description of what's there, what's happening). `speaker: 'PIP'` lines are spoken aloud and stay roman. Default for ambiguous lines: roman. Pattern enforced going forward in every chapter, cinematic, and inspectable."*

## Files to create or modify

**Create:**
- `game/assets/` (directory)
- `game/assets/audio/` (directory)
- `game/assets/audio/stowaway-polka.mp3` (moved)
- `game/assets/audio/chefs.mp3` (moved)
- `game/assets/audio/monster-1.mp3` (moved)
- `game/assets/audio/monster-2.mp3` (moved)

**Modify:**
- `game/index.html` — add the two `<audio>` elements, the toggle `<button>`, the toggle CSS, the `music` state object, `MUSIC_TRACKS` / `MONSTER_TRACKS` / `ROOM_MUSIC` constants, `playMusic()` / `unlockMusic()` / `toggleMusic()` functions, init logic, the one-time `keydown` listener, the `playMusic` call inside `startTransition()`, and the initial `playMusic('main')` call on game start. Also: audit every dialogue line per the italics convention — modify `cabinObjects`, `hallwayObjects` (especially the luggage cart, bulletin board, sconce), `grandparentsObjects` (Babcia, Dziadek, suitcase), and `CINEMATIC_SCRIPTS.grandparents`
- `design-docs/06-roadmap-and-open-questions.md` — add the two Decisions Log entries

## Out of scope

This sprint does **not** include:

- Volume slider — on/off toggle only
- Keyboard shortcut for the toggle — mouse-only
- Per-room music cues beyond what's mapped (cinematic-specific music, dialogue ducking, etc.)
- Sound effects (footsteps, sparkle chimes, door creaks) — separate future sprint
- Music ducking during dialogue or cinematics
- Save-game integration beyond the toggle's localStorage key — full save/load is a future sprint
- Re-recording or remixing the music files — they're treated as-is
- Mobile / touch tap handling for the toggle
- A separate "voice/SFX/music" volume split — there are no SFX yet
- Updating the chapter outline doc (`ch01-cabin-646-outline.md`) with per-scene music annotations — implicit for now; can be added when the doc is next revised

If implementation reveals one of these is unavoidable, **stop and ask**.

## Test checklist

After implementing, walk this list in the browser:

### Music system

- [ ] All four mp3 files exist in `game/assets/audio/` and are committed
- [ ] Open the game — no music plays yet (autoplay blocked)
- [ ] A ♪ icon visible in the top-right corner of the page, outside the canvas
- [ ] Press any key (e.g. arrow right) — Stowaway Polka begins playing at moderate volume
- [ ] Music loops cleanly when the track ends (verify by letting it play or by scrubbing `currentTime` via the console)
- [ ] Click the ♪ icon — music pauses, icon dims, diagonal slash appears
- [ ] Click again — music resumes from where it paused, not from 0
- [ ] Hover icon — tooltip shows correct state
- [ ] Refresh with music muted — icon is still muted, no music plays even after a keypress
- [ ] Refresh with music on — music plays on first keypress as before

### Per-scene track switching

- [ ] In dev console: `playMusic('chefs')` triggers a crossfade — Stowaway Polka fades out, Chefs fades in, no jarring cut
- [ ] In dev console: `playMusic('monster')` triggers a crossfade to Monster1 or Monster2 (random)
- [ ] Call `playMusic('monster')` repeatedly in the console — sometimes Monster1, sometimes Monster2 (random per call)
- [ ] Call `playMusic('main')` while Chefs is playing — crossfade back to Stowaway Polka
- [ ] Calling `playMusic` with the currently-playing track is a no-op (no audible glitch)
- [ ] Crossfade duration feels right (~1.2s; not jarring, not sluggish)

### Per-room music (Chapter 1)

- [ ] Cabin → Stowaway Polka plays
- [ ] Walk to hallway → no track change (still Stowaway Polka — same track for both rooms)
- [ ] Trigger grandparents' cinematic → music continues uninterrupted under the cinematic
- [ ] Cinematic ends, enter grandparents' room → still Stowaway Polka
- [ ] Walk back to hallway → still Stowaway Polka

### Italics audit

- [ ] Inspect hallway luggage cart: 3 lines display in correct alternating order — italic ("Hmm. Looks like someone packed in a hurry…"), roman (stuffed bear narration), italic ("That looks just like the bear Babcia gave me…")
- [ ] Inspect hallway bulletin board: both lines roman
- [ ] Inspect hallway sconce: first line roman, second line italic (Pip's perception)
- [ ] Inspect grandparents' room Babcia: first two lines roman, PIP-tagged spoken line displays with "PIP:" prefix (roman)
- [ ] Inspect grandparents' room Dziadek: first two roman, third ("You wait, in case he turns…") italic
- [ ] Inspect grandparents' room photograph: both italic (unchanged — Pip's voice throughout)
- [ ] Inspect grandparents' room suitcase: first roman, second italic
- [ ] Cabin inspectables: walk each one and verify the italics look correct per the convention; if any feel wrong, flag for adjustment
- [ ] Grandparents' cinematic plays through: narration lines display roman, PIP-tagged spoken lines display with "PIP:" prefix

### No regressions

- [ ] Cabin → hallway → grandparents' (via "Try the handle") all work as before
- [ ] Grandparents' cinematic plays through all 9 lines without freezing
- [ ] All inspectables across all rooms still trigger correctly
- [ ] Passenger NPC walkthrough still fires once on first hallway entry
- [ ] ESC during cinematic still skips
- [ ] Float in `?dev=1` still works in all rooms
- [ ] No console errors anywhere (one acceptable: a single autoplay-blocked warning on load)

## Notes for after completion

When closing the Sprint 05 issue, include:
- A note on whether the music volume (`0.4`) feels right against the game's quiet visual register. One number to tune; flag for adjustment if needed
- A note on whether the crossfade duration (1.2s) feels right; bump up or down if it's noticeably wrong
- Tonal flag on the italics audit: walk the game and notice if any line still feels misclassified after the pass. The convention is firm; the specific line judgments may need iteration
- Optional screenshots: the toggle in both states (on and muted)

After this sprint, the game has its first audio layer and a clearer reading voice. Future sprints can build on both: per-chapter track maps, sound effects, dialogue ducking — all on the same unlock + toggle + crossfade foundation.
