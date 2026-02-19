-- Seed news_articles with the mock data from the public news page
-- Run this in your Supabase SQL Editor

INSERT INTO news_articles (slug, title, excerpt, cover_image_url, author_name, published_at, is_published)
VALUES
    ('adverbe-expands-production',
     'Adverbe Expands Production to East Africa',
     'We''re thrilled to announce our new studio in Nairobi, bringing local stories to a global audience.',
     '/coming-soon.png',
     'Adverbe Team',
     '2026-02-18T00:00:00Z',
     true),

    ('new-series-premiere',
     'New Series ''The Brief'' Premieres Next Month',
     'An inside look at the campaigns that shaped African culture in the last decade.',
     '/coming-soon.png',
     'Adverbe Team',
     '2026-03-10T00:00:00Z',
     true),

    ('streaming-partnership',
     'Partnership with Major Streaming Platform',
     'Exclusive content distribution deal signed to bring our shows to millions of new viewers.',
     '/coming-soon.png',
     'Adverbe Team',
     '2026-04-05T00:00:00Z',
     true),

    ('digital-media-award',
     'Adverbe Wins Digital Media Award',
     'Recognized for excellence in digital storytelling and innovative format design.',
     '/coming-soon.png',
     'Adverbe Team',
     '2026-05-20T00:00:00Z',
     true)
ON CONFLICT (slug) DO NOTHING;
