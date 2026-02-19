-- Add advertising and related shows columns to shows table
ALTER TABLE shows ADD COLUMN IF NOT EXISTS ad_content TEXT;
ALTER TABLE shows ADD COLUMN IF NOT EXISTS related_show_ids UUID[] DEFAULT '{}';
