-- 1. Insert Categories
INSERT INTO categories (name, slug) VALUES
('Technology', 'technology'),
('Business', 'business'),
('Culture', 'culture'),
('Science', 'science'),
('Marketing', 'marketing'),
('Leadership', 'leadership'),
('Advertising', 'advertising'),
('Faith', 'faith'),
('Sport', 'sport')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Shows
-- Note: We sub-select category_ids to ensure relationships work regardless of UUID generation
INSERT INTO shows (slug, title, description, short_description, cover_image_url, category_id, status, social_links)
VALUES
(
    'mad-conversations',
    'MAD Conversations',
    'The first show to document how music and marketing intersect in Ghana. MAD Conversations brings CMOs, music directors, and brand strategists to the table to unpack the campaigns, partnerships, and creative decisions that shaped Ghana''s commercial soundscape. Each episode reconstructs the story behind an iconic brand-music moment; the brief, the negotiation, the outcome, and the lessons. It''s beyond nostalgia; it''s an operational archive of how commercial culture actually works.',
    'Music. Advertising. Digital.Design.',
    '/Screenshot 2026-02-07 at 15.38.54.png',
    (SELECT id FROM categories WHERE slug = 'marketing'),
    'active',
    '{"applePodcasts": "#", "spotify": "#", "youtube": "#"}'::jsonb
),
(
    'on-leadership',
    ':On Leadership',
    'In-depth, long-form interviews with the CEOs, founders, policymakers, and institutional builders shaping Africa''s trajectory. On Leadership goes beyond the polished keynote to examine how critical decisions are actually made, what keeps leaders up at night, and what it costs to build at scale on the continent. Modelled on the editorial depth of international programmes like Bloomberg''s "Leaders" series.',
    'What it actually takes to lead in Africa.',
    '/coming-soon.png',
    (SELECT id FROM categories WHERE slug = 'leadership'),
    'coming-soon',
    '{}'::jsonb
),
(
    'the-brief',
    'The Brief:',
    'Mobile, on-location, and built around one signature question: "So, what was the brief?" The Brief documents Ghana''s most memorable advertising campaigns by sitting down with the agencies, brands, and creatives who made them. Each episode names the campaign, the agency, and the guest, and reconstructs the journey from brief to execution. It''s storytelling as industry documentation — casual in format, serious in archival intent.',
    'Every campaign has a story. We make sure they get told.',
    '/coming-soon.png',
    (SELECT id FROM categories WHERE slug = 'advertising'),
    'coming-soon',
    '{}'::jsonb
),
(
    'calvary-central',
    'Calvary Central',
    'Born from a student-run ministry and now reaching far beyond campus, Calvary Central creates space for believers, seekers, and sceptics to explore Christianity without the fluff. From understanding identity in Christ to navigating faith and finances, the show tackles the questions that shape how we live — not just what we believe. Thoughtful but not stuffy. Scriptural but not preachy. New season, same Jesus.',
    'The heart of it. Where honest faith meets real conversation.',
    '/adverbe-logo-white-bg.jpg',
    (SELECT id FROM categories WHERE slug = 'faith'),
    'active',
    '{}'::jsonb
),
(
    'convos-in-the-light',
    'Convos in the Light',
    'Casual, open conversations about living out faith in the real world. Convos in the Light makes room for the questions, doubts, and joys that don''t always fit neatly into a Sunday sermon — exploring what it means to walk with God through ordinary life, honest dialogue, and genuine community.',
    'Everyday Christianity, no filter.',
    '/coming-soon.png',
    (SELECT id FROM categories WHERE slug = 'faith'),
    'coming-soon',
    '{}'::jsonb
),
(
    'home-court',
    'Home Court',
    'The first dedicated platform for Ghana''s tennis ecosystem. Home Court connects players, coaches, administrators, and fans through stories of competition, development, and the growth of racquet sport in West Africa. Whether you''re on the circuit or just discovering the game, this is where Ghana''s tennis community finds its voice.',
    'Ghana''s tennis community, on the record.',
    '/coming-soon.png',
    (SELECT id FROM categories WHERE slug = 'sport'),
    'coming-soon',
    '{}'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Episodes
INSERT INTO episodes (show_id, slug, title, description, duration, published_at, audio_url, tags)
VALUES
(
    (SELECT id FROM shows WHERE slug = 'mad-conversations'),
    'ai-revolution',
    'The AI Revolution is Here',
    'We discuss the implications of AGI and how it will transform the workforce in the next decade.',
    '45:20',
    '2023-10-15T10:00:00Z',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    ARRAY['AI', 'Tech', 'Future']
),
(
    (SELECT id FROM shows WHERE slug = 'mad-conversations'),
    'quantum-leap',
    'Quantum Computing: A Leap',
    'Understanding the basics of quantum mechanics and computing.',
    '38:15',
    '2023-10-22T10:00:00Z',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    ARRAY['Quantum', 'Physics']
)
ON CONFLICT (show_id, slug) DO NOTHING;

-- 4. Insert Company Documents
INSERT INTO company_documents (title, file_url, file_size, file_format, category)
VALUES
('Adverbe Brand Guidelines 2026', '#', '12.4 MB', 'PDF', 'Brand'),
('Q4 2025 Impact Report', '#', '3.2 MB', 'PDF', 'Reports'),
('Executive Team Bios', '#', '1.1 MB', 'PDF', 'Press'),
('Official Logo Pack', '#', '5.8 MB', 'ZIP', 'Brand');

-- 5. Insert Social Links (Footer)
INSERT INTO social_links (platform, url, icon_key, sort_order)
VALUES
('Twitter', 'https://twitter.com/adverbe', 'Twitter', 1),
('Instagram', 'https://instagram.com/adverbe', 'Instagram', 2),
('LinkedIn', 'https://linkedin.com/company/adverbe', 'Linkedin', 3),
('YouTube', 'https://youtube.com/adverbe', 'Youtube', 4);
