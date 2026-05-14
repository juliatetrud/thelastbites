# Art Asset List & AI Prompt Pack

A complete inventory of every piece of art *The Last Bites* will eventually need, with a naming scheme and a starter AI prompt for each.

This document is for **exploration and concept work**, not final production. As laid out in `03-art-and-aesthetic.md`, the project's locked direction is pixel art at 480×270 internal resolution, and AI tools struggle with the consistency, grid discipline, and tone this project needs. Use these prompts to generate **mood references and concept candidates** that can later inform commissioning a human pixel artist (or doing the pixel work yourself in a tool like Aseprite).

---

## How to read this document

Each row in the tables below gives:

- **Filename** — the canonical name. Follow this scheme when you save anything you generate, so naming stays consistent across the project. Suggested final extension: `.png`. AI generations should be tagged with a suffix (e.g. `_v1_mj.png`) before being downselected.
- **Type** — cinematic, room background, sprite, UI element, porthole transition, or echo-creature.
- **Description** — short canonical description from the design docs.
- **AI prompt** — a starter prompt. Tune as needed. Each prompt assumes you'll prepend your style block (see below).

---

## The universal style block

Prepend this to every prompt for consistency. Adjust the trailing keywords per scene.

> **Pixel art, 480×270 resolution, hard pixel edges, no anti-aliasing, no sub-pixel detail. 7th Guest meets Hyper Light Drifter aesthetic. Deep velvety blacks, single warm warm-amber light source per scene, ornate Victorian/baroque detail, painterly atmosphere. Moonlit-blue base palette: deep blues `#1c2858`, `#0e1a3a`, warm-amber pools `#ffc868`, `#c87830`. Subtle film grain. Strong vignette. References: Owlboy, Hollow Knight, The Excavation of Hob's Barrow, Thimbleweed Park, Coraline, Over the Garden Wall.**

For Pip specifically, append: *cool-white translucent ghost-boy, soft cool glow `#f0f8ff`, ~38–44 pixels tall in sprite form (door-fraction 0.35–0.40), 40–60% frame height in cinematic close-ups, chef's apron always visible, soft hair, two small dark eye-dots.*

Tone reminder for every prompt: **gentle horror, never cruel. Warm-spooky, not gory.**

---

## Naming scheme

- **Cinematics:** `cin-NN-shortname.png` (e.g. `cin-02-mirror.png`)
- **Room backgrounds:** `room-chNN-shortname.png` (e.g. `room-ch01-cabin646.png`)
- **Character sprites:** `sprite-charname.png` (e.g. `sprite-pip-idle.png`, `sprite-pip-walk.png`)
- **NPC sprites:** `sprite-charname-state.png` (e.g. `sprite-henrik-idle.png`)
- **UI elements:** `ui-shortname.png` (e.g. `ui-strength-meter-frame.png`)
- **Echo-creatures:** `echo-creature-type.png` (e.g. `echo-fish-cod.png`)
- **Porthole transitions:** `porthole-chNN-to-chNN.png` (e.g. `porthole-ch01-to-ch02.png`)
- **Per-chapter region tokens / palette swatches:** `palette-chNN-region.png`

Versioning: append `_v1`, `_v2`, etc. for iterations. Append source: `_mj` (Midjourney), `_sd` (Stable Diffusion), `_pl` (PixelLab), `_dalle`. Final approved versions drop the version/source suffix.

---

## Universal UI elements

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `ui-strength-meter-frame.png` | UI ornament | Ornate oval pewter frame, ~44×56px, holds the chewing-boy face and stomach pouch inside. Double-bordered. | Ornate pewter oval frame for a video game UI element, brass-and-gunmetal pixel art, Victorian baroque trim, tiny scale roughly 44 by 56 pixels, dark interior chamber that will hold a portrait, double-bordered with thin inner border, atmospheric. |
| `ui-strength-meter-states.png` | UI animation set | Five states: full, mid, low, critical, dying. Chewing boy face (mouth open / mouth closed) + stomach pouch fill levels. | Pixel art animation sheet, five states of a small chubby chewing ghost-boy face, tiny round stomach pouch beneath, amber-glowing food contents shrinking across the states from full to empty, faces progressing from contented to worried to fading, hard pixel edges, ~24×40 pixel total, 2-frame chewing cycle per state. |
| `ui-pip-icon-life.png` | UI icon — **RETIRED** | *(Sprint 12: The three-lives display is retired. This asset is no longer needed. The faint-imprint "spent" state is visually recycled into the blink-back fade animation, but no dedicated icon is required.)* | — |
| `ui-journal-cover.png` | UI element | Closed leather notebook cover for the notebook screen header or the notebook icon. (File name retained to avoid churn; in-game it is called "the notebook.") Worn, weathered, slightly nautical. | Pixel art weathered leather travel notebook, brass corners, slightly nautical, worn from use, closed view, hard pixel edges, dimly lit single warm light source, ornate but humble. |
| `ui-journal-pages.png` | UI element | Open notebook parchment page texture, used as background for the notebook screen. (File name retained to avoid churn.) | Pixel art open notebook spread, aged parchment paper texture, faint grid lines, subtle inner shadow at the spine, warm-cream color `#e8dcc0`, no text or illustrations, flat clean background asset. |
| `ui-sparkle.png` | UI animation set | Cool drifting sparkle for inspect targets (`↑ INSPECT`). 4-frame loop. One of two distinct sparkle types — see `ui-collect-aura.png` for the collect aura. | Pixel art animated sparkle, 4-frame cycle, small warm-amber dot with subtle radiating glow, drifting upward gently, hard pixel edges, ~6×6 pixels per frame. |
| `ui-collect-aura.png` | UI animation set | Warm pulsing aura for collectible objects (`↓ COLLECT`). 6-frame loop. Distinct from the inspect sparkle: broader radius, slower pulse (1.2s cycle), saturated warm amber, no drift — present and steady like something breathing. | Pixel art animated soft aura, 6-frame cycle, broad warm amber radial glow pulsing slowly, ~12×12 pixels per frame, saturated and present, hard pixel edges, distinct from a sparkle — this is a hum, not a glint. No directional drift; the glow expands and contracts in place. |
| `ui-dialogue-box-frame.png` | UI element | Optional ornamental corner pieces for the dialogue box (if not done in CSS). | Pixel art ornate corner ornaments for a Victorian dialogue panel, brass-and-shadow tones, four corner pieces that fit a rectangular frame, baroque flourishes, subtle. |

---

## Pip — the protagonist

Pip needs *consistent* art across multiple poses, animation cycles, and cinematic close-ups. This is the project's hardest consistency challenge for AI generation. Use the same seed/style reference across all Pip-related generations.

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `sprite-pip-idle.png` | Sprite | Idle pose with subtle bob animation. ~38–44 pixels tall (door-fraction 0.35–0.40). | Pixel art ghost-boy character, ~38–44 pixels tall (door-fraction 0.35–0.40), idle pose facing camera, translucent cool-white body `#f0f8ff` with soft cyan glow, soft brown hair, two small dark eye-dots, small chef's apron stained with flour, slight transparency, gentle bob animation possible, hard pixel edges. |
| `sprite-pip-walk.png` | Sprite animation | Walk cycle, 4 frames left + 4 frames right. | Pixel art walk cycle for a translucent ghost-boy character, 4 frames profile view, ~38–44 pixels tall per frame, chef's apron visible, soft cool glow, feet not quite touching ground (he floats just slightly), hard pixel edges, frame-by-frame animation sheet. |
| `sprite-pip-float.png` | Sprite animation | Float-upward pose. Held while space-bar is pressed. | Pixel art ghost-boy in floating pose, arms slightly outstretched, body drifting upward, ~38–44 pixels tall, cool-white translucent, soft cyan glow trailing downward, chef's apron, hard pixel edges. |
| `sprite-pip-inspect.png` | Sprite | Leaning forward, looking-at-object pose. | Pixel art ghost-boy in inspection pose, leaning slightly forward, head tilted, examining something off-screen, ~38–44 pixels tall, translucent cool-white body, chef's apron visible. |
| `sprite-pip-cinematic-closeup.png` | Cinematic reference | Pip's face in cinematic close-up framing, 40-60% of 480×270 frame. The "same boy with more pixels." | Pixel art close-up portrait of a young ghost-boy, age 10-12, soft brown hair, two pale eye-dots with soft pinprick highlights, slightly translucent cool-white skin with soft cyan rim-light, small chef's apron just visible at frame bottom, single warm-amber light from upper left, deep shadow on right, ornate dark background suggesting ship interior, painterly pixel art, hard pixel edges. |

