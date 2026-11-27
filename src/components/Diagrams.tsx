/**
 * Static SVG diagrams and charts that render inside content blocks.
 * Each component is a self-contained informational graphic.
 * The `key` from the content_blocks config field selects which to render.
 */

type DiagramProps = { className?: string };

/* ---- Diagram registry ---- */
export function Diagram({ diagramKey, className }: { diagramKey: string; className?: string }) {
  const diagrams: Record<string, React.FC<DiagramProps>> = {
    'earth-rotation': EarthRotationDiagram,
    'spacetime-warp': SpacetimeWarpDiagram,
    'tokamak': TokamakDiagram,
    'neuron-network': NeuronNetworkDiagram,
    'aurora-magnetic': AuroraMagneticDiagram,
    'sunset-scatter': SunsetScatterDiagram,
    'vaccine-response': VaccineResponseDiagram,
    'black-hole-anatomy': BlackHoleAnatomyDiagram,
    'climate-cascade': ClimateCascadeDiagram,
    'mycorrhizal': MycorrhizalDiagram,
    'rocket-staging': RocketStagingDiagram,
  };
  const Cmp = diagrams[diagramKey];
  if (!Cmp) return null;
  return <Cmp className={className} />;
}

/* ---- Chart registry ---- */
export function Chart({ chartKey, className }: { chartKey: string; className?: string }) {
  const charts: Record<string, React.FC<DiagramProps>> = {
    'fusion-progress': FusionProgressChart,
    'ocean-zones': OceanZonesChart,
    'antibody-response': AntibodyResponseChart,
    'tipping-thresholds': TippingThresholdsChart,
    'sleep-cycles': SleepCyclesChart,
  };
  const Cmp = charts[chartKey];
  if (!Cmp) return null;
  return <Cmp className={className} />;
}

/* ============================================================
   DIAGRAMS
   ============================================================ */

function Shell({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={`my-6 overflow-hidden rounded-2xl border border-white/8 bg-ink-900/50 ${className}`}>
      {title && (
        <figcaption className="border-b border-white/8 bg-ink-950/40 px-4 py-2.5 text-xs font-500 uppercase tracking-wider text-ink-400">
          {title}
        </figcaption>
      )}
      <div className="p-4">{children}</div>
    </figure>
  );
}

