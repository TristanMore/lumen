import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Rocket } from 'lucide-react';
import { InteractiveShell, CtrlButton, Slider, SimplifiedNote } from './InteractiveShell';

/**
 * Rocket thrust simulator. Demonstrates Newton's third law:
 * fuel mass thrown backward at speed produces forward thrust.
 * Adjust exhaust velocity and fuel rate to see how thrust changes.
 */
export function RocketThrustSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [running, setRunning] = useState(true);
  const [exhaustVel, setExhaustVel] = useState(3000);
  const [fuelRate, setFuelRate] = useState(50);

  const stateRef = useRef({ rocketY: 0, rocketV: 0, fuel: 100, particles: [] as { x: number; y: number; vx: number; vy: number; life: number }[] });

  const thrust = (exhaustVel * fuelRate) / 1000; // simplified

  useEffect(() => {
    let last = performance.now();
    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const s = stateRef.current;

      if (running && s.fuel > 0) {
        const thrustForce = (exhaustVel * fuelRate) / 100000;
        s.rocketV += thrustForce * dt * 60;
        s.rocketY += s.rocketV * dt * 60;
        s.fuel = Math.max(0, s.fuel - fuelRate * dt * 0.3);

        // Spawn exhaust particles
        if (Math.random() < fuelRate / 50) {
          s.particles.push({
            x: w / 2 + (Math.random() - 0.5) * 8,
            y: h - 40 + s.rocketY,
            vx: (Math.random() - 0.5) * 2,
            vy: 3 + Math.random() * 4,
            life: 1,
          });
        }
      }

      // Wrap rocket position for continuous view
      const displayY = ((s.rocketY % (h * 0.4)) + h * 0.4) % (h * 0.4);

      // Update particles
      s.particles = s.particles.filter((p) => p.life > 0);
      s.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
      });

      // Render
      ctx.fillStyle = '#070d18';
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (let i = 0; i < 30; i++) {
        const sx = (i * 47) % w;
        const sy = (i * 83 + (running ? s.rocketY * 0.3 : 0)) % h;
        ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.2})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ground
      ctx.fillStyle = '#0f1828';
      ctx.fillRect(0, h - 30, w, 30);

      // Exhaust particles
      s.particles.forEach((p) => {
        const alpha = p.life;
        const color = p.life > 0.5 ? '#fbbf24' : '#dc2626';
        ctx.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rocket body
      const rx = w / 2;
      const ry = h - 60 - displayY;
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(rx, ry - 25);
      ctx.lineTo(rx - 10, ry + 10);
      ctx.lineTo(rx + 10, ry + 10);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(rx - 6, ry + 5);
      ctx.lineTo(rx - 10, ry + 15);
      ctx.lineTo(rx - 4, ry + 12);
      ctx.closePath();
      ctx.moveTo(rx + 6, ry + 5);
      ctx.lineTo(rx + 10, ry + 15);
      ctx.lineTo(rx + 4, ry + 12);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(rx, ry - 12, 3, 0, Math.PI * 2);
      ctx.fill();

      // HUD
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Thrust: ${thrust.toFixed(0)} kN`, 12, 24);
      ctx.fillText(`Fuel: ${s.fuel.toFixed(0)}%`, 12, 42);
      ctx.fillText(`Velocity: ${Math.abs(s.rocketV).toFixed(0)} m/s`, 12, 60);

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, exhaustVel, fuelRate, thrust]);

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

  const reset = () => {
    stateRef.current = { rocketY: 0, rocketV: 0, fuel: 100, particles: [] };
  };

  return (
    <InteractiveShell title="Rocket Thrust Simulator" icon={<Rocket className="h-5 w-5 text-accent-300" />}>
      <div className="relative">
        <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
          <canvas ref={canvasRef} className="block h-full w-full rounded-lg" />
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <CtrlButton onClick={() => setRunning((r) => !r)} label={running ? 'Pause' : 'Play'}>
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </CtrlButton>
          <CtrlButton onClick={reset} label="Reset">
            <RotateCcw className="h-4 w-4" />
          </CtrlButton>
        </div>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2">
        <Slider label="Exhaust velocity" value={exhaustVel} min={1000} max={5000} step={100} onChange={setExhaustVel} hint="Faster exhaust = more thrust" />
        <Slider label="Fuel burn rate" value={fuelRate} min={10} max={100} step={5} onChange={setFuelRate} hint="More fuel burned = more thrust, but burns out faster" />
      </div>
      <SimplifiedNote>
        Newton's third law: for every kilogram of exhaust thrown backward at speed, the rocket
        gains an equal and opposite push forward. The thrust equals (exhaust velocity × mass flow rate).
        Real rockets also fight gravity and drag, and must carry their own fuel — which itself weighs.
      </SimplifiedNote>
    </InteractiveShell>
  );
}
