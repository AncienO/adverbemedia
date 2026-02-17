'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { motion } from 'framer-motion';

export function PartnersSection() {
    return (
        <section className="w-full py-20 md:py-32" style={{ backgroundColor: '#E4192B' }}>
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="max-w-3xl mx-auto text-center space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                        Your audience is already listening.
                    </h2>

                    <p className="text-lg md:text-xl leading-relaxed text-white/90">
                        Adverbe reaches professionals, decision-makers, and culturally engaged listeners across Ghana and the diaspora. Whether you&apos;re a brand looking for meaningful integration or an agency exploring podcast as a channel, we&apos;d like to hear from you.
                    </p>

                    <div className="pt-6 space-y-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-xl font-semibold text-white hover:text-white/80 transition-colors"
                        >
                            Get in Touch
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                        <div>
                            <a
                                href="mailto:partnerships@adverbemedia.com"
                                className="text-lg text-white/90 hover:text-white transition-colors underline"
                            >
                                partnerships@adverbemedia.com
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
