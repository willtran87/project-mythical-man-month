const storageKey = 'deadline-disaster-sfx-v1';
const cues = {
  strike: [420, 116, .16, 'triangle'], enemy: [160, 62, .21, 'sawtooth'],
  shield: [360, 590, .2, 'sine'], heal: [410, 710, .25, 'sine'],
  mark: [640, 870, .13, 'sine'], weak: [335, 220, .16, 'triangle'],
  expose: [520, 280, .17, 'triangle'], burnout: [240, 135, .2, 'triangle'],
  debt: [190, 95, .21, 'triangle'], draw: [540, 760, .12, 'sine'],
  plan: [470, 630, .15, 'sine'], interrupt: [600, 180, .16, 'square'],
  tempo: [580, 820, .12, 'sine'], teamwork: [370, 610, .23, 'sine'],
  phase: [120, 47, .43, 'sawtooth'], trinket: [550, 880, .23, 'sine'],
  relic: [390, 780, .28, 'sine']
};

export class BattleAudio {
  constructor() {
    try { this.enabled = localStorage.getItem(storageKey) !== 'off'; }
    catch { this.enabled = true; }
    this.context = null;
    this.lastPlayed = new Map();
    this.lastAny = -Infinity;
  }
  toggle() {
    this.enabled = !this.enabled;
    try { localStorage.setItem(storageKey, this.enabled ? 'on' : 'off'); }
    catch { /* Storage may be disabled. */ }
  }
  play(kind) {
    if (!this.enabled || !cues[kind]) return;
    const now = performance.now();
    if (now - (this.lastPlayed.get(kind) ?? -Infinity) < 110) return;
    if (now - this.lastAny < 65 && !['phase', 'trinket', 'relic'].includes(kind)) return;
    this.lastPlayed.set(kind, now);
    this.lastAny = now;
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      this.context ||= new Context();
      if (this.context.state === 'suspended') this.context.resume().catch(() => {});
      const [start, end, duration, wave] = cues[kind];
      const at = this.context.currentTime;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(start, at);
      oscillator.frequency.exponentialRampToValueAtTime(end, at + duration);
      const peak = kind === 'phase' ? .033 : kind === 'enemy' ? .025 : .019;
      gain.gain.setValueAtTime(.0001, at);
      gain.gain.exponentialRampToValueAtTime(peak, at + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
      oscillator.connect(gain).connect(this.context.destination);
      oscillator.start(at);
      oscillator.stop(at + duration + .01);
    } catch { /* Audio is optional when a browser cannot start it. */ }
  }
}
