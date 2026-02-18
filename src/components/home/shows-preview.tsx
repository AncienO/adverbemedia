'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const shows = [
    {
        title: 'MAD Conversations',
        description: 'Marketing leadership across Africa',
        slug: 'mad-conversations',
        image: '/Screenshot 2026-02-07 at 15.38.54.png'
    },
    {
        title: 'Calvary Central',
        description: 'Where honest faith meets real conversation.',
        slug: 'calvary-central',
        image: '/adverbe-logo-white-bg.jpg'
    },
    {
        title: ':On Leadership',
        description: 'What it actually takes to lead in Africa.',
        slug: 'on-leadership',
        image: '/coming-soon.png'
    },
    {
        title: 'The Brief:',
        description: 'Every campaign has a story. We make sure they get told.',
        slug: 'the-brief',
        image: '/coming-soon.png'
    },
    {
        title: 'Convos in the Light',
        description: 'Everyday Christianity, no filter.',
        slug: 'convos-in-the-light',
        image: '/coming-soon.png'
    },
    {
        title: 'Home Court',
        description: 'Ghana\'s tennis community, on the record.',
        slug: 'home-court',
        image: '/coming-soon.png'
    }
];



export function ShowsPreview() {
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
                    What we&apos;re building.
                </h2>
            </div>

            {/* Grid Container - No Scroll */}
            <div className="w-full px-[5%] md:px-[10%]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {shows.map((show, i) => (
                        <Link
                            key={i}
                            href={`/shows/${show.slug}`}
                            className="group transition-transform duration-300 hover:scale-105"
                        >
                            <div className="flex flex-col rounded-2xl overflow-hidden bg-gray-100 w-full h-full">
                                <div className="relative w-full aspect-[4/5]">
                                    <Image
                                        src={show.image}
                                        alt={show.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                                    />
                                </div>
                                <div className="px-3 py-3 md:px-4 md:py-4">
                                    <h3
                                        className={`text-lg md:text-xl font-bold lowercase tracking-tight transition-colors duration-300 leading-tight ${show.image === '/coming-soon.png'
                                            ? 'text-gray-400 group-hover:text-gray-600'
                                            : 'text-[#E4192B] group-hover:text-black'
                                            }`}
                                    >
                                        {show.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full pl-[5%] md:pl-[10%] pr-4 md:pr-6 mt-20 text-center md:text-left">
                <Link
                    href="/shows"
                    className="inline-flex items-center gap-2 text-xl font-semibold text-black hover:text-[#E4192B] transition-colors"
                >
                    See All Shows
                    <ArrowRight className="w-6 h-6" />
                </Link>
            </div>
        </motion.section>
    );
}
