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

    // New structure
    const listenWatchList = (links as any).listenWatch ?? [];
    const listenList = (links as any).listen ?? [];
    const connectList = (links as any).connect ?? [];
    const toggles = (links as any).toggles ?? {};
    const order = (links as any).order ?? Object.keys(links).filter(k => k !== 'order' && k !== 'toggles' && k !== 'listen' && k !== 'connect');

    const getFallbackLinks = (section: 'listenWatch' | 'listen' | 'connect') => {
        return order
            .filter((k: string) => !!(links as any)[k] && LINK_META[k] && toggles[k] !== false)
            .filter((k: string) => {
                if (section === 'listenWatch') return ['spotify', 'applePodcasts', 'youtube'].includes(k);
                if (section === 'listen') return ['spotify', 'applePodcasts'].includes(k);
                return ['youtube'].includes(k);
            })
            .map((k: string) => ({ platform: k, url: (links as any)[k], isActive: true }));
    };

    const finalListenWatch = listenWatchList.length > 0 ? listenWatchList : getFallbackLinks('listenWatch');

    // Homepage banner strictly uses the "Listen & Watch" section as defined by the admin
    const prioritizedLinks = finalListenWatch.filter((l: any) => l.isActive);

    const youtubeLink = prioritizedLinks.find((l: any) => l.platform === 'youtube');
    const audioPlatforms = prioritizedLinks.filter((l: any) => (l.platform === 'spotify' || l.platform === 'applePodcasts' || l.platform === 'rss'));

    return (
        <article className="flex flex-col gap-6 h-full items-start">
            {/* Cover Image */}
            <Link href={`/shows/${show.slug}`} className="featured-show-image-container w-full aspect-square bg-gray-200 overflow-hidden block group relative">
                {show.status === 'coming-soon' && (!show.coverImage || show.coverImage === '/coming-soon.png') ? (
                    <ComingSoonVisual textSize="lg" dotSize="md" />
                ) : (
                    <Image
                        src={show.coverImage || '/coming-soon.png'}
                        alt={`Cover image for ${show.title}`}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
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
                {(youtubeLink || audioPlatforms.length > 0) && (
                    <div className="flex flex-col gap-3 mt-auto">
                        <span className="text-sm font-semibold text-gray-700">Listen &amp; Watch:</span>
                        <div className="flex flex-col gap-2 items-start">
                            {youtubeLink && (
                                <Link
                                    key="youtube"
                                    href={youtubeLink.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition-transform hover:scale-105 duration-200 min-h-[44px] flex items-center md:-ml-6"
                                >
                                    {/* <img src="/Youtube_watch.png" alt="Watch on YouTube" width={160} height={40} className="h-[36px] md:h-[40px] w-auto object-contain" loading="lazy" decoding="async" /> */}
                                    <img src="/Youtube_watch.png" alt="Watch on YouTube" width={160} height={40} className="h-[36px] md:h-[40px] object-contain" loading="lazy" decoding="async" />
                                </Link>
                            )}
                            {audioPlatforms.length > 0 && (
                                <div className="flex flex-row gap-3 items-center flex-wrap">
                                    {audioPlatforms.map((link: { platform: string; url: string }, idx: number) => {
                                        const key = link.platform;
                                        if (key === 'spotify') {
                                            return (
                                                <Link key={`spotify-${idx}`} href={link.url} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200 min-h-[44px] flex items-center">
                                                    {/* <img src="/Spotify_listen.png" alt="Listen on Spotify" width={160} height={40} className="h-[36px] md:h-[40px] w-auto object-contain" loading="lazy" decoding="async" /> */}
                                                    <img src="/Spotify_listen.png" alt="Listen on Spotify" width={160} height={40} className="h-[36px] md:h-[40px] object-contain" loading="lazy" decoding="async" />
                                                </Link>
                                            );
                                        }
                                        if (key === 'applePodcasts') {
                                            return (
                                                <Link key={`apple-${idx}`} href={link.url} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200 min-h-[44px] flex items-center md:-ml-6">
                                                    {/* <img src="/Apple_Podcast.svg" alt="Listen on Apple Podcasts" width={160} height={40} className="h-[36px] md:h-[40px] w-auto object-contain" loading="lazy" decoding="async" /> */}
                                                    <img src="/Apple_Podcast.svg" alt="Listen on Apple Podcasts" width={160} height={40} className="h-[36px] md:h-[40px] object-contain" loading="lazy" decoding="async" />
                                                </Link>
                                            );
                                        }
                                        if (key === 'rss') {
                                            return (
                                                <Link key={`rss-${idx}`} href={link.url} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200 min-h-[44px] flex items-center">
                                                    {/* <img src="/rssfeed.png" alt="RSS Feed" width={46} height={46} className="h-[42px] md:h-[46px] w-auto object-contain rounded-[4px]" loading="lazy" decoding="async" /> */}
                                                    <img src="/rssfeed.png" alt="RSS Feed" width={46} height={46} className="h-[42px] md:h-[46px] object-contain rounded-[4px]" loading="lazy" decoding="async" />
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
