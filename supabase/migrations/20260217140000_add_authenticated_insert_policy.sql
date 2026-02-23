/*
  # Add authenticated INSERT policy on leads

  The Supabase JS client shares auth state across all pages via localStorage.
  When an admin is logged in on /admin, form pages also send requests as
  `authenticated` — so we need an INSERT policy for that role too.
*/

CREATE POLICY "Authenticated can insert leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
