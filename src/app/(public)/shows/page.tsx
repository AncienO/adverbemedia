import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Show } from '@/types';
import { ComingSoon } from '@/components/shows/coming-soon';
import { NewsletterSignup } from '@/components/shows/newsletter-signup';
import { ShowsHeader } from '@/components/shows/shows-header';
import { ActiveShowsGrid } from '@/components/shows/active-shows-grid';

export const metadata: Metadata = {
    title: 'Our Shows | Adverbe Media',
    description: 'Explore Adverbe\'s original podcast lineup. Stream MAD Conversations now and see what\'s coming next across leadership, faith, advertising, and sport.',
};

export const revalidate = 0; // Disable static caching for dynamic DB content

export default async function ShowsPage() {
    const supabase = await createClient();

    // Fetch shows from Supabase
    const { data: showsData, error } = await supabase
        .from('shows')
        .select(`
            *,
            categories (name)
        `);

    if (error) {
        console.error('Error fetching shows:', error);
        // Handle error gracefully (maybe show empty state or error message)
    }

    // Map DB result to Show interface
    const shows: Show[] = (showsData || []).map((s: any) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.description,
        shortDescription: s.short_description,
        coverImage: s.cover_image_url,
        category: s.categories?.name || 'General', // Fallback
        status: s.status as 'active' | 'coming-soon' | 'completed',
        hosts: [], // TODO: Fetch hosts if needed
        socialLinks: s.social_links
    }));

    // Separate active and coming soon shows
    const activeShows = shows.filter(show => show.status === 'active');
    const comingSoonShows = shows.filter(show => show.status === 'coming-soon');

    return (
        <div className="w-full">
            {/* Page Header */}
            <ShowsHeader />

            {/* Now Streaming Section - Grid Layout */}
            <ActiveShowsGrid shows={activeShows} />

            {/* Coming Soon Section */}
            <ComingSoon shows={comingSoonShows} />

            {/* Newsletter Signup CTA */}
            <NewsletterSignup />
        </div>
    );
}
