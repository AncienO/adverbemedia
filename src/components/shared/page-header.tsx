'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    description: string;
    centered?: boolean;
    className?: string;
}

export function PageHeader({ title, description, centered, className }: PageHeaderProps) {
    return (
        <section className={`hero-section w-full pt-20 md:pt-40 pb-6 md:pb-8 bg-white ${className || ''}`}>
            <div className={`w-full px-[5%] md:px-[10%] flex flex-col ${centered ? 'items-center text-center' : ''}`}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-left"
                    style={{ color: '#E4192B', fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    {title}
                </motion.h1>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className={`w-32 h-1 bg-[#E4192B] rounded-full mb-6 ${centered ? 'mx-auto origin-center' : 'origin-left'}`}
                />
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                    className="text-base text-gray-600 font-bold max-w-3xl"
                >
                    {description}
                </motion.p>
            </div>
        </section>
    );
}
