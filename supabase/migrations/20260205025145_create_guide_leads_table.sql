/*
  # Create Guide Leads Table

  1. New Tables
    - `guide_leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `full_name` (text, not null) - Full name of the person
      - `phone` (text, not null) - Phone number for WhatsApp delivery
      - `language` (text, default 'en') - Preferred language (en/ar)
      - `source` (text, default 'guide-download') - Page source for tracking
      - `created_at` (timestamptz) - When the lead was captured

  2. Security
    - Enable RLS on `guide_leads` table
    - Add policy for inserting new leads (public access for form submissions)
    - Restrict read access to authenticated users only

  3. Notes
    - This table stores leads from the guide download landing page
    - Phone numbers are used for WhatsApp guide delivery
*/

CREATE TABLE IF NOT EXISTS guide_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  language text DEFAULT 'en',
  source text DEFAULT 'guide-download',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guide_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON guide_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view leads"
  ON guide_leads
  FOR SELECT
  TO authenticated
  USING (true);
