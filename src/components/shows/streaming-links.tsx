'use client';

import React from 'react';
import Link from 'next/link';
import { Music, Radio, Video, Globe, Linkedin, Instagram } from 'lucide-react';

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

interface StreamingLinksProps {
    socialLinks?: Record<string, any> | null;
    variant?: 'video' | 'links';
}

export function StreamingLinks({ socialLinks, variant = 'links' }: StreamingLinksProps) {
    const links = socialLinks ?? {};
    const order: string[] = (links as any).order ?? Object.keys(links).filter(k => k !== 'order');
    const allLinks = order.filter(k => !!(links as any)[k] && LINK_META[k]);

    const youtubePreviewUrl = (links as any).youtubePreview as string | undefined;
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const youtubeId = youtubePreviewUrl ? getYouTubeId(youtubePreviewUrl) : null;

    if (variant === 'video') {
        if (!youtubeId) return null;
        return (
            <div className="w-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-0.5 h-5 bg-[#E4192B]" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Link</h3>
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

    if (variant === 'links') {
        if (allLinks.length === 0) return null;

        const renderLink = (key: string) => {
            const meta = LINK_META[key];
            const href = (links as any)[key] as string;
            return (
                <Link
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 border-2 bg-white font-semibold text-sm transition-colors duration-200 w-44 justify-center"
                    style={{ borderColor: meta.color, color: meta.color }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = meta.color;
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = meta.color;
                    }}
                >
                    {meta.icon}
                    {meta.label}
                </Link>
            );
        };

        return (
            <div className="w-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-0.5 h-5 bg-[#E4192B]" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Connect</h3>
                </div>
                <div className="flex flex-row flex-wrap gap-3">
                    {allLinks.map(renderLink)}
                </div>
            </div>
        );
    }

    return null;
}
