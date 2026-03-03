import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Show } from '@/types';
import { ComingSoon } from '@/components/shows/coming-soon';
import { NewsletterSignup } from '@/components/shows/newsletter-signup';
import { ShowsHeader } from '@/components/shows/shows-header';
import { ActiveShowsGrid } from '@/components/shows/active-shows-grid';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const supabase = await createClient();

    const { data: showsData } = await supabase
        .from('shows')
        .select('title, slug, short_description')
        .order('sort_order', { ascending: true });

    const showsList = (showsData || []).map((show: any, index: number) => ({
        '@type': 'PodcastSeries',
        position: index + 1,
        name: show.title,
        url: `https://adverbemedia.com/shows/${show.slug}`,
        description: show.short_description || '',
        inLanguage: 'en',
        publisher: {
            '@type': 'Organization',
            name: 'Adverbe Media',
        },
    }));

    return {
        title: 'Our Shows | Adverbe Media',
        description: "Explore Adverbe's original podcast lineup. From MAD Conversations to Calvary Central — stream what's live and see what's coming next.",
        keywords: 'Ghana podcast network, Podcast network in Ghana, Ghanaian podcasts, Best podcasts in Ghana, Podcast studio Accra, Podcast advertising Ghana, Sponsor a podcast Ghana, African podcast network, West Africa podcast network, Podcast production Ghana, Audio advertising Ghana, MAD Conversations',
        alternates: {
            canonical: 'https://adverbemedia.com/shows',
        },
        robots: {
            index: true,
            follow: true,
        },
        icons: {
            icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
        },
        appleWebApp: {
            title: 'Our Shows | Adverbe Media',
            capable: true,
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://adverbemedia.com/shows',
            siteName: 'Adverbe Media',
            title: 'Our Shows | Adverbe Media',
            description: "Explore Adverbe's original podcast lineup. From MAD Conversations to Calvary Central — stream what's live and see what's coming next.",
            images: [
                {
                    url: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
                    secureUrl: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
                    width: 2000,
                    height: 2000,
                    type: 'image/webp',
                    alt: 'Adverbe Media Podcast Shows',
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@theadverbemedia',
            creator: '@theadverbemedia',
            title: 'Our Shows | Adverbe Media',
            description: "Explore Adverbe's original podcast lineup. From MAD Conversations to Calvary Central — stream what's live and see what's coming next.",
            images: ['https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp'],
        },
        other: {
            'mobile-web-app-capable': 'yes',
            'script:ld+json': JSON.stringify([
                {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'Adverbe Media',
                    url: 'https://adverbemedia.com',
                    logo: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
                    sameAs: [
                        'https://x.com/theadverbe',
                        'https://www.instagram.com/theadverbe/',
                    ],
                },
                {
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'Our Shows | Adverbe Media',
                    url: 'https://adverbemedia.com/shows',
                    description: "Explore Adverbe's original podcast lineup. From MAD Conversations to Calvary Central — stream what's live and see what's coming next.",
                    publisher: {
                        '@type': 'Organization',
                        name: 'Adverbe Media',
                        url: 'https://adverbemedia.com',
                    },
                    mainEntity: {
                        '@type': 'ItemList',
                        itemListOrder: 'https://schema.org/ItemListUnordered',
                        numberOfItems: showsList.length,
                        itemListElement: showsList,
                    },
                },
            ]),
        },
    };
}



export default async function ShowsPage() {
    const supabase = await createClient();

    // Fetch shows from Supabase
    const { data: showsData, error } = await supabase
        .from('shows')
        .select(`
            *,
            categories (name)
        `)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

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
        summary: s.summary,
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
