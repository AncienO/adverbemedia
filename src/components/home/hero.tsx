'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {

    return (
        <section
            className="hero-section home-hero-section relative w-full h-screen flex items-start pt-36 md:pt-[15%] overflow-clip"
            style={{
                backgroundColor: '#ffffff'
            }}
            data-cursor="invert"
        >
            {/* Background Image with Gradient Mask */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat hero-background-image"
                    style={{
                        backgroundImage: "url('/hero-bg.png')",
                        backgroundPosition: "right center",
                        backgroundAttachment: "fixed"
                    }}
                />
                {/* Preload safeguard for hero image */}
                <div className="sr-only">
                    <Image
                        src="/hero-bg.png"
                        alt=""
                        width={1920}
                        height={1080}
                        priority
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>

                {/* Gradient Overlay: 15% Dark to 85% Image */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(to right, #000000 15%, transparent 85%)"
                    }}
                />
            </div>

            {/* Pattern Dots - Bottom Heavy, Decreasing Upwards */}
            <div className="absolute top-0 right-0 w-1/2 h-full z-10 pointer-events-none overflow-hidden mix-blend-multiply opacity-50">
                {/* Bottom Section (Large, Dense) - varied opacity for depth */}
                <div className="absolute bottom-[-10%] right-[5%] w-64 h-64 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[-5%] right-[25%] w-48 h-48 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[5%] right-[15%] w-32 h-32 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[2%] right-[40%] w-24 h-24 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[10%] right-[30%] w-20 h-20 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[-8%] right-[45%] w-40 h-40 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[8%] right-[2%] w-28 h-28 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[15%] right-[35%] w-16 h-16 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[1%] right-[55%] w-20 h-20 rounded-full bg-[#E4192B]/05" />

                {/* Middle Section (Medium) */}
                <div className="absolute bottom-[25%] right-[20%] w-16 h-16 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[30%] right-[10%] w-12 h-12 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[40%] right-[35%] w-10 h-10 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[35%] right-[5%] w-8 h-8 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[28%] right-[45%] w-14 h-14 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[42%] right-[15%] w-12 h-12 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[38%] right-[25%] w-9 h-9 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[48%] right-[40%] w-8 h-8 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[45%] right-[50%] w-6 h-6 rounded-full bg-[#E4192B]/05" />

                {/* Top Section (Small, Sparse fading) */}
                <div className="absolute bottom-[55%] right-[8%] w-7 h-7 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[60%] right-[25%] w-6 h-6 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[65%] right-[18%] w-5 h-5 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[70%] right-[15%] w-4 h-4 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[75%] right-[35%] w-5 h-5 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[80%] right-[30%] w-3 h-3 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[85%] right-[5%] w-4 h-4 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[90%] right-[20%] w-2 h-2 rounded-full bg-[#E4192B]/10" />
                <div className="absolute bottom-[92%] right-[40%] w-2 h-2 rounded-full bg-[#E4192B]/05" />
                <div className="absolute bottom-[95%] right-[10%] w-1 h-1 rounded-full bg-[#E4192B]/10" />
            </div>

            {/* Overlay Removed for cleaner white background */}

            {/* Container - shifted left by reducing right justification or adding margin margin-right */}
            <div className="container relative z-20 px-4 md:px-6 flex justify-start pl-[5%] md:pl-[10%]">
                <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%] space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-none text-white font-['Helvetica']">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            className="block sm:whitespace-nowrap leading-none mb-2 text-[#E4192B]"
                        >
                            Podcasts
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                            className="block sm:whitespace-nowrap text-white"
                        >
                            worth your time<span className="text-[#E4192B]">.</span>
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                        className="max-w-[1200px] text-white text-2xl md:text-3xl leading-normal"
                    >
                        A network of original shows on the ideas, industries, and communities driving Ghana & Africa.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                        className="pt-4 md:pt-0 flex flex-col sm:flex-row gap-8"
                    >
                        <Link href="/shows" className="group">
                            <span className="text-white text-base md:text-lg font-bold underline underline-offset-8 decoration-2 decoration-[#E4192B] group-hover:decoration-white transition-all duration-300">
                                Explore Shows
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
