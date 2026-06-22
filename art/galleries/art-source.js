/* ============================================================
   ART-SOURCE.JS  —  Shared character art for The Last Bites

   COORDINATE CONVENTION (applies to all draw functions below)
   ──────────────────────────────────────────────────────────
   Every draw function in this file uses LOCAL space:
     (0, 0) = horizontal centre of the sprite at its foot/floor anchor.

   The CALLER positions the character by setting up the transform:
     ctx.save();
     ctx.translate(anchorX, anchorY);       // world or screen position
     [ctx.scale(-1, 1);]                    // optional: mirror for left-facing
     [ctx.scale(1, scaleY);]               // optional: vertical squash, etc.
     drawCharacter(ctx, t, speaking);
     ctx.restore();

   No position parameters appear in draw functions — only ctx, time (t in
   seconds), and flags.  The floor glow is drawn at (0, 0) which equals
   the anchor the caller provided.

   The GAME wraps each call in a thin renderX() function that handles
   game-specific state (camera offset, facing direction, squat animation).
   The GALLERY wraps each call after drawing the cell background so
   characters sit on the gallery's shared floor line.
   ============================================================ */

/* =============================================================
   PALETTE — shared locked tokens
   Source: character-gallery.html / 03-art-and-aesthetic.md
   Environment gallery (P tokens) will be merged here per-sprint
   as each environment asset migrates.  Do NOT bulk-merge P now.
   ============================================================= */
const C = {
  // Background — moonlit blue
  bgDeep:       '#0e1a3a',
  bgBase:       '#1c2858',
  bgShadow:     '#5a4878',
  floor:        '#1a2848',
  floorEdge:    '#0a1428',
  // Warm amber region
  warmBgDeep:   '#2a1408',
  warmBgBase:   '#5a2c18',
  warmFloor:    '#3a1c0a',
  // Neutral gray
  neutralDeep:  '#1a1a1a',
  neutralBase:  '#2a2a2a',
  neutralFloor: '#1a1a1a',
  // Pip
  pipBody:      '#f0f8ff',
  pipBodyDeep:  '#c8d8ff',
  pipEye:       '#1a1428',
  pipBlush:     '#ff9888',
  pipGlow:      '#a8c0ff',
  // Pätu
  catLight:     '#7a8298',
  catMid:       '#5a6278',
  catDark:      '#2a2f3a',
  catBelly:     '#8a92a8',
  catEye:       '#ffd84a',
  catEyeBright: '#ffe88a',
  catNose:      '#6a3a3a',
  catMouth:     '#1a0808',
  catEarInner:  '#8a4a4a',
  // Henrik
  hCoat:        '#f4eee0',
  hApron:       '#e8d8b0',
  hBeard:       '#aaaaa0',
  hSkin:        '#d0b898',
  hPipe:        '#3a2018',
  hEmber:       '#a07040',
  // Babcia
  bKerchief:    '#8a2a2a',
  bCoat:        '#2a1f28',
  bCream:       '#e8d8b0',
  bBrown:       '#5a3820',
  bSkin:        '#d0b090',
  // Erik
  eHalo:        '#ffd8a8',
  eHair:        '#d8b860',
  eSweater:     '#5a4438',
  eTrousers:    '#3a2818',
  eSkin:        '#d0b890',
  // Pocong
  pShroud:      '#f4eee0',
  pKnot:        '#b8a888',
  // Door outline
  doorOutline:  'rgba(100, 130, 200, 0.3)',
  doorKnob:     'rgba(180, 160, 100, 0.35)',
  // Dark eye / mouth
  dark:         '#1a1428',
};

/* =============================================================
   DRAWING PRIMITIVES
   ============================================================= */
function rect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

function px(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
}

