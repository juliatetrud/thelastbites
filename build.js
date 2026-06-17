#!/usr/bin/env node
'use strict';

/* build.js — zero-dependency assembler for The Last Bites
   Inlines art/galleries/art-source.js into game/index.html,
   replacing the content between the @@ART-SOURCE marker comments.
   Fails loudly if any expected identifier is missing.
   Run from the project root: node build.js */

const fs   = require('fs');
const path = require('path');

const ROOT      = __dirname;
const ART_SRC   = path.join(ROOT, 'art', 'galleries', 'art-source.js');
const GAME_HTML = path.join(ROOT, 'game', 'index.html');

const artSource = fs.readFileSync(ART_SRC, 'utf8');
const gameHtml  = fs.readFileSync(GAME_HTML, 'utf8');

// Validate art-source.js contains everything the game needs
if (!/\bfunction drawPip\b/.test(artSource)) {
  console.error('build.js ERROR: drawPip not found in art-source.js'); process.exit(1);
}
if (!/\bconst C\s*=/.test(artSource)) {
  console.error('build.js ERROR: palette constant C not found in art-source.js'); process.exit(1);
}
if (!/\bfunction rect\b/.test(artSource)) {
  console.error('build.js ERROR: rect primitive not found in art-source.js'); process.exit(1);
}

// Find the inline marker block
const START = '/* @@ART-SOURCE-START@@ */';
const END   = '/* @@ART-SOURCE-END@@ */';

const startIdx = gameHtml.indexOf(START);
const endIdx   = gameHtml.indexOf(END);

if (startIdx === -1) {
  console.error(`build.js ERROR: start marker "${START}" not found in game/index.html`); process.exit(1);
}
if (endIdx === -1) {
  console.error(`build.js ERROR: end marker "${END}" not found in game/index.html`); process.exit(1);
}
if (endIdx <= startIdx) {
  console.error('build.js ERROR: END marker appears before START marker'); process.exit(1);
}

const before = gameHtml.slice(0, startIdx);
const after  = gameHtml.slice(endIdx + END.length);
const output = before + START + '\n' + artSource + '\n' + END + after;

// Validate the assembled output
if (!/\bfunction drawPip\b/.test(output)) {
  console.error('build.js ERROR: drawPip missing from assembled output'); process.exit(1);
}
if (!/\bconst C\s*=/.test(output)) {
  console.error('build.js ERROR: palette C missing from assembled output'); process.exit(1);
}

fs.writeFileSync(GAME_HTML, output, 'utf8');
console.log(`build.js OK — art-source.js inlined into game/index.html (${output.length} bytes)`);
