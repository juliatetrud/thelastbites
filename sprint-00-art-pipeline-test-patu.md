# Sprint 00: Art Pipeline Test — Pätu

## Goal

Validate the AI-generated art pipeline (tool selection, prompting workflow, style consistency across poses) by producing four candidate sprites of Pätu the cat — sitting, walking, hissing, sleeping — that share a single visual identity.

This sprint is the project's first art experiment. The outcome is not a final Pätu. The outcome is a workflow we trust, plus a locked Pätu style reference we can return to in every subsequent chapter she appears in.

## Definition of done

- A primary AI image tool has been selected (Midjourney recommended; Gemini/Imagen acceptable fallback).
- A locked style reference image exists for Pätu — one image, saved, that becomes the seed/reference for every future Pätu generation.
- Four pose generations exist that visibly share that style: sitting, walking, hissing, sleeping.
- Each generation has been judged against the four-rule consistency check (coat pattern matches, eye color matches, body proportions match, line/edge style matches).
- A short pipeline retro note exists answering: what worked, what didn't, would we use the same tool for Pip cinematics, and any prompt-tuning lessons.
- The locked style reference and the four poses are saved with the project naming convention.

## Context from design docs

From `01-story-bible.md` — *Pätu the Cat*:

> A small living anchor in a haunted setting. The ship is full of ghosts and echoes; Pätu is a reminder that life still happens here. She is also a participant — she investigates with Pip, senses things, and has an in-game function as a soft hint-giver and as a good judge of character.
>
> Status: Alive. Real. Recurring NPC across many chapters. A free cat — she belongs to no one. Pronounced PAH-too.
>
> Backstory: Pätu was born a stray. Leida (the Estonian grandmother in Chapter 2) found her as a freezing kitten, alone, and nursed her back to health. Pätu grew up partly in Leida's cottage, partly outside.

From `03-art-and-aesthetic.md` — *Forward Reference: Pätu the Cat*:

> Estonian cat — pattern TBD, but visually distinct from a stray (she has been cared for by Leida). Gray tabby or tortoiseshell both possible.
>
> Eyes are yellow and catch warm pool-lights distinctly against the cool-base palette — they should pop.
>
> Across chapters: she chooses to come aboard, comes and goes freely. Sprite needs sitting-pose, walking-pose, hissing-pose (for moments when Pätu reads something as wrong), and sleeping-pose variations.
>
> Hissing pose is structurally important — it's a hint to the player that something is wrong. The pose should be unmistakable: arched back, ears flat, fur raised, eyes wide with whites visible.

From `art-asset-list.md` — *Pätu sprite specs*:

> `sprite-patu-idle.png`: Gray stray tabby cat. Real, alive. ~28-36 pixels. Lives on the Mnemosyne. Lean and alert, intelligent eyes, slightly scuffed coat.
>
> Universal style block (prepend to every prompt): Pixel art, 480×270 resolution, hard pixel edges, no anti-aliasing, no sub-pixel detail. 7th Guest meets Hyper Light Drifter aesthetic. Deep velvety blacks, single warm-amber light source per scene, ornate Victorian/baroque detail, painterly atmosphere. Moonlit-blue base palette: deep blues `#1c2858`, `#0e1a3a`, warm-amber pools `#ffc868`, `#c87830`. Subtle film grain. Strong vignette.

**Pipeline decision (from this conversation):** Per discussion, the recommended pipeline is Midjourney for stills + image-to-video (Runway or Kling) for memory animations + code-driven ambient motion. Gemini/Imagen acceptable if staying in Google ecosystem. This sprint validates the still-image half of that pipeline.

**Background rule (from Gem instructions, also new):** Sprites (Pätu) are *components* — transparent background, isolated subject, no environment, no ground shadow.

**Resolved before generation:** Pätu is canonically a **gray tabby** (not tortoiseshell). Chosen for clearer silhouette and easier consistency across generations — tortoiseshell patterning is harder for AI tools to keep stable across poses.

## Implementation notes

This is an art sprint, not a code sprint. No game code is written.

**Workflow:**

1. Pick the tool. Midjourney is the recommended starting point because `--cref` and `--sref` give the best character/style consistency across generations. If Midjourney is unavailable or too friction-y, fall back to Gemini/Imagen — accept that consistency will be looser.

2. Generate the **style anchor first**. The first generation is a *sitting* Pätu, three-quarter view. Iterate the prompt until one image lands that captures: gray tabby coat with readable stripe pattern, yellow eyes that catch light, lean alert posture, scuffed-but-cared-for vibe, the right mood. This image becomes the locked reference.

3. Generate the **three remaining poses** using the locked sitting image as the style/character reference (Midjourney `--cref` or equivalent). Walking, hissing, sleeping.

4. **Consistency check.** For each new pose, verify against the locked anchor:
   - Coat color and stripe pattern read as the same cat
   - Eye color matches (yellow, same shade)
   - Body proportions match (head size, leg length, tail length all in the same ballpark)
   - Line/edge style matches (same pixel density, same level of detail, same painterly-or-crunchy register)
   
   If a pose fails the check, re-roll with prompt adjustments rather than accepting drift. Drift compounds — if Pätu drifts in pose 2, pose 3 will drift further from the original.

