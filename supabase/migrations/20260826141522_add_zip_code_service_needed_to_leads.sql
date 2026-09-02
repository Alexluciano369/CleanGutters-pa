/*
# Add zip_code and service_needed columns to leads table

1. Modified Tables
- `leads`
  - Added `zip_code` (text, nullable) — homeowner's ZIP code collected on the estimate form
  - Added `service_needed` (text, nullable) — the service the homeowner is requesting (e.g. "Gutter guard installation", "Free estimate", "Repair")
  - Changed `email` from NOT NULL to nullable — the new form collects name, phone, ZIP and service needed; email is no longer a required field
2. Security
- No policy changes. The existing `anon_insert_leads` INSERT policy remains unchanged and still allows anon + authenticated inserts.
3. Important Notes
- All new columns are nullable so existing rows are unaffected.
- `email` is now nullable to match the simplified 4-field form. No existing data is lost — the column is kept, only the NOT NULL constraint is dropped.
- The edge function will be updated separately to accept the new fields and stop requiring email.
*/

ALTER TABLE leads ADD COLUMN IF NOT EXISTS zip_code text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service_needed text;

-- Drop the NOT NULL constraint on email so the simplified form (name, phone, zip, service)
-- can submit without an email address. Existing rows keep their email values.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'email' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE leads ALTER COLUMN email DROP NOT NULL;
  END IF;
END $$;
