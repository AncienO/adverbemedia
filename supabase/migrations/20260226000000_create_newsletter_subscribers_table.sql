-- Enable UUID extension (idempotent)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Newsletter Subscribers table (separate from contacts and old subscribers table)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$
BEGIN
    -- Allow anyone (anon) to insert (subscribe from public site)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Insert Newsletter Subscribers') THEN
        CREATE POLICY "Public Insert Newsletter Subscribers"
            ON newsletter_subscribers FOR INSERT WITH CHECK (true);
    END IF;
END
$$;
