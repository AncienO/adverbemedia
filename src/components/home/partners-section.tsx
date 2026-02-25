'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { motion } from 'framer-motion';

export function PartnersSection() {
    return (
        <section className="w-full py-20 md:py-32 bg-white border-t border-[#E4192B]">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="max-w-3xl mx-auto text-center space-y-8"
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black"
                        style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                    >
                        Your audience is already listening<span className="text-[#E4192B]">.</span>
                    </h2>

                    <p className="text-lg md:text-xl leading-relaxed text-black/80 font-light">
                        Adverbe reaches professionals, decision-makers, and culturally engaged listeners across Ghana and the diaspora. Whether you&apos;re a brand looking for meaningful integration or an agency exploring podcast as a channel, we&apos;d like to hear from you.
                    </p>

                    <div className="pt-6 flex flex-col items-center gap-4">
                        <Link
                            href="/for-brands-and-advertisers"
                            className="inline-flex items-center gap-2 text-xl font-bold text-[#E4192B] hover:text-[#E4192B]/80 transition-colors uppercase tracking-widest"
                        >
                            Get in Touch
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