function Label({ x, y, children, anchor = 'middle' }: { x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end' }) {
  return <text x={x} y={y} fill="#9fb1ca" fontSize="11" fontFamily="Inter, sans-serif" textAnchor={anchor}>{children}</text>;
}

function EarthRotationDiagram({ className }: DiagramProps) {
  return (
    <Shell title="Earth's rotation and the equatorial bulge" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        <defs>
          <radialGradient id="er-earth" cx="40%" cy="40%" r="60%">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#0c4a6e" />
          </radialGradient>
        </defs>
        {/* Rotating sphere (elliptical to show bulge) */}
        <ellipse cx="140" cy="110" rx="65" ry="58" fill="url(#er-earth)" />
        <ellipse cx="140" cy="110" rx="65" ry="58" fill="none" stroke="#7dd3fc" strokeOpacity="0.4" strokeWidth="2" />
        {/* Rotation arrow */}
        <path d="M100 70 A 50 40 0 0 1 180 70" fill="none" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#er-arrow)" />
        <defs>
          <marker id="er-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#22d3ee" />
          </marker>
        </defs>
        {/* Equator line */}
        <ellipse cx="140" cy="110" rx="65" ry="8" fill="none" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 3" />
        <Label x={140} y={185}>Equator (bulged by rotation)</Label>
        {/* Non-rotating comparison */}
        <circle cx="300" cy="110" r="55" fill="url(#er-earth)" />
        <circle cx="300" cy="110" r="55" fill="none" stroke="#94a3b8" strokeOpacity="0.4" strokeWidth="2" />
        <Label x={300} y={185}>No rotation (spherical)</Label>
        {/* Arrow between */}
        <path d="M210 110 L230 110" fill="none" stroke="#6a82a6" strokeWidth="1.5" markerEnd="url(#er-arrow2)" />
        <defs>
          <marker id="er-arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#6a82a6" />
          </marker>
        </defs>
        <Label x={140} y={205}>Spinning: 21 km bulge</Label>
        <Label x={300} y={205}>Still: no bulge</Label>
      </svg>
    </Shell>
  );
}

function SpacetimeWarpDiagram({ className }: DiagramProps) {
  return (
    <Shell title="Spacetime curvature around a mass" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        <g stroke="#a5f3fc" strokeOpacity="0.3" fill="none" strokeWidth="1">
          {[20, 50, 80, 110, 140, 170, 200].map((y, i) => {
            const dip = Math.max(0, 70 - Math.abs(i - 3) * 18);
            return <path key={i} d={`M0 ${y} Q200 ${y + dip} 400 ${y}`} />;
          })}
          {[40, 100, 160, 220, 280, 340, 400].map((x) => (
            <path key={x} d={`M${x} 20 Q${x} ${140} ${x} 200`} />
          ))}
        </g>
        {/* Mass */}
        <circle cx="200" cy="130" r="16" fill="#fbbf24" />
        <circle cx="200" cy="130" r="16" fill="none" stroke="#fef3c7" strokeOpacity="0.5" strokeWidth="2" />
        <Label x={200} y={170}>Mass warps spacetime</Label>
        {/* Orbiting object */}
        <circle cx="290" cy="80" r="5" fill="#e2e8f0" />
        <path d="M290 80 Q250 95 210 125" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <Label x={300} y={72} anchor="start">following the curve</Label>
      </svg>
    </Shell>
  );
}

function TokamakDiagram({ className }: DiagramProps) {
  return (
    <Shell title="Tokamak: a magnetic bottle for plasma" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        {/* Torus outer */}
        <ellipse cx="200" cy="110" rx="120" ry="55" fill="none" stroke="#fbbf24" strokeOpacity="0.2" strokeWidth="12" />
        <ellipse cx="200" cy="110" rx="120" ry="55" fill="none" stroke="#fbbf24" strokeOpacity="0.4" strokeWidth="2" />
        {/* Torus inner */}
        <ellipse cx="200" cy="110" rx="75" ry="34" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" />
        {/* Magnetic field coils */}
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 120;
          const y = 110 + Math.sin(rad) * 55;
          return <ellipse key={a} cx={x} cy={y} rx="10" ry="18" fill="none" stroke="#7dd3fc" strokeOpacity="0.4" strokeWidth="2" />;
        })}
        {/* Plasma core */}
        <radialGradient id="tk-plasma">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>
        <ellipse cx="200" cy="110" rx="30" ry="13" fill="url(#tk-plasma)" />
        {/* Labels */}
        <Label x={200} y={20}>Magnetic field coils</Label>
        <Label x={200} y={200}>Confined plasma (100M+ degrees)</Label>
        <line x1="200" y1="28" x2="200" y2="50" stroke="#6a82a6" strokeWidth="1" />
        <line x1="200" y1="185" x2="200" y2="165" stroke="#6a82a6" strokeWidth="1" />
      </svg>
    </Shell>
  );
}

function NeuronNetworkDiagram({ className }: DiagramProps) {
  const nodes = [
    [60, 50], [60, 110], [60, 170],
    [170, 40], [170, 90], [170, 140], [170, 190],
    [280, 60], [280, 130],
    [360, 100],
  ];
  const edges = [
    [0, 3], [0, 4], [1, 4], [1, 5], [1, 6], [2, 5], [2, 6],
    [3, 7], [4, 7], [4, 8], [5, 8], [6, 8],
    [7, 9], [8, 9],
  ];
  return (
    <Shell title="Neural network: signals flow through layers" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        <g stroke="#f0abfc" strokeOpacity="0.2" strokeWidth="1">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
          ))}
        </g>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="8" fill="#f0abfc" fillOpacity="0.1" />
            <circle cx={x} cy={y} r="4" fill="#f9a8d4" />
            <circle cx={x} cy={y} r="1.5" fill="#fff" />
          </g>
        ))}
        {/* Signal pulse */}
        <circle cx="170" cy="90" r="14" fill="#fbbf24" fillOpacity="0.2" />
        <Label x={60} y={205}>Input</Label>
        <Label x={170} y={215}>Hidden</Label>
        <Label x={280} y={205}>Processing</Label>
        <Label x={360} y={85}>Output</Label>
      </svg>
    </Shell>
  );
}

