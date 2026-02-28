import { Show, Episode, Category } from '@/types';

const CATEGORIES: Category[] = [
    { id: '1', name: 'Technology', slug: 'technology' },
    { id: '2', name: 'Business', slug: 'business' },
    { id: '3', name: 'Culture', slug: 'culture' },
    { id: '4', name: 'Science', slug: 'science' },
];

const SHOWS: Show[] = [
    {
        id: '1',
        slug: 'mad-conversations',
        title: 'MAD Conversations',
        description: 'The first show to document how music and marketing intersect in Ghana. MAD Conversations brings CMOs, music directors, and brand strategists to the table to unpack the campaigns, partnerships, and creative decisions that shaped Ghana\'s commercial soundscape. Each episode reconstructs the story behind an iconic brand-music moment; the brief, the negotiation, the outcome, and the lessons. It\'s beyond nostalgia; it\'s an operational archive of how commercial culture actually works.',
        shortDescription: 'Music. Advertising. Digital.Design.',
        coverImage: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Screenshot 2026-02-07 at 15.38.54.webp',
        category: 'Marketing',
        status: 'active',
        hosts: [
            { id: 'h1', name: 'Abeiku Dadson', bio: 'Documenting Ghana\'s commercial culture.', avatar: 'https://ui-avatars.com/api/?name=Abeiku+Dadson&background=random', role: 'Host' }
        ],
        socialLinks: {
            applePodcasts: '#', // Placeholder - awaiting actual URL
            spotify: '#', // Placeholder - awaiting actual URL
            youtube: '#', // Placeholder - awaiting actual URL
            twitter: '#', // Placeholder
            linkedin: '#' // Placeholder
        }
    },
    {
        id: '2',
        slug: 'on-leadership',
        title: ':On Leadership',
        description: 'In-depth, long-form interviews with the CEOs, founders, policymakers, and institutional builders shaping Africa\'s trajectory. On Leadership goes beyond the polished keynote to examine how critical decisions are actually made, what keeps leaders up at night, and what it costs to build at scale on the continent. Modelled on the editorial depth of international programmes like Bloomberg\'s "Leaders" series.',
        shortDescription: 'What it actually takes to lead in Africa.',
        coverImage: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/coming-soon.webp',
        category: 'Leadership',
        status: 'coming-soon',
        hosts: [
            { id: 'h2', name: 'Adverbe Team', bio: 'Exploring leadership in Africa.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop', role: 'Host' }
        ]
    },
    {
        id: '3',
        slug: 'the-brief',
        title: 'The Brief:',
        description: 'Mobile, on-location, and built around one signature question: "So, what was the brief?" The Brief documents Ghana\'s most memorable advertising campaigns by sitting down with the agencies, brands, and creatives who made them. Each episode names the campaign, the agency, and the guest, and reconstructs the journey from brief to execution. It\'s storytelling as industry documentation — casual in format, serious in archival intent.',
        shortDescription: 'Every campaign has a story. We make sure they get told.',
        coverImage: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/coming-soon.webp',
        category: 'Advertising',
        status: 'coming-soon',
        hosts: [
            { id: 'h3', name: 'Adverbe Team', bio: 'Documenting Ghana\'s advertising stories.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop', role: 'Host' }
        ]
    },
    {
        id: '4',
        slug: 'calvary-central',
        title: 'Calvary Central',
        description: 'Born from a student-run ministry and now reaching far beyond campus, Calvary Central creates space for believers, seekers, and sceptics to explore Christianity without the fluff. From understanding identity in Christ to navigating faith and finances, the show tackles the questions that shape how we live — not just what we believe. Thoughtful but not stuffy. Scriptural but not preachy. New season, same Jesus.',
        shortDescription: 'The heart of it. Where honest faith meets real conversation.',
        coverImage: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
        category: 'Faith',
        status: 'active',
        hosts: [
            { id: 'h4', name: 'Calvary Central Team', bio: 'Exploring faith without the fluff.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop', role: 'Host' }
        ]
    },
    {
        id: '5',
        slug: 'convos-in-the-light',
        title: 'Convos in the Light',
        description: 'Casual, open conversations about living out faith in the real world. Convos in the Light makes room for the questions, doubts, and joys that don\'t always fit neatly into a Sunday sermon — exploring what it means to walk with God through ordinary life, honest dialogue, and genuine community.',
        shortDescription: 'Everyday Christianity, no filter.',
        coverImage: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/coming-soon.webp',
        category: 'Faith',
        status: 'coming-soon',
        hosts: [
            { id: 'h5', name: 'Convos Team', bio: 'Real conversations about faith.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop', role: 'Host' }
        ]
    },
    {
        id: '6',
        slug: 'home-court',
        title: 'Home Court',
        description: 'The first dedicated platform for Ghana\'s tennis ecosystem. Home Court connects players, coaches, administrators, and fans through stories of competition, development, and the growth of racquet sport in West Africa. Whether you\'re on the circuit or just discovering the game, this is where Ghana\'s tennis community finds its voice.',
        shortDescription: 'Ghana\'s tennis community, on the record.',
        coverImage: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/coming-soon.webp',
        category: 'Sport',
        status: 'coming-soon',
        hosts: [
            { id: 'h6', name: 'Home Court Team', bio: 'Documenting Ghana\'s tennis community.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop', role: 'Host' }
        ]
    }
];

const EPISODES: Episode[] = [
    {
        id: 'e1',
        slug: 'ai-revolution',
        title: 'The AI Revolution is Here',
        description: 'We discuss the implications of AGI and how it will transform the workforce in the next decade.',
        showId: '1',
        duration: '45:20',
        publishedAt: '2023-10-15T10:00:00Z',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // reliable public domain test file
        tags: ['AI', 'Tech', 'Future'],
        transcript: 'Currently unavailable.',
        showNotes: 'Links mentioned: ...'
    },
    {
        id: 'e2',
        slug: 'quantum-leap',
        title: 'Quantum Computing: A Leap',
        description: 'Understanding the basics of quantum mechanics and computing.',
        showId: '1',
        duration: '38:15',
        publishedAt: '2023-10-22T10:00:00Z',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        tags: ['Quantum', 'Physics'],
        transcript: 'Currently unavailable.',
        showNotes: 'Links mentioned: ...'
    },
    {
        id: 'e3',
        slug: 'bootstrapping-101',
        title: 'Bootstrapping 101: First Customers',
        description: 'How to get your first 10 paying customers without spending a dime on ads.',
        showId: '2',
        duration: '50:00',
        publishedAt: '2023-10-20T10:00:00Z',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        tags: ['Startup', 'Sales'],
        transcript: 'Currently unavailable.',
        showNotes: 'Links mentioned: ...'
    }
];

export async function getShows(): Promise<Show[]> {
    return SHOWS;
}

export async function getShowBySlug(slug: string): Promise<Show | undefined> {
    return SHOWS.find(s => s.slug === slug);
}

export async function getEpisodes(showId?: string): Promise<Episode[]> {
    if (showId) {
        return EPISODES.filter(e => e.showId === showId);
    }
    return EPISODES;
}

export async function getLatestEpisodes(limit: number = 5): Promise<(Episode & { show: Show })[]> {
    const sorted = [...EPISODES].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);

    return sorted.map(episode => {
        const show = SHOWS.find(s => s.id === episode.showId)!;
        return { ...episode, show };
    });
}

export async function getCategories(): Promise<Category[]> {
    return CATEGORIES;
}
