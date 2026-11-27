/*
# Seed questions into Lumen

Inserts 15 questions across 7 categories with stable slugs.
Content blocks and relations are added in subsequent migrations.
Each question references a scene illustration and gradient pair.
*/
INSERT INTO questions (slug, question, category, read_time, tagline, intro, scene, gradient, featured, sort_order) VALUES
('earth-stop-spinning',
 'What would happen if Earth stopped spinning?',
 'Planetary Science', '4 min',
 'A day that never ends, and oceans that race to the poles.',
 'Earth rotates at about 1,670 km/h at the equator. That motion shapes everything from weather patterns to the shape of our planet. If it suddenly stopped, the consequences would be almost unimaginably violent — and the aftermath would reshape the world entirely.',
 'earth', ARRAY['#1e3a8a','#0ea5e9'], true, 1),

('why-time-slow-near-mass',
 'Why does time pass differently near massive objects?',
 'Physics & Relativity', '5 min',
 'Gravity is not a force — it is the shape of time itself.',
 'Einstein''s general relativity revealed that massive objects warp the fabric of spacetime. This warping bends light, curves orbits, and — most strikingly — changes the rate at which clocks tick. Time is not a universal backdrop; it flexes depending on where you are.',
 'spacetime', ARRAY['#7c3aed','#312e81'], false, 2),

('how-fusion-reactor-works',
 'Could we ever build a working fusion reactor?',
 'Energy & Engineering', '5 min',
 'Recreating the heart of a star, inside a machine.',
 'Fusion powers every star. Squeeze light nuclei together hard enough and they merge, releasing enormous energy from the tiny mass they lose. For seventy years, engineers have chased the dream of a clean, near-limitless power source by bottling a miniature sun on Earth.',
 'fusion', ARRAY['#dc2626','#f59e0b'], false, 3),

('deep-ocean-mystery',
 'What is hidden in the deepest parts of the ocean?',
 'Earth & Ocean', '4 min',
 'We have mapped Mars better than the floor of our own planet.',
 'The deep ocean covers most of Earth, yet less than a quarter of the seafloor has been mapped to modern resolution. In the perpetual dark, under crushing pressure, life thrives in forms that challenge everything we assume a habitable world needs.',
 'ocean', ARRAY['#0c4a6e','#1e293b'], false, 4),

('brain-consciousness',
 'How does the brain create the feeling of being you?',
 'Mind & Biology', '6 min',
 '86 billion neurons, and a self that somehow emerges from them.',
 'The brain is the most complex object we know. From its tangled web of neurons arises memory, imagination, and the intimate sense of a continuous self. How physical matter gives rise to subjective experience remains one of the deepest open questions in science.',
 'brain', ARRAY['#be185d','#4c1d95'], false, 5),

('what-causes-auroras',
 'What causes the dancing lights of the aurora?',
 'Space & Atmosphere', '3 min',
 'Particles from the Sun, caught in Earth''s magnetic cage.',
 'Auroras are a visible conversation between the Sun and Earth. Charged particles streaming off the Sun slam into our magnetic shield, slide along field lines toward the poles, and dump their energy into the upper atmosphere — lighting it up in rippling curtains of green and violet.',
 'aurora', ARRAY['#15803d','#0e7490'], false, 6),

('gravity-simulation',
 'How does gravity actually pull things together?',
 'Physics & Relativity', 'Interactive',
 'Try it yourself — adjust the mass and watch the pull change.',
 'Newton described gravity as a pull between any two masses, weakening with the square of the distance. This simple law explains falling apples, orbiting moons, and entire galaxies. The simulation below lets you feel how changing mass and distance changes that invisible pull.',
 'gravity', ARRAY['#0891b2','#1e293b'], false, 7),

('why-sky-blue',
 'Why is the sky blue at noon and orange at dusk?',
 'Light & Optics', '3 min',
 'The air itself is a prism, and the Sun sets the angle.',
 'The sky''s colour is a story of light scattering off air molecules. Short blue wavelengths scatter easily in every direction, while longer reds and oranges pass straight through. At sunset, light travels through so much air that only the warmest colours survive.',
 'light', ARRAY['#0ea5e9','#f59e0b'], false, 8),

('how-vaccines-work',
 'How does your immune system learn to fight a virus?',
 'Mind & Biology', '5 min',
 'A training camp for cells, using a harmless mugshot of the enemy.',
 'Your immune system is a learning machine. Vaccines show it a safe preview of a pathogen so it can rehearse its response. When the real threat arrives, the body reacts fast enough to stop it before you ever feel sick.',
 'dna', ARRAY['#15803d','#0c4a6e'], false, 9),

('what-is-black-hole',
 'What is inside a black hole, and can anything escape?',
 'Physics & Relativity', '5 min',
 'A place where the escape velocity exceeds light itself.',
 'A black hole is a region where matter has collapsed so densely that not even light can escape its gravity. Inside, our best physics breaks down. The boundary — the event horizon — is a point of no return, and what lies beyond it is one of the deepest mysteries in science.',
 'blackhole', ARRAY['#1e1b4b','#0f172a'], false, 10),

('climate-tipping-points',
 'What are climate tipping points, and how close are we?',
 'Earth & Climate', '6 min',
 'The dominoes that, once fallen, cannot be stood back up.',
 'Earth''s climate has thresholds — points where a small change triggers a large, self-reinforcing shift. Ice sheets collapse, rainforests die back, ocean currents stall. Once crossed, these tipping points are nearly impossible to reverse on human timescales.',
 'climate', ARRAY['#b45309','#1e3a8a'], false, 11),

('why-we-dream',
 'Why do we dream, and what happens in the brain?',
 'Mind & Biology', '4 min',
 'The night shift that files memories and rehearses futures.',
 'Dreams are not random noise. During REM sleep the brain is as active as in waking, replaying the day, consolidating memories, and simulating emotional scenarios. Why we dream — and what the content means — is still being unravelled.',
 'brain', ARRAY['#6d28d9','#1e293b'], false, 12),

('how-rockets-work',
 'How do rockets work in space with nothing to push against?',
 'Energy & Engineering', '4 min',
 'Action, reaction, and the physics that opens the sky.',
 'Rockets do not push against air. They throw mass backward at extreme speed, and the equal and opposite reaction drives them forward. The same principle that moves a balloon when you let it go carries us to orbit and beyond.',
 'rocket', ARRAY['#dc2626','#1e1b4b'], false, 13),

('why-forests-talk',
 'Do forests really communicate through underground networks?',
 'Earth & Climate', '5 min',
 'The wood wide web: roots, fungi, and chemical signals.',
 'Beneath the forest floor, trees are connected by vast networks of fungi. They share nutrients, send warning signals, and even nurture their seedlings. The forest is less a collection of individuals than a living, communicating system.',
 'forest', ARRAY['#166534','#14532d'], false, 14),

('wave-particle-duality',
 'Is light a wave or a particle — and how can it be both?',
 'Light & Optics', '5 min',
 'The experiment that broke the either-or of physics.',
 'Light behaves as a wave when it diffracts and interferes, and as a particle when it lands one photon at a time. Quantum mechanics resolved this not by picking a side, but by revealing that both descriptions are partial views of something stranger.',
 'wave', ARRAY['#7c3aed','#0e7490'], false, 15)
ON CONFLICT (slug) DO NOTHING;
