/*
# Seed content blocks — batch 2 (questions 9-15)

Inserts ordered content blocks for the remaining 7 questions,
including several with interactive and chart blocks.
*/

-- 9. how-vaccines-work
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'Rehearsing the response', 'A vaccine delivers a harmless piece of a pathogen — a protein, a dead virus, or genetic instructions — so your immune cells can study it. They produce antibodies and train "memory" cells that remember the invader for years or decades.', NULL),
  (2, 'diagram', NULL, NULL, '{"key":"vaccine-response"}'::jsonb),
  (3, 'fact', NULL, 'Your body can make over 10 billion different antibodies — enough to recognise virtually any molecule.', NULL),
  (4, 'chart', NULL, 'Antibody levels after vaccination — the rise, the peak, and the long-lived memory response.', '{"key":"antibody-response"}'::jsonb),
  (5, 'heading', 'Herd immunity', 'When enough people are immune, a pathogen cannot find enough hosts to sustain its spread. This protects those who cannot be vaccinated — infants, the immunocompromised. The threshold depends on how contagious the disease is.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'how-vaccines-work';

-- 10. what-is-black-hole
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'The event horizon', 'The event horizon is not a physical surface — it is a boundary in spacetime. Past it, every path leads inward. You would not notice crossing it; the realisation comes too late, when every direction is "down."', NULL),
  (2, 'interactive', NULL, NULL, '{"key":"black-hole-sim"}'::jsonb),
  (3, 'fact', NULL, 'The supermassive black hole at the centre of galaxy M87 has a mass of 6.5 billion Suns and was photographed in 2019.', NULL),
  (4, 'diagram', NULL, NULL, '{"key":"black-hole-anatomy"}'::jsonb),
  (5, 'heading', 'Hawking radiation', 'Quantum fluctuations at the horizon cause black holes to slowly leak particles and shrink. Over inconceivable timescales — far longer than the current age of the universe — even the largest black holes would evaporate away.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'what-is-black-hole';

-- 11. climate-tipping-points
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'Self-reinforcing shifts', 'A tipping point is a threshold where a small nudge flips a system into a new state. Warming melts Arctic ice, which exposes dark ocean, which absorbs more heat, which melts more ice. The feedback loop runs on its own once started.', NULL),
  (2, 'chart', NULL, 'Estimated tipping thresholds for major Earth systems — some may already be crossed.', '{"key":"tipping-thresholds"}'::jsonb),
  (3, 'fact', NULL, 'The Atlantic Meridional Overturning Circulation has weakened by about 15% since 1950 — a possible early warning sign.', NULL),
  (4, 'heading', 'The cascade risk', 'Crossing one tipping point can increase the odds of crossing others. Losing Arctic ice alters ocean circulation, which shifts rainfall over the Amazon, which could die back and release carbon. These dominoes are connected.', NULL),
  (5, 'diagram', NULL, NULL, '{"key":"climate-cascade"}'::jsonb)
) AS blk(ord, bt, h, b, c) ON q.slug = 'climate-tipping-points';

-- 12. why-we-dream
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'The REM brain', 'During REM sleep, your brain is almost as active as when awake. Eyes dart behind closed lids, muscles are paralysed, and vivid dreams unfold. This stage repeats every 90 minutes, growing longer as the night goes on.', NULL),
  (2, 'chart', NULL, 'A night of sleep — cycling through light, deep, and REM stages.', '{"key":"sleep-cycles"}'::jsonb),
  (3, 'fact', NULL, 'You spend roughly two hours dreaming each night, even if you remember almost none of it.', NULL),
  (4, 'heading', 'Filing and rehearsing', 'Dreams appear to consolidate memories, sorting what to keep and what to discard. They also simulate emotional and social scenarios — a safe rehearsal space for the challenges of waking life.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'why-we-dream';

-- 13. how-rockets-work
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'Newton''s third law in action', 'A rocket burns fuel and throws the exhaust backward at enormous speed. For every kilogram hurled one way, the rocket is nudged the other. It does not need air to push against — the reaction itself is the push.', NULL),
  (2, 'interactive', NULL, NULL, '{"key":"rocket-thrust"}'::jsonb),
  (3, 'fact', NULL, 'The Saturn V rocket burned about 20 tonnes of fuel per second at liftoff — most of it just to lift the fuel itself.', NULL),
  (4, 'heading', 'The tyranny of the rocket equation', 'To go faster you need more fuel, but more fuel means more weight, which means you need even more fuel. This exponential curse is why staging — dropping empty tanks — is essential for reaching orbit.', NULL),
  (5, 'diagram', NULL, NULL, '{"key":"rocket-staging"}'::jsonb)
) AS blk(ord, bt, h, b, c) ON q.slug = 'how-rockets-work';

-- 14. why-forests-talk
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'The mycorrhizal network', 'Beneath every healthy forest runs a web of fungal threads — mycelium — connecting tree roots over vast distances. Trees use this network to share sugars, water, and chemical warning signals. Some call it the wood wide web.', NULL),
  (2, 'diagram', NULL, NULL, '{"key":"mycorrhizal"}'::jsonb),
  (3, 'fact', NULL, 'A single teaspoon of forest soil can contain several kilometres of fungal filaments.', NULL),
  (4, 'heading', 'Mother trees', 'Older, larger trees — "mother trees" — channel nutrients to their own seedlings and even to neighbouring species through the fungal network. When a mother tree is cut, seedlings around it are more likely to die.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'why-forests-talk';

-- 15. wave-particle-duality
INSERT INTO content_blocks (question_id, block_order, block_type, heading, body, config)
SELECT id, blk.ord, blk.bt, blk.h, blk.b, blk.c
FROM questions q
JOIN (VALUES
  (1, 'heading', 'Two faces of light', 'Shine light through two narrow slits and it produces an interference pattern — bright and dark bands — just like overlapping water waves. But dim the light enough and the pattern builds up one dot at a time, each a single photon landing like a particle.', NULL),
  (2, 'interactive', NULL, NULL, '{"key":"double-slit"}'::jsonb),
  (3, 'fact', NULL, 'A single photon sent through two slits still interferes with itself — as if it passed through both at once.', NULL),
  (4, 'heading', 'Complementarity', 'Niels Bohr''s principle of complementarity says light is neither purely a wave nor purely a particle. Which face you see depends on the experiment you run. The deeper truth is that both descriptions are projections of a quantum reality our minds did not evolve to picture.', NULL)
) AS blk(ord, bt, h, b, c) ON q.slug = 'wave-particle-duality';
