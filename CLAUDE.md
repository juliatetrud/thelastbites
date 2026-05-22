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

## No downloads, no fetches, no external resources

Claude Code does not run `npm install`, `pip install`, `gh extension install`, `curl`, `wget`, `git clone` of anything outside the current repo, or any command that pulls bytes from a third-party source. The repo is the entire scope of work. If a task seems to require an external dependency, stop and flag — do not fetch it. `git push` and `git pull` against the project's own remote are fine. `gh issue create` / `gh issue list` against the project's own repo are fine. Anything else that touches the network requires Julia's explicit go-ahead.

## Use only what's already on the system

The system has: `git`, `python3`, `node`, `gh`, `open`, standard Unix tools. Use these.

If you need to verify something in the browser, ask Julia to open the page and report what she sees. Do NOT automate browser inspection.

## When the spec is ambiguous, ask

Don't guess at intent. Don't silently rewrite stale references. Flag and ask.

## Test checklist verification means in-browser

"All checklist items pass" requires Julia to actually open the page in a real browser and confirm. Static code reading is not sufficient. When you report a sprint complete, say "the code implements all checklist items; Julia needs to verify in browser before merging."

## Stop and wait

After every sprint, every fix, every report-back: stop and wait for explicit direction. Do not chain into the next task.
