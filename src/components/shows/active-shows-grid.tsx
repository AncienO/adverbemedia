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
        <section className="w-full pb-16 md:pb-24 pt-0 bg-white border-b-2" style={{ borderColor: '#E4192B' }}>
            <div className="w-full px-[5%] md:px-[10%] overflow-x-hidden">
                <div
                    className="w-full text-4xl md:text-5xl font-bold text-black mb-6 text-left"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    Featured Shows<span className="text-[#E4192B]">.</span>
                </div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 w-full"
                >
                    {shows.map(show => (
                        <motion.div
                            key={show.id}
                            variants={item}
                            className="flex-1 min-w-0 max-w-sm flex flex-col"
                        >
                            <NowStreaming show={show} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
