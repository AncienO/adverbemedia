-- Seed company_sections with the mock data from the company page
-- Run this in your Supabase SQL Editor

INSERT INTO company_sections (section_key, title, content, is_visible, sort_order)
VALUES
    ('mission',
     'Our Mission',
     'Adverbe is a digital media company built on the belief that audio is the most intimate and powerful medium for storytelling. We are dedicated to producing high-quality, narrative-driven content that resonates with audiences across the continent and the diaspora. Our work bridges the gap between traditional journalism and modern entertainment.',
     true,
     1),

    ('culture',
     'Culture & Values',
     'We operate with a ''Listener First'' mentality. Every decision, from sound design to script editing, is made with the audience''s experience in mind. We value curiosity, rigor, and the courage to tell complex stories. Our studio in Accra is a hub for creatives who want to push the boundaries of what African media can look and sound like.',
     true,
     2);
