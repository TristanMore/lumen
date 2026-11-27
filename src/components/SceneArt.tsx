type SceneProps = {
  c1: string;
  c2: string;
  className?: string;
};

export function SceneArt({
  scene,
  gradient,
  className = '',
}: {
  scene: string;
  gradient: [string, string];
  className?: string;
}) {
  const [c1, c2] = gradient;
  const id = `g-${scene}-${c1.replace('#', '')}`;
  switch (scene) {
    case 'earth':
      return <EarthScene id={id} c1={c1} c2={c2} className={className} />;
    case 'spacetime':
      return <SpacetimeScene id={id} c1={c1} c2={c2} className={className} />;
    case 'fusion':
      return <FusionScene id={id} c1={c1} c2={c2} className={className} />;
    case 'ocean':
      return <OceanScene id={id} c1={c1} c2={c2} className={className} />;
    case 'brain':
      return <BrainScene id={id} c1={c1} c2={c2} className={className} />;
    case 'aurora':
      return <AuroraScene id={id} c1={c1} c2={c2} className={className} />;
    case 'gravity':
      return <GravityScene id={id} c1={c1} c2={c2} className={className} />;
    default:
      return null;
  }
}

/* ---------------- Earth ---------------- */
function EarthScene({ id, c1, c2, className }: SceneProps & { id: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="70%" cy="30%" r="80%">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
        <radialGradient id={`${id}-earth`} cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="0.5" stopColor="#0284c7" />
          <stop offset="1" stopColor="#0c4a6e" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      {/* stars */}
      {[
        [40, 30], [80, 60], [30, 110], [340, 40], [370, 120], [310, 200], [20, 180],
        [350, 190], [120, 25], [260, 210],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 0.9} fill="#fff" opacity={0.6 + (i % 3) * 0.13} />
      ))}
      {/* orbit ring */}
      <ellipse cx="200" cy="125" rx="150" ry="40" fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="1" />
      {/* earth */}
      <circle cx="200" cy="125" r="68" fill={`url(#${id}-earth)`} />
      {/* continents */}
      <path d="M170 100 Q185 95 200 105 Q210 115 195 125 Q180 130 172 118 Z" fill="#15803d" opacity="0.7" />
      <path d="M210 135 Q230 130 235 145 Q225 160 215 150 Z" fill="#15803d" opacity="0.7" />
      <path d="M180 150 Q195 155 200 165 Q190 170 180 162 Z" fill="#166534" opacity="0.6" />
      {/* atmosphere glow */}
      <circle cx="200" cy="125" r="72" fill="none" stroke="#7dd3fc" strokeOpacity="0.4" strokeWidth="3" />
    </svg>
  );
}

/* ---------------- Spacetime grid ---------------- */
function SpacetimeScene({ id, c1, c2, className }: SceneProps & { id: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="80%">
          <stop offset="0" stopColor={c1} stopOpacity="0.9" />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
        <radialGradient id={`${id}-well`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#1e1b4b" stopOpacity="0.5" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      {[
        [60, 30], [330, 50], [370, 180], [30, 210], [150, 25], [280, 220], [350, 90],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity={0.7} />
      ))}
      {/* spacetime grid */}
      <g stroke="#a5f3fc" strokeOpacity="0.3" fill="none" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const y = 30 + i * 24;
          const dip = Math.max(0, 60 - Math.abs(i - 4) * 14);
          return (
            <path key={i} d={`M0 ${y} Q200 ${y + dip} 400 ${y}`} />
          );
        })}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const x = i * 40;
          return <path key={i} d={`M${x} 30 Q${x} ${125 + 40} ${x} 220`} />;
        })}
      </g>
      {/* mass sphere */}
      <circle cx="200" cy="130" r="20" fill={`url(#${id}-well)`} />
      <circle cx="200" cy="130" r="12" fill="#fbbf24" opacity="0.9" />
      <circle cx="200" cy="130" r="12" fill="none" stroke="#fef3c7" strokeOpacity="0.5" strokeWidth="2" />
    </svg>
  );
}

/* ---------------- Fusion / plasma ---------------- */
function FusionScene({ id, c1, c2, className }: SceneProps & { id: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="75%">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
        <radialGradient id={`${id}-plasma`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#fbbf24" />
          <stop offset="0.7" stopColor="#dc2626" />
          <stop offset="1" stopColor="#7f1d1d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      {/* tokamak torus */}
      <ellipse cx="200" cy="125" rx="110" ry="45" fill="none" stroke="#fbbf24" strokeOpacity="0.25" strokeWidth="2" />
      <ellipse cx="200" cy="125" rx="110" ry="45" fill="none" stroke="#fbbf24" strokeOpacity="0.15" strokeWidth="8" />
      <ellipse cx="200" cy="125" rx="70" ry="28" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
      {/* magnetic field lines */}
      <g stroke="#a5f3fc" strokeOpacity="0.2" fill="none" strokeWidth="1">
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 110;
          const y = 125 + Math.sin(rad) * 45;
          return <path d={`M200 125 Q${x} ${y - 30} ${x} ${y} Q${x} ${y + 30} 200 125`} />;
        })}
      </g>
      {/* plasma core */}
      <ellipse cx="200" cy="125" rx="30" ry="12" fill={`url(#${id}-plasma)`} />
      <ellipse cx="200" cy="125" rx="14" ry="6" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/* ---------------- Ocean ---------------- */
