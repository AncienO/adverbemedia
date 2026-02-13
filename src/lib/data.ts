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
        slug: 'future-forward',
        title: 'Future Forward',
        description: 'Exploring the bleeding edge of technology and its impact on society. From AI to biotech, we dive deep into what comes next.',
        shortDescription: 'Exploring the bleeding edge of technology.',
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
        category: 'Technology',
        status: 'active',
        hosts: [
            { id: 'h1', name: 'Sarah Chen', bio: 'Tech journalist and futurist.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop', role: 'Host' }
        ]
    },
    {
        id: '2',
        slug: 'the-daily-grind',
        title: 'The Daily Grind',
        description: 'Real stories from entrepreneurs building businesses from scratch. The highs, the lows, and everything in between.',
        shortDescription: 'Real stories from entrepreneurs.',
        coverImage: 'https://images.unsplash.com/photo-1478737270239-2f63b131844b?q=80&w=2670&auto=format&fit=crop',
        category: 'Business',
        status: 'active',
        hosts: [
            { id: 'h2', name: 'Marcus Ross', bio: 'Serial entrepreneur.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop', role: 'Host' }
        ]
    },
    {
        id: '3',
        slug: 'echoes-of-history',
        title: 'Echoes of History',
        description: 'Uncovering forgotten stories from the past that shape our present reality.',
        shortDescription: 'Uncovering forgotten stories.',
        coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2674&auto=format&fit=crop',
        category: 'Culture',
        status: 'coming-soon',
        hosts: [
            { id: 'h3', name: 'Dr. Elena Vance', bio: 'Historian and author.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop', role: 'Host' }
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