---

## Chapter 1 — Cabin 646

The project's foundational chapter. 9 cinematics (the doubled first-taste means Cinematic 6 splits into 6a and 6b), 6 rooms (including the observation deck added in Sprint 12), and several NPCs.

### Cinematics

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-01-wakeup.png` | Cinematic | Almost pure black. Suggestion of Pip's face emerging. Two slits of pale eye-light opening. Dust motes drifting. | Pixel art cinematic frame at 480×270 resolution, near-total darkness, the faint suggestion of a young ghost-boy's face just barely emerging from black, two slits of pale eye-light opening at the vertical midpoint, dust motes drifting through a single faint shaft of light, heavy vignette, no environmental detail visible, hushed and uncertain mood, the first breath of a ghost. |
| `cin-02-mirror.png` | Cinematic (animated, reused at climax) | Close-up of Pip's face in mirror, melting on one side, skin sagging like wax, single warm lamplight upper-left, half in deep shadow, sunken eye sockets with pinprick highlights, jaundiced amber skin. Behind: ornate carved wood mirror frame. | Pixel art cinematic close-up of a young ghost-boy's face in an ornate Victorian mirror, the face melting on one side, skin sagging and dripping like wax from the chin, single warm amber lamplight from upper-left illuminating half the face, the other half in deep velvety shadow, sunken eye sockets with tiny pinprick highlights, jaundiced pallid amber skin tone, behind the face hint of carved baroque wood mirror frame fading to darkness, unsettling but not gory, 7th Guest cursed-portrait register with Coraline gentleness, face slightly right of center, painterly pixel art, hard pixel edges. |
| `cin-03-grandparents-cabin.png` | Cinematic | Pip in doorway of grandparents' cabin. Babcia (Marta) on bed weeping. Dziadek (Jan) at window, back to camera, shoulders shaking. Warm lamp on nightstand. Open half-packed suitcase. A photo of Pip on the nightstand. | Pixel art cinematic wide shot at 480×270, ship cabin at night, elderly Polish woman in headscarf sitting on a bed with her face in her hands weeping, elderly man with flat cap standing at a porthole window with his back to us and shoulders shaking, a small ghost-boy standing silhouetted in the doorway in the foreground watching them, single warm amber lamp on a nightstand creating a pool of light, half-packed open suitcase on the floor, a small photograph propped on the nightstand, deep shadow filling most of the room, devastating quiet mood, no music, frozen photograph quality, painterly pixel art. |
| `cin-04-kitchen-cracker.png` | Cinematic (animated) | Grand ship's kitchen, deep night. Stainless steel counters, hanging copper pots, single overhead light. Pip floats mid-air holding a cracker with lox. Henrik frozen in doorway, flour-stained apron, mouth open in silent scream. The cracker hangs visibly in mid-air. | Pixel art cinematic frame at 480×270, grand industrial ship's kitchen at deep night, stainless steel counters and hanging copper pots, single overhead warm pendant light, a small translucent ghost-boy floating in mid-air on the right holding a cracker with lox visibly hovering, an older man with gray beard and flour-stained white chef's apron frozen in the doorway on the left with his mouth open in a silent scream, diagonal compositional energy, comic-tragic mood, the horror of being seen, painterly pixel art. |
| `cin-05-henrik-sits.png` | Cinematic | Close on Henrik sitting on a stool, looking at Pip. Weathered, kind, weary face. Kitchen recedes to shadow behind him. Pip floating in soft focus to the side, listening. | Pixel art cinematic two-shot at 480×270, close on an older man (gray beard, weathered kind face, weary eyes, white chef's coat) sitting on a metal stool looking off-camera-left with patient tenderness, deep shadow behind him, a small translucent ghost-boy floating in soft focus to the side smaller in frame, single warm overhead light, the game's heart turning from horror to tenderness, painterly pixel art. |
| `cin-06a-first-taste-gravlaks.png` | Cinematic (animated dissolve, climax-reused) | Pip takes a bite of gravlaks. Kitchen shimmers. We see young Henrik as a boy learning to cure salmon from his own grandfather. Warm summer Norwegian kitchen, decades ago. | Pixel art cinematic at 480×270, dissolve-transition image, a small ghost-boy in the present-day translucent overlaid on a memory of a Norwegian kitchen decades ago, a young boy (Henrik as a child) watching his grandfather's hands working salmon on a wooden cutting board, warm summer light streaming through a paned window, the past brighter and warmer than the present, magical shimmer between the two timeframes, painterly pixel art, soft warm amber palette in the memory, cool blue in the present. |
| `cin-06b-first-taste-lefse.png` | Cinematic (animated, climax-load-bearing) | Pip tastes the lefse. Kitchen shimmers again. We see an older Henrik teaching a young boy (Erik) to make lefse. A different kitchen — Henrik's home. Erik's face partially hidden by composition — profile, half-shadow, or turned away. Must be recognizable on Ch4 photograph reveal, NOT recognizable on first viewing. | Pixel art cinematic at 480×270, dissolve-transition image, a small ghost-boy translucent overlaid on a memory of a homey kitchen decades ago, a middle-aged man with the beginnings of a gray beard (Henrik as a young father) teaching a boy of about twelve (Erik) to fold lefse on a wooden countertop, the boy's face turned mostly away from the camera or in half-shadow so his features are obscured by composition, warm domestic lighting, the past in golden tones, painterly pixel art, magical shimmer, melancholy undertone. |
| `cin-07-dock.png` | Cinematic | Wide shot from ship deck. Pip's grandparents walking away on the dock with a small wooden box (the coffin). Babcia stops, looks up toward the ship, almost catches Pip's eye, turns, continues. Pip on the railing, translucent, waving with one small hand. Cold blue-gray morning. | Pixel art cinematic high-angle wide shot at 480×270, view from a ship's deck looking down at a dock in early morning, two tiny elderly figures walking away carrying a small wooden box between them, the woman has stopped and is looking up toward the ship, a small translucent ghost-boy stands on the ship's railing in the foreground silhouette waving with one small hand, cold blue-gray morning light, sea and sky framing the scene, painterly pixel art, frozen heartbreak quality, no animation. |
| `cin-08-henriks-offer.png` | Cinematic | Pip and Henrik on the deck at sunset. Henrik offers Pip an open recipe journal with blank pages. Behind them, sun setting on dark water. Distant lights of next port implied. | Pixel art cinematic two-shot at 480×270, a small ghost-boy and an older man with gray beard and white chef's coat standing together on a ship's deck at sunset, the man holding out an open leather-bound journal with blank cream pages between them, warm orange-pink horizon over dark water behind them, distant lights of a port visible at the horizon's edge, intimate hopeful mood, painterly pixel art. |

### Rooms (backgrounds)

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `room-ch01-cabin646.png` | Room background | Pip's small ship cabin. Bunk bed, mirror, porthole, ornate carved wood, single hanging lamp. Crimson upholstery. | Pixel art side-scrolling room background at 480×270, a small ornate Edwardian-style cruise ship cabin at night, bunk bed with crumpled bedding, an ornate carved wood mirror on the wall, a porthole showing dark sea and a far-shore's lights, crimson upholstery and dark wood paneling, single hanging warm amber lamp, heavy shadow filling most of the space, painterly pixel art, deep velvety blacks, single light source rule. |
| `room-ch01-hallway.png` | Room background | Long ship corridor. Carved wood, crimson carpet, brass sconces. Bulletin board (mentions of Mnemosyne). Long side-scrolling. | Pixel art side-scrolling ship corridor background at 480×270 (extended horizontally), long Edwardian-style cruise ship hallway, ornate carved wood paneling, crimson carpet, brass wall sconces casting warm amber pools at intervals, a bulletin board on one wall, doors at intervals, deep shadows between the light pools, painterly pixel art, atmospheric depth. |
| `room-ch01-grandparents-cabin.png` | Room background | Grandparents' cabin. Warmer than Pip's. A nightstand with photograph of Pip. Open suitcase. Window. Lamp. | Pixel art side-scrolling room background at 480×270, an ornate cruise ship cabin slightly larger than Pip's, a single warm amber nightstand lamp creating the only pool of light, a half-packed open leather suitcase on the floor, a small photograph propped on the nightstand, a bed with a coat folded on it, a porthole, dark wood paneling, deep shadow at the edges. |
| `room-ch01-radio-room.png` | Room background | Small radio operator's room. Brass equipment, dials, a worn chair, microphone. Single overhead lamp. | Pixel art side-scrolling room background at 480×270, a small Edwardian ship's radio operator room at night, brass radio equipment with dials and gauges, an old microphone on a worn wooden table, a single overhead amber lamp, ornate detail, deep shadows, a small worn leather chair, painterly pixel art. |
| `room-ch01-dark-corridor.png` | Room background | Lower-deck corridor in disrepair. Most sconces broken, one flickering. Janitor's cart at one end. Atmospheric and tense. | Pixel art side-scrolling ship corridor background at 480×270, lower-deck service corridor in disrepair, most wall sconces broken or extinguished, one sconce flickering with weak amber light, a janitor's cleaning cart abandoned at one end, exposed pipes overhead, scuffed floor, atmospheric tension, deep shadow, painterly pixel art. |
| `room-ch01-kitchen.png` | Room background | Grand ship's kitchen. Industrial stainless steel, hanging copper pots, deep ovens, a single overhead pendant light. | Pixel art side-scrolling room background at 480×270, an industrial Edwardian cruise ship kitchen at deep night, stainless steel counters and prep tables, an entire wall of hanging copper pots and pans, two deep stone-and-iron ovens, a single warm amber overhead pendant light creating the only pool of warmth, deep shadow at the edges, painterly pixel art. |
| `room-ch01-observation-deck.png` | Room background | *(Sprint 12: New — observation deck. Implementation deferred to future Ch1 content sprint.)* Ship observation deck, open-air. Wide curved viewport with the aurora (northern lights) visible across the upper portion in cool greens and violets. Dim wooden-paneled interior. Wooden benches, coiled rope, a small brass telescope on a tripod. Cosmic-lit, not domestic — the aurora is the light source. | Pixel art side-scrolling room background at 480×270, an Edwardian cruise ship observation deck at night, wide curved viewport window taking the upper half of the frame, the northern lights visible beyond in slow-moving cool greens and violets, dim wooden-paneled deck interior, two or three simple wooden benches, a coiled rope, a small brass telescope on a tripod, faint cold-blue ambient light from the aurora through the glass, no warm light sources, atmospheric quiet, painterly pixel art. |

### NPC sprites

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `sprite-henrik-idle.png` | NPC sprite | Older man, gray beard, white chef's coat, apron with flour. Pipe sometimes. | Pixel art older man sprite, ~60–72 pixels tall (door-fraction 0.55–0.65), gray beard, weathered kind face, white chef's coat and apron stained with flour, pipe occasionally visible, slight stoop, warm presence, hard pixel edges. |
| `sprite-marta-idle.png` | NPC sprite | Babcia. Elderly, kerchief, soft features, dark coat. Carries grief in her shoulders. | Pixel art elderly Polish woman sprite, ~60 pixels tall (door-fraction ~0.55, lower end of adult band), headscarf/kerchief, soft features, dark coat, grief visible in her posture and shoulder set, hard pixel edges, painterly. |
| `sprite-jan-idle.png` | NPC sprite | Dziadek. Elderly, wool flat cap, beard. Stooped slightly. | Pixel art elderly Polish man sprite, ~66–72 pixels tall (door-fraction 0.60–0.65), wool flat cap, gray beard, dark wool coat, slight stoop, hard pixel edges. |
| `sprite-janitor-idle.png` | NPC sprite | Crew uniform. Mop or cart. Walks past Pip without seeing him. | Pixel art ship janitor sprite, ~60–72 pixels tall (door-fraction 0.55–0.65), crew uniform with name tag, holds a mop, weary expression, walks with purpose, hard pixel edges. |
| `sprite-passenger-idle.png` | NPC sprite | Wealthy older traveler in evening clothes. Walks past Pip without seeing him. | Pixel art wealthy elderly cruise passenger sprite, ~60–72 pixels tall (door-fraction 0.55–0.65), evening wear, tuxedo or evening dress, walks the corridor obliviously, hard pixel edges. |
| `sprite-pip-in-bed.png` | NPC sprite (one-shot) | Pip's body in the bed. Small form under sheets. Don't show his face. | Pixel art image of a child-sized form lying still under bedsheets, face hidden by sheet edge, small and motionless, somber, soft shadow, painterly. |

### Echo-creatures (Chapter 1 traversal)

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `echo-spider.png` | Echo-creature | 8-12 pixels. Scuttle unpredictably across walls, ceilings, floors. Slightly translucent. | Pixel art ghost-spider sprite, ~10 pixels wide, slightly translucent and shimmery, with a faint warm-amber glow trail beneath, scuttling pose, hard pixel edges. |
| `echo-mouse.png` | Echo-creature | 10-14 pixels. Scurry in small lines along baseboards. Translucent. | Pixel art ghost-mouse sprite, ~12 pixels wide, slightly translucent and shimmery, faint cool glow trail, scurrying pose, hard pixel edges. |
| `echo-bat.png` | Echo-creature | 16-20 pixels wingspan. Swoop in arcs. Translucent. | Pixel art ghost-bat sprite, ~18 pixels wingspan, slightly translucent, swooping wing pose, faint glow trail, hard pixel edges. |

### Treats (Chapter 1)

*(Sprint 12: New subsection. Four Ch1 treats. One locked (Bamsemums), three TBD in Ch1 content sprint.)*

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `treat-ch01-bamsemums.png` | Treat sprite | **Locked.** Small bag of Norwegian foam-and-chocolate bears (Bamsemums). The tutorial treat — the first collectible the player picks up. Placed by Henrik on the kitchen counter. ~`12×16px`. | Pixel art tiny bag of foam-and-chocolate gummy bears, primary colors (red, yellow, green, white), translucent twist-tied cellophane bag, ~12×16 pixels, hard pixel edges, cheerful and small, sits on a kitchen counter, warm amber collect-aura around it. |
| `treat-ch01-cabin.png` | Treat sprite | **TBD — suggested Smørbukk** (Norwegian caramel toffee in a yellow wrapper). Cabin replay-reward treat, tucked in bedside drawer. Collectible only after player has learned `↓` in the kitchen. ~`10×14px`. | TBD per Ch1 content sprint. Suggested reference: a small individually-wrapped caramel toffee candy, yellow foil wrapper, hard pixel edges. |
| `treat-ch01-cleaning-cart.png` | Treat sprite | **TBD — suggested Skillingsboller** (Bergen-style cinnamon bun wrapped in waxed paper, half-eaten). Tucked in the janitor's cleaning cart in the dark corridor. Collectable on a return pass after learning `↓` and float. ~`14×16px`. | TBD per Ch1 content sprint. Suggested reference: a round cinnamon bun in a curl of waxed paper, slightly squashed from the cart, hard pixel edges. |
| `treat-ch01-observation-deck.png` | Treat sprite | **TBD.** A mood-appropriate treat on the observation deck — open-air, aurora overhead, contemplative. Could be a chocolate left by a stargazer, a packet of forgotten sweets, or a small wrapped Norwegian regional candy. ~`12×16px`. | TBD per Ch1 content sprint. |

---

## Chapter 2 — Tallinn

### Cinematics

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-ch02-haldjas-reveal.png` | Cinematic | The Haldjas (Estonian house-spirit) materializes beside Pätu in the ship's lower deck. Sparkles in a corner, gold-amber color. | Pixel art cinematic at 480×270, a ship's lower deck corridor at night, a gray tabby cat sitting in a corner, swirling gold-amber sparkles materializing into a translucent figure beside her, deep crimson carpet, brass fixtures, sea-blue light through a porthole, painterly pixel art, the feeling of a guardian spirit emerging. |
| `cin-ch02-leida-cottage.png` | Cinematic | Leida's wooden cottage exterior, foggy Estonian coast at dusk, geraniums in the window, smoke from the chimney. | Pixel art cinematic at 480×270, a small wooden Estonian coastal cottage at dusk, low-eaved sloped roof, a window full of red geraniums glowing warm against the cool foggy blue, a stone chimney with smoke curling upward, painterly pixel art, foggy birch forest behind, sea blue shadow, single warm window pool. |
| `cin-ch02-lunchbox-memory.png` | Cinematic | Young Leida as a schoolgirl sits on a low wall, opens her tin lunch-pail, holds out a meatball to a thin boy on a cold step beside her. Birches above. Winter coat. | Pixel art cinematic memory at 480×270, two children sitting on a low stone wall outside a wooden Estonian schoolhouse in winter, a small girl in a thick coat holding out a meatball from a tin lunch-pail to a thin boy in a too-light jacket beside her, birch trees with bare branches above them, soft snowy ground, the warmth of a small kindness, golden-amber memory light, painterly pixel art. |
| `cin-ch02-altar-offering.png` | Cinematic | Leida places a wrapped meatball at her path-side altar. Haldjas's sparkles thicken there. Pip and Pätu walking away in the background. | Pixel art cinematic at 480×270, an elderly Estonian woman in a long shawl placing a small wrapped parcel on a flat stone altar with a wooden bowl and faded ribbon, the altar set on a foggy cottage path, gold-amber sparkles thickening around the altar, a small ghost-boy and gray tabby cat walking away in the background, painterly pixel art, the closing of a circle. |
| `cin-ch02-three-doors-spell.png` | Cinematic (reused panel for puzzle UI) | Three folk-tale doors materialize in Leida's cottage. Wood-grain doors that don't fit any architecture. The room fades behind them. Reference the existing `three-doors-demo.html`. | Pixel art cinematic at 480×270, three tall wood-grain folk-tale doors materializing in a fading cottage room, each door with a different region's ornament, the doors don't fit the architecture they're standing in, gold-amber sparkles concentrated at their bases, the cottage details fading slightly behind them, eerie threshold mood, painterly pixel art. Reference: `prototype/three-doors-demo.html`. |

