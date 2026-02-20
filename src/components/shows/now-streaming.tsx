'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ComingSoonVisual } from '@/components/shared/coming-soon-visual';
import { Show } from '@/types';
import { Music, Radio, Video, Globe, Instagram, Linkedin } from 'lucide-react';

interface NowStreamingProps {
    show: Show;
}

// Custom X (formerly Twitter) logo SVG
const XLogo = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-label="X">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.737-8.835L1.254 2.25H8.08l4.258 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
);

const LINK_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    applePodcasts: { label: 'Apple Podcasts', icon: <Music className="w-4 h-4" />, color: '#E4192B' },
    spotify: { label: 'Spotify', icon: <Radio className="w-4 h-4" />, color: '#1DB954' },
    youtube: { label: 'YouTube', icon: <Video className="w-4 h-4" />, color: '#FF0000' },
    twitter: { label: 'X', icon: <XLogo />, color: '#000000' },
    instagram: { label: 'Instagram', icon: <Instagram className="w-4 h-4" />, color: '#E1306C' },
    linkedin: { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, color: '#0077B5' },
    website: { label: 'Website', icon: <Globe className="w-4 h-4" />, color: '#333333' },
};

export function NowStreaming({ show }: NowStreamingProps) {
    const links = show.socialLinks ?? {};
    const order: string[] = (links as any).order ?? Object.keys(links).filter(k => k !== 'order');
    const ALLOWED_LINKS = ['youtube', 'applePodcasts', 'spotify'];
    const streamingLinks = order.filter(k => !!(links as any)[k] && LINK_META[k] && ALLOWED_LINKS.includes(k));

    return (
        <article className="flex flex-col gap-6 h-full">
            {/* Cover Image */}
            <Link href={`/shows/${show.slug}`} className="w-full aspect-square bg-gray-200 overflow-hidden block group relative">
                {show.status === 'coming-soon' && (!show.coverImage || show.coverImage === '/coming-soon.png') ? (
                    <ComingSoonVisual textSize="lg" dotSize="md" />
                ) : (
                    <Image
                        src={show.coverImage || '/coming-soon.png'}
                        alt={show.title}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl animate-pulse" style={{ color: '#E4192B' }}>●</span>
                    <span className="text-sm font-bold tracking-wider uppercase" style={{ color: '#E4192B' }}>NOW STREAMING</span>
                </div>

                {/* Show Title */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 line-clamp-2">
                    <Link href={`/shows/${show.slug}`} className="hover:underline decoration-[#E4192B] decoration-2 underline-offset-4" style={{ color: '#E4192B' }}>
                        {show.title}
                    </Link>
                </h2>

                {/* Short Description — immediately below title */}
                <p className="text-lg font-semibold text-gray-700 mb-4 line-clamp-2">
                    {show.shortDescription}
                </p>

                {/* Summary / Full Description — fixed height for card alignment */}
                <p className="text-base leading-relaxed text-gray-800 mb-8 flex-1 line-clamp-5">
                    {show.summary || show.description}
                </p>

                {/* Platform Links — stacked, border fits the text, aligned bottom */}
                {streamingLinks.length > 0 && (
                    <div className="flex flex-col gap-3 mt-auto">
                        <span className="text-sm font-semibold text-gray-700">Listen &amp; Watch:</span>
                        <div className="flex flex-col gap-2 items-start">
                            {streamingLinks.includes('youtube') && (
                                <Link
                                    key="youtube"
                                    href={(links as any)['youtube'] as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 border-2 bg-white hover:text-white transition-colors duration-200 font-medium text-sm w-44 justify-center"
                                    style={{ borderColor: LINK_META.youtube.color, color: LINK_META.youtube.color }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LINK_META.youtube.color)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                                >
                                    {LINK_META.youtube.icon}
                                    {LINK_META.youtube.label}
                                </Link>
                            )}
                            {(streamingLinks.includes('spotify') || streamingLinks.includes('applePodcasts')) && (
                                <div className="flex flex-row gap-2 items-center flex-wrap">
                                    {streamingLinks.includes('spotify') && (
                                        <Link
                                            key="spotify"
                                            href={(links as any)['spotify'] as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 border-2 bg-white hover:text-white transition-colors duration-200 font-medium text-sm w-44 justify-center"
                                            style={{ borderColor: LINK_META.spotify.color, color: LINK_META.spotify.color }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LINK_META.spotify.color)}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                                        >
                                            {LINK_META.spotify.icon}
                                            {LINK_META.spotify.label}
                                        </Link>
                                    )}
                                    {streamingLinks.includes('applePodcasts') && (
                                        <Link
                                            key="applePodcasts"
                                            href={(links as any)['applePodcasts'] as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 border-2 bg-white hover:text-white transition-colors duration-200 font-medium text-sm w-44 justify-center"
                                            style={{ borderColor: LINK_META.applePodcasts.color, color: LINK_META.applePodcasts.color }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LINK_META.applePodcasts.color)}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                                        >
                                            {LINK_META.applePodcasts.icon}
                                            {LINK_META.applePodcasts.label}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
