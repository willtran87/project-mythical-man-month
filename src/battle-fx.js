const styles = {
  strike: { color: '#f5c56c', light: '#fff4cb', count: 13, life: 1.08 },
  enemy: { color: '#f16f5d', light: '#ffd5ae', count: 15, life: 1.12 },
  shield: { color: '#66c9c1', light: '#d8fff0', count: 12, life: 1.12 },
  heal: { color: '#8bd9a5', light: '#e5ffe2', count: 14, life: 1.18 },
  mark: { color: '#67cce0', light: '#e2fbff', count: 10, life: 1.12 },
  weak: { color: '#8aabd5', light: '#edf3ff', count: 9, life: 1.08 },
  expose: { color: '#ed8f7e', light: '#ffe0ce', count: 11, life: 1.08 },
  plan: { color: '#eac878', light: '#fff3cd', count: 12, life: 1.2 },
  interrupt: { color: '#79d5d1', light: '#e1fffa', count: 14, life: 1.1 },
  burnout: { color: '#ec9360', light: '#ffe0a9', count: 12, life: 1.16 },
  debt: { color: '#c99a70', light: '#ffe0ad', count: 11, life: 1.2 },
  tempo: { color: '#edc95f', light: '#fff6ba', count: 11, life: 1.1 },
  teamwork: { color: '#90d6ba', light: '#fff2b0', count: 16, life: 1.24 },
  draw: { color: '#8fc8e2', light: '#f0faff', count: 10, life: 1.1 },
  phase: { color: '#ed745c', light: '#ffe0ab', count: 22, life: 1.58 },
  trinket: { color: '#73d6ce', light: '#f0ffef', count: 12, life: 1.25 },
  relic: { color: '#ebc46e', light: '#fff5c9', count: 12, life: 1.25 }
};
const directed = new Set(['strike', 'enemy']);
const artSizes = { strike: 125, enemy: 116, shield: 124, heal: 96, draw: 104, plan: 110, mark: 112, weak: 106, expose: 108, burnout: 108, debt: 108, phase: 226, trinket: 78, relic: 78 };
const rand = (seed, index) => {
  const n = Math.sin(seed * 127.1 + index * 311.7) * 43758.5453123;
  return n - Math.floor(n);
};
const smooth = n => n * n * (3 - 2 * n);
const lerp = (a, b, t) => a + (b - a) * t;