function AuroraMagneticDiagram({ className }: DiagramProps) {
  return (
    <Shell title="Solar wind funneled by Earth's magnetic field" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        <defs>
          <radialGradient id="au-earth" cx="35%" cy="35%" r="65%">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#0c4a6e" />
          </radialGradient>
        </defs>
        {/* Earth */}
        <circle cx="200" cy="110" r="40" fill="url(#au-earth)" />
        {/* Magnetic field lines */}
        <g stroke="#34d399" strokeOpacity="0.35" fill="none" strokeWidth="1.5">
          <path d="M200 70 C 120 30, 80 30, 60 70 C 40 110, 60 160, 120 170 L 170 150" />
          <path d="M200 70 C 280 30, 320 30, 340 70 C 360 110, 340 160, 280 170 L 230 150" />
          <path d="M200 70 C 100 10, 30 50, 20 110 C 20 170, 100 200, 170 160" />
          <path d="M200 70 C 300 10, 370 50, 380 110 C 380 170, 300 200, 230 160" />
          <path d="M200 150 C 160 170, 140 190, 160 210" />
          <path d="M200 150 C 240 170, 260 190, 240 210" />
        </g>
        {/* Solar wind arrows */}
        <g stroke="#fbbf24" strokeWidth="2" markerEnd="url(#au-arrow)">
          <line x1="10" y1="60" x2="50" y2="65" />
          <line x1="10" y1="110" x2="45" y2="110" />
          <line x1="10" y1="160" x2="50" y2="155" />
        </g>
        <defs>
          <marker id="au-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#fbbf24" />
          </marker>
        </defs>
        {/* Aurora glow at poles */}
        <ellipse cx="200" cy="72" rx="14" ry="4" fill="#34d399" fillOpacity="0.6" />
        <ellipse cx="200" cy="148" rx="14" ry="4" fill="#34d399" fillOpacity="0.6" />
        <Label x={200} y={30}>Aurora</Label>
        <Label x={15} y={195} anchor="start">Solar wind</Label>
      </svg>
    </Shell>
  );
}

function SunsetScatterDiagram({ className }: DiagramProps) {
  return (
    <Shell title="Why sunsets are red: more atmosphere to cross" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        {/* Atmosphere band */}
        <path d="M 20 100 A 180 180 0 0 1 380 100" fill="none" stroke="#1e3a5a" strokeWidth="40" strokeOpacity="0.3" />
        <path d="M 20 100 A 180 180 0 0 1 380 100" fill="none" stroke="#1e3a5a" strokeWidth="40" strokeOpacity="0.15" />
        {/* Earth */}
        <path d="M 20 100 A 180 180 0 0 0 380 100" fill="#0c1b2e" />
        <path d="M 20 100 A 180 180 0 0 0 380 100" fill="none" stroke="#364b6b" strokeWidth="2" />
        {/* Noon sun — short path */}
        <circle cx="200" cy="60" r="10" fill="#fde68a" />
        <line x1="200" y1="60" x2="200" y2="100" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="3 3" />
        <Label x={200} y={50}>Noon — short path</Label>
        <Label x={200} y={48} anchor="middle" >
          <tspan fontSize="10" fill="#7dd3fc">blue scatters, reaches you</tspan>
        </Label>
        {/* Sunset sun — long path */}
        <circle cx="350" cy="85" r="10" fill="#dc2626" />
        <path d="M 350 85 Q 270 95 200 100" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
        <Label x={350} y={75}>Sunset</Label>
        <Label x={275} y={120}>long path — blue lost, red remains</Label>
      </svg>
    </Shell>
  );
}