function OceanScene({ id, c1, c2, className }: SceneProps & { id: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`${id}-vent`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      {/* light rays */}
      <g fill="#7dd3fc" opacity="0.08">
        <path d="M160 0 L140 250 L180 250 L190 0 Z" />
        <path d="M230 0 L220 250 L255 250 L250 0 Z" />
      </g>
      {/* bubbles */}
      {[
        [70, 200], [90, 160], [60, 130], [330, 180], [310, 140], [350, 210], [280, 170],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="#a5f3fc" opacity={0.3 - (250 - y) / 600} />
      ))}
      {/* vent glow */}
      <ellipse cx="200" cy="225" rx="60" ry="30" fill={`url(#${id}-vent)`} />
      {/* vent chimney */}
      <path d="M185 250 L190 215 L210 215 L215 250 Z" fill="#1e293b" />
      {/* tube worms */}
      <g stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <line x1="175" y1="250" x2="172" y2="225" />
        <line x1="182" y1="250" x2="180" y2="218" />
        <line x1="225" y1="250" x2="228" y2="228" />
        <line x1="232" y1="250" x2="234" y2="222" />
      </g>
      {/* anglerfish lure */}
      <line x1="300" y1="90" x2="300" y2="70" stroke="#94a3b8" strokeWidth="1" />
      <circle cx="300" cy="66" r="4" fill="#fbbf24" opacity="0.9" />
      <circle cx="300" cy="66" r="8" fill="#fbbf24" opacity="0.2" />
    </svg>
  );
}

/* ---------------- Brain / neurons ---------------- */
function BrainScene({ id, c1, c2, className }: SceneProps & { id: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="80%">
          <stop offset="0" stopColor={c1} stopOpacity="0.85" />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      {/* neuron network */}
      <g stroke="#f0abfc" strokeOpacity="0.4" strokeWidth="1" fill="none">
        {[
          [100, 60], [100, 60], [180, 50], [180, 50], [260, 70], [260, 70], [320, 60],
          [100, 60], [150, 120], [150, 120], [150, 120], [220, 130], [220, 130], [290, 140],
          [150, 120], [130, 190], [220, 130], [250, 200], [290, 140], [320, 200],
          [180, 50], [220, 130], [260, 70], [290, 140],
        ].map(([x1, y1], i, arr) => {
          if (i % 2 === 0 && arr[i + 1]) {
            const [x2, y2] = arr[i + 1];
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          }
          return null;
        })}
      </g>
      {/* synapse nodes */}
      {[
        [100, 60], [180, 50], [260, 70], [320, 60], [150, 120], [220, 130], [290, 140], [130, 190], [250, 200], [320, 200],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="#f0abfc" opacity="0.15" />
          <circle cx={x} cy={y} r="3" fill="#f9a8d4" />
          <circle cx={x} cy={y} r="1.5" fill="#fff" />
        </g>
      ))}
      {/* firing sparks */}
      {[
        [150, 120], [290, 140],
      ].map(([x, y], i) => (
        <circle key={`s${i}`} cx={x} cy={y} r="10" fill="#fbbf24" opacity="0.3" />
      ))}
    </svg>
  );
}

/* ---------------- Aurora ---------------- */
function AuroraScene({ id, c1, c2, className }: SceneProps & { id: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="0.6" stopColor={c2} />
          <stop offset="1" stopColor={c1} />
        </linearGradient>
        <linearGradient id={`${id}-aurora`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34d399" stopOpacity="0" />
          <stop offset="0.3" stopColor="#34d399" stopOpacity="0.7" />
          <stop offset="0.6" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="1" stopColor="#a5f3fc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      {/* stars */}
      {[
        [50, 20], [100, 40], [300, 25], [360, 50], [200, 15], [70, 60], [330, 80],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity={0.7} />
      ))}
      {/* aurora curtains */}
      <path d="M0 80 Q80 40 160 90 Q240 50 320 100 Q360 80 400 90 L400 180 Q360 160 320 170 Q240 140 160 180 Q80 150 0 170 Z" fill={`url(#${id}-aurora)`} opacity="0.8" />
      <path d="M0 100 Q100 70 200 110 Q300 80 400 120 L400 190 Q300 170 200 200 Q100 180 0 200 Z" fill={`url(#${id}-aurora)`} opacity="0.5" />
      {/* mountain silhouette */}
      <path d="M0 230 L60 190 L120 215 L180 175 L250 210 L320 185 L400 220 L400 250 L0 250 Z" fill="#0c1b2e" />
      {/* reflection */}
      <path d="M0 230 L60 270 L120 245 L180 285 L250 250 L320 275 L400 240 L400 250 L0 250 Z" fill="#0c1b2e" opacity="0.4" />
    </svg>
  );
}

/* ---------------- Gravity ---------------- */
function GravityScene({ id, c1, c2, className }: SceneProps & { id: string }) {
  return (
    <svg viewBox="0 0 400 250" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="75%">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
        <radialGradient id={`${id}-mass`} cx="35%" cy="35%" r="65%">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.6" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      {/* field rings */}
      {[90, 70, 50].map((r, i) => (
        <circle key={i} cx="130" cy="125" r={r} fill="none" stroke="#7dd3fc" strokeOpacity={0.1 + i * 0.08} strokeWidth="1" />
      ))}
      {/* central mass */}
      <circle cx="130" cy="125" r="28" fill={`url(#${id}-mass)`} />
      {/* orbiting body */}
      <circle cx="290" cy="80" r="10" fill="#e2e8f0" />
      <circle cx="290" cy="80" r="10" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" />
      {/* attraction arrow */}
      <path d="M280 86 Q220 100 165 120" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
      <path d="M170 116 L162 122 L170 128" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />
      {[
        [40, 40], [360, 180], [350, 30], [60, 220], [200, 200], [370, 100],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="#fff" opacity="0.5" />
      ))}
    </svg>
  );
}
