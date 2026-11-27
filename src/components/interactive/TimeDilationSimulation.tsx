import { useEffect, useRef, useState } from 'react';
import { Clock, RotateCcw } from 'lucide-react';
import { InteractiveShell, Slider, SimplifiedNote } from './InteractiveShell';

/**
 * Gravitational time dilation explorer. Shows how a clock near a massive
 * object ticks slower relative to a distant observer. Adjust mass and
 * distance to see the time dilation factor change.
 */
export function TimeDilationSimulation() {
  const [mass, setMass] = useState(1); // in solar masses
  const [distance, setDistance] = useState(3); // in Schwarzschild radii

  // Simplified time dilation factor: sqrt(1 - Rs/r)
  // Rs (Schwarzschild radius) proportional to mass; r = distance * Rs
  const rs = mass; // normalised
  const r = distance * rs;
  const factor = Math.sqrt(Math.max(0, 1 - rs / r));
  const dilationPercent = ((1 - factor) * 100).toFixed(2);

  // For the distant observer, 1 second passes; for the near observer:
  const nearTime = factor; // seconds pass near mass per 1s distant

  return (
    <InteractiveShell title="Time Dilation Explorer" icon={<Clock className="h-5 w-5 text-accent-300" />}>
      <div className="p-6">
        {/* Visual */}
        <div className="mb-6 flex items-center justify-center gap-8">
          {/* Distant clock */}
          <div className="text-center">
            <div className="relative mx-auto mb-3 h-24 w-24 rounded-full border-4 border-accent-400/40 bg-ink-950">
              <ClockFace rotating={true} speed={1} />
            </div>
            <p className="text-xs font-500 text-ink-300">Distant observer</p>
            <p className="font-display text-lg font-600 text-white">1.000s</p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <div className="text-2xl text-ink-500">vs</div>
            <p className="mt-1 text-[11px] text-ink-400">dilation: {dilationPercent}%</p>
          </div>

          {/* Near-mass clock */}
          <div className="text-center">
            <div className="relative mx-auto mb-3 h-24 w-24 rounded-full border-4 border-amber-500/40 bg-ink-950">
              <ClockFace rotating={true} speed={factor} />
              {/* Mass glow behind */}
              <div className="absolute -inset-3 -z-10 rounded-full bg-amber-500/10 blur-xl" />
            </div>
            <p className="text-xs font-500 text-ink-300">Near mass</p>
            <p className="font-display text-lg font-600 text-amber-300">{nearTime.toFixed(3)}s</p>
          </div>
        </div>

        {/* Warning if approaching event horizon */}
        {factor < 0.3 && (
          <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-200">
            Approaching the event horizon — time nearly stops for the distant observer.
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Slider label="Mass (solar masses)" value={mass} min={0.1} max={5} step={0.1} onChange={setMass} hint="Heavier mass = stronger dilation" />
          <Slider label="Distance (Schwarzschild radii)" value={distance} min={1.01} max={10} step={0.1} onChange={setDistance} hint="Closer = more dilation · 1 = event horizon" />
        </div>
      </div>
      <SimplifiedNote>
        Near a mass, time slows relative to a distant observer. The factor is sqrt(1 - Rs/r),
        where Rs is the Schwarzschild radius. At the event horizon (r = Rs), time appears to
        stop completely from the outside. This is the Schwarzschild metric — a simplified,
        non-rotating case. Real black holes spin and rotate.
      </SimplifiedNote>
    </InteractiveShell>
  );
}

function ClockFace({ rotating, speed }: { rotating: boolean; speed: number }) {
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const handRef = useRef<SVGGElement>(null);
  const speedRef = useRef(speed);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (rotating) {
        angleRef.current += speedRef.current * dt * 360;
        if (handRef.current) {
          handRef.current.style.transform = `rotate(${angleRef.current}deg)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rotating]);

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="3" fill="#22d3ee" />
      <g ref={handRef} style={{ transformOrigin: '50px 50px', transformBox: 'fill-box' } as React.CSSProperties}>
        <line x1="50" y1="50" x2="50" y2="20" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Tick marks */}
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 50 + Math.cos(rad) * 38;
        const y1 = 50 + Math.sin(rad) * 38;
        const x2 = 50 + Math.cos(rad) * 44;
        const y2 = 50 + Math.sin(rad) * 44;
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#364b6b" strokeWidth="1.5" />;
      })}
    </svg>
  );
}
