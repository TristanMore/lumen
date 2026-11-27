/*
# Seed content blocks — batch 1 (questions 1-8)

Inserts ordered content blocks for the first 8 questions.
Block types: heading, text, fact, diagram, interactive, chart.
The interactive and diagram blocks carry a `config` JSON with a `key` field
that the frontend maps to the corresponding React component.
*/

-- 1. earth-stop-spinning
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'The immediate moment', 'If Earth stopped abruptly, everything not bolted to bedrock would keep moving eastward at up to 1,670 km/h. Oceans would surge across continents, and anything loose would become a supersonic projectile. A gradual stop, over years, would be far gentler — but no less transformative.', NULL),
  (2, 'fact', NULL, 'Earth''s radius at the equator is about 21 km greater than at the poles — entirely because it spins.', NULL),
  (3, 'heading', 'A world without a bulge', 'Without centrifugal force pulling material outward, gravity would slowly pull the planet back toward a perfect sphere. Water currently piled at the equator would migrate toward the poles, flooding high latitudes and exposing a vast equatorial landmass.', NULL),
  (4, 'diagram', NULL, NULL, '{"key":"earth-rotation"}'::jsonb),
  (5, 'heading', 'Weather without rotation', 'The Coriolis effect, which bends winds and currents into the swirling storms we know, would vanish. Weather would flow in simple convection loops: hot air rising at the equator, sinking at the poles. The familiar trade winds and jet streams would disappear, radically altering every climate on Earth.', NULL),
  (6, 'heading', 'Days and nights', 'A single "day" would last an entire year — six months of sunlight followed by six months of darkness. The scorching day side and freezing night side would create extremes that no ecosystem today is built to survive, leaving only a thin habitable twilight band.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'earth-stop-spinning';

-- 2. why-time-slow-near-mass
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'Spacetime as a fabric', 'Imagine spacetime as a stretched sheet. Place a heavy ball on it and the sheet curves. Smaller objects roll toward the depression — not because they are "pulled," but because the geometry tells them to follow that path. Mass and energy are the same thing as spacetime curvature.', NULL),
  (2, 'diagram', NULL, NULL, '{"key":"spacetime-warp"}'::jsonb),
  (3, 'heading', 'Gravitational time dilation', 'A clock deep in a gravitational well — near a star, a planet, or especially a black hole — ticks slower than one far away. This has been measured with atomic clocks just one meter apart in height. Your head ages slightly faster than your feet.', NULL),
  (4, 'fact', NULL, 'GPS satellites must correct for time dilation: without it, positions would drift by about 10 km per day.', NULL),
  (5, 'interactive', NULL, NULL, '{"key":"time-dilation"}'::jsonb),
  (6, 'heading', 'The black hole edge', 'Near a black hole, time dilation becomes extreme. To a distant observer, someone falling toward the event horizon appears to slow and freeze, their image reddening and fading. From the faller''s perspective, time runs normally — they simply cross the horizon in finite personal time.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'why-time-slow-near-mass';

-- 3. how-fusion-reactor-works
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'The problem of confinement', 'To fuse, nuclei must overcome their electric repulsion. That takes temperatures above 100 million degrees — hot enough to strip electrons and form plasma. No material holds that, so we confine plasma with magnetic fields (tokamaks) or crush it with lasers (inertial confinement).', NULL),
  (2, 'fact', NULL, 'The ITER tokamak, under construction in France, will weigh 23,000 tonnes — three times the Eiffel Tower.', NULL),
  (3, 'diagram', NULL, NULL, '{"key":"tokamak"}'::jsonb),
  (4, 'heading', 'Magnetic bottles', 'A tokamak wraps plasma in a doughnut-shaped magnetic cage. Currents and fields spin the plasma, keeping it from touching the walls. The challenge is stability: turbulence ripples through the plasma, and even a brief touch can quench the reaction.', NULL),
  (5, 'heading', 'Net energy, at last', 'In December 2022, a US laser fusion experiment released more energy than the fuel absorbed — a historic first. Magnetic fusion has since set duration records. The remaining hurdles are engineering, not physics: sustaining the burn, capturing the heat, and breeding the tritium fuel.', NULL),
  (6, 'chart', NULL, 'Fusion energy gain (Q) over decades of experiments — each generation pushed closer to the break-even line.', '{"key":"fusion-progress"}'::jsonb)
) AS blk(ord, bt, h, b, c) ON q.slug = 'how-fusion-reactor-works';

