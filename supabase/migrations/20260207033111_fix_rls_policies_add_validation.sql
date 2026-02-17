/*
  # Fix overly permissive RLS INSERT policies

  1. Changes
    - Replace `WITH CHECK (true)` on `guide_leads` INSERT policy
      with validation: full_name and phone must be non-empty,
      language must be 'en' or 'ar', and field lengths are capped
    - Replace `WITH CHECK (true)` on `consultation_bookings` INSERT policy
      with validation: full_name, email, and phone must be non-empty,
      language must be 'en' or 'ar', and field lengths are capped

  2. Security
    - Prevents empty or junk data from being inserted
    - Caps field lengths to mitigate abuse (e.g., payload stuffing)
    - Restricts language column to known valid values
    - Restricts source column to known valid values
*/

DROP POLICY IF EXISTS "Anyone can submit a lead" ON guide_leads;

CREATE POLICY "Anon can submit valid leads"
  ON guide_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    length(trim(full_name)) > 0
    AND length(full_name) <= 200
    AND length(trim(phone)) > 0
    AND length(phone) <= 30
    AND language IN ('en', 'ar')
    AND source IN ('guide-download')
  );

DROP POLICY IF EXISTS "Allow public to insert consultation bookings" ON consultation_bookings;

CREATE POLICY "Anon can submit valid consultation bookings"
  ON consultation_bookings
  FOR INSERT
  TO anon
  WITH CHECK (
    length(trim(full_name)) > 0
    AND length(full_name) <= 200
    AND length(trim(email)) > 0
    AND length(email) <= 320
    AND length(trim(phone)) > 0
    AND length(phone) <= 30
    AND (additional_info IS NULL OR length(additional_info) <= 2000)
    AND language IN ('en', 'ar')
    AND source IN ('guide-download-thanks')
  );