5. **The hissing pose deserves extra care.** It's structurally important to gameplay (signals bad ghosts) and must read unmistakably from a glance. Arched back, ears flat, fur raised, eyes wide with whites visible, mouth open. If the AI keeps producing a stylized hiss that doesn't read clearly, prompt explicitly for "fluffed-up arched-back hissing pose, fur visibly on end, ears pinned flat against the head, mouth open, whites of eyes visible." A poorly-readable hiss breaks a gameplay system.

**Starter prompts (paste these into the Gem first to refine, then into the image tool):**

*Sitting (the anchor):*

> Pixel art sprite of a gray tabby cat, ~32 pixels tall, sitting in three-quarter view facing left, lean and alert, intelligent yellow eyes that catch warm amber light, slightly scuffed coat with clear tabby stripes, tail wrapped around feet, ears up and attentive, isolated subject on fully transparent background, no environment, no ground shadow, no backdrop, hard pixel edges, no anti-aliasing, painterly pixel art in the style of Owlboy and Hyper Light Drifter, atmospheric but the subject is alone on transparent.

*Walking (use sitting as reference):*

> Same gray tabby cat, walk cycle pose, profile view facing left, tail held in mid-flick, one front paw lifted mid-step, fluid feline motion, intelligent yellow eyes forward, isolated subject on fully transparent background, no environment, hard pixel edges.

*Hissing (use sitting as reference):*

> Same gray tabby cat, fluffed-up arched-back hissing pose, fur visibly on end making the silhouette larger, back curved up sharply, ears pinned flat against the skull, mouth open in a hiss showing small teeth, whites of yellow eyes visible, posture unmistakable from a single glance — this is the alert-defensive pose, isolated subject on fully transparent background, no environment, hard pixel edges.

*Sleeping (use sitting as reference):*

> Same gray tabby cat, curled in a sleeping crescent, tail wrapped over nose, eyes closed, ears relaxed, gentle breathing posture, peaceful, isolated subject on fully transparent background, no environment, hard pixel edges.

## Files to create or modify

Create the following in a new `art/sprint-00-patu-test/` folder at the project root:

- `sprite-patu-sit_v1_<source>.png` — the style anchor
- `sprite-patu-walk_v1_<source>.png`
- `sprite-patu-hiss_v1_<source>.png`
- `sprite-patu-sleep_v1_<source>.png`
- `sprint-00-retro.md` — short notes on what worked, what didn't, prompt tweaks discovered, recommended tool for the rest of the project, and any concerns about scaling this approach to Pip cinematics

Source suffixes: `_mj` (Midjourney), `_gem` (Gemini), `_sd` (Stable Diffusion), `_pl` (PixelLab), `_dalle`.

If a pose required multiple attempts before landing, keep the rejected attempts too — `_v1`, `_v2`, etc. The retro should note how many attempts each pose took.

## Out of scope

- Pip art. Pip is loved as-is — this sprint does not touch him.
- Animation. Static sprites only. The walk cycle is a *single representative frame* of the walking pose, not a four-frame cycle. Animation comes later, possibly via image-to-video tools, possibly via hand-tweaking. That's a separate test.
- Other Pätu poses (head-butting, leaping, eating). Four poses is enough to validate consistency. More later.
- Backgrounds, environments, or any non-Pätu art.
- Sound, code, gameplay integration.
- Locking the final Pätu. This sprint produces *candidates*. The decision to canonize this Pätu (vs. iterating again) is made after the retro.

## Test checklist

- [ ] Tool selected and rationale recorded in retro
- [ ] Style anchor image generated and saved with `_v1` suffix
- [ ] Four pose files exist with correct naming
- [ ] All four poses pass the consistency check (same cat, same style, same eye color, same proportions)
- [ ] Hissing pose is unmistakable at a glance — show it to someone who hasn't seen the others and they should immediately say "the cat is mad"
- [ ] All four files have transparent backgrounds (verify by opening in a viewer that shows transparency)
- [ ] Retro doc written, including: tool used, total generations attempted, prompt lessons, scaling concerns, decision on whether to lock this style or iterate again
- [ ] Decisions Log updated in `06-roadmap-and-open-questions.md`: tool selection, gray-tabby-not-tortoiseshell, locked Pätu style reference filename

## Notes for the retro

When writing `sprint-00-retro.md`, answer at least:

- Which tool was used and why?
- How many attempts did each pose take to land?
- What prompt phrases consistently produced good results? What phrases produced drift or weirdness?
- Did the locked style anchor actually carry forward to the other three poses? If yes, how strongly? If no, what went wrong?
- Would this same workflow work for Pip's cinematics, where the emotional stakes are higher and the consistency requirements stricter? Why or why not?
- Any open questions for the Decisions Log?
