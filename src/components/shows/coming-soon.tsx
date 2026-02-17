'use client';

import React from 'react';
import Image from 'next/image';
import { Show } from '@/types';

interface ComingSoonProps {
    shows: Show[];
}

export function ComingSoon({ shows }: ComingSoonProps) {
    if (shows.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gray-900">
                        COMING SOON
                    </h2>
                    <p className="text-base text-gray-600">In development</p>
                    <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                        These shows are in active production and will launch across Adverbe's platforms in 2026. Subscribe to stay updated.
                    </p>
                </div>

                {/* Shows Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {shows.map((show) => (
                        <div key={show.id} className="flex flex-col md:flex-row gap-6">
                            {/* Cover Image - Fixed Square */}
                            <div className="w-48 h-48 bg-gray-200 overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                                <Image
                                    src={show.coverImage}
                                    alt={show.title}
                                    width={192}
                                    height={192}
                                    className="w-full h-full object-cover grayscale opacity-60"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-4 flex-1">
                                {/* Badge */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xl text-gray-400">○</span>
                                    <span className="text-xs font-bold tracking-wider uppercase text-gray-500">
                                        COMING SOON
                                    </span>
                                </div>

                                {/* Show Title */}
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {show.title}
                                </h3>

                                {/* Tagline */}
                                <p className="text-lg font-semibold text-gray-700">
                                    {show.shortDescription}
                                </p>

                                {/* Description */}
                                <p className="text-base leading-relaxed text-gray-600">
                                    {show.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