### Rooms

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `room-ch02-ship-lower-deck.png` | Room background | Lower-deck of the Mnemosyne. Narrow, brass-fixtured, deep crimson carpet, sea-blue porthole light. | Pixel art side-scrolling ship lower-deck corridor at 480×270, narrow passage with brass-fixtured walls, deep crimson carpet, sea-blue light through portholes at intervals, baseboards along the wall, atmospheric and dim, painterly pixel art. |
| `room-ch02-tallinn-village.png` | Room background | Foggy Estonian coastal village. Wooden buildings, sloped roofs, smell of birch smoke and fish. | Pixel art side-scrolling Estonian fishing village background at 480×270, fog-bound coastal village at dusk, wooden buildings with sloped roofs, occasional warm windows, a path running through, distant sea visible, painterly pixel art, cool blue base with rare warm pools. |
| `room-ch02-leida-cottage-interior.png` | Room background | Inside Leida's cottage. Wood stove, long pine table, kettle, dried herbs from rafters, geranium window. | Pixel art side-scrolling cottage interior at 480×270, traditional Estonian cottage room, wood-burning stove with kettle, long pine table, dried herbs hanging from low rafters, a window full of red geraniums, warm amber pool from the stove and a hanging oil lamp, deep wood tones, painterly pixel art. |