function VaccineResponseDiagram({ className }: DiagramProps) {
  return (
    <Shell title="How a vaccine trains your immune system" className={className}>
      <svg viewBox="0 0 400 240" className="w-full">
        {/* Step 1: vaccine enters */}
        <circle cx="60" cy="60" r="18" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="2" />
        <text x="60" y="65" fill="#22d3ee" fontSize="10" textAnchor="middle">vaccine</text>
        <Label x={60} y={95}>1. Introduce</Label>
        {/* Arrow */}
        <line x1="85" y1="60" x2="130" y2="60" stroke="#6a82a6" strokeWidth="1.5" markerEnd="url(#vc-arrow)" />
        {/* Step 2: immune cells study */}
        <circle cx="160" cy="60" r="18" fill="#f0abfc" fillOpacity="0.2" stroke="#f0abfc" strokeWidth="2" />
        <text x="160" y="65" fill="#f0abfc" fontSize="8" textAnchor="middle">B-cells</text>
        <Label x={160} y={95}>2. Study</Label>
        <line x1="185" y1="60" x2="230" y2="60" stroke="#6a82a6" strokeWidth="1.5" markerEnd="url(#vc-arrow)" />
        {/* Step 3: antibodies */}
        <g>
          <circle cx="260" cy="60" r="18" fill="#fbbf24" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="2" />
          <text x="260" y="65" fill="#fbbf24" fontSize="8" textAnchor="middle">antibodies</text>
        </g>
        <Label x={260} y={95}>3. Produce</Label>
        <line x1="285" y1="60" x2="330" y2="60" stroke="#6a82a6" strokeWidth="1.5" markerEnd="url(#vc-arrow)" />
        {/* Step 4: memory */}
        <circle cx="360" cy="60" r="18" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="2" />
        <text x="360" y="65" fill="#34d399" fontSize="8" textAnchor="middle">memory</text>
        <Label x={360} y={95}>4. Remember</Label>
        <defs>
          <marker id="vc-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#6a82a6" />
          </marker>
        </defs>
        {/* Real virus encounter */}
        <line x1="200" y1="120" x2="200" y2="150" stroke="#6a82a6" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="200" cy="175" r="16" fill="#dc2626" fillOpacity="0.3" stroke="#dc2626" strokeWidth="2" />
        <text x="200" y="180" fill="#dc2626" fontSize="9" textAnchor="middle">virus</text>
        <Label x={200} y={205}>Later: real threat</Label>
        {/* Fast response arrow */}
        <path d="M 340 75 Q 300 130 225 170" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#vc-arrow2)" />
        <defs>
          <marker id="vc-arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#34d399" />
          </marker>
        </defs>
        <text x="300" y="135" fill="#34d399" fontSize="10">fast neutralisation</text>
      </svg>
    </Shell>
  );
}

function BlackHoleAnatomyDiagram({ className }: DiagramProps) {
  return (
    <Shell title="Anatomy of a black hole" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        {/* Accretion disk */}
        <ellipse cx="200" cy="110" rx="90" ry="20" fill="none" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="6" />
        <ellipse cx="200" cy="110" rx="90" ry="20" fill="none" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1" />
        {/* Photon sphere */}
        <circle cx="200" cy="110" r="32" fill="none" stroke="#fde68a" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Event horizon */}
        <circle cx="200" cy="110" r="22" fill="#000" stroke="#364b6b" strokeWidth="1" />
        {/* Singularity */}
        <circle cx="200" cy="110" r="3" fill="#fff" />
        {/* Labels with lines */}
        <line x1="200" y1="88" x2="200" y2="55" stroke="#6a82a6" strokeWidth="1" />
        <Label x={200} y={48}>Photon sphere</Label>
        <line x1="178" y1="110" x2="130" y2="80" stroke="#6a82a6" strokeWidth="1" />
        <Label x={125} y={75} anchor="end">Event horizon</Label>
        <line x1="200" y1="110" x2="200" y2="175" stroke="#6a82a6" strokeWidth="1" />
        <Label x={200} y={188}>Singularity</Label>
        <line x1="270" y1="110" x2="330" y2="80" stroke="#6a82a6" strokeWidth="1" />
        <Label x={335} y={75} anchor="start">Accretion disk</Label>
        <line x1="200" y1="90" x2="260" y2="130" stroke="#6a82a6" strokeWidth="1" />
        <Label x={265} y={135} anchor="start">Relativistic jets</Label>
        {/* Jets */}
        <line x1="200" y1="110" x2="200" y2="30" stroke="#7dd3fc" strokeOpacity="0.3" strokeWidth="3" />
        <line x1="200" y1="110" x2="200" y2="195" stroke="#7dd3fc" strokeOpacity="0.3" strokeWidth="3" />
      </svg>
    </Shell>
  );
}

