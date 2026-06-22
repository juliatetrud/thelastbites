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
   ① PIP (ghost form) — canonical smooth arc/bezier ghost sprite
   (Sprint G-S3 canon reversal: the pixel-art ghost of Sprint 51 /
   G1-art / G-S2 is retired.  Pip is now the soft, rounded arc ghost
   — round bald dome, smooth wavy hem, soft glow — that previously
   lived only in the cold-open materialize path (drawPipBody).)

   LOCAL-SPACE CONVENTION: (0,0) = foot centre.
   Caller must ctx.translate(cx, floor) before calling this.
   All transforms (facing, squat) are applied by the caller
   before the call; bob is applied internally.  The body honours the
   caller's incoming globalAlpha (so fades — materialize ramp,
   blink-back — multiply through), then restores it on exit.

   t: time in seconds.  speaking: boolean.
   ============================================================= */
function drawPip(ctx, t, speaking) {
  const bob   = Math.round(Math.sin(t * 1.8) * (speaking ? 1.5 : 1.0));
  const inA   = ctx.globalAlpha;        // respect caller fades; multiply through
  const PIP_H = 40;                     // sprite height; (0,0)=foot, top at -40

  // Floor glow at (0, 0) in local space — caller has already translated here
  floorGlow(ctx, 0, 0, 18, C.pipGlow, 0.5);

  ctx.save();
  ctx.translate(0, -bob);               // gentle bob lifts the whole sprite

  const headCY  = -PIP_H + 12;          // -28: centre of the head dome
  const bodyBot = -10;                  // straight body ends 10px above foot

  // ---- Body: round dome + three smooth downward waves, soft glow ----
  ctx.shadowColor = 'rgba(240,248,255,0.85)';
  ctx.shadowBlur  = 12;
  ctx.globalAlpha = inA * 0.85;         // slightly translucent
  ctx.fillStyle   = '#dce8ff';
  ctx.beginPath();
  ctx.arc(0, headCY, 12, Math.PI, 0);   // bald semicircle dome
  ctx.lineTo(12, bodyBot);              // right wall down to the hem
  ctx.quadraticCurveTo( 8, 0,  4, bodyBot);   // wave 1
  ctx.quadraticCurveTo( 0, 0, -4, bodyBot);   // wave 2
  ctx.quadraticCurveTo(-8, 0, -12, bodyBot);  // wave 3
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  // Cool underglow pooled beneath Pip
  ctx.globalAlpha = inA * 0.12;
  const glowGrad = ctx.createRadialGradient(0, 2, 0, 0, 2, 17);
  glowGrad.addColorStop(0, '#c0d8ff');
  glowGrad.addColorStop(1, 'rgba(180, 210, 255, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.ellipse(0, 2, 17, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // ---- Eyes — open by default; one brief blink (~0.12s) every ~4s ----
  const blinking = (t % 4.0) < 0.12;
  ctx.globalAlpha = inA * 0.92;
  ctx.fillStyle   = C.pipEye;
  if (blinking) {
    // Closed: a thin line at the lower edge of the eye position.
    ctx.fillRect(-5, headCY + 2, 3, 1);
    ctx.fillRect( 3, headCY + 2, 3, 1);
  } else {
    ctx.fillRect(-5, headCY - 2, 3, 5);
    ctx.fillRect( 3, headCY - 2, 3, 5);
  }

  // Blush
  ctx.globalAlpha = inA * 0.18;
  ctx.fillStyle   = '#e8a0a0';
  ctx.fillRect(-8, headCY + 3, 5, 3);
  ctx.fillRect( 4, headCY + 3, 5, 3);

  // ---- Mouth — neutral dot, or a simple open/close while speaking ----
  ctx.globalAlpha = inA * 0.65;
  ctx.fillStyle   = C.pipEye;
  if (!speaking) {
    ctx.fillRect(0, headCY + 8, 2, 2);
  } else {
    const open = Math.floor((t % 0.6) * 6.67) % 2;
    if (open) ctx.fillRect(-1, headCY + 7, 4, 3);
    else      ctx.fillRect( 0, headCY + 8, 2, 2);
  }

  ctx.restore();                        // restores globalAlpha to inA, shadow state
}
