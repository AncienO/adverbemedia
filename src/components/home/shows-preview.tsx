'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ComingSoonVisual } from '@/components/shared/coming-soon-visual';
import { Show } from '@/types';

interface ShowsPreviewProps {
    shows: Show[];
}

export function ShowsPreview({ shows }: ShowsPreviewProps) {
    // Duplicate for seamless infinite loop (10 copies to ensure it covers very wide screens)
    const DUPLICATE_COUNT = 10;
    const allShows = shows.length > 0 ? Array(DUPLICATE_COUNT).fill(shows).flat() : [];

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full py-20 md:py-32 bg-white overflow-x-hidden"
        >
            <div className="w-full pl-[5%] md:pl-[10%] pr-4 md:pr-6 mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-black text-center md:text-left">
                    What we&apos;re building<span className="text-[#E4192B]">.</span>
                </h2>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden">
                {/* Left fade mask */}
                <div
                    className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, white, transparent)' }}
                />
                {/* Right fade mask */}
                <div
                    className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to left, white, transparent)' }}
                />

                {/* CSS-animated Scrolling Track — no JS-driven animation to avoid choppiness */}
                <div
                    className="animate-marquee flex w-max"
                    style={{ '--marquee-translate': `-${100 / DUPLICATE_COUNT}%` } as React.CSSProperties}
                >
                    {allShows.map((show, i) => {
                        const isComingSoon = show.status === 'coming-soon';
                        return (
                            <Link
                                key={`${show.id}-${i}`}
                                href={`/shows/${show.slug}`}
                                className="group flex-shrink-0 w-56 md:w-64 mr-6"
                            >
                                <div className={`flex flex-col overflow-hidden w-full h-full shadow-sm hover:shadow-lg transition-shadow duration-300 ${isComingSoon ? 'bg-gray-50 border border-gray-100' : 'bg-white border border-gray-100'}`}>
                                    {/* Image */}
                                    <div className="relative w-full aspect-square overflow-hidden bg-gray-100 transition-colors duration-300">
                                        {isComingSoon && (!show.coverImage || show.coverImage === '/coming-soon.png') ? (
                                            <ComingSoonVisual textSize="lg" dotSize="md" />
                                        ) : (
                                            <Image
                                                src={show.coverImage || '/coming-soon.png'}
                                                alt={show.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 224px, 256px"
                                            />
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="px-4 py-4 flex flex-col gap-1">
                                        <h3
                                            className={`text-base font-bold tracking-tight leading-tight transition-colors duration-300 ${isComingSoon
                                                ? 'text-gray-400 group-hover:text-gray-600'
                                                : 'text-[#E4192B] group-hover:text-black'
                                                }`}
                                        >
                                            {show.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-snug line-clamp-2">
                                            {show.shortDescription || show.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    {allShows.length === 0 && (
                        <div className="text-center w-full py-10 text-gray-400 italic">
                            Loading shows...
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full pl-[5%] md:pl-[10%] pr-4 md:pr-6 mt-16 text-center md:text-left">
                <Link
                    href="/shows"
                    className="inline-flex items-center gap-2 text-base md:text-lg font-bold text-black transition-colors underline underline-offset-8 decoration-2 decoration-[#E4192B] hover:decoration-black"
                >
                    See All Shows
                    <ArrowRight className="w-6 h-6" />
                </Link>
            </div>
        </motion.section>
    );
}
