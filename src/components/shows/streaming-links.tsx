'use client';

import React from 'react';
import Link from 'next/link';
import { Music, Radio, Video, Globe, Linkedin } from 'lucide-react';

const LINK_META: Record<string, { label: string; icon: React.ReactNode; color: string; type: 'listen' | 'watch' }> = {
    applePodcasts: { label: 'Apple Podcasts', icon: <Music className="w-4 h-4" />, color: '#E4192B', type: 'listen' },
    spotify: { label: 'Spotify', icon: <Radio className="w-4 h-4" />, color: '#1DB954', type: 'listen' },
    youtube: { label: 'YouTube', icon: <Video className="w-4 h-4" />, color: '#FF0000', type: 'watch' },
    linkedin: { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, color: '#0077B5', type: 'listen' },
    website: { label: 'Website', icon: <Globe className="w-4 h-4" />, color: '#333333', type: 'listen' },
};

interface StreamingLinksProps {
    socialLinks?: Record<string, any> | null;
}

export function StreamingLinks({ socialLinks }: StreamingLinksProps) {
    const links = socialLinks ?? {};
    const order: string[] = (links as any).order ?? Object.keys(links).filter(k => k !== 'order');
    const allLinks = order.filter(k => !!(links as any)[k] && LINK_META[k]);

    if (allLinks.length === 0) return null;

    const listenLinks = allLinks.filter(k => LINK_META[k].type === 'listen');
    const watchLinks = allLinks.filter(k => LINK_META[k].type === 'watch');

    const youtubePreviewUrl = (links as any).youtubePreview as string | undefined;
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const youtubeId = youtubePreviewUrl ? getYouTubeId(youtubePreviewUrl) : null;

    const hasWatchSection = watchLinks.length > 0 || !!youtubeId;

    const renderLink = (key: string) => {
        const meta = LINK_META[key];
        const href = (links as any)[key] as string;
        return (
            <Link
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border-2 bg-white font-semibold text-sm transition-colors duration-200"
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

    if (listenLinks.length === 0 && !hasWatchSection) return null;

    return (
        <div className="flex flex-col gap-8 items-start w-full">
            {hasWatchSection && (
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-0.5 h-5 bg-[#E4192B]" />
                        <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Watch</h3>
                    </div>
                    {youtubeId ? (
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
                    ) : watchLinks.length > 0 ? (
                        <div className="flex flex-row flex-wrap gap-3">
                            {watchLinks.map(renderLink)}
                        </div>
                    ) : null}
                </div>
            )}

            {listenLinks.length > 0 && (
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-0.5 h-5 bg-[#E4192B]" />
                        <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Listen</h3>
                    </div>
                    <div className="flex flex-row flex-wrap gap-3">
                        {listenLinks.map(renderLink)}
                    </div>
                </div>
            )}
        </div>
    );
}
