# Art & Aesthetic

The visual and atmospheric direction for The Last Bites.

*Sibling doc: `03b-ui-spec.md` locks the interface layer — dialogue box dimensions, HUD positioning, menus, screens. This doc covers the world's visual character; that doc covers the chrome that sits on top of it.*

---

## Top-line Direction

**Pixel art, 7th Guest darkness.**

That's the seven-word brief. Everything else expands on it.

- **Pixel art** — sharp, low-resolution, intentional pixel work. Internal canvas resolution is **480×270**, scaled up cleanly to whatever screen size.
- **7th Guest darkness** — the 1993 game's pre-rendered CGI aesthetic: deep velvety blacks, single warm light sources, ornate detail, the feeling that ordinary objects are cursed. Every scene should have a clear light source and a clear shadow zone.
- **Two framings, one register.** Gameplay rooms use a wide framing — Pip is small in a large environment, lots of negative space and shadow. Cinematics use a close-up framing — character fills a meaningful portion of the frame, more pixels per face, more detail in expression. Same pixel grid, same style, same color logic. One game, two camera distances.

---

## Visual Registers

The game uses three distinct visual registers. They share a soul — the same color palette, the same warm-pool-in-cool-world logic, the same character designs — but they live at different scales, levels of detail, and rendering techniques. Confusing them produces work that looks "wrong" even when every individual rule was followed.

### Register A — Gameplay Sprite (the in-game register)

This is what the player sees 95% of the time. Pip walking through cabin 646. Pätu sitting on a brass fixture. Henrik at his counter.

- **Scale:** Tiny. Pip is ~16-24 pixels at 480×270 internal canvas. Pätu is ~28-36 pixels. NPCs scale similarly.
- **Rendering:** True pixel art. Hard pixel edges. Drawn procedurally to canvas using `ctx.fillRect` for placeholders, switched to image draws when art is commissioned.
- **Detail level:** Sparse. A face is two eye-dots and a single mouth pixel. A body is a silhouette with a hint of color. No painterly shading. No fine ornament inside the sprite itself.
- **Animation:** Eyes blink. Body bobs. Mouth occasionally changes shape. Driven by the three-layer-rig pattern (see "Sprite-rig layering" section below for the canonical implementation).
- **Where the atmosphere comes from:** The *room* around the sprite. Ornate Victorian detail belongs in the room background, lamp halos, dust motes, vignette. The sprite itself is small and clean.
- **What this looks like in practice for Pip:** a bald white ghost shape with three classic waves at the bottom, two black eye-dots, two pink blush pixels, a tiny dark mouth, and a soft cool drop-shadow glow on the floor beneath him. Nothing else. No hair. No apron. The simplicity is intentional and thematic — see the story bible's section on Pip's visual form.

### Register B — Cinematic (the painterly register)

This is what the player sees during the ~9 emotionally-loaded story moments per chapter — the mirror, the kitchen reveal, Henrik's first reaction, the dock, the offer of the journal, the memory of lefse.

