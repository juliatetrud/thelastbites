# Chapter 1: Puzzles

State machines for every interactive sequence in Ch1. This doc is for the Claude Code build sprint — it describes *how* puzzles run, *what state they read and write*, and *what conditions trigger them*.

This doc is technical, not literary. Dialogue text lives in `dialogue.md`. Room geometry lives in `rooms.md`. Beat flow lives in `beats.md`. This doc connects those three.

Pseudocode is for clarity, not implementation. The implementer chooses idioms.

---

## Status legend

- **Shipped** — fully implemented in `game/index.html`.
- **Partially shipped** — some parts exist in code; gaps flagged below.
- **Not shipped** — needs building in the Henrik kitchen build sprint or a related Ch1 content sprint.

---

## System primitives (existing infrastructure)

Before per-puzzle state machines, these are the building blocks every puzzle reuses.

### Cinematic system (`cinematic` state object — shipped)

```
cinematic = {
  active:    boolean
  name:      string | null
  holdTimer: number      // seconds remaining post-final-line
  fadingOut: boolean
  played:    Set<string> // session-only; resets on hard reload
  onEnd:     callback
  isMemory:  boolean     // true for memory cinematics (mist effect)
}
```

Key functions:
- `showCinematic(name, onEnd)` — begins cinematic. Adds name to `played`. Plays scripted dialogue lines. After final line, 1.2s hold, then fade.
- `startCinematicFadeOut()` — 600ms fade to black. Calls `onEnd` on completion.
- `skipCinematic()` — ESC pressed. Force-closes dialogue, skips to fade-out.

**Convention:** `cinematic.played.has(name)` gates one-shot logic across the chapter. Used by Beat 4 (cabin door), Beat 6 (grandparents), Sprint 14 (doctor exit), etc.

### Dialogue system (`dialogue` state object — shipped)

```
dialogue = {
  active:         boolean
  node:           { id, lines, choices, onEnd } | null
  lineIndex:      number
  charIndex:      number
  showingChoices: boolean
  selectedChoice: number
  closing:        boolean
}
```

Key functions:
- `showDialogue(node)` — opens dialogue with the node's lines.
- `closeDialogue()` — fade out over 300ms; calls node's `onEnd` after.
- Standard inputs: Space (advance / select), ↑↓ (navigate choices), ← (back).

### Transition system (`transition` — shipped)

```
transition = { active: boolean }
```

- `startTransition(toRoom, entryEdge)` — 600ms fade cycle. Input suppressed during transition. Used for room changes.

### Aura system (shipped)

Object auras pulse with three intensities:
- **Baseline (~0.15)** — passive ambient glow on inspectable objects.
- **Elevated (~0.25)** — slight emphasis on objects within proximity.
- **Breadcrumb (~0.45 + pulse)** — narrative emphasis, says "come here next."

Breadcrumb auras are set via `cabinState.beatStage` (for cabin) or per-object state flags (for other rooms).

### Proximity inspection (shipped)

When Pip is within ~18 game-world pixels of an inspectable's x-coordinate, a sparkle is drawn near the object. Pressing `↑` triggers the object's dialogue node. The `↓` key triggers collect behavior (warm-aura objects only) — sparkle vs. warm-aura distinguish inspect-vs-collect targets.

---

## Puzzle 1: Cabin door (Beat 4) — listen only

**Status:** Shipped (Sprint 14). Post-grandparents' "Go in" superseded by Sprint 22 (option A locked). Sprint 23 patches the live code.

**Type:** Conditional dialogue (no room transition from this door on first visit).

### State read

- `cinematic.played.has('grandparents')` — pre-grandparents' / post-grandparents' state.

### State written

- None. This puzzle is dialogue-only. `cabinState.doctorSeen` is written by Puzzle 3.5.

### State machine (pseudocode)

```
on inspect(hallway-cabin-door):
  // Pre- or post-grandparents', the dialogue is identical
  showDialogue(cabin-door-node)  // see dialogue.md
  on choice 'listen-door':
    showDialogue(doctor-voice-node)
  on choice 'not-now-cabin':
    closeDialogue()

on roomTransition fired by player walking into cabin door post-Beat-6:
  // Silent phase-through — no dialogue, no cinematic
  // The phase-through ability is fully understood by this point
  standardWoodenDoorTransition('cabin', 'fromLeft')
```

