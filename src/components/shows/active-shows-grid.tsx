'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Show } from '@/types';
import { NowStreaming } from './now-streaming';

interface ActiveShowsGridProps {
    shows: Show[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

export function ActiveShowsGrid({ shows }: ActiveShowsGridProps) {
    if (shows.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 bg-white border-b-2" style={{ borderColor: '#E4192B' }}>
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex flex-wrap justify-center gap-8 lg:gap-12"
                >
                    {shows.map(show => (
                        <motion.div
                            key={show.id}
                            variants={item}
                            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-md"
                        >
                            <NowStreaming show={show} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
