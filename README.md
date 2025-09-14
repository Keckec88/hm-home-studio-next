# HM home studio – Preview

## Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

### Optional cloud sync
Set env variables before `npm run dev`:
- NEXT_PUBLIC_SUPABASE_URL=...
- NEXT_PUBLIC_SUPABASE_ANON_KEY=...

Create tables:
- availability(blocked_iso text primary key)
- bookings(id uuid primary key default gen_random_uuid(), name text, service text, start_iso text, duration int, lang text, created_at timestamp default now())
```