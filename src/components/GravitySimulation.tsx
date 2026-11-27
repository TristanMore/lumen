import { useCallback, useEffect, useRef, useState } from 'react';
import { Atom, Info, Pause, Play, RotateCcw } from 'lucide-react';

/**
 * Simplified Newtonian gravity sandbox.
 * Not to scale and not physically rigorous — a teaching toy.
 * F = G * m1 * m2 / r^2
 */
export function GravitySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Tunable parameters
  const [centralMass, setCentralMass] = useState(2000);
  const [orbiterMass, setOrbiterMass] = useState(30);
  const [running, setRunning] = useState(true);
  const [trail, setTrail] = useState(true);

  // Simulated body state held in a ref so the animation loop reads fresh values
  const bodyRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    trail: [] as { x: number; y: number }[],
  });

  // Initialize the orbiter position / velocity for a roughly circular orbit
  const resetBody = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.32;
    // For a circular orbit: v = sqrt(G * M / r). Use a tunable G constant.
    const G = 800;
    const v = Math.sqrt((G * centralMass) / r);
    bodyRef.current = { x: cx + r, y: cy, vx: 0, vy: v, trail: [] };
  }, [centralMass]);

  useEffect(() => {
    resetBody();
  }, [resetBody]);

  // Resize canvas to its container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      resetBody();
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resetBody]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const G = 800;
    const softening = 8; // prevents singularity at r=0

    const step = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const body = bodyRef.current;

      if (running) {
        // Compute force toward center
        const dx = cx - body.x;
        const dy = cy - body.y;
        const distSq = dx * dx + dy * dy + softening * softening;
        const dist = Math.sqrt(distSq);
        const force = (G * centralMass) / distSq;
        const ax = (force * dx) / dist;
        const ay = (force * dy) / dist;

        // Semi-implicit Euler integration
        body.vx += ax * 0.016;
        body.vy += ay * 0.016;
        body.x += body.vx * 0.016;
        body.y += body.vy * 0.016;

        // Record trail
        if (trail) {
          body.trail.push({ x: body.x, y: body.y });
          if (body.trail.length > 180) body.trail.shift();
        } else {
          body.trail = [];
        }
      }

      // Draw
      ctx.clearRect(0, 0, w, h);

      // background field rings
      for (let i = 1; i <= 4; i++) {
        const ringR = (Math.min(w, h) * 0.12 * i);
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34,211,238,${0.04 + (4 - i) * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Trail
      if (body.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(body.trail[0].x, body.trail[0].y);
        for (let i = 1; i < body.trail.length; i++) {
          ctx.lineTo(body.trail[i].x, body.trail[i].y);
        }
        ctx.strokeStyle = 'rgba(125,211,252,0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Central mass — radius scales with mass
      const coreR = 8 + Math.cbrt(centralMass) * 1.4;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      grad.addColorStop(0, '#fde68a');
      grad.addColorStop(0.6, '#f59e0b');
      grad.addColorStop(1, '#b45309');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Glow
      const glow = ctx.createRadialGradient(cx, cy, coreR, cx, cy, coreR * 3);
      glow.addColorStop(0, 'rgba(245,158,11,0.25)');
      glow.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Orbiter
      const orbR = 4 + Math.cbrt(orbiterMass) * 1.1;
      ctx.beginPath();
      ctx.arc(body.x, body.y, orbR, 0, Math.PI * 2);
      ctx.fillStyle = '#e2e8f0';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(body.x, body.y, orbR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, centralMass, orbiterMass, trail]);

  // Live force readout
  const [readout, setReadout] = useState({ force: 0, distance: 0, speed: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const body = bodyRef.current;
      const dx = w / 2 - body.x;
      const dy = h / 2 - body.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const G = 800;
      const force = (G * centralMass * orbiterMass) / (dist * dist);
      const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
      setReadout({ force, distance: dist, speed });
    }, 120);
    return () => clearInterval(id);
  }, [centralMass, orbiterMass]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70">
      {/* Label banner */}
      <div className="flex items-center gap-2.5 border-b border-white/8 bg-ink-950/50 px-4 py-3">
        <Atom className="h-5 w-5 text-accent-300" />
        <div className="flex-1">
          <p className="text-sm font-600 text-white">Interactive Gravity Model</p>
          <p className="text-xs text-ink-400">
            A simplified Newtonian sandbox — not to scale.
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <div className="aspect-[16/10] w-full bg-gradient-to-br from-ink-950 to-ink-900 sm:aspect-[2/1]">
          <canvas ref={canvasRef} className="block h-full w-full" />
        </div>

        {/* Play / pause / reset overlay controls */}
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/90"
            aria-label={running ? 'Pause' : 'Play'}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={resetBody}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/90"
            aria-label="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Live readout */}
        <div className="absolute bottom-3 left-3 flex gap-2 rounded-lg bg-ink-950/70 px-3 py-2 backdrop-blur-sm">
          <Readout label="Force" value={readout.force.toFixed(1)} unit="N" />
          <span className="w-px bg-white/10" />
          <Readout label="Distance" value={readout.distance.toFixed(0)} unit="px" />
          <span className="w-px bg-white/10" />
          <Readout label="Speed" value={readout.speed.toFixed(1)} unit="px/s" />
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-5 border-t border-white/8 p-5 sm:grid-cols-2">
        <SliderControl
          label="Central mass"
          value={centralMass}
          min={500}
          max={6000}
          step={100}
          onChange={setCentralMass}
          hint="Heavier = stronger pull"
        />
        <SliderControl
          label="Orbiter mass"
          value={orbiterMass}
          min={5}
          max={200}
          step={5}
          onChange={setOrbiterMass}
          hint="Heavier = bigger force on both"
        />
        <label className="flex items-center gap-2.5 sm:col-span-2">
          <input
            type="checkbox"
            checked={trail}
            onChange={(e) => setTrail(e.target.checked)}
            className="h-4 w-4 rounded accent-accent-400"
          />
          <span className="text-sm text-ink-300">Show orbital trail</span>
        </label>
      </div>

      <div className="flex items-start gap-2.5 border-t border-white/8 bg-ink-950/30 px-5 py-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
        <p className="text-xs leading-relaxed text-ink-400">
          This is a simplified model. It uses Newton's inverse-square law
          (F = G·m₁·m₂ / r²) with a fixed gravitational constant, no relativity, and no
          other bodies. Real orbital mechanics add perturbations from other masses,
          tidal effects, and — at extreme speeds — corrections from general relativity.
          Increase the central mass to see the orbit tighten; reset to start a fresh
          circular orbit.
        </p>
      </div>
    </div>
  );
}

function Readout({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="min-w-[68px]">
      <p className="text-[10px] uppercase tracking-wider text-ink-400">{label}</p>
      <p className="font-display text-sm font-600 text-accent-200">
        {value} <span className="text-[10px] text-ink-400">{unit}</span>
      </p>
    </div>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label className="text-sm font-500 text-ink-200">{label}</label>
        <span className="font-display text-sm font-600 text-white">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
    </div>
  );
}
