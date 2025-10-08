# Integration of Supabase and IntaSend for Donations

## Tasks to Complete

- [x] Update js/donate.js: Replace Supabase placeholder keys with actual keys, add IntaSend payment processing logic
- [x] Update donate.html: Add IntaSend as a payment method option in the form
- [ ] Test the donation form with Supabase data saving and IntaSend payment processing
- [ ] Verify end-to-end flow: form submission, database storage, payment completion

## Notes
- Supabase URL: https://bbgcdfutaihlnuwbcruip.supabase.co
- Supabase Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ2NkZnV0YWlobG51d2JjcnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTMyMTEsImV4cCI6MjA3NDM2OTIxMX0.einRzV3s-WCdtxF1SK7nHYJGAUelZVJwcUI_Ohe2j_Q
- IntaSend Public Key: ISPubKey_live_413d9a4b-bd7d-43f6-bf08-f8fb33da8055
- Ensure 'donations' table in Supabase has columns: id, amount, first_name, last_name, email, phone, donation_type, payment_method, anonymous, newsletter, comments, created_at, payment_status, transaction_id
