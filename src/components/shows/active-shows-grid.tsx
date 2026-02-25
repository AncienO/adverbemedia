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
                    className="flex flex-col md:flex-row md:flex-wrap items-start md:justify-start gap-0 md:gap-8 w-full"
                >
                    {shows.map((show, index) => (
                        <React.Fragment key={show.id}>
                            <motion.div
                                variants={item}
                                className="flex-1 min-w-0 md:max-w-sm flex flex-col py-10 md:py-0"
                            >
                                <NowStreaming show={show} />
                            </motion.div>
                            {index < shows.length - 1 && (
                                <div className="block md:hidden w-full h-[1px] md:h-[2px]" style={{ backgroundColor: '#E4192B' }} />
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
