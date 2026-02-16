import React from 'react';
import { Metadata } from 'next';
import { getShows } from '@/lib/data';
import { NowStreaming } from '@/components/shows/now-streaming';
import { ComingSoon } from '@/components/shows/coming-soon';
import { NewsletterSignup } from '@/components/shows/newsletter-signup';

export const metadata: Metadata = {
    title: 'Our Shows | Adverbe Media',
    description: 'Explore Adverbe\'s original podcast lineup. Stream MAD Conversations now and see what\'s coming next across leadership, faith, advertising, and sport.',
};

export default async function ShowsPage() {
    const shows = await getShows();

    // Separate active and coming soon shows
    const activeShows = shows.filter(show => show.status === 'active');
    const comingSoonShows = shows.filter(show => show.status === 'coming-soon');

    return (
        <div className="w-full">
            {/* Page Header */}
            <section className="w-full py-16 md:py-20 bg-white border-b-2" style={{ borderColor: '#E30512' }}>
                <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ color: '#E30512' }}>
                        Our Shows
                    </h1>
                </div>
            </section>

            {/* Now Streaming Section - Scalable for multiple live shows */}
            {activeShows.length > 0 && (
                <>
                    {activeShows.map(show => (
                        <NowStreaming key={show.id} show={show} />
                    ))}
                </>
            )}

            {/* Coming Soon Section */}
            <ComingSoon shows={comingSoonShows} />

            {/* Newsletter Signup CTA */}
            <NewsletterSignup />
        </div>
    );
}
