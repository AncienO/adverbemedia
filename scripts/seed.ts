import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = process.env.SUPABASE_DB_CONNECTION_STRING;

if (!connectionString) {
    console.error('Missing SUPABASE_DB_CONNECTION_STRING in .env.local');
    process.exit(1);
}

const client = new Client({
    connectionString,
});

async function seed() {
    try {
        await client.connect();
        console.log('Connected to Database...');

        // 1. Categories
        console.log('Seeding Categories...');
        const categories = [
            { name: 'Technology', slug: 'technology' },
            { name: 'Business', slug: 'business' },
            { name: 'Culture', slug: 'culture' },
            { name: 'Science', slug: 'science' },
            { name: 'Marketing', slug: 'marketing' },
            { name: 'Leadership', slug: 'leadership' },
            { name: 'Advertising', slug: 'advertising' },
            { name: 'Faith', slug: 'faith' },
            { name: 'Sport', slug: 'sport' },
        ];

        for (const cat of categories) {
            await client.query(
                `INSERT INTO categories (name, slug) VALUES ($1, $2) ON CONFLICT (slug) DO NOTHING`,
                [cat.name, cat.slug]
            );
        }

        // 2. Shows
        console.log('Seeding Shows...');
        // Need Category IDs first
        const catRes = await client.query('SELECT id, slug FROM categories');
        const catMap = new Map(catRes.rows.map((r: any) => [r.slug, r.id]));

        const shows = [
            {
                slug: 'mad-conversations',
                title: 'MAD Conversations',
                description: 'The first show to document how music and marketing intersect in Ghana. MAD Conversations brings CMOs, music directors, and brand strategists to the table to unpack the campaigns, partnerships, and creative decisions that shaped Ghana\'s commercial soundscape. Each episode reconstructs the story behind an iconic brand-music moment; the brief, the negotiation, the outcome, and the lessons. It\'s beyond nostalgia; it\'s an operational archive of how commercial culture actually works.',
                short_description: 'Music. Advertising. Digital.Design.',
                cover_image_url: '/Screenshot 2026-02-07 at 15.38.54.png',
                category_slug: 'marketing',
                status: 'active',
                social_links: { applePodcasts: '#', spotify: '#', youtube: '#' }
            },
            {
                slug: 'on-leadership',
                title: ':On Leadership',
                description: 'In-depth, long-form interviews with the CEOs, founders, policymakers, and institutional builders shaping Africa\'s trajectory. On Leadership goes beyond the polished keynote to examine how critical decisions are actually made, what keeps leaders up at night, and what it costs to build at scale on the continent. Modelled on the editorial depth of international programmes like Bloomberg\'s "Leaders" series.',
                short_description: 'What it actually takes to lead in Africa.',
                cover_image_url: '/coming-soon.png',
                category_slug: 'leadership',
                status: 'coming-soon',
                social_links: {}
            },
            {
                slug: 'the-brief',
                title: 'The Brief:',
                description: 'Mobile, on-location, and built around one signature question: "So, what was the brief?" The Brief documents Ghana\'s most memorable advertising campaigns by sitting down with the agencies, brands, and creatives who made them. Each episode names the campaign, the agency, and the guest, and reconstructs the journey from brief to execution. It\'s storytelling as industry documentation — casual in format, serious in archival intent.',
                short_description: 'Every campaign has a story. We make sure they get told.',
                cover_image_url: '/coming-soon.png',
                category_slug: 'advertising',
                status: 'coming-soon',
                social_links: {}
            },
            {
                slug: 'calvary-central',
                title: 'Calvary Central',
                description: 'Born from a student-run ministry and now reaching far beyond campus, Calvary Central creates space for believers, seekers, and sceptics to explore Christianity without the fluff. From understanding identity in Christ to navigating faith and finances, the show tackles the questions that shape how we live — not just what we believe. Thoughtful but not stuffy. Scriptural but not preachy. New season, same Jesus.',
                short_description: 'The heart of it. Where honest faith meets real conversation.',
                cover_image_url: '/adverbe-logo-white-bg.jpg',
                category_slug: 'faith',
                status: 'active',
                social_links: {}
            },
            {
                slug: 'convos-in-the-light',
                title: 'Convos in the Light',
                description: 'Casual, open conversations about living out faith in the real world. Convos in the Light makes room for the questions, doubts, and joys that don\'t always fit neatly into a Sunday sermon — exploring what it means to walk with God through ordinary life, honest dialogue, and genuine community.',
                short_description: 'Everyday Christianity, no filter.',
                cover_image_url: '/coming-soon.png',
                category_slug: 'faith',
                status: 'coming-soon',
                social_links: {}
            },
            {
                slug: 'home-court',
                title: 'Home Court',
                description: 'The first dedicated platform for Ghana\'s tennis ecosystem. Home Court connects players, coaches, administrators, and fans through stories of competition, development, and the growth of racquet sport in West Africa. Whether you\'re on the circuit or just discovering the game, this is where Ghana\'s tennis community finds its voice.',
                short_description: 'Ghana\'s tennis community, on the record.',
                cover_image_url: '/coming-soon.png',
                category_slug: 'sport',
                status: 'coming-soon',
                social_links: {}
            }
        ];

        for (const show of shows) {
            const catId = catMap.get(show.category_slug);
            if (!catId) {
                console.warn(`Category not found for show: ${show.title} (${show.category_slug})`);
                continue;
            }

            await client.query(
                `INSERT INTO shows (slug, title, description, short_description, cover_image_url, category_id, status, social_links)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 ON CONFLICT (slug) DO UPDATE SET
                 title = EXCLUDED.title, description = EXCLUDED.description, short_description = EXCLUDED.short_description,
                 cover_image_url = EXCLUDED.cover_image_url, category_id = EXCLUDED.category_id, status = EXCLUDED.status, social_links = EXCLUDED.social_links`,
                [show.slug, show.title, show.description, show.short_description, show.cover_image_url, catId, show.status, JSON.stringify(show.social_links)]
            );
        }

        // 3. Episodes (Mock Data for MAD Conversations - Show ID 1 equivalent)
        console.log('Seeding Episodes...');
        // Get Show ID for 'mad-conversations'
        const showRes = await client.query("SELECT id FROM shows WHERE slug = 'mad-conversations'");
        if (showRes.rows.length > 0) {
            const madShowId = showRes.rows[0].id;
            const episodes = [
                {
                    slug: 'ai-revolution',
                    title: 'The AI Revolution is Here',
                    description: 'We discuss the implications of AGI and how it will transform the workforce in the next decade.',
                    duration: '45:20',
                    published_at: '2023-10-15T10:00:00Z',
                    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                    tags: ['AI', 'Tech', 'Future']
                },
                {
                    slug: 'quantum-leap',
                    title: 'Quantum Computing: A Leap',
                    description: 'Understanding the basics of quantum mechanics and computing.',
                    duration: '38:15',
                    published_at: '2023-10-22T10:00:00Z',
                    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                    tags: ['Quantum', 'Physics']
                }
            ];

            for (const ep of episodes) {
                await client.query(
                    `INSERT INTO episodes (show_id, slug, title, description, duration, published_at, audio_url, tags)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT (show_id, slug) DO NOTHING`,
                    [madShowId, ep.slug, ep.title, ep.description, ep.duration, ep.published_at, ep.audio_url, ep.tags]
                );
            }
        }

        console.log('Seeding Completed Successfully!');

    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await client.end();
    }
}

seed();
