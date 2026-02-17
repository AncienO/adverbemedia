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
            <section className="w-full py-16 md:py-20 bg-white border-b-2" style={{ borderColor: '#E4192B' }}>
                <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ color: '#E4192B' }}>
                        Our Shows
                    </h1>
                </div>
            </section>

            {/* Now Streaming Section - Grid Layout */}
            {activeShows.length > 0 && (
                <section className="w-full py-16 md:py-24 bg-white border-b-2" style={{ borderColor: '#E4192B' }}>
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                            {activeShows.map(show => (
                                <div key={show.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-md">
                                    <NowStreaming show={show} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Coming Soon Section */}
            <ComingSoon shows={comingSoonShows} />

            {/* Newsletter Signup CTA */}
            <NewsletterSignup />
        </div>
    );
}
