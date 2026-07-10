# Character Reference Sheets

A consolidated reference for every named character in *The Last Bites*, drawn from the chapter outlines and the story bible. Used at commission time — for AI prompts, for human pixel artists, and for keeping continuity across cinematics that may be drawn months apart.

This document does not duplicate the cinematic prompts in `art-asset-list.md`. That doc says *what each cinematic looks like as a frame*. This doc says *what each character looks like, and what stays true about them across every frame they appear in*.

Where this doc and the chapter outlines disagree, **the chapter outlines win** — this doc is downstream of them. Flag any disagreement as an open question.

**This is v2 (locked 2026-05-13).** It supersedes the v1 draft. The Q1–Q12 review locked specific details for Pip's parents, Erik, Henrietta, Iris, Sandy, and the Karakoncolos; those are integrated here. The v1 draft also carried stale Helga references and bad-ghost-detector-beat framing, both of which were retired in earlier decisions; this rebuild excludes them.

---

## How to read each entry

Each character has up to seven fields. Most characters use a subset; only the most load-bearing ones use all seven.

- **Canonical description** — locked facts: age, build, hair, distinctive features. From the bible or chapter outlines.
- **Register notes** — what they look like at Register A (gameplay sprite), B (cinematic), C (puzzle UI). Most characters are A and B only.
- **Age stages / state variants** — only where the character appears in multiple ages or states (Henrik across three ages, Iris wet vs dry, Pip present vs memory).
- **Silhouette tells** — what reads at sprite scale when fine detail is lost. The two or three features that *must* be on the sprite for the character to be recognizable.
- **Color signature** — locked palette tokens, if the character has any.
- **What NOT to draw** — guardrails. Things a wrong choice could break.
- **Appearances** — list of cinematics and chapters they appear in. Lets a commissioner see the workload for one character in one glance.

Open questions and gaps are flagged inline with **[OPEN]**. The list of remaining opens is collected at the end.

---

# Locked-canon humans

## Pip (Filip)

**Canonical description.** A 10–12 year old boy, Polish-American, raised in Greenpoint, Brooklyn. Died in his sleep of an undiagnosed heart condition on the first night of a cruise. Curious, gentle, observant. His real name is Filip — *Filipek* to Babcia, *Pip* to himself. *(From `01-story-bible.md`.)*

Pip appears in **two visual forms** across the game. The present-day ghost form is the form he wears for nearly every beat. The human boy form appears only in memory cinematics — flashbacks to his living self.

### Present-day ghost form

**Register A (gameplay sprite, locked — `03-art-and-aesthetic.md`):**
- ~16–20 px wide, 22–24 px tall at 480×270; door-fraction ~0.30–0.35
- Single rounded ghost shape — head and body one continuous form
- Three classic waves at the bottom (the wavy ghost-tail convention)
- Cool-white body, slightly translucent (alpha ~0.85)
- Two small dark eye-dots, set wide
- Two pink blush pixels under the eyes
- One tiny dark mouth pixel
- Soft cool drop-shadow glow on the floor beneath him
- Subtle cool halo around the body
- **No hair, no apron, no clothing, no human body underneath.**

**Register B (cinematic):** the same bald ghost shape, rendered at full painterly resolution. *More pixels of the same ghost, not a redesign.* No hair, no apron, no human body in present-day cinematics. Cinematic Pip fills 40–60% of frame height in close-ups.

### Memory / flashback form

When Pip appears in his *own* memories (e.g. the bottom-of-the-well pierogi dinner in Ch8), he is the human boy he was — **Register B only, never Register A:**
- Brown hair (medium, kid-cut)
- A chef's apron — the iconic visual carried over from the bible's universal style block
- Visible body, arms, legs
- Warm-skinned palette; in the bottom-of-the-well memory he is three or four years old; the sixth-birthday photograph shows him older
- Hazel or warm-brown eyes (default; not locked)

**Silhouette tells (Register A):**
- Three-wave ghost-tail bottom
- The bald rounded head — no hair, no ears
- Cool white against any background

**Color signature:**
- Body: `#f0f8ff` (cool-white)
- Drop-shadow glow: `#f0f8ff`, soft halo
- When happy: outline warms (subtle warm tint mixed into halo)
- When sad or frightened: form-blur at edges (~0.4 px gaussian blur), opacity drop

**What NOT to draw:**
- Pip in present-day cinematics with hair, apron, or human body — that's memory Pip
- Pip's face in *any* shot from Ch1 cinematic 1 (the wake-up) — emerging from darkness, eyes just opening, almost no detail
- The body in the bed in Ch1 — that one-shot image (`sprite-pip-in-bed.png`) shows a small form under sheets, face hidden by sheet edge

**Appearances:** every chapter; every cinematic except those framed away from him. Most-load-bearing references: `cin-01-wakeup.png`, `cin-02-mirror.png`, `cin-06a-first-taste-gravlaks.png`, `cin-06b-first-taste-lefse.png`, `cin-07-dock.png`, `cin-08-henriks-offer.png`, and the shadow-form in Ch8.

### The Shadow (Pip's Ch8 self)

The shadow is Pip, manifested at the climax. **Not a separate creature.** Treat as a state variant of Pip, not a different character.

- Pip's own outline darkens; soft glow dims
- Black wires curl out of his shoulders, hair-area, fingertips — static-textured, alive in a low buzzing way, refusing to stay knotted
- Silhouette fills with static
- A flickering channel inside his chest plays past cinematic memories (the Ch1 melting-face mirror image is the recurring channel; Ch7's Boitatá fire, Ch6's Pocong infection cycle through)
- **Pip's twelve-year-old face is still visible inside the dark form** — the horror is recognizing himself

