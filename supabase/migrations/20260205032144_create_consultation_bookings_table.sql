/*
  # Create consultation bookings table

  1. New Tables
    - `consultation_bookings`
      - `id` (uuid, primary key) - Unique identifier
      - `full_name` (text) - Client's full name
      - `email` (text) - Client's email address
      - `phone` (text) - Client's phone number
      - `additional_info` (text, nullable) - Extra information from client
      - `language` (text) - Language preference (en/ar)
      - `source` (text) - Where the booking came from
      - `created_at` (timestamptz) - When booking was made

  2. Security
    - Enable RLS on `consultation_bookings` table
    - Add policy for inserting new bookings (public access for form submissions)
*/

CREATE TABLE IF NOT EXISTS consultation_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  additional_info text,
  language text NOT NULL DEFAULT 'en',
  source text NOT NULL DEFAULT 'guide-download-thanks',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert consultation bookings"
  ON consultation_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated to view consultation bookings"
  ON consultation_bookings
  FOR SELECT
  TO authenticated
  USING (true);