function ClimateCascadeDiagram({ className }: DiagramProps) {
  const dominoes = [
    { x: 40, y: 60, label: 'Arctic\nice loss', color: '#7dd3fc' },
    { x: 110, y: 100, label: 'Ocean\ncirculation', color: '#22d3ee' },
    { x: 180, y: 60, label: 'Amazon\ndieback', color: '#34d399' },
    { x: 250, y: 100, label: 'Permafrost\nthaw', color: '#fbbf24' },
    { x: 320, y: 60, label: 'Ice sheet\ncollapse', color: '#dc2626' },
  ];
  return (
    <Shell title="Tipping point cascade: one triggers the next" className={className}>
      <svg viewBox="0 0 400 200" className="w-full">
        {dominoes.map((d, i) => (
          <g key={i}>
            <rect x={d.x - 25} y={d.y - 25} width="50" height="50" rx="6" fill={d.color} fillOpacity="0.15" stroke={d.color} strokeOpacity="0.5" strokeWidth="1.5" />
            {d.label.split('\n').map((line, j) => (
              <text key={j} x={d.x} y={d.y - 3 + j * 11} fill="#e9eef6" fontSize="9" textAnchor="middle" fontFamily="Inter">{line}</text>
            ))}
          </g>
        ))}
        {/* Cascade arrows */}
        {dominoes.slice(0, -1).map((d, i) => {
          const next = dominoes[i + 1];
          return <path key={i} d={`M${d.x + 25} ${d.y} Q ${(d.x + next.x) / 2} ${d.y - 20} ${next.x - 25} ${next.y}`} fill="none" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1.5" markerEnd="url(#cc-arrow)" />;
        })}
        <defs>
          <marker id="cc-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#f59e0b" />
          </marker>
        </defs>
        <Label x={200} y={170}>Each tipping point increases the odds of the next</Label>
      </svg>
    </Shell>
  );
}

function MycorrhizalDiagram({ className }: DiagramProps) {
  return (
    <Shell title="The wood wide web: fungi connecting trees" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        {/* Trees */}
        {[
          [80, 30, '#166534'], [200, 25, '#15803d'], [320, 30, '#166534'],
        ].map(([x, h, c], i) => (
          <g key={i}>
            <rect x={x - 4} y={120} width="8" height="30" fill="#4c1d95" />
            <path d={`M${x} ${120 - h} L${x - 30} 120 L${x + 30} 120 Z`} fill={c as string} />
            <path d={`M${x} ${120 - h + 15} L${x - 22} 120 L${x + 22} 120 Z`} fill={c as string} opacity="0.8" />
          </g>
        ))}
        {/* Fungal network underground */}
        <g stroke="#f0abfc" strokeOpacity="0.3" strokeWidth="1" fill="none">
          <path d="M80 150 Q 140 160 200 150 Q 260 160 320 150" />
          <path d="M80 150 Q 120 175 200 165 Q 280 175 320 150" />
          <path d="M80 155 Q 160 190 320 155" />
          <path d="M80 150 Q 100 165 130 155" />
          <path d="M200 150 Q 240 170 280 158" />
        </g>
        {/* Fungal nodes */}
        {[
          [130, 165], [160, 180], [240, 170], [270, 180], [180, 188],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#f0abfc" fillOpacity="0.6" />
        ))}
        {/* Sugar flow indicators */}
        <circle cx="160" cy="180" r="6" fill="#fbbf24" fillOpacity="0.3" />
        <Label x={200} y={210}>Roots + mycelium: nutrient and signal sharing</Label>
        {/* Nutrient dots flowing */}
        {[
          [100, 155], [220, 160], [290, 162],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#fbbf24" fillOpacity="0.7" />
        ))}
      </svg>
    </Shell>
  );
}

function RocketStagingDiagram({ className }: DiagramProps) {
  return (
    <Shell title="Why rockets stage: the tyranny of the fuel equation" className={className}>
      <svg viewBox="0 0 400 220" className="w-full">
        {/* Full rocket */}
        <g transform="translate(60, 20)">
          <rect x="-15" y="0" width="30" height="60" rx="3" fill="#e2e8f0" />
          <path d="M-15 0 L0 -20 L15 0 Z" fill="#dc2626" />
          <rect x="-15" y="60" width="30" height="50" fill="#94a3b8" />
          <rect x="-15" y="110" width="30" height="40" fill="#6a82a6" />
          <Label x={0} y={170}>Stage 1+2+3</Label>
          <Label x={0} y={185}>100% fuel</Label>
        </g>
        {/* Arrow */}
        <line x1="110" y1="90" x2="160" y2="90" stroke="#6a82b6" strokeWidth="1.5" markerEnd="url(#rs-arrow)" />
        {/* After stage 1 dropped */}
        <g transform="translate(200, 40)">
          <rect x="-12" y="0" width="24" height="50" rx="3" fill="#e2e8f0" />
          <path d="M-12 0 L0 -16 L12 0 Z" fill="#dc2626" />
          <rect x="-12" y="50" width="24" height="35" fill="#94a3b8" />
          <Label x={0} y={100}>Stage 2+3</Label>
          <Label x={0} y={115}>empty tank dropped</Label>
        </g>
        {/* Dropped stage */}
        <g opacity="0.3" transform="translate(200, 160)">
          <rect x="-12" y="0" width="24" height="30" fill="#6a82a6" />
          <Label x={0} y={45}>jettisoned</Label>
        </g>
        <line x1="250" y1="90" x2="300" y2="90" stroke="#6a82a6" strokeWidth="1.5" markerEnd="url(#rs-arrow)" />
        {/* Final stage */}
        <g transform="translate(340, 55)">
          <rect x="-10" y="0" width="20" height="35" rx="3" fill="#e2e8f0" />
          <path d="M-10 0 L0 -14 L10 0 Z" fill="#dc2626" />
          <Label x={0} y={60}>Payload</Label>
        </g>
        <defs>
          <marker id="rs-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#6a82a6" />
          </marker>
        </defs>
      </svg>
    </Shell>
  );
}