/* Floor glow — radial gradient centred at (cx, floor). */
function floorGlow(ctx, cx, floor, r, hexColor, a) {
  const n = parseInt(hexColor.slice(1), 16);
  const rv = (n >> 16) & 255, gv = (n >> 8) & 255, bv = n & 255;
  const g = ctx.createRadialGradient(cx, floor, 0, cx, floor, r);
  g.addColorStop(0, `rgba(${rv},${gv},${bv},${a})`);
  g.addColorStop(1, `rgba(${rv},${gv},${bv},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(cx - r, floor - 4, r * 2, r / 2 + 4);
}

/* =============================================================
   ① PIP (ghost form) — canonical pixel-art ghost sprite
   Scale 1.45× maps the 24-row design to ~35px (slightly smaller, softer).

   LOCAL-SPACE CONVENTION: (0,0) = foot centre.
   Caller must ctx.translate(cx, floor) before calling this.
   All transforms (facing, squat) are applied by the caller
   before the call; bob is applied internally.

   t: time in seconds.  speaking: boolean.
   ============================================================= */
function drawPip(ctx, t, speaking) {
  const bob   = Math.round(Math.sin(t * 1.8) * (speaking ? 1.5 : 1.0));
  const scale = 1.45;

  // Floor glow at (0, 0) in local space — caller has already translated here
  floorGlow(ctx, 0, 0, 18, C.pipGlow, 0.5);

  ctx.save();
  // Shift to sprite top-left in local space.
  // Unscaled origin is top-left of a 16px-wide sprite; centre = x+8.
  // Vertical: sprite is 24 rows tall; translate so bottom row lands at y=0.
  ctx.translate(-8 * scale, -24 * scale - bob);
  ctx.scale(scale, scale);

  // Soft halo
  const halo = ctx.createRadialGradient(8, 12, 0, 8, 12, 16);
  halo.addColorStop(0, 'rgba(240,248,255,0.25)');
  halo.addColorStop(1, 'rgba(240,248,255,0)');
  ctx.fillStyle = halo;
  ctx.fillRect(-8, -4, 32, 32);

  const b = C.pipBody, bd = C.pipBodyDeep;

  // Slightly translucent body (the halo carries most of the "ghost" read).
  ctx.globalAlpha = 0.9;

  // Smooth body — a few TALL solid fills (each ≥2 logical px tall) so no
  // 1px-row seams survive the scale.  Rounded crown → shoulder → tall block.
  rect(ctx, 4, 0,  8, 2, b);   // crown   (rows 0–1)
  rect(ctx, 2, 2, 12, 2, b);   // shoulder(rows 2–3)
  rect(ctx, 1, 4, 14, 17, b);  // body    (rows 4–20) — one solid block

  // Scalloped hem (rows 21–22) — reads fine; banding was only in the body.
  rect(ctx, 1, 21, 4, 1, b); rect(ctx, 6, 21, 4, 1, b); rect(ctx, 11, 21, 4, 1, b);
  rect(ctx, 1, 22, 3, 1, b); rect(ctx, 7, 22, 2, 1, b); rect(ctx, 12, 22, 3, 1, b);

  // One subtle vertical form cue — a soft shadow column on the left edge.
  // (Vertical fill: no horizontal shading bands.)
  rect(ctx, 1, 4, 2, 17, bd);

  // Face stays crisp.
  ctx.globalAlpha = 1.0;

  // Eyes — open by default; one brief blink (~0.12s) every ~4s.
  const blinking = (t % 4.0) < 0.12;
  if (blinking) {
    // Closed: a thin 2×1 line at the lower edge of the eye position.
    rect(ctx, 4, 8, 2, 1, C.pipEye);
    rect(ctx, 10, 8, 2, 1, C.pipEye);
  } else {
    rect(ctx, 4, 7, 2, 2, C.pipEye);
    rect(ctx, 10, 7, 2, 2, C.pipEye);
  }
  // Blush
  rect(ctx, 3, 10, 2, 1, C.pipBlush);
  rect(ctx, 11, 10, 2, 1, C.pipBlush);
  // Mouth
  if (!speaking) {
    rect(ctx, 7, 10, 2, 1, C.pipEye);
  } else {
    const phase = Math.floor((t % 0.6) * 6.67) % 4;
    if (phase === 0) {
      rect(ctx, 7, 10, 2, 1, C.pipEye);
    } else if (phase === 1 || phase === 3) {
      px(ctx, 7, 10, C.pipEye);
      px(ctx, 9, 10, C.pipEye);
      rect(ctx, 7, 11, 3, 1, C.pipEye);
    } else {
      rect(ctx, 7, 10, 3, 1, C.pipEye);
      rect(ctx, 7, 12, 3, 1, C.pipEye);
      px(ctx, 6, 11, C.pipEye);
      px(ctx, 10, 11, C.pipEye);
    }
  }

  ctx.restore();
}
