# Standing rules for Claude Code on this project

## Do not install packages

Do NOT install npm packages, pip packages, brew packages, gem packages, or any other third-party software, ever. This includes:

- `npm install`, `npx --yes <anything>`, `yarn add`
- `pip install`, `pip3 install`
- `brew install`
- Playwright, Puppeteer, Selenium, headless browser tools
- Any global CLI tool not already on the system

If a task seems to require installing something, **stop and tell Julia**. She'll decide whether to install it manually after reviewing what it is.

Reason: supply-chain attacks via malicious npm/pip packages are a real and growing risk. The protection is not installing anything the human hasn't vetted.

**As of mid-2026 this risk is acute, not hypothetical.** Multiple widely-used npm and pip packages have been found compromised. Assume any package not already vetted and on the system is potentially corrupted. The standing answer to "should I install X?" is **no** — stop and ask Julia. This applies to documentation tasks and code tasks alike; there is no task on this project that justifies installing an unvetted package.

## No downloads, no fetches, no external resources

Claude Code does not run `npm install`, `pip install`, `gh extension install`, `curl`, `wget`, `git clone` of anything outside the current repo, or any command that pulls bytes from a third-party source. The repo is the entire scope of work. If a task seems to require an external dependency, stop and flag — do not fetch it. `git push` and `git pull` against the project's own remote are fine. `gh issue create` / `gh issue list` against the project's own repo are fine. Anything else that touches the network requires Julia's explicit go-ahead.

## Use only what's already on the system

The system has: `git`, `python3`, `node`, `gh`, `open`, standard Unix tools. Use these.

If you need to verify something in the browser, ask Julia to open the page and report what she sees. Do NOT automate browser inspection.

## Track all work in GitHub issues

Every sprint, fix, bug, and surfaced open question gets a GitHub issue in this repo (`juliatetrud/thelastbites`) via `gh`. This is a standing rule — it applies to every sprint whether or not the sprint spec restates it.

Conventions:
- **One parent issue per sprint**, opened at sprint start, labeled `sprint` plus the relevant chapter label (e.g. `chapter-1`). The body links the stage commits as they land.
- **Bugs** found during verification: `bug` label, referencing the sprint that surfaced them.
- **Open questions / deferrals**: `open-question` or `flagged-followup` label, with the sprint scope that will resolve them where known.
- **Design-doc work**: `design-doc` + `documentation` labels.
- Close issues with the commit SHA that resolves them.
- File issues against `juliatetrud/thelastbites` only — never any other repo.
- Create labels with `gh label create` if they don't yet exist.

## When the spec is ambiguous, ask

Don't guess at intent. Don't silently rewrite stale references. Flag and ask.

## Test checklist verification means in-browser

"All checklist items pass" requires Julia to actually open the page in a real browser and confirm. Static code reading is not sufficient. When you report a sprint complete, say "the code implements all checklist items; Julia needs to verify in browser before merging."

## Stop and wait

After every sprint, every fix, every report-back: stop and wait for explicit direction. Do not chain into the next task.
