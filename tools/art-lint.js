#!/usr/bin/env node
/* =============================================================================
   art-lint — mechanical checks for design-docs/13-pixel-art-rules.md
   =============================================================================
   Plain node, no dependencies, no network. Run from the repo root:

       node tools/art-lint.js

   Checks only the rules that are MECHANICAL — true or false without taste.
   Rules 1, 5, 6, 7, 9, 10, 13, 14 need eyes and are deliberately not checked here.

   Two kinds of finding:
     VIOLATION — a rule broken outright. Exit code 1.
     DEBT      — a known backlog with a recorded baseline. Fails only if it GROWS,
                 which is how rule 4's "migrate on touch" is enforced without
                 pretending the whole backlog gets fixed at once.
   ============================================================================= */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GAME = path.join(ROOT, 'game/index.html');

/* Baselines recorded 2026-07-26. Lower these as debt is paid; never raise them. */
const BASELINE = {
  rawHexLiterals: 817,   // rule 4 — palette discipline
  localCharacterDraws: 42, // rule 11 — characters not on the shared art source (#141)
};

const src = fs.readFileSync(GAME, 'utf8');
const violations = [];
const debts = [];
const passes = [];

const v = (rule, msg, detail) => violations.push({ rule, msg, detail });
const ok = (rule, msg) => passes.push({ rule, msg });

/* --- Rule 2: snap to the pixel grid -------------------------------------- */
{
  const lines = src.split('\n');
  const bad = [];
  lines.forEach((l, i) => {
    // A parallax offset derived from the camera that seeds a draw loop unrounded.
    if (/(Off|Offset)\s*=\s*\(camX/.test(l) && !/Math\.(round|floor)/.test(l)) {
      bad.push(`${i + 1}: ${l.trim()}`);
    }
    // A draw call taking camX directly without rounding.
    if (/(moveTo|lineTo|fillRect|strokeRect|arc)\s*\(/.test(l) &&
        /camX/.test(l) && !/Math\.round/.test(l)) {
      bad.push(`${i + 1}: ${l.trim()}`);
    }
  });
  if (bad.length) v(2, `${bad.length} camera-derived coordinate(s) not snapped to the grid`, bad);
  else ok(2, 'all camera-derived draw coordinates are rounded');
}

/* --- Rule 3: integer scale, or a declared exception ----------------------- */
{
  const bad = [];
  const re = /ctx\.scale\(\s*([-\w.]+)\s*,\s*([-\w.]+)\s*\)/g;
  let m;
  while ((m = re.exec(src))) {
    const nums = [m[1], m[2]].filter(x => /^-?[\d.]+$/.test(x)).map(Number);
    const fractional = nums.some(n => Math.abs(n) !== Math.round(Math.abs(n)));
    if (!fractional) continue;
    // Look back for a declared exception in the preceding comment block.
    const before = src.slice(Math.max(0, m.index - 400), m.index);
    const declared = /DECLARED EXCEPTION|cinematic close-up|close-up|Rule 3/i.test(before);
    if (!declared) {
      const line = src.slice(0, m.index).split('\n').length;
      bad.push(`${line}: ${m[0]} — fractional scale with no declared exception`);
    }
  }
  if (bad.length) v(3, `${bad.length} fractional ctx.scale() call(s) not declared`, bad);
  else ok(3, 'every fractional scale is a declared cinematic exception');
}

/* --- Rule 4: palette discipline (debt, must not grow) --------------------- */
{
  const n = new Set(src.match(/#[0-9a-fA-F]{6}\b/g) || []).size;
  if (n > BASELINE.rawHexLiterals) {
    v(4, `raw hex literals grew: ${n} (baseline ${BASELINE.rawHexLiterals}) — new art must use tokens`);
  } else {
    debts.push(`rule 4 — ${n} distinct raw hex literals (baseline ${BASELINE.rawHexLiterals})`);
  }
}

/* --- Rule 8: no black keylines -------------------------------------------- */
{
  const strokes = src.match(/strokeStyle\s*=\s*[`'"]?(?:#0{3,6}\b|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.?[1-9])/g) || [];
  if (strokes.length) v(8, `${strokes.length} black keyline stroke(s) — use rim light or shape instead`, strokes.slice(0, 8));
  else ok(8, 'no black keylines');
}

/* --- Rule 11: one character, one construction (debt, must not grow) ------- */
{
  const gal = fs.readFileSync(path.join(ROOT, 'art/galleries/character-gallery.html'), 'utf8');
  const shared = new Set((fs.readFileSync(path.join(ROOT, 'art/galleries/art-source.js'), 'utf8')
    .match(/^function (draw[A-Z]\w+)/gm) || []).map(s => s.replace('function ', '')));
  const helpers = new Set(['drawCellBackground', 'drawDoorOutline', 'drawMouth',
    'drawHumanEye', 'drawGlowingEye', 'drawPocongMist', 'drawPlaceholder']);
  const chars = (gal.match(/^function (draw[A-Z]\w+)/gm) || [])
    .map(s => s.replace('function ', '')).filter(f => !helpers.has(f));
  const gameFns = new Set((src.match(/^function (draw[A-Z]\w+)/gm) || []).map(s => s.replace('function ', '')));

  const multi = [];
  let notShared = 0;
  for (const c of chars) {
    const base = c.replace(/^draw/, '');
    const locals = [...gameFns].filter(f => f.startsWith('draw' + base) && !shared.has(f));
    if (locals.length) notShared++;
    if (locals.length > 1) multi.push(`${base}: ${locals.length} local constructions — ${locals.join(', ')}`);
  }
  if (notShared > BASELINE.localCharacterDraws) {
    v(11, `characters drawn locally grew: ${notShared} (baseline ${BASELINE.localCharacterDraws})`);
  } else {
    debts.push(`rule 11 — ${notShared} characters still drawn locally rather than from the shared art source (baseline ${BASELINE.localCharacterDraws}, tracked in #141)`);
    if (multi.length) debts.push(`         of those, ${multi.length} have MORE THAN ONE construction:\n           ` + multi.join('\n           '));
  }
}

/* --- report --------------------------------------------------------------- */
console.log('\nart-lint — design-docs/13-pixel-art-rules.md\n' + '='.repeat(62));
passes.forEach(p => console.log(`  PASS   rule ${p.rule}: ${p.msg}`));
if (debts.length) {
  console.log('\n  KNOWN DEBT (fails only if it grows):');
  debts.forEach(d => console.log(`    · ${d}`));
}
if (violations.length) {
  console.log('\n  VIOLATIONS:');
  violations.forEach(x => {
    console.log(`    ✗ rule ${x.rule}: ${x.msg}`);
    (x.detail || []).forEach(d => console.log(`        ${d}`));
  });
  console.log(`\n${violations.length} violation(s).\n`);
  process.exit(1);
}
console.log('\nNo violations.\n');