export class BattleFx {
  constructor(reducedMotion = false, art = {}, onEmit = null) { this.reducedMotion = reducedMotion; this.art = art; this.onEmit = onEmit; this.effects = []; this.serial = 0; }
  emit(kind, x, y, at, fromX = x, fromY = y, artKey = kind) {
    if (!styles[kind]) return;
    this.onEmit?.(kind);
    if (this.reducedMotion) return;
    const style = styles[kind], seed = ++this.serial;
    const particles = Array.from({ length: style.count }, (_, i) => ({
      angle: i * Math.PI * 2 / style.count + rand(seed, i) * .45,
      reach: 22 + rand(seed + 31, i) * (kind === 'phase' ? 135 : 64),
      size: 1.7 + rand(seed + 71, i) * 3.2,
      phase: rand(seed + 113, i) * .22,
      twist: rand(seed + 151, i) * 2 - 1
    }));
    this.effects.push({ kind, artKey, x, y, fromX, fromY, at, life: style.life, particles });
    if (this.effects.length > 12) this.effects.splice(0, this.effects.length - 12);
  }
  active(at) { return this.effects.filter(effect => at - effect.at < effect.life).map(effect => effect.kind); }
  draw(ctx, at) {
    if (this.reducedMotion) return;
    this.effects = this.effects.filter(effect => at - effect.at < effect.life);
    if (!this.effects.length) return;
    ctx.save();
    ctx.beginPath(); ctx.rect(26, 159, 1148, 331); ctx.clip();
    for (const effect of this.effects) this.drawOne(ctx, effect, Math.max(0, (at - effect.at) / effect.life));
    ctx.restore();
  }
  drawOne(ctx, effect, t) {
    const { kind, x, y, fromX, fromY, particles } = effect, style = styles[kind];
    const alpha = Math.pow(1 - t, .7);
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = alpha;
    ctx.shadowColor = style.color; ctx.shadowBlur = kind === 'phase' ? 18 : 9;
    if (directed.has(kind)) {
      const travel = smooth(Math.min(1, t * 2.4));
      const headX = lerp(fromX, x, travel), headY = lerp(fromY, y, travel);
      const tailX = lerp(fromX, x, Math.max(0, travel - .22)), tailY = lerp(fromY, y, Math.max(0, travel - .22));
      ctx.strokeStyle = style.light; ctx.lineWidth = 5 * (1 - t) + 1;
      ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(headX, headY); ctx.stroke();
      ctx.strokeStyle = style.color; ctx.lineWidth = 2;
      for (let i = -1; i <= 1; i += 2) {
        ctx.beginPath(); ctx.moveTo(tailX, tailY + i * 8); ctx.lineTo(headX - 16, headY + i * 5); ctx.stroke();
      }
    }
    const burst = directed.has(kind) ? Math.max(0, (t - .31) / .69) : t;
    if (burst > 0) {
      this.drawSymbol(ctx, kind, x, y, burst, style);
      this.drawArt(ctx, kind, effect.artKey, x, y, burst);
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i], u = Math.max(0, (burst - p.phase) / (1 - p.phase));
        if (!u) continue;
        const distance = p.reach * smooth(u);
        let px = x + Math.cos(p.angle) * distance;
        let py = y + Math.sin(p.angle) * distance;
        if (['heal', 'burnout', 'debt', 'draw'].includes(kind)) { px = x + Math.cos(p.angle) * p.reach * .55 + p.twist * 16 * u; py = y + Math.sin(p.angle) * 19 - p.reach * u; }
        if (['shield', 'plan', 'teamwork'].includes(kind)) { px = x + Math.cos(p.angle + u * .9) * (38 + p.reach * .35); py = y + Math.sin(p.angle + u * .9) * (38 + p.reach * .35); }
        ctx.globalAlpha = alpha * (1 - u * .35);
        ctx.fillStyle = i % 3 ? style.color : style.light;
        ctx.save(); ctx.translate(px, py); ctx.rotate(p.angle + u * 2);
        if (['debt', 'draw', 'plan', 'interrupt'].includes(kind)) ctx.fillRect(-p.size, -p.size * .48, p.size * 2.2, p.size * .95);
        else if (['shield', 'mark', 'expose', 'phase', 'teamwork'].includes(kind)) {
          ctx.beginPath(); ctx.moveTo(0, -p.size * 1.7); ctx.lineTo(p.size, 0); ctx.lineTo(0, p.size * 1.7); ctx.lineTo(-p.size, 0); ctx.closePath(); ctx.fill();
        } else { ctx.beginPath(); ctx.arc(0, 0, p.size * (1 - u * .35), 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      }
    }
    ctx.restore();
  }
  drawArt(ctx, kind, artKey, x, y, t) {
    const img = this.art[artKey];
    if (!img?.complete || !img.naturalWidth) return;
    const width = artSizes[kind] * (.72 + t * .48);
    const height = width * img.naturalHeight / img.naturalWidth;
    ctx.save();
    ctx.globalAlpha = Math.min(1, t * 5) * Math.pow(1 - t, .72) * .86;
    ctx.shadowBlur = 0;
    ctx.translate(x, y - (kind === 'draw' ? t * 14 : 0));
    if (kind === 'trinket' || kind === 'relic') {
      const radius = Math.min(width, height) * .43;
      ctx.beginPath(); ctx.arc(0, 0, radius + 4, 0, Math.PI * 2);
      ctx.fillStyle = kind === 'relic' ? '#f3d791' : '#9be0d4'; ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.clip();
    }
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
  }
  drawSymbol(ctx, kind, x, y, t, style) {
    const spread = 19 + t * (kind === 'phase' ? 112 : 44);
    ctx.globalAlpha = Math.pow(1 - t, .55) * .88;
    ctx.strokeStyle = style.light; ctx.lineWidth = kind === 'phase' ? 4 : 2.5;
    if (['shield', 'expose'].includes(kind)) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + i * Math.PI / 3; const px = x + Math.cos(a) * spread, py = y + Math.sin(a) * spread; if (!i) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
      ctx.closePath(); ctx.stroke();
      if (kind === 'expose') { ctx.beginPath(); ctx.moveTo(x - 6, y - 25); ctx.lineTo(x + 5, y - 3); ctx.lineTo(x - 8, y + 16); ctx.stroke(); }
    } else if (kind === 'mark') {
      ctx.beginPath(); ctx.arc(x, y, spread, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * (spread - 9), y + Math.sin(a) * (spread - 9)); ctx.lineTo(x + Math.cos(a) * (spread + 9), y + Math.sin(a) * (spread + 9)); ctx.stroke(); }
    } else if (kind === 'heal') {
      ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - 12, y); ctx.lineTo(x + 12, y); ctx.moveTo(x, y - 12); ctx.lineTo(x, y + 12); ctx.stroke();
    } else if (kind === 'plan') {
      ctx.strokeRect(x - spread * .7, y - spread * .5, spread * 1.4, spread);
      ctx.beginPath(); ctx.moveTo(x - spread * .5, y); ctx.lineTo(x + spread * .5, y); ctx.moveTo(x, y - spread * .35); ctx.lineTo(x, y + spread * .35); ctx.stroke();
    } else if (kind === 'interrupt') {
      ctx.beginPath(); ctx.moveTo(x - spread, y - spread * .55); ctx.lineTo(x + spread, y + spread * .55); ctx.moveTo(x + spread, y - spread * .55); ctx.lineTo(x - spread, y + spread * .55); ctx.stroke();
    } else if (kind === 'tempo') {
      ctx.beginPath(); ctx.moveTo(x + 8, y - spread); ctx.lineTo(x - 8, y); ctx.lineTo(x + 4, y); ctx.lineTo(x - 8, y + spread); ctx.stroke();
    } else if (kind === 'burnout') {
      ctx.beginPath(); ctx.moveTo(x, y + 16); ctx.bezierCurveTo(x - 19, y + 6, x - 11, y - 9, x - 3, y - 21); ctx.bezierCurveTo(x - 1, y - 9, x + 18, y - 3, x + 12, y + 9); ctx.quadraticCurveTo(x + 6, y + 19, x, y + 16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 2, y + 13); ctx.quadraticCurveTo(x - 8, y + 1, x + 2, y - 7); ctx.quadraticCurveTo(x + 9, y + 6, x + 4, y + 13); ctx.stroke();
    } else if (kind === 'debt') {
      ctx.strokeRect(x - 12, y - 16, 24, 32);
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x - 7, y - 8 + i * 7); ctx.lineTo(x + 7, y - 8 + i * 7); ctx.stroke(); }
    } else if (kind === 'draw') {
      ctx.strokeRect(x - 17, y - 11, 23, 30);
      ctx.strokeRect(x - 10, y - 16, 23, 30);
      ctx.beginPath(); ctx.moveTo(x - 5, y - 7); ctx.lineTo(x + 7, y - 7); ctx.moveTo(x - 5, y - 1); ctx.lineTo(x + 5, y - 1); ctx.stroke();
    } else if (kind === 'teamwork') {
      ctx.beginPath(); ctx.arc(x - 12, y, spread * .7, -.75, 2.2); ctx.arc(x + 12, y, spread * .7, 2.4, 5.5); ctx.stroke();
    } else if (kind === 'phase' || kind === 'strike' || kind === 'enemy' || kind === 'trinket' || kind === 'relic') {
      ctx.beginPath(); ctx.arc(x, y, spread, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * (spread + 4), y + Math.sin(a) * (spread + 4)); ctx.lineTo(x + Math.cos(a) * (spread + 13), y + Math.sin(a) * (spread + 13)); ctx.stroke(); }
    } else if (kind === 'weak') {
      for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x + i * 19, y - spread * .6); ctx.bezierCurveTo(x + i * 23 - 12, y, x + i * 23 + 12, y, x + i * 19, y + spread * .7); ctx.stroke(); }
    }
  }
}