*(Note for Sprint 23: the second block is approximate. Implementation may handle return-visit transitions via the existing transition system without a separate code path — Pip just walks into the door's interactable zone and the room changes. Sprint 23 locks the exact mechanism.)*

### Notes

- The Listen sub-dialogue is **repeatable** — no state flag prevents re-listening.
- The door dialogue is **identical** in both pre- and post-grandparents' states. The opening line (*Cabin 646. The door is closed.*) does not change to "closed but unlocked" post-grandparents'.
- **No "Go in" choice** ever appears on this door. First entry to Cabin 646 is via the shared wall (Puzzle 3.5). Return visits are silent phase-throughs.

---

## Puzzle 2: Mirror cinematic + bed reveal + panic exit (Beat 5)

**Status:** Shipped (Sprint 11).

**Type:** Chained cinematics + scripted action sequence.

This is the chapter's most complex shipped sequence. Four sub-phases run back-to-back with no player input between them.

### State read

- `cabinState.beatStage` — must be `'pre-mirror'` for the mirror inspection to trigger. (Set to `'pre-mirror'` by Beat 6's grandparents cinematic ending.)
- `cabinState.mirrorRevealed` — false before this sequence.

### State written

- `cabinState.mirrorRevealed: false → true`
- `cabinState.beatStage: 'pre-mirror' → 'pre-bed'` after mirror cinematic.
- `cabinState.bedRevealed: false → true` after bed-reveal cinematic.
- `cabinState.beatStage: 'pre-bed' → 'post-bed'` after bed reveal.
- `mirrorBeat.panicPhase` cycles: `'none' → 'floating-up' → 'floating-hold' → 'floating-down' → 'gliding' → 'done'`

### State machine (pseudocode)

```
on inspect(mirror-cabin) when cabinState.beatStage == 'pre-mirror':
  showCinematic('mirror-realization', () => {
    cabinState.mirrorRevealed = true
    cabinState.beatStage = 'pre-bed'
    // Bed's aura now elevates further; mirror's aura returns to baseline
    setRoomStrip()
  })

on inspect(bed-cabin) when cabinState.beatStage == 'pre-bed':
  showCinematic('bed-reveal', () => {
    cabinState.bedRevealed = true
    cabinState.beatStage = 'post-bed'
    startPanicSequence()  // see below
  })

startPanicSequence():
  mirrorBeat.panicPhase = 'floating-up'
  mirrorBeat.panicTimer = 0.4
  pip.float.altitude = 0
  // Player input is suppressed for the full sequence

updatePanicSequence(dt):
  if mirrorBeat.panicPhase == 'floating-up':
    pip.float.altitude += FLOAT_RISE_RATE * dt
    mirrorBeat.panicTimer -= dt
    if mirrorBeat.panicTimer <= 0 || pip.float.altitude >= 30:
      mirrorBeat.panicPhase = 'floating-hold'
      mirrorBeat.panicTimer = 0.5

  elif mirrorBeat.panicPhase == 'floating-hold':
    mirrorBeat.panicTimer -= dt
    if mirrorBeat.panicTimer <= 0:
      mirrorBeat.panicPhase = 'floating-down'

  elif mirrorBeat.panicPhase == 'floating-down':
    pip.float.altitude -= FLOAT_FALL_RATE * dt
    if pip.float.altitude <= 0:
      pip.float.altitude = 0
      mirrorBeat.panicPhase = 'gliding'
      mirrorBeat.glideStartX = pip.x

  elif mirrorBeat.panicPhase == 'gliding':
    pip.x += PIP_SPEED * 1.8 * dt
    // Spawn tear particles at ~6/sec (random 1-in-10 chance per frame at 60fps)
    if random() < 0.1:
      spawnTear(pip.x, pip.y)
    if pip.x >= rooms.cabin.exitX:
      // Trigger standard room transition to hallway
      startTransition('hallway', 'fromCabin')
      mirrorBeat.panicPhase = 'done'
      // Player control restored once transition completes

  // Update tear particle physics
  for tear in mirrorBeat.tears:
    tear.age += dt
    tear.vy += 100 * dt   // gravity
    tear.x += tear.vx * dt
    tear.y += tear.vy * dt
    if tear.age >= tear.maxAge:
      remove tear from array
```

### Tear particle spec

```
spawnTear(pipX, pipY):
  tear = {
    x: pipX
    y: pipY + EYE_Y_OFFSET   // approx eye-height on Pip's sprite
    vx: -PIP_SPEED * 1.8 * 0.3   // backward arc (Pip is moving right)
    vy: -20                      // small upward initial velocity
    age: 0
    maxAge: 0.4
  }
  mirrorBeat.tears.push(tear)
```

Visual: 2×3 px droplet, color `#c0d8ff` (cool-white/cyan, matches Pip's spirit palette). Alpha fades over the 0.4s lifetime.

### Notes

- The full sequence is **one-shot per session** — `cinematic.played` prevents replay.
- Tear particles are **gentle-comic**: real grief expressed via fast glide and crying. Don't dampen.
- The panic float **does not unlock the float ability** — `pip.float.unlocked` stays `false` until Beat 8.

---

## Puzzle 3: Grandparents' phase-through + cinematic (Beat 6)

**Status:** Shipped (Sprint 04 + Sprint 07 content patch).

**Type:** Dialogue → cinematic → room transition.

### State read

- `cinematic.played.has('grandparents')` — first vs. return visit.

### State written

- `cinematic.played.add('grandparents')`
- `cabinState.beatStage: 'pre-grandparents' → 'pre-mirror'` (after cinematic ends)

### State machine (pseudocode)

First visit:

```
on inspect(hallway-grandparents-door) when !cinematic.played.has('grandparents'):
  showDialogue(gp-door-first-node)  // see dialogue.md
  on choice 'try-handle':
    showDialogue(gp-door-phase-node, onEnd: () => {
      transition.active = true
      overlay.opacity = 1
      wait 200ms
      currentRoom = 'grandparents'
      pip.x = rooms.grandparents.pipEntryX.fromLeft
      showCinematic('grandparents', () => {
        cabinState.beatStage = 'pre-mirror'
        setRoomStrip()
      })
      transition.active = false
      wait 200ms
      overlay.opacity = 0
    })
```

Return visit:

```
on inspect(hallway-grandparents-door) when cinematic.played.has('grandparents'):
  showDialogue(gp-door-return-node)
  on choice 'go-in':
    startTransition('grandparents', 'fromLeft')
    // No cinematic replays
  on choice 'not-now':
    closeDialogue()
```

### Room aftermath (post-cinematic)

After the grandparents' cinematic ends, Pip is in the grandparents' room at the left edge. Four standard inspectables fire on `↑` proximity (Babcia, Dziadek, photograph, suitcase). Sprint 19 adds two more (armchair, Dziadek's radio — see Puzzle 4).

**Soft cool-blue glow at left edge** (per Sprint 14) — a static-feeling presence cuing "this is the way back." Walking off the left edge transitions to the hallway.

### Notes

- The cinematic's full 10-line dialogue is in `dialogue.md` § Beat 6.
- The Polish line *Babciu, jestem tutaj* is locked Sprint 19 — no English fallback.

---

## Puzzle 3.5: Shared-wall phase-through + doctor-exit cinematic (Beat 6 continuation)

**Status:** Not shipped. Sprint 23 implements.

**Type:** Traversal trigger → room transition → cinematic.

### State read

- `cinematic.played.has('grandparents')` — gates whether the shared wall is traversable (must be `true`).
- `cabinState.doctorSeen` — gates whether the doctor-exit cinematic plays on arrival.

### State written

- `cabinState.doctorSeen: false → true` after doctor-exit cinematic ends.
- `cinematic.played.add('cabin-doctor-exit')` after cinematic ends.

### State machine (pseudocode)

```
on pip.x >= SHARED_WALL_TRIGGER_X in grandparents room when cinematic.played.has('grandparents'):
  // No ↑ required, no pause. Walking into the wall is the trigger.
  showShimmer()  // brief cool-blue pulse on right wall
  wait ~0.5s
  transition.active = true
  overlay.opacity = 1
  wait 200ms
  currentRoom = 'cabin'
  pip.x = rooms.cabin.pipEntryX.fromLeft
  pip.facing = 'right'
  if !cabinState.doctorSeen:
    startDoctorExitCinematic(() => {
      cabinState.doctorSeen = true
      cinematic.played.add('cabin-doctor-exit')
      setRoomStrip()
    })
  else:
    setRoomStrip()
  transition.active = false
  overlay.opacity = 0
```

### Doctor-exit cinematic state machine (sub-puzzle)

The doctor-exit cinematic is a scripted NPC walk, not standard dialogue. Per Sprint 14 (moved here from Puzzle 1):

```
startDoctorExitCinematic(onEnd):
  cinematic.active = true
  cinematic.name = 'cabin-doctor-exit'
  doctorExit.x = 280            // start position (world-x)
  doctorExit.targetX = 450      // far cabin door
  doctorExit.phase = 'walking'

updateDoctorExit(dt):
  if doctorExit.phase == 'walking':
    doctorExit.x += DOCTOR_SPEED * dt
    if doctorExit.x >= doctorExit.targetX:
      doctorExit.phase = 'door-opening'
      doctorExit.phaseTimer = 0.3
  elif doctorExit.phase == 'door-opening':
    doctorExit.phaseTimer -= dt
    if doctorExit.phaseTimer <= 0:
      doctorExit.phase = 'door-closing'
      doctorExit.phaseTimer = 0.4
      // Doctor fades out during this phase
  elif doctorExit.phase == 'door-closing':
    doctorExit.phaseTimer -= dt
    if doctorExit.phaseTimer <= 0:
      doctorExit.phase = 'done'
      onEnd()
```

Player input is locked throughout (`cinematic.active === true`).

### Notes

- The shared-wall traversal has **no dramatic pause**. Pip walks into the wall and through. The shimmer is the only visual punctuation. *(Confirmed by Julia 2026-05-18.)*
- This is the **first mechanical use of phase-through-wood**. Narrative discovery was the grandparents' cabin door at the start of Beat 6. The shared wall is the moment the player has *chosen* to use the ability.
- Return visits to Cabin 646 use the hallway door at x≈1180 (Puzzle 1), not the shared wall. The shared wall is one-directional and one-time. *(Sprint 23 confirms whether the shared wall stays drawn after first use or fades to a normal wall.)*
- The doctor-exit cinematic is **one-shot per session** — `cinematic.played.has('cabin-doctor-exit')` prevents replay.

---

## Puzzle 4: Dziadek's radio — discovery (Beat 7)

**Status:** **Not shipped.** Sprint 19 locks the radio's behavior. The build sprint implements it.

**Type:** Proximity trigger + dialogue + ability unlock.

### State read

- `chapterState.radioDiscovered` — false before first inspection.
- Pip's distance from radio (world-x ~200 in grandparents' cabin).

### State written

- `chapterState.radioDiscovered: false → true`
- `pip.abilities.talkThroughSpeakers: false → true` *(new ability flag — not yet in code)*

### State machine (pseudocode)

```
// Proximity crackle — passive, runs every frame in the grandparents' room
updateRadioProximity(dt):
  if currentRoom != 'grandparents': return
  if chapterState.radioDiscovered: return  // crackle stops after discovery
  dist = abs(pip.x - 200)
  if dist < 30 && !radio.crackling:
    radio.crackling = true
    playSound('radio-static-crackle', { loop: true, volume: 0.3 })
  elif dist >= 30 && radio.crackling:
    radio.crackling = false
    stopSound('radio-static-crackle')

// Inspection
on inspect(gp-radio):
  if !chapterState.radioDiscovered:
    showDialogue(radio-discovery-node, onEnd: () => {
      chapterState.radioDiscovered = true
      pip.abilities.talkThroughSpeakers = true
      stopSound('radio-static-crackle')  // crackle stops post-discovery
      // No HUD notification — discovery is narrative
    })
  elif chapterState.cartFound && !chapterState.janitorPaged:
    showDialogue(radio-page-choice-node)  // see Puzzle 6
  else:
    showDialogue(radio-passive-node)  // brief re-inspection
```

### Audio implementation note

The static-crackle sound is the only ambient sound effect Ch1 currently requires. Audio system is not yet built — this is a flag for the build sprint or a sound-design follow-up sprint. My read: a low-volume looping static effect, ~0.3 volume, that fades in/out smoothly with proximity (not abrupt on/off).

### Notes

- The radio's crackle is **passive ambient**, not gating inspection. Pip can inspect the radio without the crackle being audible (e.g., if audio is off).
- The proximity crackle is **one-shot per session** — stops permanently after discovery.

---

## Puzzle 5: Broken-sconce puzzle + electricity unlock (Beat 8)

**Status:** **Not shipped.** First multi-step puzzle in the chapter.

**Type:** Held-button interaction → ability unlock → room state change.

### State read

- `chapterState.darkCorridorEntered` — false before Pip's first entry.
- `chapterState.sconceFixed` — false before puzzle completion.

### State written

- `chapterState.sconceFixed: false → true`
- `pip.abilities.electricity: false → true`
- Dark corridor room lighting state changes from `dark` to `lit`.

### State machine (pseudocode)

```
// Phase 1: Pip approaches the fallen sconce (world-x ~420)
on inspect(dc-broken-sconce):
  if chapterState.sconceFixed: return  // post-puzzle, no further interaction
  showDialogue(sconce-pre-puzzle-node)  // 3 lines, see dialogue.md
  on dialogue end:
    startSconcePuzzle()

startSconcePuzzle():
  sconcePuzzle.active = true
  sconcePuzzle.chargeLevel = 0  // 0..1
  sconcePuzzle.targetCharge = 1.0
  sconcePuzzle.startTime = now
  // Show on-screen prompt: "Hold ↑"
  showHUDPrompt('Hold ↑')

updateSconcePuzzle(dt):
  if !sconcePuzzle.active: return
  if isHeld('ArrowUp'):
    sconcePuzzle.chargeLevel += dt / 1.5  // 1.5 seconds to fill
    // Visual: spark intensity at the sconce scales with chargeLevel
    spawnSpark(sconceX, sconceY, intensity: sconcePuzzle.chargeLevel)
    if sconcePuzzle.chargeLevel >= sconcePuzzle.targetCharge:
      completeSconcePuzzle()
  else:
    // Charge drains if button is released early
    sconcePuzzle.chargeLevel -= dt / 3.0
    sconcePuzzle.chargeLevel = max(0, sconcePuzzle.chargeLevel)

completeSconcePuzzle():
  sconcePuzzle.active = false
  hideHUDPrompt()
  chapterState.sconceFixed = true
  pip.abilities.electricity = true
  // Trigger the lights-on cinematic
  startLightsOnSequence()

startLightsOnSequence():
  // Visual: sconces buzz on one-by-one along the corridor
  // ~0.2s per sconce, ~5 sconces, ~1s total
  for sconce in darkCorridor.sconces:
    delay(sconce.lightUpDelay)
    sconce.lit = true
    playSound('sconce-buzz')
  // After last sconce: show post-puzzle narration
  delay(1.0)
  showDialogue(sconce-post-puzzle-node)  // 2 lines + HUD hint
  on dialogue end:
    showHUDHint('Third ability earned. Hold ↑ near broken electricity.')
```

### Held-button interaction details

- **Hold duration:** 1.5 seconds at full hold to complete.
- **Drain rate:** 0.33/sec when not held (slower drain than fill — forgiving).
- **Visual feedback:** spark intensity at the sconce scales with `chargeLevel`. Sparks brighten as charge builds.
- **Audio feedback (if implemented):** rising electrical hum as charge builds; a satisfying "click" at completion.
- **No fail state.** Releasing the button just drains charge. The player can always succeed by holding longer.

### Notes

- The held-↑ interaction is **gentle, not frantic.** Per the chapter's tone, the puzzle should feel like Pip carefully drawing electricity out of the wires, not desperately mashing buttons.
- After the puzzle completes, the sconce is permanently fixed in the room — re-entering shows the lit state.
- The electricity ability is *narratively* discovered. The chapter's pattern is that abilities aren't unlocked at menus; they're earned by doing.

---

## Puzzle 6: Float discovery + janitor sequence (Beat 8 — second half)

**Status:** **Not shipped.**

**Type:** Scripted involuntary float → cart inspection → radio paging → scripted NPC walk.

### State read

- `chapterState.sconceFixed` — must be `true` to enter this phase.
- `chapterState.floatUnlocked` — false before glass-tile step.
- `chapterState.cartFound` — false before cart inspection.
- `chapterState.janitorPaged` — false before radio paging.

### State written

- `chapterState.floatUnlocked: false → true`
- `pip.float.unlocked: false → true`
- `chapterState.cartFound: false → true`
- `chapterState.janitorPaged: false → true`
- `chapterState.janitorWalked: false → true`

### Sub-phase A: Float discovery

```
// Triggered when Pip walks past world-x ~420 in dark corridor (broken-glass tile)
onPipPosition(darkCorridor):
  if pip.x > 415 && pip.x < 425 && !chapterState.floatUnlocked && chapterState.sconceFixed:
    triggerInvoluntaryFloat()

triggerInvoluntaryFloat():
  // Suspend player input briefly
  panicFloat.active = true
  panicFloat.phase = 'rising'
  panicFloat.timer = 0.6
  pip.float.altitude = 0

updateInvoluntaryFloat(dt):
  if panicFloat.phase == 'rising':
    pip.float.altitude += FLOAT_RISE_RATE * dt
    panicFloat.timer -= dt
    if panicFloat.timer <= 0 || pip.float.altitude >= 30:
      panicFloat.phase = 'falling'

  elif panicFloat.phase == 'falling':
    pip.float.altitude -= FLOAT_FALL_RATE * dt
    if pip.float.altitude <= 0:
      pip.float.altitude = 0
      panicFloat.phase = 'done'
      panicFloat.active = false
      chapterState.floatUnlocked = true
      pip.float.unlocked = true  // player can now hold Space to float
      showDialogue(float-discovery-node)
      // After dialogue: show HUD hint
```

**Difference from Beat 5 panic float:** This one *does* unlock the ability. `pip.float.unlocked = true` is the player-facing distinction.

### Sub-phase B: Cart inspection

```
on inspect(dc-janitor-cart):
  if chapterState.janitorWalked: return  // cart is gone post-walk
  showDialogue(cart-inspect-node)  // 3 lines
  on dialogue end:
    chapterState.cartFound = true
    // Aura on cart elevates to breadcrumb; new aura appears on Dziadek's radio in grandparents' cabin
  // If Pip tries to push the cart:
on attemptPushCart:
  showDialogue(cart-push-fail-node)  // 1 line
```

### Sub-phase C: Radio paging

```
// After cart is found, the radio's inspection node changes (see Puzzle 4)
on inspect(gp-radio) when chapterState.cartFound && !chapterState.janitorPaged:
  showDialogue(radio-page-choice-node)
  on choice 'listen':
    showDialogue(radio-discovery-replay-node)  // re-plays original 4 lines
  on choice 'page':
    showDialogue(radio-paging-node, onEnd: () => {
      chapterState.janitorPaged = true
      // No immediate effect — Pip must walk back to dark corridor for janitor's walk to fire
    })
  on choice 'not-now':
    closeDialogue()
```

### Sub-phase D: Janitor's scripted walk

```
// Triggered on Pip's re-entry to dark corridor after paging
onRoomEnter(darkCorridor):
  if chapterState.janitorPaged && !chapterState.janitorWalked:
    startJanitorWalk()

startJanitorWalk():
  janitorWalk.active = true
  janitorWalk.phase = 'entering'
  janitorWalk.x = -20  // off-screen left
  janitorWalk.targetX = 840  // cart position

updateJanitorWalk(dt):
  if janitorWalk.phase == 'entering':
    janitorWalk.x += JANITOR_SPEED * dt
    if janitorWalk.x >= janitorWalk.targetX:
      janitorWalk.phase = 'paused-at-cart'
      janitorWalk.timer = 1.5
      // Show janitor's Norwegian mutter dialogue
      showDialogue(janitor-mutter-node)

  elif janitorWalk.phase == 'paused-at-cart':
    janitorWalk.timer -= dt
    if janitorWalk.timer <= 0 && !dialogue.active:
      janitorWalk.phase = 'pushing-cart'

  elif janitorWalk.phase == 'pushing-cart':
    janitorWalk.x -= JANITOR_SPEED * dt
    darkCorridor.cartX -= JANITOR_SPEED * dt  // cart moves with janitor
    if janitorWalk.x < -20:
      janitorWalk.phase = 'done'
      janitorWalk.active = false
      darkCorridor.cartRemoved = true
      chapterState.janitorWalked = true
      // Show post-walk reflection
      showDialogue(post-janitor-reflection-node)  // 2 italic lines
```

**Player has movement control during the janitor's walk** — the janitor walks around Pip if Pip stays still, or through him if Pip is in his line of motion (illustrating "the rule"). Per the dialogue spec, the janitor *looks right past Pip* — visually, the janitor's eye-line never registers Pip even if they share screen position.

### Notes

- The cart removal opens the stairwell to the kitchen — `darkCorridor.cartRemoved` controls whether the stairwell is interactive.
- The janitor's Norwegian mutter (*"Hvor i alle dager…"*) needs native-speaker review before code-lock.
- This whole multi-step sequence is the chapter's first puzzle requiring back-tracking — Pip goes corridor → cabin (radio) → corridor (janitor walk). The flow must be clear from breadcrumb auras.

---

## Puzzle 7: Stairwell descent to kitchen (Beat 9 transition)

**Status:** **Not shipped.**

**Type:** Room transition with cinematic onset.

### State read

- `chapterState.janitorWalked` — must be `true` for stairwell to be interactive.
- `cinematic.played.has('kitchen-meeting')` — false before first arrival.

### State written

- `cinematic.played.add('kitchen-meeting')`

### State machine (pseudocode)

```
on inspect(dc-stairwell-down) when chapterState.janitorWalked:
  // Standard room transition + cinematic onset
  startTransition('kitchen', 'fromStairwell', onComplete: () => {
    showCinematic('kitchen-meeting', () => {
      // After Cinematic 4 ends, Cinematic 5 plays immediately (no gap)
      showCinematic('henrik-sits-down', () => {
        showCinematic('first-taste', () => {
          // Now Pip is in room-mode kitchen, can collect Bamsemums (Beat 11b)
          setRoomStrip()
        })
      })
    })
  })
```

**This is a chained cinematic — three cinematics back-to-back, no player input between them.** ~3–5 minutes of stitched cinematics total. Per the beat structure: Cinematic 4 → Cinematic 5 → Cinematic 6 → room-mode kitchen.

### Notes

- The chained cinematic is the chapter's longest input-free stretch. The pacing must hold attention — each line's typewriter speed and post-line hold are critical.
- After Cinematic 6 ends, Pip is in room-mode in the kitchen. Henrik is on the stool. The Bamsemums bag is visible on the counter with warm collect-aura.

---

## Puzzle 8: Bamsemums tutorial (Beat 11b)

**Status:** Shipped (Sprint 13).

**Type:** Proximity dialogue + collect-verb tutorial.

### State read

- `chapterState.bamsemumsCollected` — false before collection.
- Pip's distance from Bamsemums bag.

### State written

- `chapterState.bamsemumsCollected: false → true`
- `pip.stomach.value` += 10
- Notebook gains "Bamsemums" entry in Items section.

### State machine (pseudocode)

```
// Proximity-triggered dialogue
updateBamsemumsProximity(dt):
  if chapterState.bamsemumsCollected: return
  if currentRoom != 'kitchen': return
  dist = abs(pip.x - 520)
  if dist < 30 && !bamsemumsDialogueShown:
    bamsemumsDialogueShown = true
    showDialogue(bamsemums-tutorial-node)

on collect(↓ near bamsemums):
  // Collect verb already taught here
  chapterState.bamsemumsCollected = true
  pip.stomach.value = min(pip.stomach.max, pip.stomach.value + 10)
  notebook.items.push({ id: 'bamsemums', label: 'Bamsemums', source: 'Henrik' })
  spawnPickupTween(bamsemumsX, bamsemumsY, notebookIconX, notebookIconY)
  removeFromRoom('bamsemums')
```

### Notes

- The collect verb (`↓`) is taught here through the inline narration *"↓ to collect."* — this is the chapter's only diegetic tutorial.
- After Pip learns `↓` here, any object with a warm collect-aura (cabin's hidden treat, hallway's canonical treat, dark corridor's cleaning-cart treat, observation deck's treat) becomes collectable on replay.

---

## Puzzle 9: Nøkken story (Beat 11c)

**Status:** **Not shipped.**

**Type:** NPC inspection dialogue + scripted lighting register.

### State read

- `chapterState.bamsemumsCollected` — must be `true` to inspect Henrik.
- `chapterState.nokkenStoryHeard` — false before first telling.

### State written

- `chapterState.nokkenStoryHeard: false → true`

### State machine (pseudocode)

```
on inspect(kitchen-henrik) when chapterState.bamsemumsCollected:
  if !chapterState.nokkenStoryHeard:
    // Subtle lighting dim during story — kitchen's pendant pulses slightly slower
    kitchenLighting.dimmed = true
    showDialogue(nokken-story-node, onEnd: () => {
      kitchenLighting.dimmed = false
      chapterState.nokkenStoryHeard = true
    })
  else:
    showDialogue(henrik-passive-node)  // brief re-inspection line
```

### Lighting dim implementation

```
kitchenLighting = {
  dimmed: false
  pendantPulseSpeed: 1.0  // baseline pulse rate; 0.5 = half-speed
}

// In kitchen render:
const pulseSpeed = kitchenLighting.dimmed ? 0.5 : 1.0
const pulseAlpha = baseAlpha * (0.85 + 0.15 * sin(now * pulseSpeed))
```

**Visual effect:** the pendant's warm pool pulses slightly slower and slightly dimmer during the story. Subtle — not a dramatic dim. The kitchen "listens" alongside Pip.

### Special line handling: Henrik's pause

Per `dialogue.md` § Beat 11c, the line *"He says nothing else about that"* requires a **1.5–2 second typewriter delay** before its first character appears. This is the line after Henrik's *"I did not always listen to her"* — the silence is the load-bearing moment.

```
// In showDialogue, line node may include a `preDelay` field
{ speaker: null, text: 'He says nothing else about that.', italic: false, preDelay: 1.8 }

// Typewriter respects preDelay before starting reveal
updateDialogue(dt):
  if dialogue.preDelayActive:
    dialogue.preDelayTimer -= dt
    if dialogue.preDelayTimer <= 0:
      dialogue.preDelayActive = false
    return
  // Normal typewriter reveal continues
```

### Notes

- The Nøkken story is **one-shot per session** — re-inspecting Henrik after the story plays returns a brief passive line.
- The lighting dim and typewriter pre-delay are small details that elevate the story's emotional landing. They're optional polish, not required — Claude Code can stub them and they can be added in a follow-up sprint. Flag for build-sprint decision.

---

## Puzzle 10: Dock farewell + Nøkken glimpse (Beat 12)

**Status:** **Not shipped.**

**Type:** Cinematic + scripted visual sequence.

### State read

- `chapterState.nokkenStoryHeard` — Pip has heard Henrik's story.

### State written

- `cinematic.played.add('dock-farewell')`
- `chapterState.nokkenGlimpsed: false → true`
- `chapterState.grandparentsLeft: false → true`

### State machine (pseudocode)

```
// Triggered when Pip arrives at observation deck (or via scripted fade after kitchen exit)
onObservationDeckEntry:
  if !cinematic.played.has('dock-farewell'):
    showCinematic('dock-farewell', () => {
      // After cinematic, Pip is on the deck. Player input still locked.
      startNokkenGlimpse()
    })

startNokkenGlimpse():
  nokkenGlimpse.active = true
  nokkenGlimpse.phase = 'water-focus'
  nokkenGlimpse.timer = 0.5  // fade-in to water view

updateNokkenGlimpse(dt):
  nokkenGlimpse.timer -= dt
  if nokkenGlimpse.phase == 'water-focus':
    // Camera/scene transitions to focus on harbor water below
    if nokkenGlimpse.timer <= 0:
      nokkenGlimpse.phase = 'shape-rising'
      nokkenGlimpse.timer = 0.8

  elif nokkenGlimpse.phase == 'shape-rising':
    // Dark rooted shape rises into view; two amber eyes appear at waterline
    if nokkenGlimpse.timer <= 0:
      nokkenGlimpse.phase = 'held'
      nokkenGlimpse.timer = 1.5

  elif nokkenGlimpse.phase == 'held':
    // Shape visible, ring of disturbed water around it
    if nokkenGlimpse.timer <= 0:
      nokkenGlimpse.phase = 'submerging'
      nokkenGlimpse.timer = 0.6

  elif nokkenGlimpse.phase == 'submerging':
    // Shape descends; ring expands and settles
    if nokkenGlimpse.timer <= 0:
      nokkenGlimpse.phase = 'reflection'
      // Single italic narration line plays
      showDialogue(nokken-reflection-node, onEnd: () => {
        nokkenGlimpse.active = false
        chapterState.nokkenGlimpsed = true
        chapterState.grandparentsLeft = true
        // Player input returns
        setRoomStrip()
      })
```

### Visual implementation

The Nøkken glimpse is **not a cinematic** in the registry sense — it's a scripted visual sequence within room mode. The camera or scene composition shifts to focus on the harbor water; the shape rises and submerges procedurally.

**The shape:** per the visual reference (image 1 from P1 Session 4 conversation), a dark rooted form with two glowing amber eyes peering up from the waterline. Mostly submerged. Faint ring of disturbed water around it. Sepia-monochrome painterly register.

**Implementation:** can be a single sprite-asset (commissioned art) or a procedural draw (silhouette + two amber dots + ripple shader). For the build sprint, suggest procedural — easier to iterate, doesn't block on art commission.

```
drawNokkenShape(x, y, alpha):
  // Dark rooted shape
  fillStyle = `rgba(20, 15, 25, ${alpha})`
  drawShape(x, y, NOKKEN_SHAPE_PATH)
  // Two amber eyes
  fillStyle = `rgba(220, 180, 80, ${alpha * 0.9})`
  fillCircle(x - 6, y + 2, 2)
  fillCircle(x + 6, y + 2, 2)
  // Ring of water
  strokeStyle = `rgba(100, 110, 130, ${alpha * 0.4})`
  drawEllipse(x, y + 8, 18, 4)
```

### Notes

- Pip retains his sprite on screen during the Nøkken glimpse — the player sees Pip looking at the water.
- No audio cue from the Nøkken itself. The chapter's earlier story established the violin; the harbor sighting is silent. This is intentional — the violin is reserved for Ch4.
- After the glimpse, Pip has standard room-mode control on the deck. Cinematic 8 (Beat 13) is triggered by approaching Henrik (who arrives on the deck silently between Beat 12's end and Beat 13's start).

---

## Puzzle 11: Henrik's notebook handoff (Beat 13)

**Status:** **Not shipped.**

**Type:** NPC inspection → cinematic → chapter end.

### State read

- `chapterState.nokkenGlimpsed` — Pip has seen the Nøkken.

### State written

- `cinematic.played.add('henriks-offer')`
- `chapterState.notebookReceived: false → true`
- `chapterState.chapter1Complete: false → true`

### State machine (pseudocode)

```
// Henrik appears on the deck silently between Beat 12 and Beat 13.
// Implementation: spawn Henrik sprite at deck-position when chapterState.nokkenGlimpsed === true
// and observationDeck.henrikPresent === false

onObservationDeckEntry:
  if chapterState.nokkenGlimpsed && !observationDeck.henrikPresent:
    observationDeck.henrikPresent = true
    observationDeck.henrikX = 320  // standing position on deck

on inspect(deck-henrik):
  if !chapterState.notebookReceived:
    showCinematic('henriks-offer', () => {
      chapterState.notebookReceived = true
      chapterState.chapter1Complete = true
      // Chapter end. Trigger chapter-end transition or stub.
      onChapter1Complete()
    })
```

### Chapter-end transition

```
onChapter1Complete():
  // For now, return to a "Chapter 2 coming soon" placeholder or title screen
  // In the future, this transitions directly to Chapter 2's opening
  // Build sprint decision: stub this with a black screen + "End of Chapter 1" text
```

### Notes

- Cinematic 8's dialogue is in `dialogue.md` § Beat 13.
- The chapter-end transition is **not yet defined**. The Henrik kitchen build sprint should produce a working chapter ending — even if just a fade-to-black with text. Ch2 implementation is out of scope.
- The notebook handoff is the chapter's emotional period. Henrik's *"I'll be in the kitchen"* is the chapter's smallest, warmest grace note — implementation should not undermine it with abrupt transition.

---

## Cross-puzzle state summary

State flags introduced or modified by Ch1's puzzles, alphabetically:

| Flag | Set by | Read by | Effect when true |
|---|---|---|---|
| `cabinState.beatStage` | Sprint 11 (multiple values) | Mirror & bed inspectables | Controls aura intensities and inspect-trigger conditions |
| `cabinState.bedRevealed` | Puzzle 2 (bed-reveal cinematic) | Cabin draw fn | Lump no longer rendered |
| `cabinState.doctorSeen` | Puzzle 3.5 (doctor-exit on shared-wall arrival) | Puzzle 3.5 | Doctor-exit cinematic doesn't replay |
| `cabinState.mirrorRevealed` | Puzzle 2 (mirror cinematic) | Cabin draw fn | Mirror surface shows ghost-face |
| `chapterState.bamsemumsCollected` | Puzzle 8 | Puzzle 9 | Henrik becomes inspectable for Nøkken story |
| `chapterState.cartFound` | Puzzle 6B | Puzzle 6C, Puzzle 4 | Radio gains "page" choice |
| `chapterState.chapter1Complete` | Puzzle 11 | Ch2 entry | Chapter ends |
| `chapterState.darkCorridorEntered` | Pip entry to room | Aura initial state | Hint update for breadcrumb |
| `chapterState.floatUnlocked` | Puzzle 6A | `pip.float.unlocked` | Player can hold Space to float |
| `chapterState.grandparentsLeft` | Puzzle 10 | (narrative) | — |
| `chapterState.janitorPaged` | Puzzle 6C | Puzzle 6D | Janitor walk triggers on next dark-corridor entry |
| `chapterState.janitorWalked` | Puzzle 6D | Puzzle 7 | Stairwell becomes interactive |
| `chapterState.nokkenGlimpsed` | Puzzle 10 | Puzzle 11 | Henrik appears on deck |
| `chapterState.nokkenStoryHeard` | Puzzle 9 | (narrative) | — |
| `chapterState.notebookReceived` | Puzzle 11 | Chapter end | — |
| `chapterState.openingPlayed` | Sprint 10.7 | Update loop | Player has control |
| `chapterState.passengerSeen` | Beat 3 trigger | Beat 3 trigger | Passenger doesn't retrigger |
| `chapterState.radioDiscovered` | Puzzle 4 | Puzzle 4, 6C | Radio inspection node varies |
| `chapterState.sconceFixed` | Puzzle 5 | Puzzle 6A, Dark corridor lighting | Corridor switches to lit state |
| `cinematic.played` | Every cinematic | Conditional dialogue branches | One-shot enforcement |
| `pip.abilities.electricity` | Puzzle 5 | (future puzzles) | Future ability-gated choices unlock |
| `pip.abilities.talkThroughSpeakers` | Puzzle 4 | Puzzle 6C | Radio can be used to page |
| `pip.float.unlocked` | Puzzle 6A | Update loop, Space input | Player can float |

**Save state implications:** All `chapterState.*` and `cabinState.*` flags must be persisted to `localStorage` per Sprint 17. The `cinematic.played` set must also be serialized. Sprint 17 already handles most of these — the build sprint should verify the new flags from Puzzles 4–11 are added to the save schema.

---

## Cross-puzzle flow diagram (chapter completion order)

```
Beat 1: Materialize in hallway      [openingPlayed]
  ↓
Beat 2: Explore hallway              [passive — no state]
  ↓
Beat 3: Passenger walks through      [passengerSeen]
  ↓
Beat 4: Cabin door — Listen          [(no state) — repeatable]
  ↓
Beat 6: Grandparents' cinematic      [cinematic.played.grandparents]
  ↓                                  [beatStage = 'pre-mirror']
Beat 6 cont: Shared-wall phase-through [doctorSeen]
  ↓
Beat 5: Mirror + Bed reveal + Panic  [mirrorRevealed, bedRevealed, beatStage='post-bed']
  ↓
Beat 7: Dziadek's radio              [radioDiscovered, talkThroughSpeakers]
  ↓
Beat 8a: Dark corridor entry         [darkCorridorEntered]
  ↓
Beat 8b: Broken sconce puzzle        [sconceFixed, electricity]
  ↓
Beat 8c: Float discovery             [floatUnlocked, float.unlocked]
  ↓
Beat 8d: Cart inspection             [cartFound]
  ↓
Beat 8e: Radio paging                [janitorPaged]
  ↓
Beat 8f: Janitor walks               [janitorWalked]
  ↓
Beat 9: Stairwell → kitchen          [cinematic.played.kitchen-meeting]
  ↓
Beat 10: Henrik sits down            [cinematic.played.henrik-sits-down]
  ↓
Beat 11: Cinematic 6 (first taste)   [cinematic.played.first-taste]
  ↓
Beat 11b: Bamsemums                  [bamsemumsCollected]
  ↓
Beat 11c: Nøkken story               [nokkenStoryHeard]
  ↓
Beat 12: Dock farewell + Nøkken      [grandparentsLeft, nokkenGlimpsed]
  ↓
Beat 13: Henrik's offer              [notebookReceived, chapter1Complete]
```

The chapter has **one critical path** with no significant branching. The Listen-at-door is the only optional content. Wall-decor inspectables and ambient flavor are off-path but always available.

---

## Open questions for build sprint

1. **Audio system.** Several puzzles call for audio (radio crackle, sconce-buzz, possibly water drips in dark corridor, Nøkken glimpse audio). Audio system is not yet implemented. Build sprint should either (a) stub audio with `console.log` calls and flag for a sound-design sprint, or (b) integrate a basic audio system as part of the build. **My read:** (a) — keep this sprint focused on mechanics. Audio is a follow-up sprint.

2. **Held-button charge mechanic for broken sconce.** Spec calls for held-↑ for 1.5s. Build sprint should implement a reusable "held-button puzzle" primitive — likely useful for future chapters too. Flag for design pattern review.

3. **Kitchen lighting dim during Nøkken story.** Optional polish. Build sprint can skip this and ship as a follow-up. My read: skip; ship as polish later.

4. **Typewriter pre-delay on dialogue lines.** New field `preDelay` on line nodes. Used for the Nøkken story's pause. Small dialogue-system extension. Build sprint should implement.

5. **Henrik's appearance on the observation deck.** Spec says "he appears silently between Beat 12 and Beat 13." Build sprint decision: does Henrik spawn on screen between cinematics (visible fade-in), or is he just there when Pip arrives at the deck (instant appearance)? My read: instant appearance, no fade. Pip's attention was on the harbor; Henrik joined while Pip was looking elsewhere. Settle in build sprint.

6. **Chapter-end transition.** What happens after Beat 13 ends? My read: black screen + "End of Chapter 1" + return to title screen. Ch2 is not yet built. Build sprint should produce a working chapter ending stub.

7. **Cabin draw functions for new props (Sprint 19).** The desk, washstand, bed drawer (with treat), inspectable child's drawing all need draw functions. None of these are Ch1 puzzles per se, but they're prerequisites for the Beat 5 sequence and replay-treat collection. **My read:** bundle into the build sprint, but treat as Sprint 19's deferred implementation work, not new design. Add the props as part of the cabin's draw function update.

