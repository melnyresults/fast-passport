/*
  # Unified leads table (STI) + payments table

  Replaces `guide_leads` and `consultation_bookings` with a single `leads`
  table using Single-Table-Inheritance (the `source` column is the discriminator).

  1. New Tables
    - `leads` — unified CRM lead table with pipeline stage tracking
    - `payments` — payout / revenue-share payment history

  2. Data Migration
    - Copies existing rows from `guide_leads` and `consultation_bookings`
      into the new `leads` table
    - Drops the old tables after migration

  3. Security (RLS)
    - `leads`: anon INSERT (validated), authenticated full CRUD
    - `payments`: authenticated full CRUD
*/

-- =============================================================
-- 1. Create the unified `leads` table
-- =============================================================
CREATE TABLE IF NOT EXISTS leads (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       text        NOT NULL,
  email           text,
  phone           text        NOT NULL,
  additional_info text,
  language        text        NOT NULL DEFAULT 'en',
  source          text        NOT NULL DEFAULT 'guide-download',
  stage           text        NOT NULL DEFAULT 'New Lead / Guide Request',
  deal_value      numeric,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anon can submit new leads from the public forms (validated)
CREATE POLICY "Anon can submit valid leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (
    length(trim(full_name)) > 0
    AND length(full_name) <= 200
    AND length(trim(phone)) > 0
    AND length(phone) <= 30
    AND (email IS NULL OR (length(trim(email)) > 0 AND length(email) <= 320))
    AND (additional_info IS NULL OR length(additional_info) <= 2000)
    AND language IN ('en', 'ar')
    AND source IN ('guide-download', 'consultation', 'referral', 'website', 'social-media')
    AND stage = 'New Lead / Guide Request'
  );

-- Authenticated users (admin) can read all leads
CREATE POLICY "Authenticated can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users (admin) can update leads
CREATE POLICY "Authenticated can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users (admin) can delete leads
CREATE POLICY "Authenticated can delete leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- =============================================================
-- 2. Create the `payments` table
-- =============================================================
CREATE TABLE IF NOT EXISTS payments (
  id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  amount             numeric     NOT NULL,
  stripe_payment_id  text,
  notes              text,
  created_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =============================================================
-- 3. Migrate existing data from old tables
-- =============================================================
INSERT INTO leads (id, full_name, phone, language, source, stage, created_at, updated_at)
  SELECT id, full_name, phone, language, 'guide-download', 'New Lead / Guide Request', created_at, created_at
  FROM guide_leads
  ON CONFLICT (id) DO NOTHING;

INSERT INTO leads (id, full_name, email, phone, additional_info, language, source, stage, created_at, updated_at)
  SELECT id, full_name, email, phone, additional_info, language, 'consultation', 'New Lead / Guide Request', created_at, created_at
  FROM consultation_bookings
  ON CONFLICT (id) DO NOTHING;

-- =============================================================
-- 4. Drop old tables (they are now replaced by `leads`)
-- =============================================================
DROP TABLE IF EXISTS guide_leads CASCADE;
DROP TABLE IF EXISTS consultation_bookings CASCADE;

-- =============================================================
-- 5. Index for common query patterns
-- =============================================================
CREATE INDEX idx_leads_stage ON leads (stage);
CREATE INDEX idx_leads_source ON leads (source);
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
