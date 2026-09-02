/*
# Add sms_consent column to leads table

1. Modified Tables
- `leads`
  - Added `sms_consent` (boolean, nullable, defaults false) — records whether the
    homeowner explicitly opted in to receive SMS/text messages about their estimate
2. Security
- No policy changes. The existing `anon_insert_leads` INSERT policy remains unchanged.
3. Important Notes
- The new column is nullable so existing rows are unaffected.
- The frontend will send `sms_consent: true` only when the user checks the optional
  SMS checkbox. When unchecked or absent, the value defaults to false/null.
*/

ALTER TABLE leads ADD COLUMN IF NOT EXISTS sms_consent boolean DEFAULT false;
