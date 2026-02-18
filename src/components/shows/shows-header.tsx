'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ShowsHeader() {
    return (
        <section className="w-full py-16 md:py-20 bg-white border-b-2" style={{ borderColor: '#E4192B' }}>
            <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                    style={{ color: '#E4192B', fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    Our Shows
                </motion.h1>
            </div>
        </section>
    );
}
