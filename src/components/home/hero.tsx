'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {

    return (
        <section
            className="relative w-full h-[800px] flex items-start pt-[10%] overflow-hidden"
            style={{
                backgroundColor: '#E4192B'
            }}
        >
            {/* Pattern Dots - Bottom Heavy, Decreasing Upwards */}
            <div className="absolute top-0 right-0 w-1/2 h-full z-10 pointer-events-none overflow-hidden">
                {/* Bottom Section (Large, Dense) - varied opacity for depth */}
                <div className="absolute bottom-[-10%] right-[5%] w-64 h-64 rounded-full bg-white/05" />
                <div className="absolute bottom-[-5%] right-[25%] w-48 h-48 rounded-full bg-white/10" />
                <div className="absolute bottom-[5%] right-[15%] w-32 h-32 rounded-full bg-white/05" />
                <div className="absolute bottom-[2%] right-[40%] w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute bottom-[10%] right-[30%] w-20 h-20 rounded-full bg-white/05" />
                <div className="absolute bottom-[-8%] right-[45%] w-40 h-40 rounded-full bg-white/05" />
                <div className="absolute bottom-[8%] right-[2%] w-28 h-28 rounded-full bg-white/10" />
                <div className="absolute bottom-[15%] right-[35%] w-16 h-16 rounded-full bg-white/05" />
                <div className="absolute bottom-[1%] right-[55%] w-20 h-20 rounded-full bg-white/05" />

                {/* Middle Section (Medium) */}
                <div className="absolute bottom-[25%] right-[20%] w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute bottom-[30%] right-[10%] w-12 h-12 rounded-full bg-white/05" />
                <div className="absolute bottom-[40%] right-[35%] w-10 h-10 rounded-full bg-white/10" />
                <div className="absolute bottom-[35%] right-[5%] w-8 h-8 rounded-full bg-white/05" />
                <div className="absolute bottom-[28%] right-[45%] w-14 h-14 rounded-full bg-white/05" />
                <div className="absolute bottom-[42%] right-[15%] w-12 h-12 rounded-full bg-white/10" />
                <div className="absolute bottom-[38%] right-[25%] w-9 h-9 rounded-full bg-white/05" />
                <div className="absolute bottom-[48%] right-[40%] w-8 h-8 rounded-full bg-white/10" />
                <div className="absolute bottom-[45%] right-[50%] w-6 h-6 rounded-full bg-white/05" />

                {/* Top Section (Small, Sparse fading) */}
                <div className="absolute bottom-[55%] right-[8%] w-7 h-7 rounded-full bg-white/10" />
                <div className="absolute bottom-[60%] right-[25%] w-6 h-6 rounded-full bg-white/10" />
                <div className="absolute bottom-[65%] right-[18%] w-5 h-5 rounded-full bg-white/05" />
                <div className="absolute bottom-[70%] right-[15%] w-4 h-4 rounded-full bg-white/10" />
                <div className="absolute bottom-[75%] right-[35%] w-5 h-5 rounded-full bg-white/05" />
                <div className="absolute bottom-[80%] right-[30%] w-3 h-3 rounded-full bg-white/05" />
                <div className="absolute bottom-[85%] right-[5%] w-4 h-4 rounded-full bg-white/10" />
                <div className="absolute bottom-[90%] right-[20%] w-2 h-2 rounded-full bg-white/10" />
                <div className="absolute bottom-[92%] right-[40%] w-2 h-2 rounded-full bg-white/05" />
                <div className="absolute bottom-[95%] right-[10%] w-1 h-1 rounded-full bg-white/10" />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

            {/* Container - shifted left by reducing right justification or adding margin margin-right */}
            <div className="container relative z-20 px-4 md:px-6 flex justify-start pl-[5%] md:pl-[10%]">
                <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%] space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-none text-white font-['Helvetica']">
                        <div className="flex items-baseline gap-2 mb-2">
                            {/* Text comes second visually but its delay is longer */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                                className="block whitespace-nowrap leading-none"
                            >
                                Adverbe Media
                            </motion.span>
                            {/* Circle eases in first */}
                            {/* <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                                className="w-3 h-3 md:w-4 md:h-4 rounded-full inline-block bg-white"
                            /> */}
                        </div>
                        <motion.span
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                            className="block whitespace-nowrap"
                        >
                            is where conversation
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                            className="block whitespace-nowrap"
                        >
                            becomes record
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                        className="max-w-[1200px] text-gray-100 text-base md:text-xl leading-normal"
                    >
                        Ghana&apos;s podcast network for ideas, industries, and communities that shape how we live. Produced with purpose. Archived with care. We create the conversations worth keeping.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                        className="pt-32 flex flex-col sm:flex-row gap-8"
                    >
                        <Link href="/shows" className="group">
                            <span className="text-white text-lg md:text-xl font-bold underline underline-offset-8 decoration-2 decoration-white/30 group-hover:decoration-white transition-all duration-300">
                                Explore Shows
                            </span>
                        </Link>
                        <Link href="/contact" className="group">
                            <span className="text-white text-lg md:text-xl font-bold underline underline-offset-8 decoration-2 decoration-white/30 group-hover:decoration-white transition-all duration-300">
                                Partner with us
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
