'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { Job } from '@/types';
import { PageHeader } from '@/components/shared/page-header';

interface CareersPageContentProps {
    jobs: Job[];
}

export function CareersPageContent({ jobs }: CareersPageContentProps) {
    return (
        <div className="w-full min-h-screen bg-white">

            <PageHeader
                title="Careers at Adverbe"
                description="We're building a new kind of media company for Africa. If you care about rigorous storytelling and craft, we want to hear from you."
            />

            <main className="pb-20 px-[5%] md:px-[10%]">

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
        </div>
    );
}
