'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Music, Radio, Video, Globe, Linkedin, Instagram, Facebook, Rss } from 'lucide-react';

const XLogo = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-label="X">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.737-8.835L1.254 2.25H8.08l4.258 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
);

const TikTokLogo = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-label="TikTok">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.04 8.76-.08 3.55-2.87 6.42-6.4 6.94-3.53.53-7.29-1.55-8.62-4.79-1.29-3.14.39-6.72 3.49-7.96 1.14-.49 2.51-.51 3.75-.15.01 1.48.01 2.96 0 4.45-.66-.27-1.47-.28-2.15.03-1.66.7-2.3 2.73-1.45 4.29.87 1.64 3.03 2.15 4.6 1.15.93-.57 1.54-1.57 1.6-2.67.07-4.22.02-8.43.02-12.65.37-.02.73-.02 1.1-.02z" />
    </svg>
);

const LINK_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    applePodcasts: { label: 'Apple Podcasts', icon: <Music className="w-4 h-4" />, color: '#E4192B' },
    spotify: { label: 'Spotify', icon: <Radio className="w-4 h-4" />, color: '#1DB954' },
    youtube: { label: 'YouTube', icon: <Video className="w-4 h-4" />, color: '#FF0000' },
    twitter: { label: 'X', icon: <XLogo />, color: '#000000' },
    instagram: { label: 'Instagram', icon: <Instagram className="w-4 h-4" />, color: '#E1306C' },
    facebook: { label: 'Facebook', icon: <Facebook className="w-4 h-4" />, color: '#1877F2' },
    tiktok: { label: 'TikTok', icon: <TikTokLogo />, color: '#000000' },
    rss: { label: 'RSS Feed', icon: <Rss className="w-4 h-4" />, color: '#F26522' },
    linkedin: { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, color: '#0077B5' },
    website: { label: 'Website', icon: <Globe className="w-4 h-4" />, color: '#333333' },
};

interface StreamingLinksProps {
    socialLinks?: Record<string, any> | null;
    variant?: 'video' | 'listenWatch' | 'listen' | 'links';
}

export function StreamingLinks({ socialLinks, variant = 'links' }: StreamingLinksProps) {
    const links = socialLinks ?? {};

    // New structure uses 'listenWatch', 'listen', and 'connect' arrays
    const listenWatchList = (links as any).listenWatch ?? [];
    const listenList = (links as any).listen ?? [];
    const connectList = (links as any).connect ?? [];

    // Fallback for old structure (migration on the fly)
    const toggles = (links as any).toggles ?? {};
    const order = (links as any).order ?? Object.keys(links).filter((k: string) => k !== 'order' && k !== 'toggles' && k !== 'listen' && k !== 'connect' && k !== 'listenWatch' && k !== 'youtubePreview');

    const getFallbackLinks = (section: 'listenWatch' | 'listen' | 'connect') => {
        return order
            .filter((k: string) => !!(links as any)[k] && LINK_META[k] && toggles[k] !== false)
            .filter((k: string) => {
                if (section === 'listenWatch') return ['spotify', 'applePodcasts', 'youtube'].includes(k);
                if (section === 'listen') return ['rss'].includes(k); // Audio-only for generic 'listen' fallback
                return !['spotify', 'applePodcasts', 'rss', 'youtube'].includes(k);
            })
            .map((k: string) => ({ platform: k, url: (links as any)[k], isActive: true }));
    };

    const finalListenWatch = listenWatchList.length > 0 ? listenWatchList : getFallbackLinks('listenWatch');
    const finalListen = listenList.length > 0 ? listenList : getFallbackLinks('listen');
    const finalConnect = connectList.length > 0 ? connectList : getFallbackLinks('connect');

    const youtubePreviewUrl = (links as any).youtubePreview as string | undefined;
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const youtubeId = youtubePreviewUrl ? getYouTubeId(youtubePreviewUrl) : null;

    const renderBadge = (link: any, index: number) => {
        if (!link.isActive) return null;
        const key = link.platform;
        const href = link.url;
        const meta = LINK_META[key];

        if (!meta && !href) return null;

        // Specialized Image Badges
        if (key === 'spotify') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/Spotify_listen.png" alt="Listen on Spotify" width={160} height={40} className="h-[40px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }
        if (key === 'applePodcasts') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/Apple_Podcast.svg" alt="Listen on Apple Podcasts" width={160} height={40} className="h-[40px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }
        if (key === 'youtube') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/Youtube_watch.png" alt="Watch on YouTube" width={160} height={40} className="h-[40px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }
        if (key === 'rss') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/rssfeed.png" alt="RSS Feed" width={46} height={46} className="h-[46px] w-auto object-contain rounded-[4px]" loading="lazy" decoding="async" />
                </Link>
            );
        }

        // Connect Section Social Images
        if (key === 'instagram') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/instagram-logo-8869.svg" alt="Follow on Instagram" width={30} height={30} className="h-[30px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }
        if (key === 'facebook') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/facebook-2870.svg" alt="Follow on Facebook" width={30} height={30} className="h-[30px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }
        if (key === 'tiktok') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/tiktok-logo-10296.svg" alt="Follow on TikTok" width={30} height={30} className="h-[30px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }
        if (key === 'twitter') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/twitter-x-logo-black-round-20851.svg" alt="Follow on X" width={30} height={30} className="h-[30px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }
        if (key === 'linkedin') {
            return (
                <Link key={`${key}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-105 duration-200">
                    <img src="/linkedin-logo-15916.svg" alt="Follow on LinkedIn" width={30} height={30} className="h-[30px] w-auto object-contain" loading="lazy" decoding="async" />
                </Link>
            );
        }

        // Default Button Badge
        return (
            <Link
                key={`${key}-${index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border-2 bg-white font-semibold text-sm transition-colors duration-200 w-44 justify-center"
                style={{ borderColor: meta?.color || '#333', color: meta?.color || '#333' }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = meta?.color || '#333';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = meta?.color || '#333';
                }}
            >
                {meta?.icon || <Globe className="w-4 h-4" />}
                {meta?.label || 'Link'}
            </Link>
        );
    };

    if (variant === 'video') {
        if (!youtubeId) return null;
        return (
            <div className="w-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-0.5 h-5 bg-[#E4192B]" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Watch</h3>
                </div>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-6 max-w-3xl bg-black border border-gray-100">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    if (variant === 'listenWatch') {
        const linksToRender = finalListenWatch.filter((l: any) => l.isActive);
        if (linksToRender.length === 0) return null;

        return (
            <div className="w-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-0.5 h-5 bg-[#E4192B]" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Listen & Watch</h3>
                </div>
                <div className="flex flex-row flex-wrap gap-3 items-center">
                    {linksToRender.map(renderBadge)}
                </div>
            </div>
        );
    }

    if (variant === 'listen') {
        // Strictly only links in the "Listen" section
        const linksToRender = finalListen.filter((l: any) => l.isActive);
        if (linksToRender.length === 0) return null;

        return (
            <div className="w-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-0.5 h-5 bg-[#E4192B]" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Listen</h3>
                </div>
                <div className="flex flex-row flex-wrap gap-3 items-center">
                    {linksToRender.map(renderBadge)}
                </div>
            </div>
        );
    }

    if (variant === 'links') {
        if (finalConnect.length === 0) return null;
        return (
            <div className="w-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-0.5 h-5 bg-[#E4192B]" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Connect</h3>
                </div>
                <div className="flex flex-row flex-wrap gap-3 items-center">
                    {finalConnect.map(renderBadge)}
                </div>
            </div>
        );
    }

    return null;
}
