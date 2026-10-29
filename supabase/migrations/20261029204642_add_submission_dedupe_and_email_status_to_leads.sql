/*
# Add duplicate protection and email status tracking to leads

1. Modified Tables
- `leads`
  - Added `submission_id` (text, nullable, unique) — a per-attempt ID created by the form so a retried submission never creates a second lead
  - Added `email_status` (text, nullable) — result of the notification email to the business: "pending", "sent", or "failed"
  - Added `email_id` (text, nullable) — the email provider's message ID once it accepts the notification

2. Security
- No policy or grant changes. Inserts still go through the existing anon/authenticated insert policy; the edge function writes with the service role.

3. Important Notes
- All new columns are nullable so existing rows are unaffected.
- The unique index allows multiple NULL values, so historical leads without a submission ID remain valid.
*/

ALTER TABLE leads ADD COLUMN IF NOT EXISTS submission_id text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email_status text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email_id text;

CREATE UNIQUE INDEX IF NOT EXISTS leads_submission_id_key ON leads (submission_id);