-- 4. deep-ocean-mystery
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'A world without light', 'Below 1,000 metres, no sunlight penetrates. Animals generate their own light through bioluminescence — flashing lures, glowing camouflage, and mating signals written in cold blue fire. Entire ecosystems run on chemical energy, not photosynthesis.', NULL),
  (2, 'fact', NULL, 'The deep-sea anglerfish''s lure glows using light produced by symbiotic bacteria living inside it.', NULL),
  (3, 'heading', 'Life without the sun', 'Around hydrothermal vents, water heated by magma bursts through mineral chimneys. Tube worms and clams feed on bacteria that convert sulfur into energy — chemosynthesis. These oases suggest life could exist on ocean worlds like Europa or Enceladus.', NULL),
  (4, 'chart', NULL, 'Depth zones of the ocean — from the sunlit surface to the crushing abyss.', '{"key":"ocean-zones"}'::jsonb),
  (5, 'heading', 'The crushing deep', 'Pressure at the deepest point, the Mariana Trench''s Challenger Deep, is over 1,000 atmospheres — the weight of a dozen jumbo jets on a single square inch. Only a handful of crewed vessels have ever visited, and most of the trench remains unexplored.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'deep-ocean-mystery';

-- 5. brain-consciousness
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'Networks, not parts', 'No single neuron holds a memory or a thought. Meaning arises from patterns of firing across vast networks. Learning physically rewires these connections, strengthening pathways used often and pruning those left idle.', NULL),
  (2, 'fact', NULL, 'A cubic millimetre of brain contains roughly a kilometre of wiring — about 50,000 neurons and 300 million synapses.', NULL),
  (3, 'diagram', NULL, NULL, '{"key":"neuron-network"}'::jsonb),
  (4, 'heading', 'The predictator', 'Modern neuroscience suggests the brain is a prediction machine. It constantly models the world and updates its guesses from sensory input. What you perceive is not reality directly, but the brain''s best hallucination, corrected by the senses.', NULL),
  (5, 'heading', 'The hard problem', 'We can describe which circuits light up when you see red or feel pain. But why those firings are accompanied by a subjective experience at all — the "what it is like" — is the hard problem of consciousness. It has no agreed solution.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'brain-consciousness';

-- 6. what-causes-auroras
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'The solar wind', 'The Sun constantly sheds a stream of charged particles — the solar wind. When a gust hits Earth, it compresses and distorts our magnetic field, funnelling particles into the polar regions where field lines plunge toward the surface.', NULL),
  (2, 'diagram', NULL, NULL, '{"key":"aurora-magnetic"}'::jsonb),
  (3, 'fact', NULL, 'Auroras are not unique to Earth. Jupiter and Saturn have them too, and they are far larger and more energetic.', NULL),
  (4, 'heading', 'Light from collisions', 'As particles strike oxygen and nitrogen atoms 100 km up, they transfer energy. The atoms release it as photons: oxygen glows green and red, nitrogen blue and violet. The colours map to the altitude and gas involved.', NULL),
  (5, 'heading', 'Space weather', 'Strong solar storms can push auroras far beyond the poles — sometimes as far south as the tropics. The same storms can disrupt satellites and power grids, making auroras both a spectacle and a warning.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'what-causes-auroras';

-- 7. gravity-simulation
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'The inverse-square law', 'Double the distance between two masses and the force drops to a quarter. Double the mass and it doubles. This elegant relationship, written F = G·m₁·m₂ / r², has held for every gravitational measurement ever made.', NULL),
  (2, 'fact', NULL, 'Newton''s constant G is about 6.674 × 10⁻¹¹ — gravity is by far the weakest of the four fundamental forces.', NULL),
  (3, 'interactive', NULL, NULL, '{"key":"gravity-sandbox"}'::jsonb),
  (4, 'heading', 'Why orbits work', 'An orbit is falling and missing. Move sideways fast enough and the ground curves away as fast as you fall toward it. The Moon is perpetually falling toward Earth — it just keeps missing. Adjust the velocity in the sim and watch an orbit collapse or escape.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'gravity-simulation';

-- 8. why-sky-blue
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'Scattering sunlight', 'Sunlight is a mix of every colour. When it hits air molecules, shorter wavelengths — blue and violet — scatter in all directions, while longer reds and oranges travel mostly straight. The blue you see is scattered light coming at you from across the sky.', NULL),
  (2, 'interactive', NULL, NULL, '{"key":"light-scattering"}'::jsonb),
  (3, 'fact', NULL, 'Violet scatters even more than blue — but our eyes are far more sensitive to blue, so that is what we see.', NULL),
  (4, 'heading', 'The sunset shift', 'At dawn and dusk, sunlight passes through a thick slice of atmosphere. By the time it reaches you, the blue has already scattered away, leaving only the warm reds, oranges, and golds. The same physics, just more air in the way.', NULL),
  (5, 'diagram', NULL, NULL, '{"key":"sunset-scatter"}'::jsonb)
) AS blk(ord, bt, h, b, c) ON q.slug = 'why-sky-blue';
