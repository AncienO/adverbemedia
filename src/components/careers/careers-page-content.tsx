'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { Job } from '@/types';

interface CareersPageContentProps {
    jobs: Job[];
}

export function CareersPageContent({ jobs }: CareersPageContentProps) {
    return (
        <main className="w-full min-h-screen bg-white pt-24 pb-20 px-[5%] md:px-[10%]">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-16 md:mb-24 text-center md:text-left"
            >
                <span className="block text-[#E4192B] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                    Join the Team
                </span>
                <h1
                    className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-6"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    Careers at Adverbe.
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
                    We're building a new kind of media company for Africa. If you care about rigorous storytelling and craft, we want to hear from you.
                </p>
            </motion.div>

            {/* Jobs Grid */}
            <div className="grid gap-6 md:gap-8">
                {jobs.map((job, index) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link
                            href={`/careers/${job.slug}`}
                            className="group block bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl p-6 md:p-10 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                <div className="space-y-4 flex-1">
                                    <h2
                                        className="text-3xl md:text-4xl font-bold text-black group-hover:text-[#E4192B] transition-colors"
                                        style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                    >
                                        {job.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {job.type}
                                        </div>
                                    </div>

                                    <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="mt-2 md:mt-0 flex items-center text-[#E4192B] font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* No Openings Fallback */}
            {jobs.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <p className="text-xl text-gray-500 font-serif italic">
                        No open positions at the moment. Check back soon.
                    </p>
                </div>
            )}

        </main>
    );
}
