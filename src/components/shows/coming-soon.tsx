'use client';

import React from 'react';
import Link from 'next/link';
import { ComingSoonVisual } from '@/components/shared/coming-soon-visual';
import { Show } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ComingSoonProps {
    shows: Show[];
}

export function ComingSoon({ shows }: ComingSoonProps) {
    if (shows.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 bg-gray-50">
            <div className="w-full px-[5%] md:px-[10%]">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gray-900">
                        COMING SOON
                    </h2>
                    <p className="text-base text-gray-600">In development</p>
                    <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                        These shows are in active production and will launch across Adverbe's platforms in 2026. Subscribe to stay updated.
                    </p>
                </motion.div>

                {/* Shows Grid */}
                <div className="flex flex-col gap-12 max-w-5xl mx-0">
                    {shows.map((show, index) => (
                        <motion.div
                            key={show.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="border-b border-[#D0D0D0] pb-12 last:border-0 last:pb-0"
                        >
                            <Link
                                href={`/shows/${show.slug}`}
                                className="flex flex-col md:flex-row gap-6 group w-full items-start"
                            >
                                {/* Cover Image - Using Shared Visual */}
                                <div className="w-48 h-48 bg-gray-100 overflow-hidden flex-shrink-0 ml-0 mr-auto md:mx-0 shadow-sm transition-colors duration-300 relative">
                                    {!show.coverImage || show.coverImage === '/coming-soon.png' ? (
                                        <ComingSoonVisual textSize="md" dotSize="md" />
                                    ) : (
                                        <Image
                                            src={show.coverImage || '/coming-soon.png'}
                                            alt={`Coming soon: ${show.title}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="192px"
                                            loading="lazy"
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-4 flex-1">
                                    {/* Badge */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl text-gray-400 group-hover:text-[#E4192B] transition-colors">○</span>
                                        <span className="text-xs font-bold tracking-wider uppercase text-gray-500 group-hover:text-[#E4192B] transition-colors">
                                            COMING SOON
                                        </span>
                                    </div>

                                    {/* Show Title */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#E4192B] transition-colors">
                                        {show.title}
                                    </h3>

                                    {/* Tagline */}
                                    <p className="text-lg font-semibold text-gray-700">
                                        {show.shortDescription}
                                    </p>

                                    {/* Description */}
                                    <p className="text-base leading-relaxed text-gray-600">
                                        {show.summary || show.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