**Color signature for the shadow:** blood-iron `#7a1418` is the *bad-ghost* signature (the Mamlambo's color, locked in Decisions Log). The Ch8 shadow shares this signature in wire-undertone and in the static, layered over Pip's cool-white core. Per Ch8 outline.

---

## Henrik

**The hub character.** Appears in every chapter. The most complex case in this doc — three age stages, all distinct, all must read as the same person aging.

**Canonical description (present-day, Ch1 onward).** Norwegian, in his sixties. Gray beard. Has worked on cruise ships for thirty years. Lost his son Erik (11) and his wife Henrietta in a boating accident decades ago; they drowned, he was there and could not reach them. He believes a violin played as he tried — the Nøkken. He went to sea to be closer to their spirits, which he believes live in the water. Personality: quiet, dry, kind in a gruff way. Doesn't waste words. Treats Pip like a colleague, not a child.

**Register A (gameplay sprite, per `art-asset-list.md`):** ~24×40 px figure; door-fraction 0.55–0.65 (target ~60–72 px tall after Scale Anchor reconciliation). White chef's coat. Apron with flour. Gray beard. Quiet stooped carriage. Pipe sometimes.

**Register B (cinematic):** painterly, full grief-bearing detail. The Ch1 kitchen reveal, the offer-of-the-journal at sunset, the photograph beats, the Ch7 receiving-Erik moment, the Ch8 climax all live here.

### Three age stages

The three Henriks must read as the same man aging. The continuity tells (beard color, posture, eye expression) are what hold them together.

**1. Boy Henrik (~8–10 years old).** Appears in `cin-06a-first-taste-gravlaks.png`. A small boy in a Norwegian kitchen learning to cure salmon from his own grandfather. Watching his grandfather's hands work salmon on a wooden board. *Warm summer light, decades ago.*

- Light-brown / dirty-blond hair (Norwegian; will gray out by sixty)
- No beard yet
- Same eye shape and set as adult Henrik — this is the continuity tell at sprite scale
- Small chef's apron implied (foreshadow — he is already becoming a cook)

**2. Young-father Henrik (~30s–40s).** Appears in `cin-06b-first-taste-lefse.png`. *"A middle-aged man with the beginnings of a gray beard."* Teaching young Erik to fold lefse in a homey kitchen.

- Beard short and just starting to gray — the bridge between boy Henrik and present Henrik
- Hair still mostly its original color (light-brown / sandy)
- Less stooped than present Henrik — grief hasn't settled into his carriage yet
- Working-cook clothes (apron, sleeves rolled)

**3. Present-day Henrik (~60s).** The hub character. The man Pip knows.

- Full gray beard, gray hair
- White chef's coat
- Apron with flour
- Pipe sometimes
- Stooped slightly — grief in his carriage
- Wears the photograph (Erik, in his pocket) across multiple chapters as a small habitual gesture

**Silhouette tells (Register A, all stages):**
- Beard (boy: none; lefse stage: short stubble; present: full)
- Chef's coat / apron
- The slight stoop in present-day (not in younger versions)

**Color signature:** no locked palette token of his own. He sits inside the standard warm-amber single-light-source palette. His beard at sixty is true gray (not white).

**What NOT to draw:**
- Henrik in the Ch1 cinematic 4 (kitchen reveal) without the dropped *cracker* / dropped pan beat — he is shocked when he first sees Pip and his body must read that shock
- Erik's face recognizable on first viewing of cinematic 6b (partial-face, profile, half-shadow, or turned away — load-bearing for the Ch6 reveal)
- Three different-looking Henriks — they must read as the same man aging

**Appearances:** Ch1 cinematics 4, 5, 6a, 6b, 7, 8, plus the photograph beat. Ch4 closing kitchen scene. Ch5 closing kitchen scene (the *did she now* beat). Ch6 Beat 9 (the photograph reveal). Ch7 closing kitchen scene (the Erik reunion — Henrik's biggest cinematic). Ch8 climax (arrives at Pip's kitchen, taught the pierogi fold). Recurring across every chapter.

---

## Babcia (Marta)

**Canonical description.** Pip's grandmother — *Pip's mother's mother*. Elderly Polish woman. Soft features. A kerchief. A dark coat. Carries grief in her shoulders. The cook of pierogi and gołąbki and Sunday meals. Her love language is food. She has been mourning Pip for almost a year by Ch8.

Her name **Marta** is locked (Decisions Log, 2026-05). *Babcia* is the Polish for grandmother; the family uses both. Dziadek calls her Marta when speaking to her in Ch8.

**Wardrobe detail (locked 2026-05-13, Q1):** Babcia wears **quilted clothing — patterns in squares.** This is her signature textile. Carries through into her coat, her apron, the dress under it. Her hands have done the patching for both her own clothes and Dziadek's; the quilted-square pattern repeats across both of them as family-textile continuity.

**Register A (gameplay sprite, per `art-asset-list.md`):** Small elderly figure. Kerchief. Dark coat (quilted-square pattern visible). Stooped slightly. Soft round shape. Door-fraction 0.55–0.65 per Scale Anchor.

**Register B (cinematic):** Appears in Ch1's grandparents'-cabin cinematic (weeping on the bed); the Ch1 dock cinematic (walking away with the small wooden box, stops, looks up toward the ship); and the Ch8 grandparents' apartment scene (at her kitchen table, eyes closed, tasting the gifted memory, mouthing *Filipek?*).

The Ch8 cinematic is older Babcia — a year more tired. Same kerchief, same soft features, same quilted clothing. **Continuity:** her face must read as the same woman across Ch1 and Ch8, just more grief-worn.

**Silhouette tells:**
- The kerchief
- The stooped carriage
- Soft round outline
- Quilted-square pattern visible on her coat / apron at cinematic scale

**Color signature:** none locked. Sits inside the regional warm-amber palette of Greenpoint (and earlier of Cabin 646).

**What NOT to draw:**
- Babcia thin or sharp-featured — she's *soft*
- Babcia *seeing* Pip in Ch8 — she feels him, never sees him; the *almost-eye-contact* on the Ch1 dock is the closest
- Babcia in modern wardrobe — the quilted-squares are her register; they place her in a specific working-class Polish-American tradition

**Appearances:** `cin-03-grandparents-cabin.png` (Ch1), `cin-07-dock.png` (Ch1 dock farewell), and the Ch8 grandparents-apartment sequence (currently no filename in `art-asset-list.md` — **[OPEN]**, needs adding).

---

## Dziadek (Jan)

**Canonical description.** Pip's grandfather — *Pip's mother's father*. Elderly Polish man. Wool flat cap. Beard. Stooped slightly. Quiet partner to Babcia. Taught Pip to whittle a stick into a whistle. Saved for years with Babcia to take Pip on the cruise of a lifetime.

His name **Jan** is locked (Decisions Log, 2026-05).

**Wardrobe detail (locked 2026-05-13, Q1):** Dziadek wears **patches sewn into his vest and pants in material matching Babcia's quilted-square pattern.** Babcia patches his clothes. The patches read at cinematic scale as warm-square shapes against his darker base wool — the visual echo of the family bond, his wife's hand on him every day.

**Register A (gameplay sprite, per `art-asset-list.md`):** Small elderly figure. Wool flat cap. Beard. Stooped. Quiet posture. Visible patches on vest and pants in quilted-square pattern. Door-fraction 0.55–0.65 per Scale Anchor.

**Register B (cinematic):** Appears in Ch1's grandparents'-cabin (at the window, back to camera, shoulders shaking — *we never see his face crying*). Ch1 dock farewell (walking away with Babcia, carrying the small wooden box). Ch8 grandparents'-apartment scene (at the kitchen table beside Babcia; the *He's here, Marta* line is his deepest beat in the game).

The Ch8 Dziadek is older than Ch1 Dziadek by a year of grief. Same flat cap, same beard, same patched clothes, more worn.

