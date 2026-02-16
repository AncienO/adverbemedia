'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const shows = [
    {
        title: 'MAD Conversations',
        description: 'Marketing leadership across Africa',
        slug: 'mad-conversations',
        image: '/Screenshot 2026-02-07 at 15.38.54.png'
    },
    {
        title: 'On Leadership',
        description: 'What it actually takes to lead in Africa.',
        slug: 'on-leadership',
        image: '/abstract_graphic.png'
    },
    {
        title: 'The Brief',
        description: 'Every campaign has a story. We make sure they get told.',
        slug: 'the-brief',
        image: '/abstract_graphic.png'
    },
    {
        title: 'Calvary Central',
        description: 'Where honest faith meets real conversation.',
        slug: 'calvary-central',
        image: '/abstract_graphic.png'
    },
    {
        title: 'Convos in the Light',
        description: 'Everyday Christianity, no filter.',
        slug: 'convos-in-the-light',
        image: '/abstract_graphic.png'
    },
    {
        title: 'Home Court',
        description: 'Ghana\'s tennis community, on the record.',
        slug: 'home-court',
        image: '/abstract_graphic.png'
    }
];

export function ShowsPreview() {
    return (
        <section className="w-full py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-12 text-center">
                    What we&apos;re building
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {shows.map((show) => (
                        <Link
                            key={show.slug}
                            href={`/shows/${show.slug}`}
                            className="group"
                        >
                            <div className="border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 h-full flex flex-col overflow-hidden">
                                {/* Square Image */}
                                <div className="w-full aspect-square relative bg-gray-200 group-hover:bg-gray-700 transition-colors duration-300">
                                    <Image
                                        src={show.image}
                                        alt={show.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-white">
                                        {show.title}
                                    </h3>
                                    <p className="text-base text-gray-700 group-hover:text-gray-200">
                                        {show.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/shows"
                        className="inline-flex items-center gap-2 text-xl font-semibold text-black hover:text-gray-700 transition-colors"
                    >
                        See All Shows
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
