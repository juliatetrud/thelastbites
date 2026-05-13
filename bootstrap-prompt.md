# Bootstrap Prompt for Claude Code

Paste this as your first message to Claude Code when you open the project. It sets all the constraints in one shot so subsequent sessions can be short.

---

You're working on **The Last Bites**, a narrative side-scrolling browser game for my recipe website. The project is fully designed; your job is to implement it sprint by sprint.

## First, read the design docs

Read every file in `design-docs/` before doing anything. Read them in this order:

1. `README.md` — orientation
2. `01-story-bible.md` — the story, characters, world (most important; mechanics serve the story)
3. `02-game-design.md` — gameplay loops, interaction model, controls
4. `03-art-and-aesthetic.md` — visual direction
5. `03b-ui-spec.md` — interface layout and behavior (authoritative for any UI work)
6. `05-tech-architecture.md` — how the prototype is built
7. `06-roadmap-and-open-questions.md` — what's locked, what's open, the decisions log

Then read `04-chapter-01-cabin-646.md` and the relevant `chapter-specs/` for whatever chapter you're working on.

The story bible is the single most important document. If anything else contradicts it, the bible wins.

## Hard constraints (do not violate)

- **Single-file vanilla JavaScript.** No frameworks. No React, Vue, Svelte, Next.js. No build step. The game ships as `index.html` plus assets. This is locked in `05-tech-architecture.md` and is a deliberate constraint, not a placeholder.
- **No dependencies beyond Google Fonts** (Special Elite, Cormorant Garamond) loaded by CDN link. No npm, no bundlers.
- **Browser-native APIs only.** Canvas, DOM, localStorage, requestAnimationFrame. No WebGL libraries, no game engines.
- **Tone: gentle horror, never cruel.** This is a game about food, memory, and grief. Wrong puzzle answers never punish — the chef hints, the monster grumbles, the player tries again.
- **The final line is locked**: *"Mmmm. That was a perfect last bite."* Don't change it.
- **Pip's arc is locked.** He starts the game not knowing he's dead. He realizes it through the first chapter. He spends the game collecting recipes and memories. He moves on at the end. The seven-beat arc in the bible is the spine.

## Workflow

You're working from GitHub issues organized into epics. Each epic is a stage of the project; each issue is a single sprint. Every issue links to a sprint spec markdown file in `sprints/`. The sprint spec is the source of truth for what to build.

For each issue:

1. Read the linked sprint spec end to end before writing code
2. Read any design-doc sections it references
3. Implement against the **Definition of Done** in the spec, not your own interpretation
4. Stay within the **Out of Scope** boundary — don't bundle in adjacent work
5. When the implementation is complete, walk the spec's **Test Checklist** item by item and verify each one in the running game (not by reading the code — actually launch it and check)
6. Only close the issue once every test-checklist item passes
7. Update `06-roadmap-and-open-questions.md` if the sprint settled a new decision, and update `05-tech-architecture.md` if the sprint changed how the prototype is structured

If a sprint spec is ambiguous, **stop and ask** rather than guessing. Decisions made silently mid-sprint are how design drift starts.

If you discover something that contradicts the docs while implementing, flag it before changing course. The docs are the source of truth; if they're wrong, they get patched explicitly, not bypassed silently.

## Sub-agents

Spawn sub-agents only when a task **naturally parallelizes** — for example, generating five placeholder sprites in parallel, or running a test suite while continuing to write code. Default to sequential. Most sprints in this project are tightly coupled and don't benefit from parallelism.

## Testing

Every sprint has a test checklist. Run it. The game runs in the browser; the test is "launch the game, do the thing, confirm the thing happens." There is no automated test suite for v1 — visual and interaction testing in the browser is the bar.

When in doubt about whether something works, screenshot it and ask.

## Project structure

```
the-last-bites/
├── design-docs/           # all the .md docs above
├── chapter-specs/         # per-chapter detailed specs (ch02-sincerity-puzzle-spec.md is the first)
├── sprints/               # sprint specs you're working from
├── prototype/             # the original cabin646.html, kept for reference
├── game/                  # the production game lives here
│   ├── index.html
│   └── assets/            # art, sound when commissioned
└── README.md              # GitHub-facing readme (separate from design-docs/README.md)
```

Production code lives in `game/`. The prototype in `prototype/` is reference only — do not edit it; Sprint 01 will rebuild its foundations from scratch into `game/`.

## When you finish a sprint

1. Confirm every test-checklist item passes
2. Commit with a message that references the issue (e.g. `Sprint 01: foundational architecture (#1)`)
3. Close the GitHub issue
4. Stop. Do not start the next sprint without me saying go.

The "stop and wait" rule is important. Each sprint is a checkpoint for me to play the game, give feedback, and adjust the next sprint's spec before you start.

---

Ready? Start by reading the docs. When you're done, summarize back to me what you understood about the project's tone, Pip's arc, and the architecture constraints, so I know you're oriented. Then we'll pick up Sprint 01.
