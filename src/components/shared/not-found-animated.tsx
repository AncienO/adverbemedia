'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function NotFoundAnimated() {
    return (
        <div className="text-center px-4 w-full flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight text-black mb-6"
                style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
            >
                404<span className="text-[#E4192B]" style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}>.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-10 max-w-md mx-auto leading-relaxed font-light"
            >
                The page you're looking for doesn't exist or has been moved.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
                <Link
                    href="/"
                    className="group inline-flex items-center text-xl font-bold text-black hover:text-[#E4192B] transition-colors"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    Go Home
                    <span className="ml-3 w-10 h-10 rounded-full bg-black text-white group-hover:bg-[#E4192B] flex items-center justify-center transition-colors">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </span>
                </Link>
            </motion.div>
        </div>
    );
}