- **Scale:** Full canvas. 480×270 pixels of detail. Characters fill 40–60% of frame height in close-ups.
- **Rendering:** Static images, hand-painted or AI-generated then refined. Painterly, atmospheric.
- **Detail level:** Rich. Ornate Victorian detail. Painterly shading. Light catching on wood-grain, on metal, on skin. This is where the references (Owlboy, Hyper Light Drifter, Hob's Barrow, 7th Guest, Coraline) actually live.
- **Animation:** Reserved for highest-impact beats (mirror melt, shimmer-dissolve, dropped pan). Most cinematics are still images with code-driven motion (drifting particles, slow zoom, dissolve).
- **Where the atmosphere lives:** In the image itself. The whole frame is doing emotional work — light, composition, expression, detail.
- **Present-day Pip in Register B is the same bald ghost as in Register A, just rendered with more pixels.** No hair, no apron, no human body. The cinematic Pip is "more pixels of the same ghost," not a redesign.
- **Memory Pip is different.** Memory cinematics show the human boy: hair, apron, body, legs. See the story bible.

### Register C — Puzzle/Cinematic-Hybrid (the CSS-div register, prototype-only)

A third register has emerged in prototype work (e.g. `three-doors-demo.html`). When a *puzzle screen* or *summary card* needs to show characters larger than the gameplay sprite but with less commissioned-art weight than a cinematic — a portrait in a door, a face on a summary option — they're built as CSS-positioned `<div>` stacks.

- **Scale:** Medium. ~40-90 pixels of figure height inside an interactive UI element.
- **Rendering:** HTML + CSS. No images. No canvas. Pure positioned divs with box-shadow glow effects.
- **When to use:** Puzzle screens, summary cards, multiple-choice portraits, ornament-heavy UI moments.
- **When NOT to use:** In-game sprites (use Register A). Major emotional beats (use Register B). Any moment where the character should feel "real" rather than "schematic."

This is a prototype convenience, not a canonical visual layer of the game. As art is commissioned, Register C work may migrate to Register B or be retired.

### Which register to use when

- **In a chapter room, the player is moving and exploring** → Register A
- **The screen darkens, a static image appears, narration plays** → Register B
- **A puzzle interface shows two or three faces to choose between** → Register C (until commissioned art replaces it)
- **A character is being introduced for the first time in a held moment** → Register B
- **A cat hisses to warn Pip about a bad ghost mid-room** → Register A (it's gameplay, in the room, the player has control)
- **The cat is shown in a cinematic introduction beat** → Register B
- **A flashback to Pip's life as a boy** → Register B, memory variant — show the human boy

### References by register

The references in the "Reference Inventory" section apply differently to each register:

- **Register A references:** *Hollow Knight* sprite scale (the actual in-game knight, not the cutscenes), *Thimbleweed Park* in-game sprites, *Owlboy* in-game sprites (not its painted backgrounds). The Pip in the existing prototype is the locked Register A target.
- **Register B references:** *The 7th Guest*, *Coraline*, *Over the Garden Wall*, *Owlboy* painted backgrounds and key art, *Hyper Light Drifter* atmospheric shots, *The Excavation of Hob's Barrow*'s full-scene compositions, *Spirited Away* spirit-world imagery.
- **Register C has no formal references** — it's a prototype convenience. The `three-doors-demo.html` figures are the working pattern.

### What this means for commissioning

When commissioning art, specify the register:

- **"Gameplay sprite for Pätu, Register A, ~32 pixels"** — gets you a small clean pixel-art cat
- **"Cinematic, Register B, present-day, the moment Henrik first sees Pip"** — gets you a painterly 480×270 image of bald ghost-Pip and Henrik
- **"Cinematic, Register B, memory, the lefse beat (6b)"** — gets you a painterly 480×270 image of *the boy Pip used to be*, with hair and apron, in Babcia's kitchen long ago
- Without the register tag, an artist looking at the bible's "Owlboy / Hob's Barrow" references will produce Register B work even when Register A was wanted. This was an undocumented hazard in the original brief.

---

## Resolution

The internal canvas resolution is **480×270**. This is a 16:9 ratio that scales cleanly to common display sizes (4× to 1080p, ~5.3× to 1440p) and gives roughly 2.25× the pixel area of the original 320×180 prototype. The bump gives the artist room for ornate detail in dark spaces, deeper shadow gradients, more readable faces in cinematic close-ups, and longer/deeper rooms.

Pip's sprite scales proportionally to roughly **16×24 pixels** at this resolution.

Pixel rendering uses `image-rendering: pixelated`. No anti-aliasing. No sub-pixel detail. Hard pixel edges throughout.

---

## Reference Inventory

Show these to any artist hired for the project.

**Primary visual references:**
- *The 7th Guest* (1993) — for lighting, mood, ornate object detail
- *Luigi's Mansion* (GameCube) — for warm-spooky tone, friendly ghost vibes
- *Coraline* (film) — for the gentle scary
- *Over the Garden Wall* (animated series) — for folkloric melancholy
- *Hollow Knight* (game) — for atmospheric pixel art, lighting in dark spaces
- *Studio Ghibli's Spirited Away* — for spirit-world food imagery
- *Owlboy* — for high-resolution pixel art with painterly detail
- *Hyper Light Drifter* — for atmospheric pixel lighting and environmental pixel storytelling
- *Thimbleweed Park* — for the SCUMM-inspired pixel-adventure register
- *The Excavation of Hob's Barrow* — for pixel art with horror/folk register

**Color palette (working):**
- Deep blacks: `#000000`, `#080604`, `#0a0604`
- Warm amber lamplight: `#f8d898`, `#c89858`, `#a88838`
- Pallid skin / candle wax: `#9a7050`, `#b89878`
- Crimson upholstery / ship interiors: `#2a0a0a`, `#1a0808`, `#3a1f1a`
- Brass / ornament: `#5a4020`, `#3a2410`
- Sea / porthole night: `#1a2030`, `#0a1018`, `#02040a`
- Pip's ghostly white: `rgba(232, 235, 245, 0.85)` — always slightly transparent

Each new chapter port adds 2–3 region-specific accent colors (Naples gets terracotta and basil-green, Tokyo gets neon-pink and lacquer-red, Brittany gets sea-fog gray and soft yellow candle-glow, etc.).

**Typography:**
- Display / titles: **Special Elite** (typewriter, slightly haunted)
- Body / dialogue: **Cormorant Garamond** (italic for narration, regular for speech)

These are loaded from Google Fonts in the prototype. Fine to replace with self-hosted equivalents.

---

## Aesthetic Rules

These are the principles that keep the look consistent. When in doubt, return here.

1. **Single light source per scene.** Every room should have one dominant warm light (a hanging lamp, a doorway spilling light, a candle, a porthole). Everything else falls into shadow.

2. **Black is a color.** Don't fill black areas with detail. Let them be deep, textured-only with subtle film grain. The viewer's eye should rest in the darkness and seek the light.

3. **Pip is always slightly luminous.** He carries a soft cool glow that contrasts with the warm room lights. He should always be readable, even in the darkest scenes.

4. **Ornament over realism.** The 7th Guest used Victorian/baroque decoration to make the world feel uncanny. Choose ornate furniture, carved wood, brass details. The ship is old-world, not modern cruise ship.

5. **Dust motes are mandatory.** Always have some particulate drift in the air. It signals atmosphere and motion in still scenes.

6. **Film grain everywhere.** A subtle animated noise overlay over every scene. This is a CSS effect in the prototype and should stay.

7. **Vignette every scene.** Edges always darker than centers. Focuses attention.

8. **Warm lights flicker.** Subtle, not distracting. Adds life.

9. **The two registers share a soul.** Pip in a pixel room and Pip in a present-day cinematic close-up must read as the same character — same face (eye-dots, blush, mouth), same proportions, same soft cool glow underneath. The cinematic Pip is just *more pixels of the same ghost*, not a redesign. The apron and hair appear only in memory-Pip (Register B, flashback beats) per the story bible.

---

## Universal & Regional Palette

The palette is structured as **a cool-base world with warm-amber pools**. The whole game lives in moonlit-night register — *the cottage stands in a cold world; warmth is what makes it home.* This is canon and cascades to every scene.

**Why this palette:**
- It enacts the bible's central image. Pip is a small warm thing moving through a cold otherworld trying to find home. Warmth being *rare and meaningful* literalizes the theme.
- Accessibility. Blue/amber and purple/amber are the highest-contrast pairings for color blindness (deuteranopia, protanopia, tritanopia all preserve at least one of these axes). Glare-resistant on real screens.
- It's already implied by the Aesthetic Rules above (single warm light per scene, Pip cool-luminous, black-as-color). The palette names what those rules require.

### The cool/warm split

- **The world is cool.** Indoors and outdoors. Walls, floors, sky, ship corridors. *Cool* here means *blue or purple* (never gray) — the world has chromatic life, just not warm chromatic life.
- **Warmth is rare and meaningful.** Cottage windows seen from outside. The wood stove. Lit doorways. The hearth. Spirits' glows (per their signature). Food. Henrik's kitchen. Pip's parents at the climax. *Anything that means home, life, or care* is warm.
- **Pip is white-cool-translucent.** A small cool light against the cool world — but his white is brighter than the blue, so he reads as *alive ghost* against *night room*.

### Universal tokens (these don't change per chapter)

| Token | Hex | Where it lives |
|---|---|---|
| `--text-narration` | `#fff4d8` | Narrator's voice. Italic Cormorant. Cream-white. |
| `--text-speaker` | `#f0c898` | Speaker tags, UI labels. Special Elite all-caps. |
| `--text-prompt` | `#c8a878` | Action hints. *Click to open*. |
| `--text-faint` | `#8a7858` | Setting labels, footnotes. |
| `--panel-bg` | `rgba(8,6,12,0.92)` | Main dialogue panel surface. |
| `--panel-bg-deeper` | `rgba(20,16,32,0.92)` | Summary card backgrounds. |
| `--panel-border` | `#3a4068` | Standard frame line. Used at ~60% in code. |
| `--warm-pool-amber` | `#ffc868` | Hearth-fire core. Cottage-window light. The most important warm color. |
| `--warm-pool-deep` | `#c87830` | Edge of warm-pool falloff. Where amber transitions to cool. |
| `--warm-pool-glow` | `#ffe088` | Brightest hearth glow. Used sparingly. |
| `--spirit-pip` | `#f0f8ff` | Pip's signature glow. Cool white with hint of blue. Provisional. |
| `--spirit-haldjas` | `#ffe088` | Hearth-fire gold. Locked Ch2. |
| `--spirit-iris` | `#88b8b0` | Sea-green-blue. Locked Ch5. |
| `--spirit-bad-ghost` | `#7a1418` | Blood-iron red. Devil eye-glow only. Reserved. |

### Regional tokens (these change per chapter)

Each chapter's port has its own *regional* palette — the cool-base shifts hue while the universal tokens stay constant. The rule: *the world stays cool-and-chromatic; warmth still interrupts it.*

| Token | What it is |
|---|---|
| `--region-base` | Room ambient — the dominant cool tone. Always blue, purple, or a mix; never warm. |
| `--region-deep` | Vignette outer reaches. Darkest version of the regional tone. |
| `--region-shadow` | Chromatic shadow note — purple/teal/etc. that haunts the corners of the room. |
| `--region-floor` | Floor color. A cool tone, often slightly desaturated from the base. |
| `--region-wood-light`, `--region-wood-dark` | Door wood-grain. Always warm-brown across regions — wood is a warm-pool element. |
| `--region-glow` | Door-interior or hearth backlight. Warm-amber, brightness varies per region. |
| `--region-accent` | A regional warm or cool note that anchors local color identity (geraniums, tile-blue, ipê-yellow, etc.). |

**Estonia (Ch2, locked):**

| Token | Hex |
|---|---|
| `--region-base` | `#1c2858` (deep moonlit blue) |
| `--region-deep` | `#0e1a3a` |
| `--region-shadow` | `#5a4878` (twilight purple corner) |
| `--region-floor` | `#1a2848` |
| `--region-wood-light` | `#5a3820` |
| `--region-wood-dark` | `#2a1808` |
| `--region-glow` | `#ffc868` (cottage hearth) |
| `--region-accent` | `#ff5050` (window geraniums) |

**Other chapters (working values, provisional):** Southampton — slate-blue base with sea-foam accent. Türkiye — deep İznik blue base with terracotta warm pools. South Africa — twilight purple-blue with jacaranda shadow. Brazil — forest-blue-green base with ipê-yellow flash. *These get locked when each chapter is outlined.*

See the standalone design page (`design-elements.html` working file, or the `cottage-comparison.html` study) for visual reference. The locked palette is the "Option B — Deep Moonlit Blue" cottage scene from that comparison.

### Warm-pool placement rules

When commissioning art or rendering scenes, the warm-pools should fall in *meaningful* locations:

- **Hearth or stove fire** — the brightest pool, anchors the room.
- **Lit windows** — warm interior visible from cool exterior, or vice versa.
- **Lamps and doorways** — small warm pools spaced through the scene, never more than 2-3.
- **Food on plates** — small subtle warm glow when food is meaningful (the first taste, the climactic meal). The food *itself* radiates warmth into the cool room.
- **Spirit signatures** — when a spirit appears, their signature color provides additional pool of light.

What *not* to do:
- Never warm-tone the entire room ambient. The room base is always cool.
- Never use red except for: window flowers, food highlights, devil eye-glow (locked at `#7a1418`), and Babcia's kitchen at the climax.
- Never let warm-pools overlap and merge into a single warm region. They should be *discrete points of warmth*, not a warm wash.

### Spell-state overlay

When a spirit casts a spell (e.g., the Haldjas's three-doors puzzle), the scene receives a *layered* overlay rather than a full palette change:
- Sparkles drift along the borders, thickening into the room
- Vignette deepens
- The room's ambient slightly desaturates (the cottage going *colder*)
- Warm-pools dim slightly — the hearth is fading; the cottage is becoming *less home* and *more uncanny*
- The spirit's signature color is the dominant new color introduced

The spell-state preserves the cool-base/warm-pool structure but tilts everything toward the cool. *The warmth doesn't vanish; it withdraws.* This is a meaningful visual moment — Pip can feel the cottage going cold.

---

## Asset Categories

There are three kinds of art the game needs:

### A. Room Backgrounds (480×270 pixel art)
The explorable side-scrolling environments. Each room is a single pixel-art scene. Pip's sprite moves over it. Wide framing — Pip occupies roughly 6–9% of the frame height; the room fills the rest.

### B. Cinematic Graphics (480×270 pixel art)
Static story moments. Same canvas, but framed for character close-up or dramatic wide-shot. Each chapter probably needs 6–12 of these. Cinematic-framing characters fill 40–60% of frame height.

### C. Sprites (small)
Pip himself, NPCs, items, particles, echo-creatures. Pip is roughly 16×24 pixels. NPCs scale similarly.

---

## Animation Budget

Animation is **reserved for highest-impact beats only.** Most of the game's life comes from code-driven ambient effects (drifting dust, lamp flicker, parallax breathing) layered over still pixel art.

**Hand-animated frames** (6–10 FPS, 2–4 frames per cycle, painted by the artist):
- Pip's idle bob (already in prototype — keep)
- Pip's walking / floating
- Pip's surprise, sad, glowing-warmer expressions
- The mirror melt (Cinematic 2)
- Henrik's first-reaction dropped-pan moment (Cinematic 4)
- The first taste-memory shimmer (Cinematic 6a, 6b)
- Iris's squeeze-and-pop emergence and shake-dry (Chapter 5)
- The shared-meal beats (per-chapter — monster offering food)
- The final crossing-through-the-door (final chapter)
- The shadow's tangled-wires shape-shift (final chapter)

**Code-driven, no animation budget:**
- Ambient room life (dust, flicker, parallax, sea motion through portholes)
- Echo-creature movement during traversal (sprite cycles, but generated per-chapter as part of the room implementation)
- Snail-shell candle flicker (procedural)
- Background environment breathing

---

## Pip Sprite Specification

**Register: A (gameplay sprite).** Pip's gameplay sprite is the spare register — true pixel art, drawn procedurally to canvas. The simplicity is thematic, not technical: Pip has lost the human details he had in life. See the story bible's Pip Visual section for the why.

### Present-day Pip (in-game sprite and cinematics)

- Roughly 16-20 pixels wide, 22-24 pixels tall at 480×270 internal canvas
- A single rounded ghost shape — head and body in one continuous form
- Three classic waves at the bottom of the body (the wavy ghost-tail convention)
- Cool-white body, slightly translucent (alpha ~0.85)
- Two small dark eye-dots, set wide
- Two small pink blush pixels, one under each eye
- One tiny dark mouth pixel
- A soft cool drop-shadow glow on the floor underneath him (signature `#f0f8ff`)
- A subtle cool halo around the whole body
- **No hair. No apron. No clothing. No human body underneath.** These are memory-only — see below.
- Idle animation: a small vertical bob (1 pixel up, 1 pixel down)
- When happy: outline glows warmer (subtle warm tint mixed into the halo)
- When sad or frightened: form-blur at the edges (slight gaussian blur of ~0.4 pixels) and opacity drop

### Memory Pip (flashback cinematic beats only)

Pip in his own memories — or in memories given to him — appears as the human boy he was. This is Register B only; he never appears as the human boy in present-day cinematics.

- The boy underneath the ghost
- Short dark brown hair, simple shape, with a small stray fringe
- Oversized chef's apron, beige/sand color, with a few flour smudges
- Visible arms, legs, a small human body
- Same face shapes — same eye-dot proportions, same blush, same gentle expression
- Visible only in cinematic register, at the full 40-60% frame height
- Memory-Pip moves through memory scenes the way the boy moved: walking, reaching, sitting at the table (the table he can sit at because in the memory he is alive)

### What unites the two

The eye-dots, blush, and mouth are the same across both forms. The face is the constant. What changes is everything around the face — the body, the costume, the human-ness. The audience should feel, when they see memory-Pip for the first time, that they are seeing *who he was*, and that's why ghost-Pip looks so spare.

---

## Echo-creature Specifications

**Register: A (gameplay sprite).** All echo-creatures live in Register A — small, procedural, drawn to canvas at room scale. They are never the subject of cinematics; the cinematics frame the *room* containing them, not the creatures themselves.

Echo-creatures are residues of the Mnemosyne's past incidents. Each chapter's traversal uses one variety. Each is rendered in **a slightly different visual register from regular sprites** — a touch more translucent, a touch more shimmer, the suggestion that they aren't fully here. Their footprints/trails leave a faint glow.

- **Spider-shapes** (8-12 pixels): scuttle unpredictably across walls, ceilings, floors. Many small spiders rather than one large one.
- **Mice** (10-14 pixels): scurry in small lines, often along baseboards.
- **Bats** (16-20 pixels wingspan): swoop through corridors in arcs.
- **Cockroaches** (10-14 pixels): stampede in groups; players time their pass-through.
- **Snails** (20-30 pixels with shell — larger because echo-magnified): slow, candle-lit shells, leave glistening slime trails. The Brittany chapter is built around them — see chapter doc when written.
- **Helga the cat** (28-36 pixels): NOT an echo. Real, alive, recurring NPC. First appearance Chapter 2.

---

## Chapter 1 Cinematic Specs

These are the static graphics needed for Cabin 646. Format: 480×270 pixel art.

### Cinematic 1: WAKEUP
**Description:** Almost pure black. The suggestion of Pip's face emerging from darkness. Two slits of pale eye-light opening. Dust motes drifting. The viewer feels Pip's disorientation.

**Composition:** Centered. Eyes at vertical midpoint. Strong vignette. No environmental detail visible — just the face emerging.

**Mood:** Hushed. Uncertain. The first breath of a ghost. The accompanying narration is the game's tone-setter — quiet companion voice, kinetic verbs, gentle parenthetical wink at the ship's name. (See narrative voice section in 01-story-bible.md.)

### Cinematic 2: MIRROR (the big horror beat)
**Description:** Close-up of Pip's face in the mirror. The face is melting on one side — skin sagging like wax, dripping from the chin. Single warm lamplight from upper-left illuminating half the face; the other half in deep shadow. Sunken eye sockets with tiny pinprick highlights. Pallid skin tone — jaundiced amber. Behind the face: hint of ornate carved wood mirror frame, then darkness.

**Composition:** Face slightly right of center, leaving negative space (darkness) on the left. Off-center for unease. Camera close enough that we don't see Pip's body — just the face filling most of the frame. This is the cinematic close-up framing in its purest form.

**Reference cues:** Think the cursed-portrait style of *7th Guest* mixed with *Coraline*'s button-eye horror. Should be unsettling, not gory.

**Mood:** This is the inciting incident. The moment Pip realizes he's dead. Don't pull the punch.

**IMPORTANT:** This image is also used in the final chapter. The shadow's recurring "static channel" — the painful memory it keeps tuning back to — is this melting face, played at full cinematic fidelity but sped up. Whatever is commissioned here will appear again at the climax. Plan accordingly.

**Animation:** This is one of the few cinematics that gets hand animation. The melt drips slowly. The skin sags slowly. The face is alive and wrong.

### Cinematic 3: GRANDPARENTS' CABIN
**Description:** Pip stands in the doorway of his grandparents' cabin. Inside, his grandmother (Babcia, Marta) is sitting on the bed, holding her face in her hands, weeping. His grandfather (Dziadek, Jan) is by the window, his back to us, shoulders shaking. Pip's small body, in the doorway, watching. Warm lamp on the nightstand. A small suitcase open, half-packed. A photograph of Pip on the nightstand.

**Composition:** Wide shot. Pip small in the doorway, foreground silhouetted. Grandparents in middle distance. Lamp creates warm pool. Most of the room is in shadow.

**Mood:** Devastating but quiet. No shouting, no music swell. Just the small sounds of grief.

**Animation:** Held still. The frozen-photograph quality is the heartbreak. No animation budget needed.

### Cinematic 4: KITCHEN (Pip eats the cracker)
**Description:** A grand ship's kitchen, deep night. Stainless steel counters, hanging copper pots. A single overhead light. Pip floats in mid-air, holding a cracker with lox on it. A bite has been taken. Henrik stands frozen in the doorway, an apron stained with flour, his mouth open in a silent scream. The cracker hangs in the air visibly — for Henrik, it's floating impossibly.

**Composition:** Three-zone — Pip on the right (with the cracker), Henrik on the left (in the doorway), the kitchen depth between them. Diagonal composition, energy.

**Mood:** Comic-tragic. The horror of being seen, but also the absurdity of a hovering cracker.

**Animation:** Henrik's mouth-open-then-cut moment. A small frame for the dropped pan. Otherwise still.

### Cinematic 5: HENRIK SITS DOWN
**Description:** Close-ish on Henrik now sitting on a stool, looking at Pip. His face is weathered, kind, weary. Behind him, the kitchen recedes into shadow. He's saying: "So. You are the boy from cabin 646."

**Composition:** Two-shot. Henrik foregrounded. Pip floating in soft focus to the side, smaller in frame, listening.

**Mood:** The game's heart turns. From horror to tenderness.

**Animation:** Held still. Henrik's stillness is the moment.

### Cinematic 6a: FIRST TASTE — GRAVLAKS (the grandfather memory)
**Description:** Pip takes a bite of the gravlaks. The kitchen shimmers and we see, briefly, **Henrik as a young boy, learning to cure salmon from his own grandfather.** Warm summer light. A Norwegian kitchen, decades ago. The boy-Henrik watches his grandfather's hands on the fish.

**Composition:** A doubled image — Pip in the present-kitchen translucent over the past-memory. Or a smooth dissolve between the two. The past is brighter, the present darker.

**Mood:** Magical. The first time the game shows you what tasting a meal really means.

**Animation:** The shimmer-dissolve transition. Hand-animated.

### Cinematic 6b: FIRST TASTE — LEFSE (the son memory)
**Description:** Pip then tastes the lefse. The kitchen shimmers a second time. Now we see **an older Henrik teaching a young boy (Erik) to make the same lefse, the same gravlaks.** A different kitchen — Henrik's home before the accident. Young Henrik now grown; the child is unfamiliar to Pip, his face partially seen.

**CRITICAL ART NOTE:** Erik's face must be **partially visible** — recognizable enough that, in Chapter 4 when the player sees his photograph, they have a moment of recognition. *Not* introduction. But indistinct enough in this Chapter 1 cinematic that no player guesses on a first pass. Suggested treatment: face mostly turned away, or in profile, or in half-shadow. The player should *feel* they have seen this child before, when they reach Chapter 4, even if they can't quite say where. Detailed pixel art makes faces *more* legible than crunchier resolutions, so the obscuring must come from composition (turn, shadow, occlusion) rather than from low-pixel ambiguity.

**Composition:** Same dissolve technique as 6a. The past is bright; the present is dark. The chain of inheritance — grandfather → Henrik → son — is now literal: same dish, three generations.

**Mood:** Magical, with a held-breath quality. The player won't know yet that this memory is load-bearing.

**Animation:** Same shimmer-dissolve as 6a.

### Cinematic 7: THE DOCK (parting from grandparents)
**Description:** Wide shot from the ship's deck. Below, the dock at the first port. Pip's grandparents walking away with a small wooden box (the coffin). Babcia stops. Looks up toward the ship. Almost catches Pip's eye. Then turns and continues. Pip on the railing, translucent, waving with one small hand.

**Composition:** High angle. Pip foreground silhouette against the railing. Grandparents tiny below. Sky and sea framing. Cold, blue-gray morning light.

**Mood:** The end of Chapter 1. Heartbreak. But Pip looks toward the horizon, where the next port waits.

**Animation:** Held still. The frozen quality is the heartbreak.

### Cinematic 8: HENRIK'S OFFER
**Description:** Pip and Henrik on the deck at sunset (after the dock scene). Henrik is offering Pip an open recipe journal — pages blank. Behind them, the sun setting on dark water. The next port is implied — distant lights.

**Composition:** Two-shot, intimate. The journal between them. Warm orange-pink horizon.

**Mood:** Hope. The mission begins.

**Animation:** Held still.

---

## Sprite Specs (NPCs for Chapter 1)

- **Babcia (Marta):** Elderly, kerchief, soft features, dark coat. Carries grief in her shoulders.
- **Dziadek (Jan):** Elderly, wool flat cap, beard. Stooped slightly.
- **Henrik:** Older man, gray beard, white chef's coat, apron with flour. Pipe sometimes.
- **The Janitor (J. Henriksen):** Crew uniform, mop or cart. Walks past Pip without noticing — establishes the rule that Henrik will break.
- **The Passenger:** Wealthy older traveler in evening clothes, walking down the corridor. Walks past Pip without noticing — second confirmation of the rule.
- **Body of Pip in the bed:** Seen only briefly. Small form under sheets. Don't show his face.

---

## Forward Reference: Iris (Chapter 5)

Specs to keep in mind even though her chapter is far off — choices made for Chapter 1 (Pip's form-blur, the melting-mirror image) need to be consistent with her treatment.

- **Edwardian girl, ~10-11.** Long hair, period-appropriate dress (high collar, sash, dark-colored — possibly mourning-blue or burgundy). Boots.
- **First appearance: wet.** Dripping seawater. Hair slick to her face. Visible droplets on her clothes.
- **After the shake-dry:** Completely dry. The wallpaper-pattern-of-her-clothes remains the same; only the water leaves. (The shake-off is animated as a quick *blur burst* — analog dog shaking off water — accompanied by the *squeeze-and-pop* sound effect of her emergence.)
- **Form-blur (her tell):** When sad or stubborn, Iris becomes translucent — more strongly than Pip ever does. The wallpaper visibly shows through her. This is how Pip eventually realizes she is a ghost.
- **Color-coding distinct from Pip:** Pip's glow is cool/white; Iris's translucency should have a slight green-blue undertone, like underwater light. They are both ghosts but from different waters.

---

## Forward Reference: Pätu the Cat

Pätu is a recurring NPC, not an echo-creature. She's real, alive, and on the ship across many chapters. (See `01-story-bible.md` for full character canon — backstory with Leida, gameplay function, the promise pact with Pip.)

**Registers needed: A and B. Locked as gray tabby.** Pätu is canonically a gray tabby (not tortoiseshell — locked as of Sprint 00). Her standing gameplay presence is Register A — small procedural pixel-art sprite, ~28-36 pixels. Her introductory cinematic in Chapter 2 (when the Haldjas first reveals her) is Register B. The hissing pose specifically must read clearly in Register A, at room scale, when the player is mid-traversal and may only glance at her.

- Estonian cat — gray tabby (locked). Visually distinct from a stray (she has been cared for by Leida).
- Eyes are yellow and catch warm pool-lights distinctly against the cool-base palette — they should pop.
- First appears in Chapter 2 (Tallinn). She is *not* hostile to Pip — initial wariness is the Haldjas's, not hers.
- Across chapters: she chooses to come aboard, comes and goes freely. Sprite needs sitting-pose, walking-pose, hissing-pose (for the bad-ghost-detector beat later in the game), and sleeping-pose variations.
- **Hissing pose is structurally important** — it's a hint to the player that something is wrong. The pose should be unmistakable: arched back, ears flat, fur raised, eyes wide with whites visible.

---

## Forward Reference: The Shadow (final chapter)

Far off but important to plan for. The shadow is the only "antagonist" in the entire game and breaks the visual rules in deliberate ways.

- **Shape:** Tangled, knotted black wires. Constantly shape-shifting. Never settles. Every time the player looks, the configuration is different.
- **Inside the shape:** Memories play like a TV skipping channels — moments from Pip's life, both happy and painful. The painful ones recur. The most recurring channel is **the melting-face mirror image from Chapter 1, Cinematic 2**, played at full cinematic fidelity but **sped up** so the channel-flipping feels manic and unfocused. Whatever is commissioned for Cinematic 2 will be reused here. Plan for that.
- **Movement:** Slightly faster than Pip. Always one configuration ahead. The player should feel they cannot quite catch up to it visually.
- **Sound:** Static. TV-static. A whisper underneath of memories playing.
- **Defeat condition:** Not defeated. *Answered.* It dissolves channel by channel as Pip overrides each painful memory with a joyful one. The final dissolve is into Pip himself — reintegration, not destruction. The shadow is the part of him that grieves; he doesn't kill it, he claims it.

---

## Strength Indicator (HUD element)

The chewing-boy stomach meter. Persistent in screen corner during gameplay; hidden during cinematics.

**Visual:** A small ornate panel — maybe an oval pewter frame, in keeping with the ship's old-world detail. Inside: a pixel-art boy's face chewing (mouth opens, mouth closes), and below, a small stomach pouch that fills and drains with food/strength. When Pip eats, food visibly travels from mouth down to stomach. When strength drains (echo-bump, slime-step), food shrinks visibly in the stomach.

**States to render:**
- Full strength (round full stomach, contented chewing face)
- Mid strength (smaller stomach, chewing face neutral)
- Low strength (empty-looking stomach, face concerned)
- Critical (very small remaining stomach contents, face worried, slight flicker)
- Dying (stomach empty, face fading)

This is a small but signature UI element. It does heavy lifting tonally — it's comic, slightly grotesque, lovingly food-aware. It is the game's tone in a corner of the screen.

Full implementation details (dimensions, position, animation timings, color tokens) are locked in `03b-ui-spec.md` §3. This doc covers the *visual character* of the indicator; the UI spec covers its *behavior*.

---

## Sound Direction (post-prototype)

Not yet implemented but worth specifying so we don't forget:

- **Music:** Sparse. Solo piano or solo cello. Folk instruments tied to each region (accordion in Naples, koto in Tokyo, kora in Accra, hurdy-gurdy in Brittany). Composer to be determined.
- **Ambience:** Constant — ship hum, distant waves, creaking wood. Each port has its own ambient bed. The wordless traversal segments lean heavily on ambience.
- **SFX:** Footsteps (soft for ghost), inspect-chime (a tiny crystalline tone), dialogue beep (subtle, in the typewriter tradition), recipe-unlock (a warm bell), strength-drain (a small wince or hollow tone), strength-restore (a satisfied chew).
- **Reserved sound effects** (don't use for anything else):
  - **Squeeze-and-pop** — Iris's emergence through the floorboards (Chapter 5). Wet, fleshy, slightly comic.
  - **TV-static-with-whispers** — the shadow (final chapter).

---

## Production Strategy for Art

1. **Start with placeholders.** The current prototype draws everything procedurally in canvas. That's fine for prototyping.
2. Commission **Register B (cinematic) graphics first.** They have the highest emotional impact and are the easiest to swap in (they're just static images). Register A (gameplay sprites) can stay procedural for far longer — the existing canvas-drawn Pip is good enough to ship a whole chapter prototype, and only needs commissioning when polish work begins. Within Register B, prioritize present-day cinematics over memory cinematics, because memory cinematics require a separate design (human-boy Pip) that doesn't carry over from the sprite work.
3. **Commission Pip's sprite second.** Pip is the player's anchor.
4. **Commission room background art third.** Most labor-intensive but highest visual return per chapter.
5. **Commission the strength indicator UI element** alongside the cinematics — it's small but signature.
6. **Find a single artist if possible.** Consistency matters more than speed. One artist with a clear style brief will produce a more cohesive game than three faster artists.

**Where to find pixel artists:**
- itch.io (huge pixel art community)
- Pixel Joint forum
- Twitter/Bluesky (#pixelart)
- Reddit r/PixelArt commissions thread
- Fiverr (lower quality, but cheaper)

**Budget rough estimate:** A solid pixel artist might charge $50–150 per cinematic graphic, $30–80 per room background, $20–50 per character sprite, slightly more for animated cycles. Chapter 1 art might run $700–1800 total depending on artist. The resolution bump to 480×270 may push costs slightly higher per asset because there's more pixel real estate to fill.

**Note:** Chapter 1 needs **9 cinematics** because of the doubled first-taste scene (6a + 6b). Budget accordingly.

---

## Commissioning Brief (handoff sheet)

Here's a clean spec sheet to give any artist. Includes the locked decisions; expand per-chapter as needed.

**Canvas resolution.** All art at 480×270 native pixel grid. No anti-aliasing. No sub-pixel detail. Hard pixel edges throughout. Scaling to display resolution happens at runtime via `image-rendering: pixelated`.

**Color palette.** See palette section above. Each chapter adds 2–3 region-specific accent colors.

**Pip sprite size.** Roughly 16×24 pixels. Same proportions as current prototype Pip, scaled up.

**Cinematic framing.** Same 480×270 canvas. Character close-ups fill 40–60% of frame height. Wide cinematics (the dock, the kitchen reveal) use the full canvas for environment. No black bars, no letterboxing — the canvas is the canvas.

**Single light source per scene.** Mandatory. Every gameplay room and every cinematic has one dominant warm light. Everything else falls into shadow.

**Pip's two registers.** The pixel sprite Pip and the present-day cinematic Pip must be unmistakably the same character. Same face (eye-dots, blush, mouth), same proportions, same soft cool glow. The cinematic Pip is just *more pixels of the same ghost*, not a redesign. No hair, no apron in present-day — those belong to memory-Pip only (flashback beats, Register B).

**Sprite-rig layering.** Pip's gameplay sprite is rendered as a *stack of separately animatable layers* on the canvas, not as a single monolithic image. Three layers, drawn back to front: **body** (silhouette, hair, apron, glow), **eyes** (two eye-dots, positioned and scaled independently of the body), **mouth** (small mouth-shape, positioned independently). Each layer can be replaced or animated on its own timeline. This means Pip can blink without redrawing his apron, can widen his eyes at a horror beat while his body stays still, can break into a small smile during tasting cinematics without a new full-sprite commission. The same pattern extends to every other character sprite — Henrik, Marta, Jan, Leida, Sandy, Muhittin, Johannes, etc. — when their commissioned art arrives. Sprite art should be authored with this decomposition in mind. *Eye and mouth layers in particular do heavy emotional work; commissioning them as their own asset stacks pays off across the whole game.*

**Sprite direction (left/right flip).** Pip faces the direction he's moving. Flipping is done at draw time via a horizontal scale transform on the canvas (`ctx.scale(-1, 1)` around the sprite's anchor), not via separate left- and right-facing art. Pip's silhouette and apron have no asymmetric details that would suffer from this. When his sprite is eventually commissioned, the artist should be told: *Pip is drawn facing one direction only; the engine mirrors him.* This rule extends to most NPCs whose silhouette has no asymmetric tells. Exceptions (e.g., a character holding a tool only in their right hand that should never appear in their left) get explicit left/right sprite variants.

**Erik's face in Cinematic 6b.** Partially obscured by composition — profile, half-shadow, hand-in-front, or turned away. Recognizable on a second viewing (Chapter 4 photograph), not on first.

**Reusable assets.** The melting-mirror image (Cinematic 2) is reused at the climax. Commission it knowing it appears twice. The shadow's interior cinematic memories at climax are sped-up versions of earlier cinematics — no new commissioning needed beyond the speed-up.

**Animation, when used.** Hand-animated frames at 6–10 FPS. Two to four frames for most cycles. Reserved for: the mirror melt, Henrik's first reaction, Pip's tasting moments, the shared-meal beats, the final crossing-through-the-door, and the shadow's wire shape-shifts. Not used for ambient room life — that's done in code (drifting dust, lamp flicker, parallax).

**Style references.** *Owlboy*, *Hyper Light Drifter*, *Thimbleweed Park*, *The Excavation of Hob's Barrow*, plus *7th Guest*, *Coraline*, *Over the Garden Wall*, *Luigi's Mansion*.
