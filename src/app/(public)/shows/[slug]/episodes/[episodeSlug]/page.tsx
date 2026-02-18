import React from 'react';
import { notFound } from 'next/navigation';
import { getShowBySlug, getEpisodes } from '@/lib/data';
import { EpisodeDetail } from '@/components/shows/episode-detail';

interface EpisodePageProps {
    params: Promise<{ slug: string; episodeSlug: string }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
    const { slug, episodeSlug } = await params;
    const show = await getShowBySlug(slug);

    if (!show) {
        notFound();
    }

    const episodes = await getEpisodes(show.id);
    const episode = episodes.find(e => e.slug === episodeSlug);

    if (!episode) {
        notFound();
    }

    return <EpisodeDetail show={show} episode={episode} />;
}
