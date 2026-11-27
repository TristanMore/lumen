/*
# Create Lumen discovery platform schema

## Overview
Creates the core content schema for Lumen — a curiosity-driven discovery platform.
Questions are the top-level entity. Each question has an ordered list of content
blocks (text, facts, diagrams, interactive simulations, charts) that render the
explore page. Related questions are stored as directional edges.

## New Tables

### questions
- id (uuid, PK)
- slug (text, unique) — stable URL identifier, e.g. "earth-stop-spinning"
- question (text) — the headline question text
- category (text) — e.g. "Physics & Relativity"
- read_time (text) — e.g. "4 min" or "Interactive"
- tagline (text) — short subtitle shown on cards
- intro (text) — longer lead paragraph on the explore page
- scene (text) — which SVG illustration to render: earth|spacetime|fusion|ocean|brain|aurora|gravity|wave|pendulum|orbit|forest|cosmos|light|dna|climate|rocket|blackhole
- gradient (text[]) — two hex color strings for the scene artwork, e.g. {"#1e3a8a","#0ea5e9"}
- featured (boolean, default false) — shown in the hero
- sort_order (int, default 0) — feed ordering
- created_at (timestamptz)

### content_blocks
- id (uuid, PK)
- question_id (uuid FK → questions, ON DELETE CASCADE)
- block_order (int) — ordering within a question
- block_type (text) — heading|text|fact|diagram|interactive|chart
- heading (text, nullable) — section heading for text/fact blocks
- body (text, nullable) — paragraph text for text/fact blocks
- config (jsonb, nullable) — type-specific config (diagram key, interactive key, chart data)
- created_at (timestamptz)

### question_relations
- id (uuid, PK)
- source_id (uuid FK → questions, ON DELETE CASCADE)
- target_id (uuid FK → questions, ON DELETE CASCADE)
- created_at (timestamptz)
- UNIQUE (source_id, target_id)

## Security
- This is a single-tenant public-content app (no sign-in).
- RLS enabled on all tables.
- All policies use TO anon, authenticated with USING (true) / WITH CHECK (true)
  because the content is intentionally public and read-only from the client.
- Grants: SELECT only to anon + authenticated (content is managed server-side).
  No INSERT/UPDATE/DELETE grants to anon or authenticated.
*/
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  question text NOT NULL,
  category text NOT NULL,
  read_time text NOT NULL DEFAULT '4 min',
  tagline text NOT NULL,
  intro text NOT NULL,
  scene text NOT NULL DEFAULT 'cosmos',
  gradient text[] NOT NULL DEFAULT ARRAY['#0891b2','#1e293b']::text[],
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  block_order int NOT NULL,
  block_type text NOT NULL CHECK (block_type IN ('heading','text','fact','diagram','interactive','chart')),
  heading text,
  body text,
  config jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS question_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  target_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (source_id, target_id)
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_relations ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON questions TO anon, authenticated;
GRANT SELECT ON content_blocks TO anon, authenticated;
GRANT SELECT ON question_relations TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_questions" ON questions;
CREATE POLICY "public_read_questions" ON questions
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_content_blocks" ON content_blocks;
CREATE POLICY "public_read_content_blocks" ON content_blocks
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_relations" ON question_relations;
CREATE POLICY "public_read_relations" ON question_relations
  FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_content_blocks_question_order
  ON content_blocks (question_id, block_order);
CREATE INDEX IF NOT EXISTS idx_relations_source
  ON question_relations (source_id);
CREATE INDEX IF NOT EXISTS idx_questions_category
  ON questions (category);
