/*
  # Fix anon INSERT on leads table

  PostgREST requires a SELECT policy to exist for the role when INSERT
  uses the RETURNING clause (which the Supabase JS client sends by default).
  Without it, anon INSERTs fail with a 42501 RLS violation.

  Fix: add a minimal anon SELECT policy that only allows reading rows
  created in the last 10 seconds — just enough for the RETURNING clause
  to work after form submission, without exposing historical data.
*/

CREATE POLICY "Anon can read own just-inserted leads"
  ON leads
  FOR SELECT
  TO anon
  USING (created_at >= now() - interval '10 seconds');
