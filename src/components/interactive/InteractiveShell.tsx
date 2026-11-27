import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Waves } from 'lucide-react';

/**
 * Simplified wave tank. Two sources interfere, producing a classic
 * double-slit interference pattern on a detector screen.
 */
export function DoubleSlitSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [running, setRunning] = useState(true);
  const [slitSep, setSlitSep] = useState(60);
  const [wavelength, setWavelength] = useState(18);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;

      // Background
      ctx.fillStyle = '#070d18';
      ctx.fillRect(0, 0, w, h);

      const barrierX = w * 0.35;
      const slit1Y = cy - slitSep / 2;
      const slit2Y = cy + slitSep / 2;
      const detectorX = w * 0.82;

      // Draw barrier
      ctx.fillStyle = '#1a2538';
      ctx.fillRect(barrierX - 4, 0, 8, slit1Y - 12);
      ctx.fillRect(barrierX - 4, slit1Y + 12, 8, slit2Y - slit1Y - 24);
      ctx.fillRect(barrierX - 4, slit2Y + 12, 8, h - slit2Y - 12);

      // Draw detector screen
      ctx.fillStyle = '#0f1828';
      ctx.fillRect(detectorX, 0, 6, h);

      // Compute and draw wave field between barrier and detector
      const imageData = ctx.createImageData(Math.floor(detectorX - barrierX - 8), Math.floor(h));
      const data = imageData.data;
      const startX = barrierX + 8;

      for (let py = 0; py < h; py++) {
        for (let px = 0; px < detectorX - startX; px++) {
          const x = startX + px;
          const y = py;
          const d1 = Math.sqrt((x - barrierX) ** 2 + (y - slit1Y) ** 2);
          const d2 = Math.sqrt((x - barrierX) ** 2 + (y - slit2Y) ** 2);
          const wave1 = Math.sin((d1 / wavelength) * Math.PI * 2 - t * 0.08) / Math.sqrt(1 + d1 * 0.02);
          const wave2 = Math.sin((d2 / wavelength) * Math.PI * 2 - t * 0.08) / Math.sqrt(1 + d2 * 0.02);
          const val = (wave1 + wave2) * 0.5;
          const idx = (py * Math.floor(detectorX - startX) + px) * 4;
          if (val > 0) {
            data[idx] = 34;
            data[idx + 1] = 211;
            data[idx + 2] = 238;
            data[idx + 3] = Math.min(255, Math.abs(val) * 200);
          } else {
            data[idx] = 14;
            data[idx + 1] = 24;
            data[idx + 2] = 40;
            data[idx + 3] = Math.min(255, Math.abs(val) * 120);
          }
        }
      }
      ctx.putImageData(imageData, startX, 0);

      // Draw incoming plane wave (left of barrier)
      ctx.strokeStyle = 'rgba(125,211,252,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const waveX = ((i * 30 - t * 1.5) % (barrierX - 10) + barrierX - 10) % (barrierX - 10);
        ctx.beginPath();
        ctx.moveTo(waveX, 0);
        ctx.lineTo(waveX, h);
        ctx.stroke();
      }

      // Draw slit markers
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(barrierX, slit1Y, 3, 0, Math.PI * 2);
      ctx.arc(barrierX, slit2Y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw interference pattern on detector
      const patternWidth = 30;
      for (let py = 0; py < h; py++) {
        const d1 = Math.sqrt((detectorX - barrierX) ** 2 + (py - slit1Y) ** 2);
        const d2 = Math.sqrt((detectorX - barrierX) ** 2 + (py - slit2Y) ** 2);
        const phaseDiff = ((d1 - d2) / wavelength) * Math.PI;
        const intensity = Math.cos(phaseDiff / 2) ** 2;
        const alpha = intensity * 255;
        ctx.fillStyle = `rgba(253,224,71,${intensity})`;
        ctx.fillRect(detectorX + 8, py, patternWidth, 1);
      }

      if (running) t += 1;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, slitSep, wavelength]);

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
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <InteractiveShell title="Double-Slit Experiment" icon={<Waves className="h-5 w-5 text-accent-300" />}>
      <div className="relative">
        <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
          <canvas ref={canvasRef} className="block h-full w-full rounded-lg" />
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <CtrlButton onClick={() => setRunning((r) => !r)} label={running ? 'Pause' : 'Play'}>
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </CtrlButton>
          <CtrlButton onClick={() => { setSlitSep(60); setWavelength(18); }} label="Reset">
            <RotateCcw className="h-4 w-4" />
          </CtrlButton>
        </div>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Slider label="Slit separation" value={slitSep} min={20} max={100} step={5} onChange={setSlitSep} hint="Wider slits = tighter fringes" />
        <Slider label="Wavelength" value={wavelength} min={8} max={35} step={1} onChange={setWavelength} hint="Longer waves = broader pattern" />
      </div>
      <SimplifiedNote>
        A simplified model of Thomas Young's 1801 experiment. Each point on the detector screen
        receives waves from both slits; where they arrive in phase you get brightness, where they
        arrive out of phase you get darkness. In the real quantum version, this pattern builds up
        even when photons are sent one at a time.
      </SimplifiedNote>
    </InteractiveShell>
  );
}

/* ---- shared shell used by all interactive components ---- */
export function InteractiveShell({
  title,
  icon,
  children,
  note,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70">
      <div className="flex items-center gap-2.5 border-b border-white/8 bg-ink-950/50 px-4 py-3">
        {icon}
        <div className="flex-1">
          <p className="text-sm font-600 text-white">{title}</p>
          <p className="text-xs text-ink-400">Interactive — simplified model</p>
        </div>
      </div>
      {children}
      {note && <SimplifiedNote>{note}</SimplifiedNote>}
    </div>
  );
}

export function CtrlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/90"
    >
      {children}
    </button>
  );
}

export function Slider({
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

export function SimplifiedNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-t border-white/8 bg-ink-950/30 px-5 py-4 text-xs leading-relaxed text-ink-400">
      {children}
    </p>
  );
}
