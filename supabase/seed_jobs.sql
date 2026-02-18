-- Insert Jobs
INSERT INTO jobs (slug, title, location, type, description, requirements, is_active)
VALUES
(
    'senior-video-editor',
    'Senior Video Editor',
    'Accra, Ghana',
    'Full-time',
    'Lead post-production for our flagship documentary series. Requires 5+ years of experience with Premiere Pro and After Effects.',
    'Currently unavailable',
    true
),
(
    'podcast-producer',
    'Podcast Producer',
    'Remote / Accra',
    'Contract',
    'Manage end-to-end production for "The Brief" and new audio properties. Strong storytelling and audio engineering skills needed.',
    'Currently unavailable',
    true
),
(
    'social-media-manager',
    'Social Media Manager',
    'Accra, Ghana',
    'Full-time',
    'Develop and execute social strategies to grow our audience across platforms. Experience in community management is a plus.',
    'Currently unavailable',
    true
),
(
    'research-intern',
    'Research Intern',
    'Hybrid',
    'Internship',
    'Support our editorial team with deep-dive research for upcoming investigative reports. Open to current students and recent grads.',
    'Currently unavailable',
    true
)
ON CONFLICT (slug) DO NOTHING;