### Sprites

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `sprite-leida-idle.png` | NPC sprite | Estonian grandmother, widowed, real human. Younger than Henrik but old. Lives alone in cottage. | Pixel art elderly Estonian woman sprite, ~24×40 pixels, headscarf, long shawl over a dark dress, weathered kind face, hands worn from years of cooking, slight smile, hard pixel edges. |
| `sprite-haldjas-shimmer.png` | NPC sprite (animated) | Estonian house-spirit. Sparkles in a corner — gold-amber color, distinct from Pip's cool white. Sometimes coalesces into a vague guardian figure. | Pixel art Estonian house-spirit, swirling gold-amber sparkles `#ffe088`, sometimes coalescing into the vague suggestion of a tall thin figure with kind eyes, distinct from a pure-white ghost, warmth without solidity, hard pixel edges, 4-frame shimmer animation. |
| `sprite-patu-idle.png` | NPC sprite (recurring across many chapters) | Gray stray tabby cat. Real, alive. ~28-36 pixels. Lives on the Mnemosyne. Estonian name (PAH-too). | Pixel art gray tabby stray cat sprite, ~28-36 pixels long, lean and alert, intelligent eyes, slightly scuffed coat, hard pixel edges, multiple poses: sitting, walking, hissing, head-butting. |
| `sprite-patu-walk.png` | NPC sprite animation | Pätu walking. 4-frame cycle. | Pixel art walk cycle for a gray tabby stray cat, 4 frames profile, ~32 pixels long, fluid feline motion, tail movement, hard pixel edges. |
| `sprite-patu-hiss.png` | NPC sprite (key moment) | Pätu's fluffed-up hiss — used when bad things are near. Used canonically against bad ghosts in a later chapter. | Pixel art gray tabby stray cat in fluffed-up hissing pose, fur on end, arched back, mouth open in hiss, intense eyes, hard pixel edges. |
| `sprite-three-doors-figures.png` | NPC sprite set | The three figures behind the doors: sweet little girl, starving old woman, healthy man. Plus their devil-reveals. (Five distinct sprites or one combined sheet.) | Pixel art sprite sheet of three folk-tale figures and their dark reveals: (1) sweet little girl with braids and innocent face / same girl with red devil-eye glow and unsettling teeth, (2) starving old woman bent and tired / same woman unfolding into a gray tabby cat, (3) healthy man in clean clothes / same man with red devil-eye glow and predatory composure, all ~24×40 pixels, hard pixel edges. |

### Echo-creatures

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `echo-mouse-ch02.png` | Echo-creature | Mice scurrying along baseboards in the lower-deck traversal. | (Reuse `echo-mouse.png` from Chapter 1; tag as ch02-confirmed.) |

---

## Chapter 3 — Southampton

