/*
# Create leads table for CleanGutters landing pages

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `territory` (text, identifies which campaign/landing page generated the lead, e.g. "north_wales_pa")
  - `lead_source` (text, marketing source, e.g. "google_ads")
  - `landing_page` (text, slug of the landing page, e.g. "north_wales_pa")
  - `name` (text, homeowner's name)
  - `email` (text, homeowner's email)
  - `phone` (text, homeowner's phone)
  - `address` (text, property address, nullable)
  - `message` (text, additional notes, nullable)
  - `gclid` (text, Google Click ID, nullable)
  - `gbraid` (text, GBRAID parameter, nullable)
  - `wbraid` (text, WBRAID parameter, nullable)
  - `utm_source` (text, nullable)
  - `utm_medium` (text, nullable)
  - `utm_campaign` (text, nullable)
  - `utm_term` (text, nullable)
  - `utm_content` (text, nullable)
  - `page_url` (text, the full URL of the page the form was submitted from)
  - `submitted_at` (timestamptz, when the lead was submitted)
  - `created_at` (timestamptz, when the record was created)
2. Security
- Enable RLS on `leads`.
- Allow anon + authenticated INSERT (public form submissions, no sign-in).
- No SELECT/UPDATE/DELETE from the anon role — leads are private business data.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  territory text NOT NULL,
  lead_source text NOT NULL,
  landing_page text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text,
  message text,
  gclid text,
  gbraid text,
  wbraid text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  page_url text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies: leads are private and only
-- accessible via the service role key (edge function / admin tooling).
