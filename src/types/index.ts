export interface Host {
    id: string;
    name: string;
    bio: string;
    avatar: string;
    role: string;
    twitter?: string;
    linkedin?: string;
}

export interface Show {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    summary?: string;
    coverImage: string;
    category: string;
    status: 'active' | 'coming-soon' | 'completed';
    hosts: Host[];
    socialLinks?: {
        twitter?: string;
        instagram?: string;
        website?: string;
        applePodcasts?: string;
        spotify?: string;
        youtube?: string;
        linkedin?: string;
    };
    adContent?: string;
    relatedShowIds?: string[];
}

export interface Episode {
    id: string;
    slug: string;
    title: string;
    description: string;
    showId: string;
    duration: string; // "45:00"
    publishedAt: string; // ISO date
    audioUrl: string;
    coverImage?: string; // Optional episode specific art
    tags: string[];
    transcript?: string;
    showNotes?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Job {
    id: string;
    slug: string;
    title: string;
    location: string;
    type: string;
    description: string;
    requirements?: string;
    isActive: boolean;
}

export interface CompanyDocument {
    id: string;
    title: string;
    description?: string;
    fileUrl: string;
    fileSize: string;
    fileFormat: string;
    category: string;
}
