-- Jit Tours and Travels — enquiries table
-- Run this once against your Neon database (see README instructions),
-- or just run `npm run db:setup` after DATABASE_URL is set.

CREATE TABLE IF NOT EXISTS enquiries (
  id           SERIAL PRIMARY KEY,
  booking_id   TEXT NOT NULL UNIQUE,
  full_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  car_type     TEXT,
  place        TEXT,
  message      TEXT,
  email_sent   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
