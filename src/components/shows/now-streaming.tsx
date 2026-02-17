'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Show } from '@/types';
import { Music, Radio, Video } from 'lucide-react';

interface NowStreamingProps {
    show: Show;
}

export function NowStreaming({ show }: NowStreamingProps) {
    return (
        <article className="flex flex-col gap-6">
            {/* Cover Image */}
            <div className="w-full aspect-square bg-gray-200 overflow-hidden">
                <Image
                    src={show.coverImage}
                    alt={show.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl animate-pulse" style={{ color: '#E4192B' }}>●</span>
                    <span className="text-sm font-bold tracking-wider uppercase" style={{ color: '#E4192B' }}>NOW STREAMING</span>
                </div>

                <p className="text-sm font-medium mb-4 text-green-600">Live on Adverbe</p>

                {/* Show Title */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: '#E4192B' }}>
                    {show.title}
                </h2>

                {/* Tagline */}
                <p className="text-lg font-semibold text-gray-700 mb-4">
                    {show.shortDescription}
                </p>

                {/* Description */}
                <p className="text-base leading-relaxed text-gray-800 mb-8 flex-1">
                    {show.description}
                </p>

                {/* Platform Links */}
                <div className="flex flex-col gap-3 mt-auto">
                    <span className="text-sm font-semibold text-gray-700">Listen & Watch:</span>
                    <div className="flex flex-wrap items-center gap-3">
                        {show.socialLinks?.applePodcasts && (
                            <Link
                                href={show.socialLinks.applePodcasts}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 border-2 bg-white hover:text-white transition-colors duration-200 font-medium text-sm"
                                style={{ borderColor: '#E4192B', color: '#E4192B' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4192B'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <Music className="w-4 h-4" />
                                Apple Podcasts
                            </Link>
                        )}
                        {show.socialLinks?.spotify && (
                            <Link
                                href={show.socialLinks.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 border-2 bg-white hover:text-white transition-colors duration-200 font-medium text-sm"
                                style={{ borderColor: '#E30512', color: '#E30512' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E30512'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <Radio className="w-4 h-4" />
                                Spotify
                            </Link>
                        )}
                        {show.socialLinks?.youtube && (
                            <Link
                                href={show.socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 border-2 bg-white hover:text-white transition-colors duration-200 font-medium text-sm"
                                style={{ borderColor: '#E30512', color: '#E30512' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E30512'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                                <Video className="w-4 h-4" />
                                YouTube
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
