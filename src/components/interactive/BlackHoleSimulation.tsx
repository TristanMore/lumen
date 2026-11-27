import { useEffect, useRef, useState } from 'react';
import { Orbit, Pause, Play, RotateCcw } from 'lucide-react';
import { InteractiveShell, CtrlButton, Slider, SimplifiedNote } from './InteractiveShell';

/**
 * Black hole gravitational lensing visualiser.
 * Shows how a black hole bends light from background stars, creating
 * an Einstein ring. Adjust mass to see the lensing strengthen.
 */
export function BlackHoleSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [running, setRunning] = useState(true);
  const [mass, setMass] = useState(30); // controls lensing strength
  const massRef = useRef(mass);
  useEffect(() => { massRef.current = mass; }, [mass]);

  // Pre-generate background stars
  const starsRef = useRef(
    Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      brightness: 0.3 + Math.random() * 0.7,
    }))
  );

  useEffect(() => {
    let t = 0;
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const m = massRef.current;
      const bhR = m * 0.8; // black hole visual radius
      const einsteinR = m * 2.5; // Einstein ring radius

      // Deep space background
      ctx.fillStyle = '#05080f';
      ctx.fillRect(0, 0, w, h);

      // Draw background stars with lensing distortion
      const stars = starsRef.current;
      for (const star of stars) {
        const sx = star.x * w;
        const sy = star.y * h;
        const dx = sx - cx;
        const dy = sy - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Lensing: stars behind the black hole appear shifted outward
        // and stars near the Einstein ring get magnified
        const lensDist = dist - (einsteinR * einsteinR) / Math.max(dist, 1);
        const lensed = dist < bhR * 1.5 ? dist * 1.3 : lensDist;
        const lx = cx + Math.cos(angle) * lensed;
        const ly = cy + Math.sin(angle) * lensed;

        // Magnification near Einstein ring
        const ringProximity = Math.abs(dist - einsteinR) / einsteinR;
        const magnification = Math.max(0.5, 2 - ringProximity * 2);

        // Skip stars that end up inside the event horizon
        if (Math.sqrt((lx - cx) ** 2 + (ly - cy) ** 2) < bhR) continue;

        const brightness = star.brightness * magnification;
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, brightness)})`;
        ctx.beginPath();
        ctx.arc(lx, ly, 0.8 + magnification * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Accretion disk
      const diskGrad = ctx.createRadialGradient(cx, cy, bhR, cx, cy, bhR * 4);
      diskGrad.addColorStop(0, 'rgba(251,191,36,0.0)');
      diskGrad.addColorStop(0.3, 'rgba(251,146,60,0.4)');
      diskGrad.addColorStop(0.6, 'rgba(220,38,38,0.2)');
      diskGrad.addColorStop(1, 'rgba(124,58,237,0)');
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.005);
      ctx.scale(1, 0.25);
      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.arc(0, 0, bhR * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Einstein ring (bright ring at einsteinR)
      ctx.strokeStyle = `rgba(253,224,71,${0.3 + Math.sin(t * 0.03) * 0.1})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, einsteinR, 0, Math.PI * 2);
      ctx.stroke();

      // Photon sphere glow
      const photonGrad = ctx.createRadialGradient(cx, cy, bhR * 0.8, cx, cy, bhR * 1.5);
      photonGrad.addColorStop(0, 'rgba(255,200,100,0)');
      photonGrad.addColorStop(0.5, 'rgba(255,180,80,0.3)');
      photonGrad.addColorStop(1, 'rgba(255,150,50,0)');
      ctx.fillStyle = photonGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, bhR * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Event horizon (pure black)
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(cx, cy, bhR, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Mass: ${m} (relative)`, 12, 24);
      ctx.fillText(`Einstein ring: ${einsteinR.toFixed(0)}px`, 12, 42);

      if (running) t += 1;
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

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
    <InteractiveShell title="Black Hole Lensing" icon={<Orbit className="h-5 w-5 text-accent-300" />}>
      <div className="relative">
        <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
          <canvas ref={canvasRef} className="block h-full w-full rounded-lg" />
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <CtrlButton onClick={() => setRunning((r) => !r)} label={running ? 'Pause' : 'Play'}>
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </CtrlButton>
          <CtrlButton onClick={() => setMass(30)} label="Reset">
            <RotateCcw className="h-4 w-4" />
          </CtrlButton>
        </div>
      </div>
      <div className="p-5">
        <Slider label="Black hole mass" value={mass} min={10} max={60} step={2} onChange={setMass} hint="Heavier = larger event horizon and stronger lensing" />
      </div>
      <SimplifiedNote>
        A black hole bends light so strongly that stars behind it appear smeared into a ring —
        the Einstein ring. This simplified visualiser exaggerates the effect for clarity. Real
        gravitational lensing was first observed during a 1919 solar eclipse, confirming
        Einstein's general relativity.
      </SimplifiedNote>
    </InteractiveShell>
  );
}
