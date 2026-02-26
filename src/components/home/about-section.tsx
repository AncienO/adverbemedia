'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
    return (
        <section className="w-full" style={{ backgroundColor: '#000000' }} data-cursor="invert">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="grid md:grid-cols-2"
            >
                {/* Left Side - Title */}
                <div className="flex flex-col justify-center pt-20 pb-6 md:py-32 pl-[5%] md:pl-[10%] lg:pl-[20%]" style={{ backgroundColor: '#000000' }}>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center md:text-left"
                    >
                        <span className="block mb-2 md:mb-4">One home</span>
                        <span className="block">Many conversations<span className="text-[#E4192B]">.</span></span>
                    </h2>
                </div>

                {/* Right Side - Text */}
                <div className="flex items-center pt-6 pb-20 md:py-32 px-6 md:px-12 pr-[5%] md:pr-[10%]" style={{ backgroundColor: '#000000' }}>
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed text-center" style={{ color: '#CCCCCC' }}>
                        <p>
                            Adverbe is a portfolio of original podcast productions, each serving a distinct audience with content they can&apos;t find elsewhere. We develop shows, and build the editorial infrastructure that turns ideas into sustainable media properties.
                        </p>
                        <p>
                            Every production is video-first, editorially rigorous, and made to last. We&apos;re not chasing viral moments; we&apos;re building a permanent archive of the conversations that matter most across African life.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
