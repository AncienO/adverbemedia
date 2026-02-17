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
        image: '/adverbe-logo-white-bg.jpg'
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

import { motion } from 'framer-motion';

export function ShowsPreview() {
    return (
        <section className="w-full py-20 md:py-32 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="w-full"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-black mb-12 text-center">
                        What we&apos;re building
                    </h2>
                </div>

                <div
                    className="flex overflow-x-auto gap-6 pb-8 w-full scrollbar-hide snap-x snap-mandatory pl-4 md:pl-8 xl:pl-[calc((100vw-1280px)/2+2.5rem)] 2xl:pl-[calc((100vw-1536px)/2+2.5rem)] pr-4 md:pr-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {shows.map((show) => (
                        <div key={show.slug} className="min-w-[85vw] sm:min-w-[400px] snap-center first:pl-2 last:pr-6 md:first:pl-0 md:last:pr-0">
                            <Link
                                href={`/shows/${show.slug}`}
                                className="group block h-full"
                            >
                                <div className="border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 h-full flex flex-col overflow-hidden">
                                    {/* Square Image */}
                                    <div className="w-full aspect-square relative bg-gray-200 group-hover:bg-gray-700 transition-colors duration-300">
                                        <Image
                                            src={show.image}
                                            alt={show.title}
                                            fill
                                            className="object-cover"
                                            draggable={false}
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1">
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-white whitespace-normal">
                                            {show.title}
                                        </h3>
                                        <p className="text-base text-gray-700 group-hover:text-gray-200 whitespace-normal">
                                            {show.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="container mx-auto px-4 md:px-6 mt-12 text-center">
                    <Link
                        href="/shows"
                        className="inline-flex items-center gap-2 text-xl font-semibold text-black hover:text-gray-700 transition-colors"
                    >
                        See All Shows
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
