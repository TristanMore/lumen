/*
# Seed question relations

Creates directional "related question" edges between questions.
*/
INSERT INTO question_relations (source_id, target_id)
SELECT s.id, t.id
FROM questions s, questions t
WHERE (s.slug, t.slug) IN (
    ('earth-stop-spinning','why-time-slow-near-mass'),
    ('earth-stop-spinning','what-causes-auroras'),
    ('earth-stop-spinning','how-fusion-reactor-works'),
    ('why-time-slow-near-mass','gravity-simulation'),
    ('why-time-slow-near-mass','what-is-black-hole'),
    ('why-time-slow-near-mass','earth-stop-spinning'),
    ('how-fusion-reactor-works','earth-stop-spinning'),
    ('how-fusion-reactor-works','how-rockets-work'),
    ('how-fusion-reactor-works','climate-tipping-points'),
    ('deep-ocean-mystery','how-vaccines-work'),
    ('deep-ocean-mystery','why-forests-talk'),
    ('deep-ocean-mystery','what-causes-auroras'),
    ('brain-consciousness','why-we-dream'),
    ('brain-consciousness','why-time-slow-near-mass'),
    ('brain-consciousness','how-vaccines-work'),
    ('what-causes-auroras','why-sky-blue'),
    ('what-causes-auroras','earth-stop-spinning'),
    ('what-causes-auroras','deep-ocean-mystery'),
    ('gravity-simulation','why-time-slow-near-mass'),
    ('gravity-simulation','what-is-black-hole'),
    ('gravity-simulation','how-rockets-work'),
    ('why-sky-blue','wave-particle-duality'),
    ('why-sky-blue','what-causes-auroras'),
    ('how-vaccines-work','brain-consciousness'),
    ('how-vaccines-work','why-we-dream'),
    ('what-is-black-hole','why-time-slow-near-mass'),
    ('what-is-black-hole','gravity-simulation'),
    ('what-is-black-hole','how-fusion-reactor-works'),
    ('climate-tipping-points','why-forests-talk'),
    ('climate-tipping-points','deep-ocean-mystery'),
    ('climate-tipping-points','how-fusion-reactor-works'),
    ('why-we-dream','brain-consciousness'),
    ('why-we-dream','how-vaccines-work'),
    ('how-rockets-work','how-fusion-reactor-works'),
    ('how-rockets-work','gravity-simulation'),
    ('how-rockets-work','why-sky-blue'),
    ('why-forests-talk','climate-tipping-points'),
    ('why-forests-talk','deep-ocean-mystery'),
    ('why-forests-talk','brain-consciousness'),
    ('wave-particle-duality','why-sky-blue'),
    ('wave-particle-duality','what-is-black-hole'),
    ('wave-particle-duality','why-time-slow-near-mass')
  )
  AND NOT EXISTS (
    SELECT 1 FROM question_relations r WHERE r.source_id = s.id AND r.target_id = t.id
  );
