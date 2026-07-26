#!/usr/bin/env node
/* =============================================================================
   gallery-render-test — rule 12 of design-docs/13-pixel-art-rules.md
   =============================================================================
   "Every cell must actually render. An asset that throws is not a design
    placeholder, it is a blank."

   Executes every cell in art/galleries/gallery.html against a headless canvas
   stub, at two different timestamps, and reports anything that throws or draws
   suspiciously little.

   Plain node, no dependencies, no browser. Run from the repo root:

       node tools/gallery-render-test.js

   This exists because the Mamlambo cell threw on every render and had never once
   drawn — while sitting in the gallery marked designed:true. Nobody noticed,
   because nobody had ever executed all the cells.
   ============================================================================= */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GALLERY = path.join(ROOT, 'art/galleries/gallery.html');
const MIN_DRAW_CALLS = 8;   // below this, a cell is almost certainly blank

/* --- a canvas 2D stub that records call volume and never throws ------------ */
function makeCtx() {
  const c = { calls: 0, canvas: { width: 200, height: 170 } };
  const grad = () => ({ addColorStop() {} });
  const noop = function () { c.calls++; };
  [ 'fillRect','strokeRect','clearRect','beginPath','closePath','moveTo','lineTo','arc',
    'ellipse','quadraticCurveTo','bezierCurveTo','fill','stroke','save','restore','translate',
    'rotate','scale','clip','setTransform','drawImage','fillText','strokeText','setLineDash',
    'arcTo','rect','roundRect','transform','resetTransform',
  ].forEach(m => { c[m] = noop; });
  c.createLinearGradient = () => { c.calls++; return grad(); };
  c.createRadialGradient = () => { c.calls++; return grad(); };
  c.createConicGradient  = () => { c.calls++; return grad(); };
  c.createPattern = () => null;
  c.measureText = () => ({ width: 10 });
  c.getImageData = () => ({ data: new Uint8ClampedArray(4) });
  c.putImageData = noop;
  return c;
}

/* --- pull the gallery's script, stop before the DOM-dependent renderer ----- */
const html = fs.readFileSync(GALLERY, 'utf8');
const script = (html.match(/<script[^>]*>([\s\S]*?)<\/script>/g) || [])
  .map(s => s.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, ''))
  .join('\n');

const cut = script.indexOf('const KINDS = [');
if (cut < 0) {
  console.error('Could not find the UNIFIED registry in the gallery — has its structure changed?');
  process.exit(2);
}
const head = script.slice(0, cut);

const stubDoc = {
  getElementById: () => null,
  querySelectorAll: () => [],
  createElement: () => ({
    style: {}, classList: { add() {}, remove() {}, toggle() {} },
    appendChild() {}, addEventListener() {},
  }),
};

let report;
try {
  report = new Function('makeCtx', 'document', 'performance', 'requestAnimationFrame', `
    ${head}
    const out = [];
    for (const u of UNIFIED) {
      const ctx = makeCtx();
      try {
        u.draw(ctx, 0);
        u.draw(ctx, 1.7);
        out.push({ id: u.id, name: u.name, kind: u.kindLabel, status: 'OK', calls: ctx.calls });
      } catch (e) {
        out.push({ id: u.id, name: u.name, kind: u.kindLabel, status: 'THREW: ' + e.message, calls: ctx.calls });
      }
    }
    return out;
  `)(makeCtx, stubDoc, { now: () => 0 }, () => 0);
} catch (e) {
  console.error('Gallery script failed to evaluate:', e.message);
  process.exit(2);
}

const threw = report.filter(r => r.status !== 'OK');
const thin  = report.filter(r => r.status === 'OK' && r.calls < MIN_DRAW_CALLS);

console.log('\ngallery-render-test — rule 12\n' + '='.repeat(62));
console.log(`  cells executed : ${report.length}`);
console.log(`  rendered OK    : ${report.filter(r => r.status === 'OK').length}`);
console.log(`  threw          : ${threw.length}`);
console.log(`  near-empty     : ${thin.length}  (< ${MIN_DRAW_CALLS} draw calls)`);

if (threw.length) {
  console.log('\n  CELLS THAT THREW:');
  threw.forEach(r => console.log(`    ✗ ${r.id.padEnd(24)} ${r.name} — ${r.status}`));
}
if (thin.length) {
  console.log('\n  SUSPICIOUSLY EMPTY CELLS:');
  thin.forEach(r => console.log(`    ? ${r.id.padEnd(24)} ${r.name} — only ${r.calls} draw calls`));
}

if (threw.length || thin.length) {
  console.log('\nFAIL — every gallery cell must render.\n');
  process.exit(1);
}
console.log('\nAll cells render.\n');
