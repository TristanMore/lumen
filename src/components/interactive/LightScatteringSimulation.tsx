import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Sun } from 'lucide-react';
import { InteractiveShell, CtrlButton, Slider, SimplifiedNote } from './InteractiveShell';

/**
 * Light scattering simulator. Shows how sunlight scatters off the atmosphere
 * at different sun angles (noon vs. sunset). Adjust the sun angle to see the
 * sky colour shift from deep blue to orange-red.
 */
export function LightScatteringSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [sunAngle, setSunAngle] = useState(90); // 90 = noon, 5 = horizon
  const [running, setRunning] = useState(true);
  const angleRef = useRef(sunAngle);

  useEffect(() => { angleRef.current = sunAngle; }, [sunAngle]);

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
      const angle = angleRef.current;
      const angleRad = (angle * Math.PI) / 180;

      // Path length through atmosphere is inversely proportional to sin(angle)
      const pathFactor = 1 / Math.max(0.08, Math.sin(angleRad));

      // Sky colour: blend from blue (noon) to orange-red (horizon)
      const blueMix = Math.max(0, Math.min(1, Math.sin(angleRad) * 1.5));
      const skyTop = blend('#0a1628', '#1a3a5c', blueMix);
      const skyBottom = blend(
        blend('#f59e0b', '#dc2626', 1 - blueMix),
        '#7dd3fc',
        blueMix
      );

      // Draw sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
      skyGrad.addColorStop(0, skyTop);
      skyGrad.addColorStop(1, skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h * 0.7);

      // Ground
      ctx.fillStyle = '#0c1b2e';
      ctx.fillRect(0, h * 0.7, w, h * 0.3);

      // Sun position
      const sunX = w * 0.5 + Math.cos(angleRad) * w * 0.35;
      const sunY = h * 0.7 - Math.sin(angleRad) * h * 0.55;

      // Sun colour shifts with path length
      const sunColor = blend('#fef3c7', '#dc2626', Math.min(1, pathFactor / 6));

      // Sun glow
      const glowR = 50 + Math.sin(t * 0.03) * 3;
      const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, glowR * 2);
      glow.addColorStop(0, sunColor);
      glow.addColorStop(0.3, `${sunColor}80`);
      glow.addColorStop(1, `${sunColor}00`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, glowR * 2, 0, Math.PI * 2);
      ctx.fill();

      // Sun core
      ctx.fillStyle = sunColor;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Scattered light particles (blue dots in sky)
      const scatterCount = Math.floor(40 * blueMix);
      ctx.fillStyle = 'rgba(125,211,252,0.5)';
      for (let i = 0; i < scatterCount; i++) {
        const px = (i * 73 + t * 0.5) % w;
        const py = (i * 41 + t * 0.3) % (h * 0.65);
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Light rays from sun through atmosphere
      ctx.strokeStyle = `rgba(253,224,71,${0.15 * (1 - blueMix)})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const rayAngle = angleRad + (i - 2) * 0.15;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(sunX + Math.cos(rayAngle) * 200, sunY + Math.sin(rayAngle) * 200);
        ctx.stroke();
      }

      // Info text
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(`Atmosphere path: ${pathFactor.toFixed(1)}×`, 12, 24);
      ctx.fillText(blueMix > 0.5 ? 'Blue scattered widely' : 'Red dominates — blue lost', 12, 42);

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
    <InteractiveShell title="Light Scattering Simulator" icon={<Sun className="h-5 w-5 text-accent-300" />}>
      <div className="relative">
        <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
          <canvas ref={canvasRef} className="block h-full w-full rounded-lg" />
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <CtrlButton onClick={() => setRunning((r) => !r)} label={running ? 'Pause' : 'Play'}>
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </CtrlButton>
          <CtrlButton onClick={() => setSunAngle(90)} label="Reset">
            <RotateCcw className="h-4 w-4" />
          </CtrlButton>
        </div>
      </div>
      <div className="p-5">
        <Slider
          label="Sun angle"
          value={sunAngle}
          min={5}
          max={90}
          step={1}
          onChange={setSunAngle}
          hint="90 = noon (blue sky) · 5 = sunset (orange sky)"
        />
      </div>
      <SimplifiedNote>
        Rayleigh scattering: short blue wavelengths bounce off air molecules in all directions,
        while longer reds pass through. At sunset, light crosses much more atmosphere, so the
        blue is scattered away before reaching you — leaving only warm colours.
      </SimplifiedNote>
    </InteractiveShell>
  );
}

function blend(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16);
  const g1 = parseInt(c1.slice(3, 5), 16);
  const b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16);
  const g2 = parseInt(c2.slice(3, 5), 16);
  const b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