### Cinematics

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-ch03-man-from-sea.png` | Cinematic | A ghost-translucent man (Sandy) walks out of the sea carrying groceries up the dock. Pip and Pätu watch. | Pixel art cinematic at 480×270, a translucent Scottish man with kind brash energy walking out of the dark sea up onto a slate-blue dock at night, carrying a bag of groceries, completely unbothered, a small ghost-boy and a gray cat watching him from the shadows, cool damp dockyard, single streetlamp throwing a warm amber pool, painterly pixel art. |
| `cin-ch03-black-shuck.png` | Cinematic | The Black Shuck blocks the path. Massive black dog, glowing eyes, folkloric omen presence. Not malevolent — hungry. | Pixel art cinematic at 480×270, a massive shaggy black dog standing in the middle of a narrow dockyard road at night, glowing amber eyes, dense black fur slightly translucent at the edges, a folkloric omen-creature, dense shadow around him, single streetlamp behind throwing him into silhouette, atmospheric and dread-tinged but not malevolent, painterly pixel art. |
| `cin-ch03-dundee-kitchen.png` | Cinematic | Wide shot of the Dundee family kitchen at full chaos: long pine table, family of 7+ eating curry, Sandy presiding, laughter, warm yellow walls. | Pixel art cinematic wide shot at 480×270, a warm chaotic English family kitchen at evening, long pine table with seven family members eating curry plates, an older Scottish ghost-translucent man at the head laughing, a French couple as guests, yellow-warm walls, range cooker, the warmest pool on a cool-blue street outside, painterly pixel art, full-house energy. |
| `cin-ch03-taste-through-sandy-eyes.png` | Cinematic | Pip briefly sees through Sandy's POV: looking out at the family from the head of the table. Being the one who feeds them. | Pixel art cinematic at 480×270, a point-of-view shot from the head of a long family dinner table looking out at six laughing family members eating, warm steamy curry plates, the visual sense of being the one holding the table together, slight overlay shift to indicate POV shift, painterly pixel art, deep emotional warmth. |
| `cin-ch03-dedication-card.png` | Cinematic (text card) | Quiet text card: *In memory of Sandy Duncan and his wife Caitlin and children Robert, Archie, Max, Gus, and Bibi.* Fades over Pip walking away on the cool blue street. | Pixel art cinematic at 480×270, a cool-blue Southampton street at night with a small ghost-boy walking away from the camera toward a distant ship, a warm Dundee house glowing behind him, the image held quietly, room for a single line of cream-white typewritten text to fade in over the bottom third of the frame, painterly pixel art, quiet end-of-chapter mood. |

### Rooms

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `room-ch03-mnemosyne-corridor.png` | Room background | Lower-deck corridor with echo-fish drifting (cod, haddock, plaice) — warm-amber against cool blue. | Pixel art side-scrolling ship corridor background at 480×270, lower-deck Mnemosyne, deep crimson carpet, brass fixtures, warm-amber translucent ghost-fish drifting through the corridor air (cod, haddock, plaice), they school near porthole windows, cool sea-blue base palette with rare warm pools, painterly pixel art. |
| `room-ch03-southampton-dockyard.png` | Room background | Slate-blue damp dockyard at night. Cranes, single streetlamp, moored boats, Edie's wine shop on the pier. | Pixel art side-scrolling dockyard background at 480×270, Southampton at night, slate-blue and damp, harbor cranes silhouetted, moored boats, a small wine shop on the pier with a warm window, a single streetlamp throwing a warm-amber pool, teal-green sea-shadow accent, painterly pixel art. |
| `room-ch03-bevois-street.png` | Room background | Residential street rising from docks. Echo-deer crossing. Dundee house midway up — white, big windows pouring amber. | Pixel art side-scrolling English residential street at 480×270, narrow road climbing from a harbor, terraced houses, one white house midway up with big warm windows glowing amber against cool blue night, translucent ghost-deer crossing at intervals, painterly pixel art. |
| `room-ch03-dundee-kitchen.png` | Room background | Yellow-warm Dundee kitchen. Long pine table, range, spices, Sandy's traces. | Pixel art side-scrolling kitchen background at 480×270, warm yellow English family kitchen, long pine table seating nine, range cooker, spice jars on a shelf, a YoYo Games hoodie on a chair, a worn cookbook on the counter with handwriting, a child's drawing of a dragon on the fridge, the photograph on the fridge visible but not zoomed-in, lived-in warmth, painterly pixel art. |

### Sprites

Sandy, Caitlin, Robert, Archie, Max, Gus, Bibi, Edie, Michel, Michel's wife, the Black Shuck. (Per chapter cast description in `chapter-specs/ch03-southampton-outline.md`.)

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `sprite-sandy-idle.png` | NPC sprite | Scottish ghost, brash, brighter than Pip's cool-white. | Pixel art Scottish ghost-translucent man sprite, ~24×42 pixels, brash brighter ghost-glow, weathered jovial face, hair messy, casual clothing, owns the room he's in, hard pixel edges. |
| `sprite-caitlin-idle.png` | NPC sprite | Pixie haircut, short blond hair, at the range, in motion. | Pixel art middle-aged English woman sprite, ~24×40 pixels, short blond pixie haircut, kitchen apron, in motion at a cooker, the household's center of gravity, hard pixel edges. |
| `sprite-dundee-children.png` | NPC sprite set | Robert (tall, muscular), Archie (tall, skinny, quieter), Max & Gus (slightly shorter, brown hair), Bibi (younger, long light brown hair). | Pixel art sprite sheet of five adult-and-young-adult siblings: a tall muscular brown-haired man, a tall skinny brown-haired man, two slightly shorter brown-haired men, a young girl about 12 with long light brown hair, all ~24×40 pixels, family resemblance, hard pixel edges. |
| `sprite-edie-idle.png` | NPC sprite | Old Cockney ghost, runs a pier wine shop. Apron, headscarf, brass-buttoned cardigan, wet hands. | Pixel art elderly Cockney ghost-translucent woman sprite, ~24×40 pixels, apron, headscarf, brass-buttoned cardigan, hands wet from working with bottles, warm presence, hard pixel edges. |
| `sprite-black-shuck.png` | Monster sprite | Massive black dog. Folkloric, omen, hungry not malevolent. | Pixel art massive shaggy black dog monster sprite, ~48×40 pixels, glowing amber eyes, dense black fur, omen-presence, feels heavy and ancient, hard pixel edges. |

### Echo-creatures

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `echo-fish-cod.png` | Echo-creature | Atlantic cod, translucent warm-amber, drift in schools. | Pixel art ghost-fish sprite, Atlantic cod silhouette, ~28–33 pixels long (door-fraction 0.25–0.30, visible echo-creature tier), translucent warm-amber `#ffc868`, hard pixel edges, drifting pose. |
| `echo-fish-haddock.png` | Echo-creature | Haddock variant. | Pixel art ghost-fish sprite, haddock silhouette, ~28–33 pixels long (door-fraction 0.25–0.30, visible echo-creature tier), translucent warm-amber, hard pixel edges. |
| `echo-fish-plaice.png` | Echo-creature | Plaice variant — flat fish. | Pixel art ghost-fish sprite, plaice silhouette flat fish shape, ~28–33 pixels long (door-fraction 0.25–0.30, visible echo-creature tier), translucent warm-amber, hard pixel edges. |
| `echo-deer.png` | Echo-creature | Echo-deer crossing Bevois Street. | Pixel art ghost-deer sprite, ~40–44 pixels tall (door-fraction 0.35–0.40, visible echo-creature tier), translucent warm-amber with cooler edges, walking pose, hard pixel edges. |

---

## Chapter 4 — Istanbul

