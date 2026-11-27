export const KNOWLEDGE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS knowledge_activity (
  code text PRIMARY KEY,
  name_vi text NOT NULL,
  name_han text NOT NULL
);

CREATE TABLE IF NOT EXISTS knowledge_rule (
  activity_code text NOT NULL REFERENCES knowledge_activity(code) ON DELETE CASCADE,
  layer text NOT NULL CHECK (layer IN ('Q10', 'Q11')),
  kind text NOT NULL CHECK (kind IN ('ACTIVITY', 'CONFLICT', 'LEGACY_CONFLICT')),
  code text NOT NULL,
  effect text,
  operation text,
  target jsonb,
  condition jsonb,
  precedence integer,
  description text,
  PRIMARY KEY (activity_code, layer, code)
);

CREATE TABLE IF NOT EXISTS knowledge_source (
  source_key text PRIMARY KEY,
  source_type text NOT NULL,
  volume integer,
  book integer NOT NULL,
  page integer,
  section text,
  original_name text,
  note text,
  verified boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS knowledge_meta (
  key text PRIMARY KEY,
  value jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS knowledge_rule_source (
  activity_code text NOT NULL,
  layer text NOT NULL,
  rule_code text NOT NULL,
  source_key text NOT NULL REFERENCES knowledge_source(source_key) ON DELETE CASCADE,
  ordinal integer NOT NULL,
  PRIMARY KEY (activity_code, layer, rule_code, source_key),
  FOREIGN KEY (activity_code, layer, rule_code)
    REFERENCES knowledge_rule(activity_code, layer, code)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_knowledge_rule_activity_layer
  ON knowledge_rule(activity_code, layer);

CREATE INDEX IF NOT EXISTS idx_knowledge_rule_effect
  ON knowledge_rule(effect)
  WHERE effect IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_knowledge_rule_operation
  ON knowledge_rule(operation)
  WHERE operation IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_knowledge_rule_target_gin
  ON knowledge_rule USING gin(target);

CREATE INDEX IF NOT EXISTS idx_knowledge_rule_condition_gin
  ON knowledge_rule USING gin(condition);

CREATE INDEX IF NOT EXISTS idx_knowledge_source_book_page
  ON knowledge_source(book, page);

CREATE INDEX IF NOT EXISTS idx_knowledge_source_verified
  ON knowledge_source(verified);
`;
