-- Add sort_order column to shows table
ALTER TABLE shows ADD COLUMN sort_order INTEGER DEFAULT 0;

-- Optional: Create an index for performance
CREATE INDEX idx_shows_sort_order ON shows(sort_order);