### Cinematics

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-ch04-stray-cat-alley.png` | Cinematic | Pip and Pätu enter a foggy Istanbul alley at night. Echo-cats drift through (warm-amber, translucent). Pätu spooks. | Pixel art cinematic at 480×270, a narrow foggy Istanbul stepped alley at winter night, slate-blue and damp, warm-amber translucent ghost-cats drifting through the alley air, a small ghost-boy and a gray tabby cat at the entrance, the live cat fluffed and spooked, ember-red accent in distant doorways, İznik tile-blue fountain glimpse, painterly pixel art. |
| `cin-ch04-karakoncolos.png` | Cinematic | The Karakoncolos in the square — Turkish winter-spirit. Cloak-like shadowy figure, hollow-faced, breath visible. Cold inverse-warmth. | Pixel art cinematic at 480×270, a Turkish square at winter night, a tall shadowy cloak-like winter-spirit (Karakoncolos) in the center, hollow-faced beneath a deep hood, breath visible in the cold air, the figure feels cold-as-inverse-warmth, dense shadow around him, distant balcony lights, painterly pixel art, atmospheric dread without malevolence. |
| `cin-ch04-thaw-patu.png` | Cinematic | Pip reaches frozen Pätu in the center of the square, candle flame touches her fur, the frost melts. Pätu turns and charges. | Pixel art cinematic at 480×270, a small ghost-boy kneeling in a snowy Istanbul square, a frosted gray tabby cat unfreezing as a warm candle flame touches her fur, ice crystals melting visibly, the moment of revival, single warm candle pool against deep cold blue, painterly pixel art. |
| `cin-ch04-orchard-memory.png` | Cinematic | Two boys (Muhittin and Omer as children) testing walnuts with thumbnails in their grandmother's orchard. She gathers them both against her. Golden afternoon. Warm. Single register. | Pixel art cinematic at 480×270, a memory of a golden Turkish orchard afternoon, two boys around 8 and 10 sitting on the ground each cracking walnuts with their thumbnails, an elderly Turkish grandmother in a long dress gathering them both against her, golden warm light filtering through walnut tree leaves, deep warmth, painterly pixel art, single tonal register of love. |
| `cin-ch04-henrik-photograph.png` | Cinematic | Pip catches Henrik looking at a photograph in his quarters. Henrik doesn't see Pip. Pip chooses not to ask. Henrietta's textures begin to surface in dialogue afterward. | Pixel art cinematic at 480×270, a small ghost-boy peeking through a partially open cabin door, an older man with gray beard (Henrik) sitting on a bunk holding a small framed photograph, his back partially to camera, single dim warm lamp, melancholy tenderness, the player understands without being told, painterly pixel art. |

### Rooms

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `room-ch04-istanbul-alley.png` | Room background | Narrow stepped Istanbul alley. Echo-cats drift. İznik tile, ember-red braziers. | Pixel art side-scrolling Turkish alley background at 480×270, narrow stepped stone passage climbing from a harbor, foggy winter night, İznik tile-blue accents on fountains and doorways, ember-red brazier glows in roadside niches, warm-amber translucent ghost-cats drifting, painterly pixel art, real Istanbul flavor outside of time. |
| `room-ch04-istanbul-square.png` | Room background | A small square where the Karakoncolos waits. Snow. A frozen Pätu in the center. Wind. Cold. | Pixel art side-scrolling Turkish square background at 480×270, light snowfall, deep cold, the wind visible in drifting snowflakes, surrounding buildings with rare warm windows, a frozen gray cat statue-like in the center, dense shadow at the edges, painterly pixel art. |
| `room-ch04-muhittin-kitchen.png` | Room background | Muhittin's warm Turkish kitchen. Wood-fired oven, hanging spices, copper pots, woodsmoke. | Pixel art side-scrolling Turkish home kitchen background at 480×270, warmth pouring from a wood-fired oven, charred peppers on a counter, hanging copper pots, bunches of herbs and dried chilies, a counter with a mortar and pestle, woodsmoke softening the air, Pätu curled by the oven, single warm amber light source, painterly pixel art. |

### Sprites

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `sprite-karakoncolos.png` | Monster sprite | Cloak-like winter-spirit. Hollow-faced, breath visible in cold, the inverse of warmth. | Pixel art Karakoncolos monster sprite, ~40×56 pixels, tall cloak-like figure, hollow shadow beneath deep hood, frost emanating from his form, breath visible, the visual inverse of warmth, hard pixel edges, painterly. |
| `sprite-muhittin-idle.png` | NPC sprite | Young Turkish man, late twenties. Warm, curious, easy. | Pixel art young Turkish man sprite, ~24×40 pixels, late twenties, warm casual clothes (sweater, apron), kind features, slight smile, hard pixel edges. |
| `sprite-omer-idle.png` | NPC sprite | Muhittin's brother. Brief, warm. | Pixel art young Turkish man sprite, ~24×40 pixels, athletic build, just back from tennis, warm casual clothes, family resemblance to Muhittin, hard pixel edges. |
| `sprite-brian-idle.png` | NPC sprite | Omer's American friend. Brief, warm. | Pixel art young American man sprite, ~24×40 pixels, tennis casual clothes, friendly easy expression, hard pixel edges. |

### Echo-creatures

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `echo-cat.png` | Echo-creature | Stray Istanbul cats in ghost form. Translucent warm-amber. Pätu was one of these once (implied). | Pixel art ghost-cat sprite, ~22–24 pixels tall (door-fraction 0.20–0.22, visible echo-creature tier), translucent warm-amber, multiple poses (sitting, walking, sleeping), various coat patterns suggested, hard pixel edges. |

---

## Chapter 5 — Saldanha Bay (Midpoint)

### Cinematics

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-ch05-iris-emergence.png` | Cinematic (animated, squeeze-and-pop) | Iris squeezes up through the floorboards of a lower-deck storage room. Dripping seawater. Edwardian dress. Hair slick to face. | Pixel art cinematic at 480×270, a ship's lower-deck storage room at night, an Edwardian girl about 10-11 squeezing up through aged floorboards, dripping seawater, long hair plastered to her face, a dark high-collar mourning-blue or burgundy dress with sash, the moment of impossible emergence, painterly pixel art, the unsettling wrongness of it, slight green-blue underwater glow around her. |
| `cin-ch05-iris-family-dinner.png` | Cinematic (chapter's biggest) | Iris's family at dinner in their Edwardian home. Loud dining room, white tablecloths, many faces, warm-amber light. Pip is gifting this memory. | Pixel art cinematic at 480×270, a large Edwardian English dining room, a long white-clothed table seating ten people in period dress, candelabras and warm amber chandelier light, a young girl (Iris) seated between her father and brother, the room loud with conversation and clinking silver, full warmth recovered, painterly pixel art, the chapter's most generous warmth. |
| `cin-ch05-mamlambo-porthole.png` | Cinematic | The Mamlambo's eye visible at the porthole. Massive body coiling against hull. Blood-iron color. Brain-sucker variant. | Pixel art cinematic at 480×270, a ship's lower-deck storage room with a circular porthole window, a massive serpent eye the size of a dinner plate visible at the porthole, blood-iron color `#7a1418`, the suggestion of a vast coiling body in the dark sea beyond, intelligent malice, painterly pixel art, gentle horror not gore. |
| `cin-ch05-potjie-memory.png` | Cinematic | Johannes's parents tend a black potjie pot on three legs in a South African veld. Young couple. Child watching from nearby. Sunset fire. | Pixel art cinematic at 480×270, a memory of a South African veld clearing at sunset, a young couple in worn farm clothes tending a black cast-iron three-legged potjie pot over a wood fire, a small boy watching from beside them with deep curiosity and love, golden hour light, vast horizon, painterly pixel art, the *shape* of the climactic pierogi memory rehearsed early. |
| `cin-ch05-iris-departure.png` | Cinematic | Iris walks toward her family's dining room. Her father holds out his arm. She does not look back at Pip. Light dims around her as she sits. | Pixel art cinematic at 480×270, a young Edwardian girl walking away from camera toward a warm dining table where her family awaits her, her father with an outstretched arm in welcome, the surrounding storage room dimming, the family scene brightening, painterly pixel art, departure as homecoming. |

### Rooms

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `room-ch05-storage-room.png` | Room background | Ordinary lower-deck storage room. Crates, lantern, coiled rope, tin cup. Old floorboards. Porthole. | Pixel art side-scrolling ship lower-deck storage room at 480×270, ordinary maritime storage with wooden crates, a hanging metal lantern, coils of rope, a battered tin cup, aged dark floorboards, a single circular porthole window, dim single warm amber light, painterly pixel art. |
| `room-ch05-saldanha-courtyard.png` | Room background | Johannes's outdoor courtyard with potjie fire. Vine-shaded, dusty, warm. Saldanha Bay sky. | Pixel art side-scrolling South African courtyard at 480×270, a dusty Saldanha Bay courtyard at dusk, a wood fire under a black cast-iron potjie pot, vine-shaded pergola, mud-brick walls, the smell of meat and rooibos in the air, single warm fire pool against soft purple Karoo dusk, painterly pixel art. |
| `room-ch05-mnemosyne-kitchen.png` | Room background | (Reuse `room-ch01-kitchen.png` from Chapter 1; tag as ch05-confirmed.) | (Reuse) |

### Sprites

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `sprite-iris-wet.png` | NPC sprite | Edwardian girl, ~10-11. Wet, dripping seawater, hair slick. Mourning-blue or burgundy dress. | Pixel art Edwardian girl ghost sprite, ~22×36 pixels, age 10-11, long wet hair plastered to face, high-collar dark mourning-blue dress with sash, boots, dripping seawater, slight green-blue underwater glow, hard pixel edges. |
| `sprite-iris-dry.png` | NPC sprite | Iris after the shake-dry. Same dress (water gone), but the wallpaper-pattern stays. | Pixel art Edwardian girl ghost sprite, dry version, ~22×36 pixels, same dress and silhouette but no water visible, slightly translucent with a faint green-blue underwater rim-glow, hard pixel edges. |
| `sprite-iris-form-blur.png` | NPC sprite (key reveal) | Iris's translucent tell — strongly transparent, wallpaper visible through her. The moment Pip realizes she's a ghost. | Pixel art Edwardian girl ghost in maximum-translucency state, the wallpaper pattern visible through her body, the silhouette holding but only barely, ~22×36 pixels, the reveal that she is a ghost, painterly pixel art. |
| `sprite-mamlambo.png` | Monster sprite | Massive water-serpent. Eye at porthole. Blood-iron color signature. | Pixel art massive water-serpent monster, blood-iron color `#7a1418`, intelligent eye the size of a dinner plate, coiling body suggested across multiple frames, brain-sucker variant, gentle-horror register, painterly pixel art, multiple poses for porthole visibility. |
| `sprite-johannes-idle.png` | NPC sprite | Older Afrikaner. Jolly, chaotic, bearded. Sings while cooking. Forgetful. | Pixel art older Afrikaner chef sprite, ~26×42 pixels, gray-flecked dark beard, sun-weathered face, work apron over a faded shirt, slightly disheveled, warm jolly presence, hard pixel edges. |
| `sprite-switchblade.png` | Object sprite | Iris's father's switchblade. Mother-of-pearl handle. Edwardian make. | Pixel art Edwardian switchblade, mother-of-pearl handle with subtle iridescent sheen, small folding steel blade, ~14×6 pixels closed, ~22×6 open, hard pixel edges, multiple states. |

### Echo-creatures

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `echo-rat.png` | Echo-creature | Lower-deck rats in ghost form for the wordless traversal. | Pixel art ghost-rat sprite, ~16 pixels, translucent warm-amber, scurrying pose, faint glow trail, hard pixel edges. |

---

## Chapters 6 & 7 — Indonesia & Brazil (TBD)

These chapters' specific cities, recipes, folkloric figures, and chefs are still open per `06-roadmap-and-open-questions.md`. Once the outlines are written, this section will be filled in following the patterns above. Placeholder slots:

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-ch06-traversal-opening.png` | Cinematic | TBD when chapter is outlined. | TBD |
| `cin-ch06-monster-encounter.png` | Cinematic | TBD — monster keyed to Indonesian folklore (Pocong currently sketched as candidate, draws on Ch2 lunchbox memory per Decisions Log). | TBD |
| `cin-ch06-meal-memory.png` | Cinematic | TBD when chapter is outlined. | TBD |
| `room-ch06-port.png` | Room background | TBD Indonesian port. | TBD |
| `room-ch06-chef-kitchen.png` | Room background | TBD chef's kitchen. | TBD |
| `cin-ch07-traversal-opening.png` | Cinematic | TBD when Brazilian chapter is outlined. | TBD |
| `cin-ch07-monster-encounter.png` | Cinematic | TBD Brazilian folkloric figure. | TBD |
| `cin-ch07-meal-memory.png` | Cinematic | TBD. | TBD |
| `room-ch07-port.png` | Room background | TBD Brazilian port. | TBD |
| `room-ch07-chef-kitchen.png` | Room background | TBD. | TBD |

**Ship-side subplot art (Ch6 or Ch7 — TBD assignment):**

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-erik-birthday.png` | Cinematic | Henrik withdrawn for the day. Pip witnesses Erik's annual return. Quiet, devastating. | Pixel art cinematic at 480×270, a quiet ship's deck at evening, Henrik standing at the rail looking out to sea, a faint translucent boy (Erik) standing beside him visible to the player but possibly not to Henrik, the held breath of an annual ritual, painterly pixel art. |
| `cin-henrik-photo-reveal.png` | Cinematic | Pip earns access to Henrik's quarters. Finds Erik's photograph and the lefse/gravlaks recipe. Realizes Henrik has been feeding Pip Erik's favorite meal since Ch1. | Pixel art cinematic at 480×270, a small ghost-boy in Henrik's locked quarters, holding a framed photograph of a 12-year-old boy with a familiar face (Erik), beside the photo a worn recipe card for lefse and gravlaks, single dim lamp, the moment of devastating recognition, painterly pixel art. |

---

## Chapter 8 — Greenpoint (Finale)

The climax is heavily cinematic. Many of the "memories" the shadow plays are sped-up versions of earlier cinematics (no new art needed — per `03-art-and-aesthetic.md`, only the speed-up). The new art needed is the kitchen, the shadow itself, and the resolution.

### Cinematics

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `cin-ch08-greenpoint-kitchen.png` | Cinematic | Pip's grandmother's kitchen in Greenpoint, Brooklyn. Warm, Polish, ordinary. Where the climax happens. | Pixel art cinematic at 480×270, an ordinary Polish-American Brooklyn kitchen at night, formica counter, white-painted cabinets, a small wooden table with a vinyl tablecloth, a single warm pendant light, a small ghost-boy standing in the doorway, lived-in domestic warmth, painterly pixel art. |
| `cin-ch08-shadow-form.png` | Cinematic (heavy animation) | The shadow. Knotted black wires that won't stay knotted. Inside the shape: memories playing on TV channels, the recurring channel is the melting mirror face (Ch1 Cinematic 2, reused). | Pixel art cinematic at 480×270, a shifting shadow-form made of knotted black wires that animate constantly, the wires won't stay tied, inside the shape memories play like TV static channels, the most recurring channel is a melting boy's face, blood-iron `#7a1418` undertones at the edges, dread without cruelty, painterly pixel art. |
| `cin-ch08-anger-beat.png` | Cinematic | Pip's one allowed beat of anger: *"It's not fair. I was just a boy."* The shadow gives him permission. | Pixel art cinematic at 480×270, a small ghost-boy with his fists clenched, his glow flaring briefly in anger and grief, the shadow-form softening slightly to allow the moment, single warm kitchen pendant light, painterly pixel art, the held breath of a child's righteous anger. |
| `cin-ch08-pierogi-dinner.png` | Cinematic (climax-load-bearing — the bottom of the well) | The pierogi dinner with all six chairs filled. Pip's parents, grandparents, and Pip-as-a-young-child. His earliest memory. The final override. | Pixel art cinematic at 480×270, a memory of a Polish-American family dinner around a small table with six chairs filled: father, mother, grandfather, grandmother, a younger and older child (one of them a younger Pip), pierogi on plates, warm pendant light, golden domestic warmth, the earliest happiest memory, painterly pixel art, deep emotional weight without sentimentality. |
| `cin-ch08-veil-opens.png` | Cinematic | The veil opens. Pip's parents come through. Henrietta and Erik come through (for Henrik, who arrives in the falling action). | Pixel art cinematic at 480×270, a soft golden tear in the air of a Brooklyn kitchen, figures stepping through it: Pip's parents in early-thirties form, behind them Henrietta and a 12-year-old Erik (his face now fully visible — the recognition lands), painterly pixel art, the gut-punch warmth of arrival. |
| `cin-ch08-babcia-tastes-pierogi.png` | Cinematic | Babcia at her kitchen table in Greenpoint. She tastes pierogi on the air. She weeps and smiles. May whisper *"Filipek?"* | Pixel art cinematic at 480×270, an elderly Polish woman alone at a small kitchen table at evening, hands cupped around a cup of tea, eyes closed in tasting, a tear on her cheek and a small smile, the wordless knowing of a grandmother's love crossing the veil, painterly pixel art. |
| `cin-ch08-pip-departure.png` | Cinematic | Pip walks through with his parents. The final image. *"Mmmm. That was a perfect last bite."* | Pixel art cinematic at 480×270, a small ghost-boy walking through a soft golden veil with his parents on either side, his glow warming and softening, the Brooklyn kitchen receding behind him into peaceful blue, painterly pixel art, the held-breath ending, deep warmth. |

### Rooms

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `room-ch08-greenpoint-kitchen.png` | Room background | Pip's grandmother's kitchen. The climactic setting. | Pixel art side-scrolling Polish-American Brooklyn kitchen at 480×270, formica counter, white cabinets, small wooden table with vinyl tablecloth, framed photographs on the wall, a kettle on the stove, a single warm pendant light, lived-in love in every detail, painterly pixel art. |
| `room-ch08-greenpoint-street.png` | Room background | Approach to Pip's home. Polish bakery, a church, ordinary Brooklyn block at night. | Pixel art side-scrolling Brooklyn residential street at 480×270, brick row houses, a Polish bakery with warm windows, a small church silhouetted, the ordinary holiness of a neighborhood at night, painterly pixel art. |

---

## Inter-chapter porthole transitions

Per the bible: between every two consecutive chapters, a brief 2–3 second cinematic of the view through a porthole as *The Mnemosyne* travels to the next port. Each transition is unique — a different sea, a different sky, a different time of day. **Seven transitions** (one between each pair of consecutive chapters).

| Filename | Type | Description | AI prompt |
|---|---|---|---|
| `porthole-ch01-to-ch02.png` | Porthole transition | Norway → Estonia. Cold Baltic, dawn. | Pixel art porthole view at 480×270, framed by an ornate brass porthole rim, looking out at the cold blue-gray Baltic Sea at dawn, distant coast just visible, a single seagull, painterly pixel art. |
| `porthole-ch02-to-ch03.png` | Porthole transition | Estonia → England. Foggy North Sea, gray noon. | Pixel art porthole view at 480×270, brass porthole rim, foggy gray North Sea, distant shipping lanes, slate-blue light, painterly pixel art. |
| `porthole-ch03-to-ch04.png` | Porthole transition | England → Türkiye. Mediterranean dusk. | Pixel art porthole view at 480×270, brass porthole rim, deep Mediterranean dusk, warm sun on the horizon over dark water, painterly pixel art. |
| `porthole-ch04-to-ch05.png` | Porthole transition | Türkiye → South Africa. Through Suez at midday. | Pixel art porthole view at 480×270, brass porthole rim, dazzling midday sun on an open ocean, very deep blue water, painterly pixel art. |
| `porthole-ch05-to-ch06.png` | Porthole transition | South Africa → Indonesia. Indian Ocean night with phosphorescence. | Pixel art porthole view at 480×270, brass porthole rim, deep tropical night ocean with subtle green phosphorescence in the wake, vast Indian Ocean, painterly pixel art. |
| `porthole-ch06-to-ch07.png` | Porthole transition | Indonesia → Brazil. Pacific crossing, sunset. | Pixel art porthole view at 480×270, brass porthole rim, vast Pacific Ocean at sunset, deep orange-purple sky, painterly pixel art. |
| `porthole-ch07-to-ch08.png` | Porthole transition | Brazil → New York. Atlantic dawn approaching the harbor. | Pixel art porthole view at 480×270, brass porthole rim, gray-pink Atlantic dawn, the New York harbor lights just visible at the horizon, painterly pixel art, the held breath before homecoming. |

---

## Total piece count (target inventory)

- **Cinematics:** 9 (Ch1) + 5 (Ch2) + 5 (Ch3) + 5 (Ch4) + 5 (Ch5) + 2 (ship-side, Ch6/7) + 3-5 (Ch6) + 3-5 (Ch7) + 7 (Ch8) = **~55 cinematics**
- **Room backgrounds:** 6 (Ch1, incl. observation deck) + 3 (Ch2) + 4 (Ch3) + 3 (Ch4) + 3 (Ch5) + 2 (Ch6) + 2 (Ch7) + 2 (Ch8) = **~25 rooms**
- **Pip sprites:** 5 animation/pose variants = **~5 sprite sets**
- **NPC sprites:** ~30 distinct characters across all chapters
- **Echo-creatures:** ~8 distinct types
- **UI elements:** ~8 ornaments, icons, and sparkle types (incl. new collect aura)
- **Treat sprites:** 4 (Ch1) + TBD per chapter = growing total
- **Porthole transitions:** **7**

**Grand total: roughly 135+ distinct art pieces** for the full 8-chapter game. Plan accordingly. Chapter 1 alone is ~30 pieces (+ 4 treat sprites), which is what makes Stage 3 in the roadmap meaningful.

---

## Final reminders

1. **Don't generate all of these.** Start with the cinematics that hit hardest emotionally — Cinematic 2 (mirror), Cinematic 6b (Erik), Cinematic 8 (offer) for Ch1, plus the iconic monster shots from later chapters. Use those to find an artist or a workflow.
2. **Consistency is the project's hardest problem.** If you do go down the AI route, lock a style reference image early and pass it to every prompt. Otherwise Pip will look like ten different boys.
3. **Erik's face in Cinematic 6b is load-bearing.** Per the docs, his face must be partially hidden — recognizable on Ch4 photograph reveal, not before. AI tools won't naturally do this; you'll have to direct it carefully (turn, profile, shadow, hand).
4. **The melting-mirror image is reused at the climax.** Whatever you generate for `cin-02-mirror.png` will also be reused (sped up) inside the shadow. Plan once, use twice.
5. **Tone reminder:** gentle horror, never cruel. If a generation reads as gory, scary-for-its-own-sake, or mean, reject it. The whole game's emotional contract depends on this.