/* ============================================================
   CHARTS
   ============================================================ */

function ChartShell({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={`my-6 overflow-hidden rounded-2xl border border-white/8 bg-ink-900/50 ${className}`}>
      <figcaption className="border-b border-white/8 bg-ink-950/40 px-4 py-2.5 text-xs font-500 uppercase tracking-wider text-ink-400">
        {title}
      </figcaption>
      <div className="p-5">{children}</div>
    </figure>
  );
}

function FusionProgressChart({ className }: DiagramProps) {
  // Approximate Q values from major fusion experiments
  const data = [
    { year: 1970, q: 0.0001, label: 'Early tokamaks' },
    { year: 1985, q: 0.01, label: 'TFTR' },
    { year: 1997, q: 0.67, label: 'JET' },
    { year: 2010, q: 1.0, label: 'NIF' },
    { year: 2022, q: 1.5, label: 'NIF net gain' },
  ];
  const maxQ = 1.6;
  const w = 360;
  const h = 180;
  const pad = 40;
  const chartW = w - pad * 2;
  const chartH = h - pad;
  const minYear = 1965;
  const maxYear = 2025;
  const xScale = (year: number) => pad + ((year - minYear) / (maxYear - minYear)) * chartW;
  const yScale = (q: number) => h - pad - (q / maxQ) * chartH;

  return (
    <ChartShell title="Fusion energy gain (Q) over decades" className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Grid */}
        {[0, 0.5, 1.0, 1.5].map((q) => (
          <g key={q}>
            <line x1={pad} y1={yScale(q)} x2={w - pad} y2={yScale(q)} stroke="#1a2538" strokeWidth="1" />
            <text x={pad - 8} y={yScale(q) + 4} fill="#6a82a6" fontSize="10" textAnchor="end">{q.toFixed(1)}</text>
          </g>
        ))}
        {/* Break-even line */}
        <line x1={pad} y1={yScale(1)} x2={w - pad} y2={yScale(1)} stroke="#34d399" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={w - pad} y={yScale(1) - 5} fill="#34d399" fontSize="9" textAnchor="end">break-even (Q=1)</text>
        {/* Data line */}
        <path d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.year)} ${yScale(d.q)}`).join(' ')} fill="none" stroke="#22d3ee" strokeWidth="2" />
        {/* Data points */}
        {data.map((d) => (
          <g key={d.year}>
            <circle cx={xScale(d.year)} cy={yScale(d.q)} r="4" fill="#22d3ee" />
            <circle cx={xScale(d.year)} cy={yScale(d.q)} r="4" fill="none" stroke="#0f1828" strokeWidth="1" />
            <text x={xScale(d.year)} y={h - pad + 18} fill="#6a82a6" fontSize="9" textAnchor="middle">{d.year}</text>
          </g>
        ))}
        {/* Axis label */}
        <text x={pad - 25} y={h / 2} fill="#9fb1ca" fontSize="10" textAnchor="middle" transform={`rotate(-90 ${pad - 25} ${h / 2})`}>Q (energy gain)</text>
      </svg>
    </ChartShell>
  );
}

function OceanZonesChart({ className }: DiagramProps) {
  const zones = [
    { name: 'Sunlight', depth: 200, color: '#0ea5e9', desc: 'Photosynthesis' },
    { name: 'Twilight', depth: 1000, color: '#0c4a6e', desc: 'Dim, some light' },
    { name: 'Midnight', depth: 4000, color: '#1e293b', desc: 'Total darkness' },
    { name: 'Abyss', depth: 6000, color: '#0f172a', desc: 'Crushing pressure' },
    { name: 'Trenches', depth: 11000, color: '#020617', desc: 'Deepest point' },
  ];
  const maxD = 11000;
  return (
    <ChartShell title="Ocean depth zones" className={className}>
      <svg viewBox="0 0 360 200" className="w-full">
        {zones.map((z, i) => {
          const top = i === 0 ? 0 : (zones[i - 1].depth / maxD) * 160;
          const bottom = (z.depth / maxD) * 160;
          const h = bottom - top;
          return (
            <g key={z.name}>
              <rect x="30" y={top + 10} width="180" height={h} fill={z.color} fillOpacity="0.3" stroke={z.color} strokeOpacity="0.4" strokeWidth="1" />
              <text x="40" y={top + 10 + h / 2} fill="#e9eef6" fontSize="11" fontFamily="Inter">{z.name}</text>
              <text x="40" y={top + 10 + h / 2 + 12} fill="#9fb1ca" fontSize="9" fontFamily="Inter">{z.desc}</text>
              <text x="220" y={top + 10 + h / 2} fill="#6a82a6" fontSize="10" textAnchor="start">{z.depth}m</text>
            </g>
          );
        })}
        <text x="200" y="190" fill="#6a82a6" fontSize="9" textAnchor="middle">Depth (metres)</text>
      </svg>
    </ChartShell>
  );
}

function AntibodyResponseChart({ className }: DiagramProps) {
  // Approximate antibody level curve after vaccination
  const points: [number, number][] = [];
  for (let d = 0; d <= 120; d += 2) {
    let level;
    if (d < 7) level = 5 + (d / 7) * 15;
    else if (d < 21) level = 20 + Math.sin(((d - 7) / 14) * Math.PI * 0.5) * 70;
    else level = 90 * Math.exp(-(d - 21) / 80) + 20;
    points.push([d, Math.min(100, level)]);
  }
  const w = 360;
  const h = 180;
  const pad = 35;
  const maxD = 120;
  const xS = (d: number) => pad + (d / maxD) * (w - pad * 2);
  const yS = (v: number) => h - pad - (v / 100) * (h - pad - 10);

  return (
    <ChartShell title="Antibody response after vaccination" className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={pad} y1={yS(v)} x2={w - pad} y2={yS(v)} stroke="#1a2538" strokeWidth="1" />
            <text x={pad - 5} y={yS(v) + 4} fill="#6a82a6" fontSize="9" textAnchor="end">{v}%</text>
          </g>
        ))}
        {/* Curve */}
        <path d={points.map(([d, v], i) => `${i === 0 ? 'M' : 'L'} ${xS(d)} ${yS(v)}`).join(' ')} fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        {/* Area under curve */}
        <path d={`M${xS(0)} ${yS(0)} ${points.map(([d, v]) => `L${xS(d)} ${yS(v)}`).join(' ')} L${xS(120)} ${yS(0)} Z`} fill="#fbbf24" fillOpacity="0.1" />
        {/* Peak marker */}
        <circle cx={xS(21)} cy={yS(90)} r="4" fill="#fbbf24" />
        <text x={xS(21)} y={yS(90) - 8} fill="#fbbf24" fontSize="9" textAnchor="middle">peak</text>
        {/* Memory baseline */}
        <line x1={xS(40)} y1={yS(20)} x2={xS(120)} y2={yS(20)} stroke="#34d399" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={xS(80)} y={yS(20) - 5} fill="#34d399" fontSize="9" textAnchor="middle">memory baseline</text>
        {/* X labels */}
        {[0, 30, 60, 90, 120].map((d) => (
          <text key={d} x={xS(d)} y={h - pad + 16} fill="#6a82a6" fontSize="9" textAnchor="middle">Day {d}</text>
        ))}
      </svg>
    </ChartShell>
  );
}

function TippingThresholdsChart({ className }: DiagramProps) {
  const systems = [
    { name: 'Arctic ice', threshold: 1.5, range: [1.0, 2.0], current: 1.2, color: '#7dd3fc' },
    { name: 'Greenland ice', threshold: 2.0, range: [1.5, 3.0], current: 1.2, color: '#22d3ee' },
    { name: 'AMOC collapse', threshold: 2.5, range: [1.4, 8.0], current: 1.2, color: '#0ea5e9' },
    { name: 'Amazon dieback', threshold: 3.0, range: [2.0, 6.0], current: 1.2, color: '#34d399' },
    { name: 'Permafrost', threshold: 2.0, range: [1.0, 2.5], current: 1.2, color: '#fbbf24' },
  ];
  const w = 360;
  const h = 180;
  const pad = 80;
  const barH = 22;
  const gap = 8;
  const maxTemp = 8;
  const xS = (t: number) => pad + (t / maxTemp) * (w - pad - 20);

  return (
    <ChartShell title="Climate tipping thresholds (°C warming)" className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Current warming line */}
        <line x1={xS(1.2)} y1={10} x2={xS(1.2)} y2={h - 25} stroke="#dc2626" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={xS(1.2)} y={8} fill="#dc2626" fontSize="9" textAnchor="middle">now: 1.2°C</text>
        {/* Bars */}
        {systems.map((s, i) => {
          const y = 15 + i * (barH + gap);
          return (
            <g key={s.name}>
              <text x={pad - 8} y={y + barH / 2 + 3} fill="#e9eef6" fontSize="10" textAnchor="end">{s.name}</text>
              {/* uncertainty range */}
              <rect x={xS(s.range[0])} y={y} width={xS(s.range[1]) - xS(s.range[0])} height={barH} rx="4" fill={s.color} fillOpacity="0.15" stroke={s.color} strokeOpacity="0.3" strokeWidth="1" />
              {/* threshold marker */}
              <line x1={xS(s.threshold)} y1={y - 2} x2={xS(s.threshold)} y2={y + barH + 2} stroke={s.color} strokeWidth="2" />
              <text x={xS(s.threshold)} y={y - 4} fill={s.color} fontSize="8" textAnchor="middle">{s.threshold}°C</text>
            </g>
          );
        })}
        {/* X axis */}
        {[0, 2, 4, 6, 8].map((t) => (
          <text key={t} x={xS(t)} y={h - 8} fill="#6a82a6" fontSize="9" textAnchor="middle">{t}°C</text>
        ))}
      </svg>
    </ChartShell>
  );
}

function SleepCyclesChart({ className }: DiagramProps) {
  // Hypnogram: awake → light → deep → REM cycles
  // Stages: 0=awake, 1=light, 2=deep, 3=REM
  const stages: [number, number][] = [
    [0, 0], [5, 1], [20, 2], [40, 1], [55, 3], [70, 1],
    [90, 2], [110, 1], [125, 3], [140, 1],
    [160, 2], [175, 1], [195, 3], [210, 1],
    [225, 1], [240, 3], [260, 1], [270, 0],
  ];
  const w = 360;
  const h = 180;
  const padL = 50;
  const padR = 15;
  const padT = 15;
  const padB = 30;
  const maxMin = 270;
  const xS = (m: number) => padL + (m / maxMin) * (w - padL - padR);
  const stageY = (s: number) => {
    const labels = ['Awake', 'REM', 'Light', 'Deep'];
    const idx = [0, 3, 1, 2][s]; // map stage to position
    return padT + (idx / 3) * (h - padT - padB);
  };

  return (
    <ChartShell title="A night of sleep: cycling through stages" className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Stage labels */}
        {['Awake', 'REM', 'Light', 'Deep'].map((label, i) => (
          <text key={label} x={padL - 8} y={padT + (i / 3) * (h - padT - padB) + 4} fill="#9fb1ca" fontSize="9" textAnchor="end">{label}</text>
        ))}
        {/* Grid lines */}
        {['Awake', 'REM', 'Light', 'Deep'].map((_, i) => (
          <line key={i} x1={padL} y1={padT + (i / 3) * (h - padT - padB)} x2={w - padR} y2={padT + (i / 3) * (h - padT - padB)} stroke="#1a2538" strokeWidth="1" />
        ))}
        {/* REM highlight bands */}
        {[55, 125, 195, 240].map((m) => (
          <rect key={m} x={xS(m - 5)} y={padT} width={xS(m + 15) - xS(m - 5)} height={h - padT - padB} fill="#7c3aed" fillOpacity="0.08" />
        ))}
        {/* Sleep stage path */}
        <path d={stages.map(([m, s], i) => `${i === 0 ? 'M' : 'L'} ${xS(m)} ${stageY(s)}`).join(' ')} fill="none" stroke="#22d3ee" strokeWidth="2" />
        {/* X axis */}
        {[0, 60, 120, 180, 240].map((m) => (
          <text key={m} x={xS(m)} y={h - 10} fill="#6a82a6" fontSize="9" textAnchor="middle">{m}m</text>
        ))}
        <text x={(padL + w - padR) / 2} y={h - 1} fill="#6a82a6" fontSize="8" textAnchor="middle">Time asleep (minutes)</text>
      </svg>
    </ChartShell>
  );
}