**Silhouette tells:**
- The flat cap
- The beard
- Quiet upright-but-stooped posture (different from Babcia's softer stoop)
- Patches on vest and pants — visible at cinematic scale

**Color signature:** none locked.

**What NOT to draw:**
- Dziadek's face in `cin-03-grandparents-cabin.png` — he's at the window, back to camera. This is a deliberate compositional choice.
- Dziadek in any clothes without the patches — the patches *are* Babcia in the room with him; their absence breaks the family-textile motif

**Appearances:** `cin-03-grandparents-cabin.png` (Ch1), `cin-07-dock.png` (Ch1 dock farewell), Ch8 grandparents-apartment sequence (**[OPEN]** filename needed in `art-asset-list.md`).

---

## Erik

**Canonical description.** Henrik's son. Died at age 11 in the same boating accident that killed his mother Henrietta. Drowned. Dark hair. A slight gap between his front teeth. The face of someone caught laughing.

In Ch7 he appears as an eleven-year-old ghost — the age he died at — to visit Henrik on his annual birthday return.

### Three appearances, three rules

**1. Cinematic 6b (Ch1) — partial-face memory.** Erik as a young boy of about twelve, learning to fold lefse with his father. **His face must be partially obscured by composition** — profile, half-shadow, hand-in-front, or turned away. Recognizable on a *second* viewing (when Pip sees the photograph in Ch6); **not** recognizable on first viewing. This is load-bearing for the whole game's reveal architecture. *(From `03-art-and-aesthetic.md`, locked.)*

**2. The Ch6 photograph.** A small framed photograph of a boy of roughly twelve. Dark hair, slight gap between his front teeth, an open expression — *the face of someone caught laughing*. Standing in a kitchen Pip does not recognize, holding a wooden spoon almost too big for him. The player may suspect; Pip does not yet know. *(From Ch6 outline.)*

**3. Ch7 ghost form (locked 2026-05-13, Q2).** Erik appears as an eleven-year-old ghost on his annual birthday return. **More human than Pip — just translucent.** He sits in Sandy's register, not Pip's bald-three-wave register: hair, recognizable face, the body of the boy in the photograph all present, with translucence as the *only* ghost-tell at first read. Standing behind Henrik with his hand on his father's back. Excited to be seen — *"Finally someone who can see me!"* — bouncing on the balls of his feet.

**Register A (gameplay sprite):** Ghost-form Erik at sprite scale. Door-fraction ~0.40–0.45 (child human, not ghost-Pip's compressed scale — Erik appears with body and clothes). Dark hair, slight forelock or fringe, kid-cut clothes (probably late-1990s / early-2000s Norwegian working-family style — sweater, trousers), translucent. **[OPEN]** specific filename in `art-asset-list.md` — to add when Ch7 is commissioned.

**Register B (cinematic):** Appears in `cin-06b-first-taste-lefse.png` (partial-face, locked), the Ch6 photograph still (filename in `art-asset-list.md` — **[OPEN]**, check), the Ch7 kitchen reunion with Henrik, and the Ch8 climax (steps through the veil with Pip's parents to escort Pip across).

**Silhouette tells:**
- Twelve-year-old boy's height
- Dark hair, slight forelock or fringe
- The gap between front teeth (only readable in close-up; not a sprite-scale tell)
- In ghost form: faint translucence over an otherwise solid human silhouette — more solid than Pip, closer to Sandy

**Color signature (locked 2026-05-13, Q3):** Norwegian palette — pale Nordic skin, dark hair (per the photograph canon), warm-amber undertone in his ghost-glow (he is at peace, in his father's kitchen, surrounded by the warmth of being remembered). *Not* the underwater green-blue of Iris (Iris is stuck; Erik is not). *Not* the cool-white of Pip (Pip is still becoming; Erik has already arrived).

**What NOT to draw:**
- Erik's face recognizable in cinematic 6b on first viewing (the entire reveal architecture depends on this)
- Erik visibly drowning, or with any wet / sea-weed visual register — he is at peace, not stuck in his death
- Erik with no relation to the photograph image — once the photograph is locked, the Ch7 ghost-form Erik must match the photograph face
- Erik with Pip's bald-three-wave ghost convention — he's a translucent boy, not a wavy-ghost shape

**Appearances:** `cin-06b-first-taste-lefse.png` (Ch1, partial-face), Ch6 photograph (still image), Ch7 reunion with Henrik, Ch8 climax (veil-crossing).

---

## Henrietta

**Canonical description (locked 2026-05-13, Q4).** Henrik's wife. Norwegian. Died decades ago in a boating accident with Erik. **Brunette, a bit larger build, short.** Loved bananas — put them in things she shouldn't (pancakes, fish stews once or twice). Other textures: pomegranate molasses (Ch4).

**Special status:** Henrietta is **never seen on-screen** in the current outlines. She is referenced verbally in Ch4 (Henrik names her), Ch6 (the *we had a* unfinished sentence), and may surface in others. The player builds her in their head from the textures Henrik gives — and now from a locked physical reference for when she eventually surfaces (likely in the Henrik-quarters photograph reveal).

**Register A:** not needed currently. No sprite.
**Register B:** not needed currently. No cinematic.

**Locked descriptors for any eventual commissioning:**
- Brunette (dark brown hair, not black, not auburn)
- A bit larger build — broader than Henrik, comfortably so
- Short (shorter than Henrik visibly)
- Norwegian (pale Nordic skin, period clothing depending on when the eventual cinematic is set)

**Textures to keep consistent in writing:**
- Banana — pancakes, fish stews (Ch4, Ch6)
- Pomegranate molasses (Ch4)
- Norwegian (per Henrik's nationality)
- Has been a person to Pip since Ch4, not just a name

**What NOT to draw:** Henrietta in any commissioned art *yet*. If she appears in a later chapter (a second photograph alongside Erik's, a flashback), the locked descriptors above apply. As of the current outlines she is deliberately unseen.

**Appearances:** none visual. **[OPEN]** Whether the Henrik-quarters photograph reveal includes a Henrietta photograph alongside Erik's — to be decided when the reveal chapter (Ch6 or Ch7) is being finalized.

---

## The Janitor (J. Henriksen)

**Canonical description.** Crew uniform, name tag *J. Henriksen*. A mop or cart. Walks past Pip without seeing him. Weary expression. Walks with purpose. *(The shared surname-suffix to Henrik is a quiet rhyme; not load-bearing, but consistent.)*

**Register A:** ~24×40 px crew-uniform NPC; door-fraction 0.55–0.65. Mop, weary face, name tag.

**Register B:** Possibly featured in a Ch1 dark-corridor cinematic — currently no cinematic filename specifically for him. The janitor is part of the dark-corridor scene where Pip realizes *no one can see me*.

**Silhouette tells:**
- The crew uniform
- The mop (or cart)
- Weary stooped carriage

**Color signature:** crew-uniform muted tones; nothing locked.

**Appearances:** Ch1 dark corridor (`room-ch01-dark-corridor.png` — janitor's cart at one end). Sprite filename `sprite-janitor-idle.png` exists in `art-asset-list.md`. Does not recur.

---

## The Passenger

**Canonical description.** A wealthy older traveler in evening clothes (tuxedo or evening dress). Walks the corridor obliviously. Walks past Pip without seeing him — the *second* confirmation of the *no one can see me* rule in Ch1.

**Register A:** ~24×40 px; door-fraction 0.55–0.65. Evening wear. Oblivious walk.

**Register B:** Not featured in any current cinematic. Sprite-level appearance only.

**Silhouette tells:** The evening wear (tuxedo or formal dress) — distinguishes them sharply from the janitor in the same hallway.

**Appearances:** Ch1 hallway. Sprite filename `sprite-passenger-idle.png` in `art-asset-list.md`. Does not recur.

---

## Pip's parents

**Canonical description (locked 2026-05-13, Q1).** Pip's parents died when he was 3–4 years old. Appear in two places: the bottom-of-the-well memory (Ch8) — *Pip's mother and father across the kitchen table from Babcia and Dziadek, lifting a glass, smiling* — and at the Ch8 veil-crossing, where they come through the pantry curtain to escort Pip across.

In Ch8's veil-crossing they are described as *themselves, whole, alive in the way the dead are alive when they are at peace*. The mother kneels to gather Pip in; the father wraps his arms around them both. They are not quite solid, but they are close.

### Pip's mother (Babcia's daughter)

- **Blonde, tall, white skin.** Polish-American by inheritance — Babcia's daughter, the genetic link from Babcia and Dziadek to Pip.
- Early thirties at time of death (default — not specifically locked, but appropriate given Pip's age at her death).
- She is the parent who kneels at the veil-crossing.
- **Continuity:** she should read as Babcia's daughter — softness in the face, the same warmth in expression — but blonde and tall rather than dark and kerchief'd. The connection is in feature and warmth, not in coloring.

### Pip's father

- **Brown hair, taller than the mother, olive skin.**
- Early thirties at time of death (default).
- He is the parent who wraps his arms around both of them at the veil-crossing.
- *He is not Babcia or Dziadek's son* — the bloodline runs through the mother. He comes from a different family the bible has not surfaced. His coloring (olive skin, brown hair) signals this — he is from somewhere else, married into Babcia's family.

**Register A:** not needed (they have no sprite-scale gameplay presence).

**Register B:** Two cinematic appearances:
- The bottom-of-the-well dinner (the six-chairs-filled memory, Ch8)
- The veil-crossing in Ch8

**Silhouette tells (cinematic only):**
- The mother: blonde hair, tall slim frame, fair-skinned
- The father: brown hair, taller still, olive-skinned

**Color signature:** no locked tokens. They sit inside the warm-amber Greenpoint palette in the bottom-of-the-well memory; at the veil-crossing they carry a faint warm-amber translucence consistent with Erik's *at-peace ghost* register.

**What NOT to draw:**
- Pip's parents in a way that suggests how they died — their death is never depicted, never named
- Pip's parents looking like strangers to Babcia and Dziadek's visual register — the mother specifically must read as belonging to that family, just differently colored
- Pip's parents in present-day clothing — the bottom-of-the-well memory is from when Pip was three or four, so they wear early-2010s working-class Polish-American Brooklyn clothes (wool sweater on the father; the mother in a knit dress or sweater set is a reasonable default)

**Appearances:** Ch8 bottom-of-the-well memory; Ch8 veil-crossing.

---

# Per-chapter chefs and named NPCs

## Leida (Ch2 — Estonia)

**Canonical description.** Estonian grandmother. Real, human, living alone in a wooden cottage on the village's edge. Long widowed — her husband was the starving boy on the cold step in her taste-memory, and they had a life together that ended. She is at peace with it. Older than Henrik but old. She has known the Haldjas her whole life; her mother knew the Haldjas; her grandmother before that.

She fed Pätu as a kitten, nursed her when she was sick, watches the cat come and go now without resentment.

**Register A:** ~24×40 px; door-fraction 0.55–0.65. Elderly Estonian woman. Apron over working clothes. Likely a kerchief or pulled-back hair. **[OPEN]** No sprite-prompt currently exists for `sprite-leida-idle.png` in `art-asset-list.md` — add this row when Ch2 is commissioned.

**Register B:** Appears in:
- The chef-encounter scene (her pine table)
- The Ch2 lunchbox cinematic (`cin-ch02-lunchbox-memory.png`) — but as her younger schoolgirl self
- Possibly an altar-offering cinematic at chapter's end (**[OPEN]** — filename TBD)

**Two age stages:**

**1. Young Leida (school-age, the lunchbox memory).** ~10–11 years old. Wooden Estonian schoolhouse. Winter coat (too-light, but warmer than the boy's). Tin lunch-pail. Hair braided or under a knitted hat. Boots. The chapter's deepest beat for the player.

**2. Elder Leida (chapter present).** Long-widowed. Working-class warmth. Apron, working clothes, possibly a knitted shawl in the cottage. The cottage has a wood stove, a long pine table, geraniums in the window — her environment is more iconic than her clothing.

**Silhouette tells:**
- Young Leida: braid (or hat), the tin lunch-pail in her lap, schoolgirl posture
- Elder Leida: apron, soft elder carriage, the cast-iron pan often nearby

**Color signature:** none locked.

**What NOT to draw:**
- Elder Leida looking grief-stricken — she's at peace
- The young-Leida lunchbox memory in any other season than winter — the cold step matters

**Appearances:** Ch2 chef encounter; `cin-ch02-lunchbox-memory.png` (young Leida); possibly altar-offering at chapter's end.

---

## Sandy Duncan (Ch3 — Southampton)

**The chapter's tribute character.** Scottish ghost. Brash, funny. Comes home every Tuesday to cook for his family. They cannot see him directly but they sense him. *Dedicated in memory of Sandy Duncan and his wife Caitlin and children Robert, Archie, Max, Gus, and Bibi.* Treat warmly.

**Canonical description (locked 2026-05-13, Q8):** Scottish. **Brown hair. A beer belly. Very tall. Booming voice. Scottish-looking** — broad features, weathered, the kind of presence that fills a room before he says anything. Ghost-translucent like Pip but *brighter and fuller*. Carries himself like he owns the room he's in, even now. Brash, mid-laugh, mid-story at all times.

**Two visual states:**

**1. The man who walks out of the sea (Ch3 Beat 2).** Sandy's arrival form. Ghost-translucent. Carrying a bag of groceries. Walking out of the sea like he was always there. *The chapter's first ghost-arriving-by-water image.* — sprite-level, no specific commissioned cinematic.

**2. Sandy in the kitchen.** At Caitlin's left shoulder while she stirs. Ghost-translucent but brighter and fuller than Pip's. Holds himself in a real living room. Holds the wine glass when offered. Sits at the head of the family table at dinner with a translucent bowl — *he doesn't eat. He just sits there with them.*

**Register A:** Sprite, ~24×42 px; door-fraction ~0.65–0.70 (he's *very tall* — taller than most adults in the cast, so the upper end of the adult band). The existing `sprite-sandy-idle.png` filename and prompt in `art-asset-list.md` should be updated to reflect the locked details (brown hair, beer belly, very tall, booming-voice carriage, Scottish-looking). Translucent but solidly drawn. Per the kitchen description, a YoYo Games hoodie hangs on a chair near him in the kitchen — wardrobe-wise, Sandy probably wears casual rumpled clothing (an open shirt, jeans, sometimes the hoodie itself).

**Register B:** Several cinematics implied:
- Sandy walking out of the sea (Beat 2)
- Sandy at Caitlin's shoulder while she cooks (Beat 5)
- Sandy at the head of the table (Beat 8, holding a translucent bowl)
- The taste-memory: Pip seeing through Sandy's eyes — Sandy at the stove, the family already gathered (Beat 8)
- Sandy at the door, saying *Life's short, mate* (Beat 9)

None of these have rows in `art-asset-list.md` yet. **[OPEN]** — add when Ch3 is being commissioned.

**Silhouette tells:**
- Tall — taller than every other adult NPC in the cast
- The beer belly (a soft swell at the midline that reads at sprite scale)
- Brown hair, slightly disheveled
- Stands like he owns the room — chest out, easy

**Color signature (locked 2026-05-13, Q8 logic):** **warm-amber undertone in his ghost-glow** — he comes back *for warmth*, into a warm kitchen, with his family who are alive and noisy. Same family as Erik's at-peace warm-amber, distinct from Pip's cool-white and the Mamlambo's blood-iron. Not green-blue like Iris (he is not stuck; he chose to come back, and he can leave whenever he wants).

**What NOT to draw:**
- Sandy looking sad or sick — he's brash and embodied even now
- The family seeing Sandy directly — they sense him, never see him (with the *almost*-exception of Archie's three small moments)
- Sandy as slim or short — *very tall, beer belly* is the silhouette and it must read

**Appearances:** Ch3 Beats 2, 5, 6, 7, 8, 9. Only chapter.

### Sandy's family (Ch3 — supporting cast)

These characters appear in Ch3 only. Brief NPCs in the kitchen and at dinner. Each gets a one-line locked description from the outline.

- **Caitlin.** Sandy's wife. Short blond pixie haircut. At the range, in motion, the household's center of gravity.
- **Robert.** Sandy's eldest, from a previous marriage. Adult. Tall, brown hair, muscular.
- **Archie.** Adult. Tall, skinny, brown hair. Quieter than the others. *He almost-sees Sandy* — three small moments across the kitchen scene.
- **Max and Gus.** Adults. Slightly shorter than Archie, brown hair. Often together near the doorway.
- **Bibi.** The youngest. The only girl. About Pip's age. Shorter than the others, skinny, long light brown hair. Brief lines.
- **Michel.** French. Arrives with dessert. Brief warm presence.
- **Michel's wife.** Brunette. Brief warm presence. *(Both Michel and his wife are real-person tributes — treat warmly.)*
- **Edie.** Old Cockney ghost. Runs a wine shop on the pier. Apron, headscarf, brass-buttoned cardigan. Hands always wet (washing glasses). Dock-version of Sandy's *being-placed-and-useful*. They never meet on screen.

**[OPEN]** Sprite filenames and cinematic filenames for all of Ch3's cast — none yet in `art-asset-list.md`. To be added when Ch3 is commissioned.

---

## Muhittin (Ch4 — Istanbul)

**Canonical description.** Young Turkish man, late twenties. Warm, curious, easy. Cooking for friends (his brother Omer and Omer's American friend Brian). Recently lost his grandmother — she lives in the recipe. *Real-person reference: Muhittin is one of Julia's friends in Istanbul. Treat warmly.*

**Register A:** `sprite-muhittin-idle.png` exists in `art-asset-list.md`. ~24×40 px; door-fraction 0.55–0.65. Late twenties. Warm casual clothes (sweater, apron). Kind features, slight smile.

**Register B:** Appears in the chef-encounter scene and (briefly) the taste-memory's framing. The taste-memory itself shows him and Omer as small boys in their grandmother's orchard, not adult Muhittin.

**Silhouette tells:** late-twenties build, warm sweater, the slight smile.

**Color signature:** none locked.

**What NOT to draw:** Muhittin grieving heavily — he's *happy* and cooking; the grief is in the texture of the recipe, not on his face. *The cure for grief is to cook for the next person.*

**Appearances:** Ch4 chef encounter; brief background presence in the orchard taste-memory cinematic.

### Omer (Ch4)

**Canonical.** Muhittin's brother. Athletic build, just back from tennis. Family resemblance to Muhittin. Brief, warm. *Real-person reference: Julia's friend.*

**Register A:** `sprite-omer-idle.png` exists. ~24×40 px. Athletic, tennis-casual clothes.

**Register B:** Appears in Ch4's chef encounter. Also as a small boy in the orchard taste-memory — testing walnuts with his thumbnail alongside small Muhittin.

**Two age stages:** Adult (chapter present) and child (orchard memory, ~6–8 years old).

**Appearances:** Ch4 chef encounter; orchard taste-memory cinematic.

### Brian (Ch4)

**Canonical.** Omer's American friend, in Türkiye for the year. Tennis-casual clothes. Friendly easy expression. Brief, warm. *Real-person reference: Julia's brother.*

**Register A:** `sprite-brian-idle.png` exists. ~24×40 px.

**Register B:** Appears in Ch4's chef encounter only.

**Appearances:** Ch4 chef encounter.

### Muhittin's grandmother (Ch4)

**Canonical.** Appears only in the orchard taste-memory. An elderly Turkish woman gathering two small boys against her at the edge of an orchard. *They smell like walnut hulls.* Has recently died, but appears alive in the memory.

**Register A:** not needed.
**Register B:** the orchard cinematic.

**[OPEN]** No specific physical description beyond *Muhittin's grandmother*. Pull from outline canon: late-sixties to seventies, warm working dress, weathered hands, hair pulled back. Confirm at commission time.

**Appearances:** Ch4 orchard taste-memory cinematic only.

---

## Iris (Ch5 — Lethe wreck / Saldanha Bay)

**Canonical description.** Edwardian child ghost. ~10–11 years old. Long hair, period-appropriate dress (high collar, sash, dark-colored — possibly mourning-blue or burgundy). Boots. Died on a sunken English ocean liner called *The Lethe* off the Horn of Africa. Was eating dinner with her family when the ship went down. **Did not finish her meal** — *because if I finish, I'll forget them.* Formal, slightly archaic speech. Holds herself like a Victorian child in a portrait — straight-backed, hands loose at her sides.

She is also Pip's foreshadow — her arc is what Pip's will rhyme with at the climax.

**Striking coloring (locked 2026-05-13, Q5):** **Iris looks albino but isn't.** Pale-pale hair (nearly white), very fair skin, very light eyebrows. But her eyes are a normal color (a light blue or gray would suit her coloring; not the pink-red of true albinism). This is the visual that sets her apart from any other character in the game — when Pip first sees her squeeze through the floorboards, the player should clock the unusual paleness as *this is a girl who looks unlike anyone we have met*. Her family at the dinner manifestation may share the very-fair English-Edwardian coloring (so she fits in among them) but the extreme paleness is hers alone.

### Three visual states

**1. Wet, on emergence.** Squeezes up through the floorboards of the storage room. *A squeeze, then a pop.* Dripping seawater. Hair plastered to her face. Visible water-droplets on her dress. Pooling water on the wood around her. *(Locked in `03-art-and-aesthetic.md`'s forward-reference section.)*

**2. Dry, after the shake-off.** Completely dry. The wallpaper-pattern-of-her-clothes remains the same; only the water leaves. The shake-off is animated as a quick *blur burst* — analog dog shaking off water — with the *squeeze-and-pop* sound effect.

**3. Form-blurred (translucent).** When sad or stubborn, Iris becomes translucent — *more strongly than Pip ever does*. The wallpaper visibly shows through her. This is how Pip eventually realizes she is a ghost. *(Locked.)*

**Register A:** Sprite. **[OPEN]** Specific filename to add in `art-asset-list.md`. ~16–24 px tall (child human, not ghost-Pip's compressed scale — she has body and clothes); door-fraction 0.40–0.45 per Scale Anchor child band. Dark dress, long pale hair, boots. Three sprite-state variants likely needed: wet, dry, form-blurred.

**Register B:** Multiple cinematics — `cin-ch05-iris-emergence.png` (specified), the storage-room conversation, the family-dinner manifestation (the chapter's biggest cinematic — `cin-ch05-iris-family-dinner.png`), and her crossing-back scene.

**Silhouette tells:**
- Long pale hair — *the lightest hair in the cast*, almost the first thing the eye lands on
- Edwardian dress with high collar
- Boots
- The straight-backed Victorian-portrait posture

**Color signature (locked, Decisions Log):** sea-green-blue `#88b8b0`. Underwater light undertone. **Specifically distinct from Pip's cool-white and the Mamlambo's blood-iron** — *they are both ghosts but from different waters.* This applies to her *glow / translucence*, not to her hair or skin themselves (which are pale-pale within the Edwardian palette).

**What NOT to draw:**
- Iris with Pip's three-wave ghost-tail — she has legs, boots, a human body. She is not a *ghost* in the visual conventions of Pip — she's a *child who is also dead*. The visual register matches Sandy and Erik more than Pip.
- Iris translucent in every scene — translucent is a *state*, not her default. Default is opaque.
- Iris in modern clothing — period-Edwardian only.
- Iris with medium-brown or dark hair — her *paleness* is the canonical visual hook; if it goes, the character loses her instant-recognition silhouette.
- Iris with red or pink eyes — she *looks* albino, but isn't. Eyes are a normal pale color.

**Appearances:** Ch5 only. She moves on at chapter's end and does not recur. The switchblade is what she leaves behind.

### Iris's family (Ch5 manifestation)

Appears in `cin-ch05-iris-family-dinner.png` — Edwardian dining room, white tablecloths, ten people in period dress, candelabras, warm amber chandelier light, Iris seated between her father and brother.

**Named/implied:**
- **Iris's father** — dark suit. Smiles. Fair English Edwardian coloring. *"There you are, darling. Come and finish your dinner."*
- **Iris's mother** — across the table. Fair English Edwardian coloring. *"And eat your sprouts, too."*
- **Iris's brother** — older, ~14. Making a face. Fair coloring.
- **At least four other family members** at the table (uncles, aunts, cousins implied) — fair English Edwardian coloring across the table.

The family's overall paleness (fair Edwardian English) provides the visual context for Iris's extra paleness — she's a *very pale girl in a family of pale people*, which lets the extreme of her register feel like *she* rather than *them*.

**Appearances:** the family-dinner cinematic only. They are *manifested*, not characters with their own arcs. **[OPEN]** No locked descriptions beyond the above.

---

## Johannes Delport (Ch5 — Saldanha Bay)

**Canonical description.** Older South African man (Afrikaner). Jolly, chaotic, bearded. Talks to himself and to the cat (and to the sky) constantly. Sings while he cooks. Forgetful and clumsy — bumping into things, losing ingredients, finding them again. *Cannot see Pip but is so forgetful that Pip can help anyway.*

**Register A:** **[OPEN]** Sprite filename. ~24–40 px; door-fraction 0.55–0.65. Bearded, working clothes, apron, broad warm carriage. Stoutness implied by his joviality.

**Register B:** The chef-encounter at the outdoor fire (clay pot, courtyard). And his appearance as a young couple's child (~6–8 years old) in the taste-memory cinematic (`cin-ch05-potjie-memory.png`).

**Two age stages:**
- **Present-day Johannes:** older, bearded, jolly.
- **Child Johannes:** ~6–8 years old, sitting on a worn blanket near the fire, watching his parents tend the potjie. *(Mentioned in the taste-memory.)*

**Silhouette tells:** Beard, working clothes, the broad warm carriage; *the cast-iron pot on three legs* is more iconic than his clothing.

**Color signature:** none locked.

**What NOT to draw:** Johannes mournful — he's *jolly*. The memory of his parents is warm, not grief-tinged.

**Appearances:** Ch5 chef encounter; `cin-ch05-potjie-memory.png`.

### Johannes's parents (Ch5)

Appear in the potjie taste-memory. A young couple tending a fire in the South African veld, decades ago. The man stoking coals; the woman lifting the lid to check the stew.

**[OPEN]** No physical descriptions locked. Pull from outline canon: Afrikaner working couple, early thirties at the time of the memory, simple working clothes. Confirm at commission time.

**Appearances:** `cin-ch05-potjie-memory.png` only.

---

## The Pocong (Ch6 — monster)

A grieving Indonesian bound spirit. Tall shrouded shape. White burial cloth wrapped around the body. Head visible above. Closed eyes that flicker open. Shroud tied at the feet with multiple knots — *bunched and tight*. He cannot walk; he hops in small frantic jumps.

His voice is *spooky but not malicious*. Grieving. Old. Like wind through a partially open door. Speaks in slow, sung lines.

**Register A:** Sprite. **[OPEN]** Filename `sprite-pocong.png` — add to `art-asset-list.md` when Ch6 is commissioned. ~40–56 px tall; door-fraction 0.50–0.65 (tall but not towering). Vertical, narrow silhouette. Shroud all-white. Multiple visible knots at the feet.

**Register B:** Appears in the puzzle scene (clearing in the banana grove). Also as a fragment in Pip's infection flashbacks across Ch7 and Ch8 — *a figure looking out from inside cloth, hands tied, watching a family on the other side of a window who cannot hear him calling.*

**Silhouette tells:**
- All-white shrouded form
- Vertical, narrow
- Feet bound — distinctive at any scale

**Color signature:** all-white shroud against the green-and-gold of the banana grove. *Not* in the bad-ghost blood-iron register — he's grieving, not malevolent.

**What NOT to draw:**
- The Pocong as scary in the conventional Indonesian-horror sense (the chapter is gentle horror — never cruel)
- The Pocong's hands or face once freed — when the cloth falls at his feet, the camera holds on the cloth-falling and on Pip, not on the Pocong's full body

**Appearances:** Ch6 chef encounter (technically the monster encounter, but the chapter's main encounter beat). Recurring as infection-flashback fragments in Ch7 and Ch8.

---

## Tirta (Ch6 — Indonesia chef)

**Canonical description.** Young Indonesian woman. Fast-talking, generous, deeply funny. Cooking at a small open-front warung. Recently lost her grandmother — *who fed strangers' children* (orphanage lemper). Carries the chain forward herself.

Per Ch6 outline: mid-to-late twenties. Apron, warm casual clothes, the warung's tools (iron pan, banana leaves) often nearby.

**Register A:** **[OPEN]** Sprite filename `sprite-tirta-idle.png` — add to `art-asset-list.md`. ~24×40 px; door-fraction 0.55–0.65. Young Indonesian woman, apron, warm casual clothes.

**Register B:** Chef-encounter scene at her warung. Also appears as a teenage version of herself in the taste-memory cinematic — *much younger, maybe sixteen, in a courtyard with her family wrapping lemper for orphans.*

**Two age stages:** Adult (chapter present) and teen (~16, taste-memory).

**Silhouette tells:** Apron, warm casual clothes, the warung's tools (iron pan, banana leaves) often nearby.

**Color signature:** none locked.

**What NOT to draw:** Tirta grieving — like Muhittin, *she's not grieving; the recipe is.* She's busy. She's making lemper.

**Appearances:** Ch6 chef encounter and the lemper taste-memory cinematic.

### Tirta's family (Ch6 — taste-memory)

Appear in the lamp-lit courtyard cinematic. A family of seven or eight: teenage Tirta, her grandmother, aunts, uncles, two small cousins, Tirta's mother (writing labels — *Panti Asuhan Cahaya Kasih*).

**Tirta's grandmother (deceased at chapter present).** Calm and warm, does not stop wrapping while she answers the small cousin's question. *"Because someone else's child is also a child."* The chapter's wisdom-keeper, speaking from the memory.

**[OPEN]** No locked physical descriptions beyond *family of seven or eight at a long folding table covered in banana leaves*. Confirm at commission time per Ch6 outline.

**Appearances:** Ch6 lemper taste-memory cinematic only.

---

## The Boitatá (Ch7 — Brazil monster)

**Canonical description.** Massive serpent-of-fire. Brazilian folkloric guardian who hunts arsonists. Pours upward out of the water in a coil — *too long, too smooth, too bright*. Body is fire shaped like a serpent. Eyes are lanterns the size of dinner plates. *Has been hunting arsonists for centuries.*

His exhale catches Pip's match-flame and throws it outward in three directions — three small fires light around Pip, who must put them out before the match in his hand burns out.

He is *not malevolent* — he is *ancient and reading Pip and not liking what he sees*. He grants passage at the end with a warning: *"You carry something I have not seen before. Be careful of it. Or it will eat you."*

**Register A:** **[OPEN]** Sprite filename `sprite-boitata.png` — add to `art-asset-list.md` when Ch7 is commissioned. Large, serpentine. Likely larger sprite-scale than other NPCs (~80×80 px or more, given his described scale; door-fraction much higher than adult NPCs, possibly >1.0 since he is *vast*). Fire-textured body.

**Register B:** The encounter at the Brazilian dock — the dome around Pip, the three small fires, the match in Pip's hand burning down.

**Silhouette tells:**
- Long serpent body of fire
- Lantern-eyes
- Vertical pour upward out of water (in the arrival image)

**Color signature:** Fire colors. Warm-amber and orange-red — but *not* the bad-ghost blood-iron. He's a *guardian*, not a malevolent ghost. Warm light is his *natural register*. The trick of the chapter is that the warmth he embodies and the warmth Pip carries are different kinds — he reads Pip's carried darkness as foreign.

**What NOT to draw:** The Boitatá as monstrous in the threatening sense. He is *vast and ancient and unaffected by Pip*. His menace is in his scale and indifference, not in cruelty.

**Appearances:** Ch7 dock encounter only. Does not recur.

---

## Joana and Beatriz (Ch7 — Brazil chefs)

**Canonical description.** Two women living together in a small wooden house raised on stilts at the edge of the forest. A modern Brazilian household. They diagnose Pip — *two darks, not one; the answer is giving, not escaping* — and feed him moqueca that teaches him the chain of cooks.

- **Beatriz.** In her sixties. Gray-streaked hair pulled back. An apron over a faded cotton dress. The first to speak. Warm-direct register. *"Oh. Oh, sweetheart. Come in. Come into the light."*
- **Joana.** Taller than Beatriz, browner from the sun, hands wet from washing. *Reads Pip the way she reads the forest — slowly, completely.* The one whose magic is the chapter's invention. Speaks fewer words but the deeper ones.

They are a couple. Beatriz's hand is in Joana's at the doorway when Pip leaves. *Pip carries the image with him.*

**Register A:** **[OPEN]** Sprite filenames `sprite-joana-idle.png` and `sprite-beatriz-idle.png` — both to add to `art-asset-list.md`. ~24×40 px each; door-fraction 0.55–0.65.

**Register B:** Chef-encounter at the house. Also possibly the doorway parting image (*two women in a kitchen at the edge of a forest at evening*) — to be commissioned.

**Silhouette tells:**
- Beatriz: gray-streaked hair pulled back, apron, faded cotton dress
- Joana: taller, hands often wet, no apron specified

**Color signature:** none locked. The chapter's color signature is *deep forest green and clay-red against single warm candle/firelight*.

**What NOT to draw:** Joana and Beatriz in any specifically Indigenous register. Per Ch7's *What this chapter is NOT*: they are a *modern Brazilian household*, not Munduruku. Their politics are general Brazilian environmentalism. Avoid any iconography that codes Indigenous-specific.

**Appearances:** Ch7 chef encounter only. Do not recur.

---

## The Capuchin (Ch7)

**Canonical description.** Small capuchin monkey. Sharp-eyed. Fur tipped white at the ears. Meets Pip and Pätu at the fork in the forest path. Chitters at Pip and then at Pätu. *He and Pätu have a conversation Pip cannot follow.* Then leads them to Joana and Beatriz's house.

**Register A:** **[OPEN]** Sprite filename `sprite-capuchin-idle.png` — add to `art-asset-list.md`. ~16–20 px; door-fraction 0.15–0.20. Small, sharp-eyed monkey. White ear tips.

**Silhouette tells:** Small primate shape, white ear tips, alert posture.

**Color signature:** Capuchin coloring — brown body, white face/chest. Not a ghost (he's a living forest animal).

**What NOT to draw:** A cartoonish or anthropomorphized monkey. The capuchin is real — he chitters, he leads, he disappears into the canopy.

**Appearances:** Ch7 forest traversal only. Does not recur. *(Pätu's only peer in the game — a gentle gift to her before Ch8.)*

---

## The Mamlambo (Ch5 — monster)

**Canonical description.** South African folkloric water-creature. Massive serpent (brain-sucker variant). Visible through the porthole window of the Mnemosyne's lower deck. Long body coiling against the hull. Eyes the size of dinner plates — *intelligent and hungry*. Not malevolent for its own sake — *a thing that takes because that is what it is*.

**Register A:** No sprite needed at room-scale — the Mamlambo is too large to be a sprite; she is glimpsed through portholes and at the porthole-window. Her *eye* is the iconic image.

**Register B:** Featured in `cin-ch05-mamlambo-porthole.png` — *a massive serpent eye the size of a dinner plate visible at the porthole.* Also seen coiling against the hull in environmental beats.

**Silhouette tells:** The eye at the porthole; the massive coiled body suggested in the dark sea.

**Color signature (locked, Decisions Log):** blood-iron `#7a1418`. The bad-ghost signature. *The Ch8 shadow shares this signature in its wires.*

**What NOT to draw:** The Mamlambo as fully visible — she works because she is *partial*. Eye, coil, suggestion. Showing her whole would break the gentle-horror rule.

**Appearances:** Ch5 only. She does not return as a character — but her color signature returns at the Ch8 shadow.

---

## The Black Shuck (Ch3 — monster)

**Canonical description.** Massive black dog. English coastal lore — *an omen of death, a marker that someone has died*. Glowing eyes. *Not evil* — an omen who stands at thresholds. *Hungry, not hostile.* Can be fed three pieces of meat and will trot off home.

**Register A:** **[OPEN]** Sprite filename `sprite-black-shuck.png` — add to `art-asset-list.md` when Ch3 is commissioned. Larger sprite (~32–40 px); door-fraction 0.30–0.40 (a large dog, not human-tall). Massive black dog, glowing eyes.

**Register B:** The encounter at the Southampton dock — Pip throwing meat from a conveyor of dock-trash. **[OPEN]** Cinematic filename TBD; the chapter outline does not specify a single cinematic, more an animated puzzle scene.

**Silhouette tells:** Large dog form. Glowing eyes (the only color highlight against an all-black silhouette).

**Color signature:** Black body with warm-amber glowing eyes. *Not blood-iron* — he's an omen, not a bad ghost. His warmth is the bridge: omens can be answered with kindness.

**What NOT to draw:** The Shuck as malevolent. He's *in the way*, and *hungry*, not hostile. After feeding, he barks once — a deep, satisfied bark — and trots off content.

**Appearances:** Ch3 dock encounter only. Does not recur.

---

## The Haldjas (Ch2 — monster/guardian)

**Canonical description.** Estonian protective house-spirit. *Sparkles in a corner.* Bound to Leida's family for generations. As a favor to Leida, the Haldjas keeps an eye on Pätu — *but she is Leida's spirit, not Pätu's*. Challenges Pip directly: *"Not all of you are good. How do I know which one you are?"*

**Register A:** **[OPEN]** Sprite filename `sprite-haldjas.png` — add to `art-asset-list.md` when Ch2 is commissioned. **Particle-driven, not figural.** She appears as a sparkle-cluster in a corner of the room. Her materialization into a translucent figure is reserved for the introductory cinematic.

**Register B:** Appears in `cin-ch02-haldjas-reveal.png` — *swirling gold-amber sparkles materializing into a translucent figure beside Pätu.*

**Silhouette tells:** Sparkle-cluster at room scale. Translucent figure (humanoid, **[OPEN]** specific form TBD) in cinematic scale.

**Color signature (locked, Ch2 outline):** warm gold-amber. *Distinct from Pip's cool white and Iris's green-blue. Estonian forest-spirit register.*

**What NOT to draw:** The Haldjas as malevolent in her wariness — her challenge is *protective* of Pätu, not hostile to Pip. Once she sees Pip is *made of bonds*, she softens.

**Appearances:** Ch2 only — she does not follow Pip aboard. Her work is with Leida. Does not recur.

---

## The Karakoncolos (Ch4 — monster)

**Canonical description.** Turkish folkloric malevolent winter-spirit. Drives people to madness, freezes them, blows out candles. *As he flees, gibbers "I don't remember"* — the chapter's central foreshadow for Ch8.

**Visual register (locked 2026-05-13, Q9): folkloric and scary.** Lean into the traditional Turkish folkloric depiction:

- **Hairy, almost yeti-like creature** — dark-furred, matted, the kind of fur that suggests something that has lived in cold for too long
- **Dark all over** — black-brown fur, no clean lines, no warm pools anywhere on his body
- **Tall but stooped, with long arms** — the silhouette of a thing that walks on four limbs but stands up when threatened
- **Visible breath / frost emanating from him** — he carries the cold with him
- **Eyes glowing through the matted fur** — the only color highlight; possibly the cold-blue of Zemheri winter, possibly the red of malevolent folklore (**[OPEN]** specific token TBD)
- **Scary-looking** — this is the chapter's monster; it's allowed to be frightening within the gentle-horror frame

This is meaningfully different from the previous draft's *cloaked-hollow-shadow* spec. The cloaked figure was too thin and too modern-horror; the hairy creature is closer to what a Turkish child would describe being told about by their grandmother, and to the chapter's *the inverse of warmth* register.

**Register A:** **[OPEN]** Sprite filename `sprite-karakoncolos.png` in `art-asset-list.md` — the existing prompt needs to be rewritten to reflect the locked folkloric-hairy direction. ~40×56 px tall; door-fraction 0.50–0.65 (a tall creature, but not towering above adults). Hard pixel edges, painterly.

**Register B:** The frozen-square encounter. **[OPEN]** Specific cinematic filename TBD.

**Silhouette tells:**
- Hairy, matted, dark
- Tall and stooped with long arms
- Visible breath / frost cloud around him
- Glowing eyes through the fur

**Color signature:** *Inverse of warmth.* Cold-blue and shadow-dark in the body; eyes provide the only light highlight. **[OPEN]** Specific token for the eye-glow — cold-blue from the chapter's moonlit-blue palette, or a malevolent red? Decide at commission time.

**What NOT to draw:**
- The Karakoncolos as cloaked or hood-and-shadow — that was the prior draft direction; superseded
- The Karakoncolos as warm — he is the *inverse of warmth*; no amber anywhere on him except possibly in the eye-glow
- A face fully visible through the fur — the eyes are what reads, the rest is matted shadow
- A "cute" or sympathetic version — the chapter pivots on him being *the kind of thing that has forgotten itself*; that lostness is what's sympathetic, not his appearance. The appearance is frightening on purpose.

**Appearances:** Ch4 only. Does not recur. *Echoes at Ch8 — the shadow's voice borrows his "I don't remember" line.*

---

# Cats

## Pätu

**Canonical description.** *Real, alive, recurring NPC across many chapters.* A free cat — she belongs to no one. Born a stray. Leida nursed her back from cold as a kitten. Grew up partly in Leida's cottage, partly outside. Made her way to the harbor, eventually onto the Mnemosyne. *A cat who chooses.* **Locked as a gray tabby** (Sprint 00, per `patch-03-art-aesthetic-registers.md`).

Pip's first solo-chapter companion. Her promise-pact with Pip: *"I'll protect you, Pätu. As long as you choose to come aboard."* She accompanies Pip from Ch2 onward — choosing to.

**Pronounced:** *PAH-too.* Estonian.

**Register A (locked):** small procedural pixel-art sprite, ~28–36 px; door-fraction 0.20–0.25. Gray tabby. Sparse style matching Pip's.

**Register B:** Her introductory cinematic in Ch2 (`cin-ch02-haldjas-reveal.png` — beside the Haldjas's sparkles, gray tabby), and appearances inside chapter-cinematics where she is in-frame.

### Multiple state variants needed (Register A)

- **Standing / walking.** Default. Calm, tail relaxed.
- **Sitting.** Used when she's hint-giving — meowing by an important object.
- **Hissing.** When she reads something as wrong. Fur up, ears back, low body. *She's simply a good judge of character — she hisses at things that are wrong, doesn't hiss at things that are fine.*
- **Curled / sleeping.** End-of-chapter beats (curled by Muhittin's oven, in Joana and Beatriz's windowsill).
- **Frozen (Ch4 only).** Statue-like, in the center of the snowy square. The Karakoncolos has frozen her. *Frozen Pätu is the chapter's stakes.*
- **Fearful chirp (Ch4 alley).** Ears flattened, low body, mid-step pause — *not a hiss exactly, more a fearful chirp.* Brief beat before she bolts ahead.

**Silhouette tells:** Gray tabby coat (no other color allowed — *not tortoiseshell*, locked Sprint 00). Slender cat form. Ears alert in default.

**Color signature:** Gray tabby — locked. Yellow eyes that catch warm pool-lights distinctly against the cool-base palette.

**What NOT to draw:**
- Pätu as tortoiseshell, white, black, or any non-gray-tabby coloring
- Pätu chasing or being aggressive toward Pip — she chose him; she escorts him

**Appearances:** Every chapter from Ch2 onward. Visible companion in most cinematics; central to Ch4's monster puzzle (frozen, then thawed, then routs the monster); central to Ch5's *Pätu as the cat-envoy* beat.

---

# Echo-creatures (non-character creatures)

Echo-creatures are not characters and don't need full sheets — they are *the ship's own memory-residue*, treated as ambient sprites per chapter. They are listed in `art-asset-list.md`. Per `patch-03-art-aesthetic-registers.md`: *all echo-creatures live in Register A — small, procedural, drawn to canvas at room scale. They are never the subject of cinematics; the cinematics frame the room containing them, not the creatures themselves.*

For reference, the chapters' echo-creatures are:
- **Ch1:** ghost-spiders, ghost-mice, ghost-bats
- **Ch2:** echo-mice (along baseboards)
- **Ch3:** echo-fish (cod, haddock, plaice — the ghosts of fish that died for fish-and-chips); echo-deer in Southampton's streets
- **Ch4:** echo-cats (Istanbul strays — *Pätu was one of these once*)
- **Ch5:** echo-rats (lower deck)
- **Ch6:** echo-tarsiers (pygmy, large reflective eyes, blink sequentially)
- **Ch7:** mosquitoes (humid lower-deck swarms)
- **Ch8:** urban vermin (cockroaches, bedbugs, rats, one confused turkey)

Each gets a color signature in the *warm-amber translucent* register — the ship's residue is always warm. Echo-creature pixel sizes: door-fraction 0.06–0.14 (per Scale Anchor).

---

# Remaining open questions

This document captures the canon as of 2026-05-13. The Q1–Q12 review locked the biggest open creative questions; the remaining items below are second-tier — most are *commission-time* questions to settle when a specific chapter's art is being made, not story questions blocking writing.

1. **Asset-list rows still missing.** For art commissioning, these characters need rows added to `art-asset-list.md` when their chapters are commissioned: `sprite-leida-idle.png` (Ch2), the full Ch3 cast (Sandy with updated description, Caitlin, Robert, Archie, Max, Gus, Bibi, Edie, Michel, Michel's wife), `sprite-pocong.png` (Ch6), `sprite-tirta-idle.png` (Ch6), `sprite-joana-idle.png` and `sprite-beatriz-idle.png` (Ch7), `sprite-capuchin-idle.png` (Ch7), `sprite-boitata.png` (Ch7), `sprite-black-shuck.png` (Ch3), `sprite-haldjas.png` (Ch2). Plus updated prompts for `sprite-karakoncolos.png` (Ch4 — folkloric-hairy direction) and `sprite-sandy-idle.png` (Ch3 — brown hair, beer belly, very tall, Scottish-looking). Plus a sprite row for Ch7 ghost-form Erik.

2. **Ch8 grandparents-apartment cinematics in `art-asset-list.md`.** The Ch8 grandparents-apartment scene has no filenames yet. Likely two cinematics: Babcia receiving the gifted memory; Babcia and Dziadek hands-joined at the table with the *He's here, Marta* beat.

3. **Ch6 photograph cinematic.** Confirm whether `cin-ch06-erik-photograph.png` (or similar) exists in the asset list. If not, add when Ch6 is commissioned.

4. **Karakoncolos eye-glow color.** Cold-blue (winter palette) or malevolent red (folkloric red-eyes tradition)? Decide at commission time.

5. **Henrietta in the Henrik-quarters reveal.** Whether a Henrietta photograph appears alongside Erik's in the eventual reveal chapter. If so, the locked Henrietta descriptors (brunette, larger build, short) apply. Revisit at Ch6/7 reveal-chapter design.

6. **Iris's family members beyond father, mother, brother.** *At least four others* at the dinner table. Specific identities not locked. Confirm at commission time.

7. **Johannes's parents** — appear in his potjie memory but only specified at outline level (young couple, working clothes, early thirties). Confirm specifics at commission time.

8. **Tirta's family in the courtyard memory** — *seven or eight people* including grandmother, mother, aunts, uncles, two small cousins. Specific physical descriptions not locked. Confirm at commission time.

9. **Muhittin's grandmother** — no specific physical description beyond *Muhittin's grandmother*. Confirm at commission time (suggested: late-sixties to seventies, warm working dress, weathered hands, hair pulled back).

10. **The Haldjas's translucent-figure form.** Particle-driven at room scale, but her materialization-into-figure form for the cinematic needs a specific design (humanoid, feminine implied by *she*, but specific form TBD).

11. **Boitatá scale.** Door-fraction estimated above 1.0 since he is *vast*. Confirm at commission time — the Ch7 dock cinematic will dictate how he is framed (whole-body in one cinematic, partial in another, etc.).

---

# Cross-references

- For locked palette tokens and rendering rules, see `03-art-and-aesthetic.md`.
- For commission-ready prompts and filenames, see `art-asset-list.md`.
- For Decisions Log entries supporting this document's locks, see `06-roadmap-and-open-questions.md` entries dated 2026-05-13.
- For full chapter context on each character, see the relevant `ch0N-*-outline.md` in `chapter-specs/`.
- For the full component scale catalogue (every recurring asset by door-fraction) and the visual silhouette chart, see `design-docs/09-component-scale-reference.md` and `game/scale-reference.html`.

When this doc is approved, add a Decisions Log entry to `06-roadmap-and-open-questions.md`:

> | 2026-05-13 | **Character reference sheets v2 locked.** `08-character-reference-sheets.md` rebuilt to incorporate Q1–Q12 review answers: Pip's parents (mother blonde-tall-fair, Babcia's daughter; father brown-hair-olive-skin-taller), Erik (more human than Pip, just translucent, Norwegian palette, warm-amber at-peace glow), Henrietta (brunette, larger build, short), Iris (looks albino but isn't — pale-pale hair and skin, normal eye color), Sandy (brown hair, beer belly, very tall, Scottish-looking, warm-amber at-peace glow), Karakoncolos (folkloric hairy creature, dark-furred, stooped with long arms, scary-looking — replaces prior cloaked-shadow direction). Babcia's quilted-square clothing and Dziadek's matching patches locked as family-textile motif. Helga character entry removed (Helga = Pätu). Pätu's bad-ghost-detector beat framing removed (retired canon). Scale Anchor door-fractions integrated per-character. |
