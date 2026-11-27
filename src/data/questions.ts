export type Section = {
  heading: string;
  body: string;
  fact?: string;
};

export type Question = {
  id: string;
  question: string;
  category: string;
  readTime: string;
  /** gradient pair for the card artwork */
  gradient: [string, string];
  /** emoji-free SVG scene identifier */
  scene: 'earth' | 'spacetime' | 'fusion' | 'ocean' | 'brain' | 'aurora' | 'gravity';
  tagline: string;
  intro: string;
  sections: Section[];
  related: string[];
};

export const questions: Question[] = [
  {
    id: 'earth-stop-spinning',
    question: 'What would happen if Earth stopped spinning?',
    category: 'Planetary Science',
    readTime: '4 min',
    gradient: ['#1e3a8a', '#0ea5e9'],
    scene: 'earth',
    tagline: 'A day that never ends, and oceans that race to the poles.',
    intro:
      "Earth rotates at about 1,670 km/h at the equator. That motion shapes everything from weather patterns to the shape of our planet. If it suddenly stopped, the consequences would be almost unimaginably violent — and the aftermath would reshape the world entirely.",
    sections: [
      {
        heading: 'The immediate moment',
        body: 'If Earth stopped abruptly, everything not bolted to bedrock would keep moving eastward at up to 1,670 km/h. Oceans would surge across continents, and anything loose would become a supersonic projectile. A gradual stop, over years, would be far gentler — but no less transformative.',
      },
      {
        heading: 'A world without a bulge',
        body: "Earth's rotation creates a slight equatorial bulge. Without centrifugal force pulling material outward, gravity would slowly pull the planet back toward a perfect sphere. Water currently piled at the equator would migrate toward the poles, flooding high latitudes and exposing a vast equatorial landmass.",
        fact: 'Earth\'s radius at the equator is about 21 km greater than at the poles — entirely because it spins.',
      },
      {
        heading: 'Weather without rotation',
        body: 'The Coriolis effect, which bends winds and currents into the swirling storms we know, would vanish. Weather would flow in simple convection loops: hot air rising at the equator, sinking at the poles. The familiar trade winds and jet streams would disappear, radically altering every climate on Earth.',
      },
      {
        heading: 'Days and nights',
        body: 'A single "day" would last an entire year — six months of sunlight followed by six months of darkness. The scorching day side and freezing night side would create extremes that no ecosystem today is built to survive, leaving only a thin habitable twilight band.',
      },
    ],
    related: ['why-time-slow-near-mass', 'what-causes-auroras', 'how-fusion-reactor-works'],
  },
  {
    id: 'why-time-slow-near-mass',
    question: 'Why does time pass differently near massive objects?',
    category: 'Physics & Relativity',
    readTime: '5 min',
    gradient: ['#7c3aed', '#312e81'],
    scene: 'spacetime',
    tagline: 'Gravity is not a force — it is the shape of time itself.',
    intro:
      "Einstein's general relativity revealed that massive objects warp the fabric of spacetime. This warping bends light, curves orbits, and — most strikingly — changes the rate at which clocks tick. Time is not a universal backdrop; it flexes depending on where you are.",
    sections: [
      {
        heading: 'Spacetime as a fabric',
        body: 'Imagine spacetime as a stretched sheet. Place a heavy ball on it and the sheet curves. Smaller objects roll toward the depression — not because they are "pulled," but because the geometry tells them to follow that path. Mass and energy are the same thing as spacetime curvature.',
      },
      {
        heading: 'Gravitational time dilation',
        body: 'A clock deep in a gravitational well — near a star, a planet, or especially a black hole — ticks slower than one far away. This has been measured with atomic clocks just one meter apart in height. Your head ages slightly faster than your feet.',
        fact: 'GPS satellites must correct for time dilation: without it, positions would drift by about 10 km per day.',
      },
      {
        heading: 'The black hole edge',
        body: 'Near a black hole, time dilation becomes extreme. To a distant observer, someone falling toward the event horizon appears to slow and freeze, their image reddening and fading. From the faller\'s perspective, time runs normally — they simply cross the horizon in finite personal time.',
      },
    ],
    related: ['earth-stop-spinning', 'gravity-simulation', 'what-causes-auroras'],
  },
  {
    id: 'how-fusion-reactor-works',
    question: 'Could we ever build a working fusion reactor?',
    category: 'Energy & Engineering',
    readTime: '5 min',
    gradient: ['#dc2626', '#f59e0b'],
    scene: 'fusion',
    tagline: 'Recreating the heart of a star, inside a machine.',
    intro:
      'Fusion powers every star. Squeeze light nuclei together hard enough and they merge, releasing enormous energy from the tiny mass they lose. For seventy years, engineers have chased the dream of a clean, near-limitless power source by bottling a miniature sun on Earth.',
    sections: [
      {
        heading: 'The problem of confinement',
        body: 'To fuse, nuclei must overcome their electric repulsion. That takes temperatures above 100 million degrees — hot enough to strip electrons and form plasma. No material holds that, so we confine plasma with magnetic fields (tokamaks) or crush it with lasers (inertial confinement).',
        fact: 'The ITER tokamak, under construction in France, will weigh 23,000 tonnes — three times the Eiffel Tower.',
      },
      {
        heading: 'Magnetic bottles',
        body: 'A tokamak wraps plasma in a doughnut-shaped magnetic cage. Currents and fields spin the plasma, keeping it from touching the walls. The challenge is stability: turbulence ripples through the plasma, and even a brief touch can quench the reaction.',
      },
      {
        heading: 'Net energy, at last',
        body: 'In December 2022, a US laser fusion experiment released more energy than the fuel absorbed — a historic first. Magnetic fusion has since set duration records. The remaining hurdles are engineering, not physics: sustaining the burn, capturing the heat, and breeding the tritium fuel.',
      },
    ],
    related: ['earth-stop-spinning', 'why-time-slow-near-mass'],
  },
  {
    id: 'deep-ocean-mystery',
    question: "What's hidden in the deepest parts of the ocean?",
    category: 'Earth & Ocean',
    readTime: '4 min',
    gradient: ['#0c4a6e', '#1e293b'],
    scene: 'ocean',
    tagline: 'We have mapped Mars better than the floor of our own planet.',
    intro:
      'The deep ocean covers most of Earth, yet less than a quarter of the seafloor has been mapped to modern resolution. In the perpetual dark, under crushing pressure, life thrives in forms that challenge everything we assume a habitable world needs.',
    sections: [
      {
        heading: 'A world without light',
        body: 'Below 1,000 metres, no sunlight penetrates. Animals generate their own light through bioluminescence — flashing lures, glowing camouflage, and mating signals written in cold blue fire. Entire ecosystems run on chemical energy, not photosynthesis.',
        fact: 'The deep-sea anglerfish\'s lure glows using light produced by symbiotic bacteria living inside it.',
      },
      {
        heading: 'Life without the sun',
        body: 'Around hydrothermal vents, water heated by magma bursts through mineral chimneys. Tube worms and clams feed on bacteria that convert sulfur into energy — chemosynthesis. These oases suggest life could exist on ocean worlds like Europa or Enceladus.',
      },
      {
        heading: 'The crushing deep',
        body: 'Pressure at the deepest point, the Mariana Trench\'s Challenger Deep, is over 1,000 atmospheres — the weight of a dozen jumbo jets on a single square inch. Only a handful of crewed vessels have ever visited, and most of the trench remains unexplored.',
      },
    ],
    related: ['earth-stop-spinning', 'how-fusion-reactor-works', 'what-causes-auroras'],
  },
  {
    id: 'brain-consciousness',
    question: 'How does the brain create the feeling of being you?',
    category: 'Mind & Biology',
    readTime: '6 min',
    gradient: ['#be185d', '#4c1d95'],
    scene: 'brain',
    tagline: '86 billion neurons, and a self that somehow emerges from them.',
    intro:
      'The brain is the most complex object we know. From its tangled web of neurons arises memory, imagination, and the intimate sense of a continuous self. How physical matter gives rise to subjective experience remains one of the deepest open questions in science.',
    sections: [
      {
        heading: 'Networks, not parts',
        body: 'No single neuron holds a memory or a thought. Meaning arises from patterns of firing across vast networks. Learning physically rewires these connections, strengthening pathways used often and pruning those left idle.',
        fact: 'A cubic millimetre of brain contains roughly a kilometre of wiring — about 50,000 neurons and 300 million synapses.',
      },
      {
        heading: 'The predictator',
        body: 'Modern neuroscience suggests the brain is a prediction machine. It constantly models the world and updates its guesses from sensory input. What you perceive is not reality directly, but the brain\'s best hallucination, corrected by the senses.',
      },
      {
        heading: 'The hard problem',
        body: 'We can describe which circuits light up when you see red or feel pain. But why those firings are accompanied by a subjective experience at all — the "what it is like" — is the hard problem of consciousness. It has no agreed solution.',
      },
    ],
    related: ['why-time-slow-near-mass', 'deep-ocean-mystery', 'what-causes-auroras'],
  },
  {
    id: 'what-causes-auroras',
    question: 'What causes the dancing lights of the aurora?',
    category: 'Space & Atmosphere',
    readTime: '3 min',
    gradient: ['#15803d', '#0e7490'],
    scene: 'aurora',
    tagline: 'Particles from the Sun, caught in Earth\'s magnetic cage.',
    intro:
      'Auroras are a visible conversation between the Sun and Earth. Charged particles streaming off the Sun slam into our magnetic shield, slide along field lines toward the poles, and dump their energy into the upper atmosphere — lighting it up in rippling curtains of green and violet.',
    sections: [
      {
        heading: 'The solar wind',
        body: 'The Sun constantly sheds a stream of charged particles — the solar wind. When a gust hits Earth, it compresses and distorts our magnetic field, funnelling particles into the polar regions where field lines plunge toward the surface.',
        fact: 'Auroras are not unique to Earth. Jupiter and Saturn have them too, and they are far larger and more energetic.',
      },
      {
        heading: 'Light from collisions',
        body: 'As particles strike oxygen and nitrogen atoms 100 km up, they transfer energy. The atoms release it as photons: oxygen glows green and red, nitrogen blue and violet. The colours map to the altitude and gas involved.',
      },
      {
        heading: 'Space weather',
        body: 'Strong solar storms can push auroras far beyond the poles — sometimes as far south as the tropics. The same storms can disrupt satellites and power grids, making auroras both a spectacle and a warning.',
      },
    ],
    related: ['earth-stop-spinning', 'why-time-slow-near-mass', 'deep-ocean-mystery'],
  },
  {
    id: 'gravity-simulation',
    question: 'How does gravity actually pull things together?',
    category: 'Physics & Relativity',
    readTime: 'Interactive',
    gradient: ['#0891b2', '#1e293b'],
    scene: 'gravity',
    tagline: 'Try it yourself — adjust the mass and watch the pull change.',
    intro:
      "Newton described gravity as a pull between any two masses, weakening with the square of the distance. This simple law explains falling apples, orbiting moons, and entire galaxies. The simulation below lets you feel how changing mass and distance changes that invisible pull.",
    sections: [
      {
        heading: 'The inverse-square law',
        body: 'Double the distance between two masses and the force drops to a quarter. Double the mass and it doubles. This elegant relationship, written F = G·m₁·m₂ / r², has held for every gravitational measurement ever made.',
        fact: 'Newton\'s constant G is about 6.674 × 10⁻¹¹ — gravity is by far the weakest of the four fundamental forces.',
      },
      {
        heading: 'Why orbits work',
        body: 'An orbit is falling and missing. Move sideways fast enough and the ground curves away as fast as you fall toward it. The Moon is perpetually falling toward Earth — it just keeps missing. Adjust the velocity in the sim and watch an orbit collapse or escape.',
      },
    ],
    related: ['why-time-slow-near-mass', 'earth-stop-spinning', 'how-fusion-reactor-works'],
  },
];

export const categories = [
  'All',
  'Planetary Science',
  'Physics & Relativity',
  'Energy & Engineering',
  'Earth & Ocean',
  'Mind & Biology',
  'Space & Atmosphere',
];

export function getQuestion(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
