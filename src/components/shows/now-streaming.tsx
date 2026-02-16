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
        <section className="w-full py-16 md:py-24 bg-white border-b-2" style={{ borderColor: '#E30512' }}>
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
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
                    <div>
                        {/* Badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl" style={{ color: '#E30512' }}>●</span>
                            <span className="text-sm font-bold tracking-wider uppercase" style={{ color: '#E30512' }}>NOW STREAMING</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-8">Live on Adverbe</p>

                        {/* Show Title */}
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: '#E30512' }}>
                            {show.title}
                        </h2>

                        {/* Tagline */}
                        <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
                            {show.shortDescription}
                        </p>

                        {/* Description */}
                        <p className="text-base md:text-lg leading-relaxed text-gray-800 mb-10">
                            {show.description}
                        </p>

                        {/* Platform Links */}
                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-semibold text-gray-700">Listen & Watch:</span>
                            <div className="flex flex-wrap items-center gap-3">
                                {show.socialLinks?.applePodcasts && (
                                    <Link
                                        href={show.socialLinks.applePodcasts}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 border-2 bg-white hover:text-white transition-colors duration-200 font-medium text-sm"
                                        style={{ borderColor: '#E30512', color: '#E30512' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E30512'}
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
                </div>
            </div>
        </section>
    );
}
