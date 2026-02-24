'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ForBrandsAndAdvertisersPage() {
    const [isScrollingDown, setIsScrollingDown] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY === 0) {
                // At top of page, gradient should hide
                setIsScrollingDown(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsScrollingDown(false);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsScrollingDown(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full min-h-screen bg-white pb-0 overflow-hidden">
            <style jsx global>{`
                @keyframes conveyor {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .hero-conveyor {
                    animation: conveyor 30s linear infinite;
                }
            `}</style>

            <section className="relative w-full h-[calc(70vh+128px)] md:h-[calc(80vh+128px)] flex items-center overflow-hidden">
                {/* Conveyor Belt Background - Fix: Two identical images to maintain aspect ratio */}
                <div className="absolute inset-0 flex w-fit h-full hero-conveyor pointer-events-none">
                    <img
                        src="/abstract_BAP.png" /* INSERT IMAGE PATH HERE */
                        alt=""
                        className="h-full w-auto max-w-none"
                    />
                    <img
                        src="/abstract_BAP.png" /* INSERT IMAGE PATH HERE */
                        alt=""
                        className="h-full w-auto max-w-none"
                    />
                    <img
                        src="/abstract_BAP.png" /* INSERT IMAGE PATH HERE */
                        alt=""
                        className="h-full w-auto max-w-none"
                    />
                    <img
                        src="/abstract_BAP.png" /* INSERT IMAGE PATH HERE */
                        alt=""
                        className="h-full w-auto max-w-none"
                    />
                </div>
                <div className="w-[94%] md:w-[75%] mx-auto relative z-20 pt-32">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full p-8 md:p-12">

                        {/* Left: Bold Title */}
                        <div className="flex-1 text-left">
                            <p
                                className="font-bold leading-tight tracking-tighter"
                                style={{
                                    fontFamily: "'Helvetica', sans-serif",
                                    fontSize: '6vw',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}
                            >
                                Put your brand
                                <br />
                                <span style={{ whiteSpace: 'nowrap' }}>
                                    where it&apos;s heard<span style={{ color: 'white', fontFamily: "'Adobe Garamond', Garamond, serif" }}>.</span>
                                </span>
                            </p>
                        </div>

                        {/* Center: Slim Vertical Divider */}
                        <div className="hidden md:block w-[5px] self-stretch bg-white min-h-[100px]" />

                        {/* Right: Body Text */}
                        <div className="flex-1 max-w-xl text-left">
                            <p className="text-xl md:text-3xl text-white leading-relaxed font-bold">
                                Adverbe produces original podcast shows across marketing, leadership, faith, design, and sport. Our listeners are professionals, decision-makers, and culturally engaged audiences who choose to spend their time with our content. That&apos;s attention worth investing in.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- NEW SECTIONS BELOW HERO --- */}

            {/* Sections 1 & 2 — Our Network & Our Audience (Two-Column Layout) */}
            <section className="w-full py-20 md:py-32 bg-white">
                <div className="w-[94%] md:w-[80%] mx-auto flex flex-col md:flex-row items-start gap-12 md:gap-16">
                    {/* Section 1 — Our Network */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex-1 space-y-8"
                    >
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                            }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black text-left"
                        >
                            Our Network<span className="text-[#E4192B]">.</span>
                        </motion.h2>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                            }}
                            className="text-lg md:text-xl leading-relaxed text-left text-black/80 font-light"
                        >
                            <p>
                                Adverbe is Ghana&apos;s podcast network — a home for original shows that each serve a distinct audience with content they can&apos;t find elsewhere. When you partner with Adverbe, you don&apos;t just get a single ad placement. You get access to a growing portfolio of shows and the communities built around them.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Task 1 — Red Vertical Divider */}
                    <div className="hidden md:block w-[1px] md:w-[2px] bg-[#E4192B] self-stretch" />

                    {/* Section 2 — Our Audience */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex-1 space-y-8"
                    >
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                            }}
                            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-black text-left"
                        >
                            Our audience<span className="text-[#E4192B]">.</span>
                        </motion.h2>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                            }}
                            className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-left"
                        >
                            <p>Adverbe listeners are the people who shape conversations in their workplaces, communities, and social circles. They&apos;re professionals, creatives, leaders, and active community members across Ghana and the diaspora.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section 3 & 4 (Combined) — Why Podcast Advertising Works & Statistics Block */}
            <section className="w-full py-20 md:py-32 bg-white border-t border-[#E4192B]">
                <div className="w-[94%] md:w-[75%] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0 }}
                        className="flex flex-col md:flex-row items-start gap-8 md:gap-16 w-full relative pb-16 md:pb-20"
                    >
                        {/* Left Column — Text Block */}
                        <div className="flex-[0.45] w-full flex flex-col justify-center gap-6 md:gap-8 text-left self-center">
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                                }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black"
                                style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif', color: '#000000' }}
                            >
                                Why podcast advertising works<span className="text-[#E4192B]">.</span>
                            </motion.h2>

                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                                }}
                                className="text-lg md:text-xl leading-relaxed text-black font-light"
                                style={{ color: '#000000' }}
                            >
                                Podcast listeners don&apos;t skip — they stay. They choose long-form content, they trust the hosts, and they act on what they hear. This isn&apos;t background noise. It&apos;s focused attention, and the numbers back it up.
                            </motion.p>
                        </div>

                        {/* Right Column — Vertical Stats Stack */}
                        <div className="flex-[0.45] w-full flex flex-col gap-12 md:gap-16 ml-auto">
                            <div className="flex flex-col gap-12">
                                {[
                                    { number: "90%", desc: "Of podcast listeners say they listen to ads." },
                                    { number: "80%", desc: "Can recall a brand that advertised on a podcast." },
                                    { number: "70–80%", desc: "Listen to the end of the episode." },
                                    { number: "50%", desc: "Are more likely to buy from a brand they heard on a podcast." }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: i * 0.2 } }
                                        }}
                                        className="flex flex-col gap-2 text-left"
                                    >
                                        <span className="text-[#E4192B] font-bold tracking-tight text-6xl md:text-7xl lg:text-8xl" style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}>
                                            {stat.number}
                                        </span>
                                        <span className="text-black font-light leading-relaxed" style={{ color: '#000000', fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif', fontSize: '200%' }}>
                                            {stat.desc}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Attribution Line beneath left text / bottom left */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.8 } }
                            }}
                            className="absolute bottom-0 left-0 w-full text-left"
                        >
                            <p className="text-sm md:text-base text-black font-light italic" style={{ color: '#000000' }}>
                                Source: Edison Research, Nielsen, Podcast Advertising Revenue Study
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section 3 — What We Offer (Full Width Red Background) */}
            <section className="w-full py-20 md:py-32 bg-[#E4192B] text-white">

                <div className="w-[94%] md:w-[80%] mx-auto flex flex-col items-center md:items-start gap-8">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center md:text-left"
                    >
                        What we offer<span style={{ color: '#000000' }}>.</span>
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                        }}
                        className="text-lg md:text-xl leading-relaxed text-center md:text-left text-white font-medium w-full"
                    >
                        <p>
                            Every partnership is built around your objectives. Here&apos;s how brands work with Adverbe:
                        </p>
                    </motion.div>
                </div>

            </section>

            {/* Section 4 — Two Column Layout (Host-Read Ads & Produced Spots) */}
            <section className="w-full py-20 md:py-32 bg-white">
                <div className="w-[94%] md:w-[80%] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
                    {/* Column 1 — Host-Read Ads */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex-1 space-y-8 flex flex-col items-center md:items-start"
                    >
                        <motion.h3
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                            }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center md:text-left"
                        >
                            Host-Read Ads<span className="text-[#E4192B]">.</span>
                        </motion.h3>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                            }}
                            className="text-lg md:text-xl leading-relaxed text-center md:text-left text-black/80 font-light"
                            style={{ fontSize: '200%' }}
                        >
                            <p>
                                Our hosts read your message in their own voice and style. Pre-roll, mid-roll, or post-roll placements — delivered with the trust and credibility the audience already gives the host. This is the highest-engagement format in podcast advertising.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Column 2 — Produced Spots */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex-1 space-y-8 flex flex-col items-center md:items-start"
                    >
                        <motion.h3
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                            }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center md:text-left"
                        >
                            Produced Spots<span className="text-[#E4192B]">.</span>
                        </motion.h3>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                            }}
                            className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-center md:text-left"
                            style={{ fontSize: '200%' }}
                        >
                            <p>
                                Pre-produced audio or video ads placed within episodes. You control the creative; we handle placement and distribution across audio and video platforms.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="w-[12%] h-[1px] bg-[#E4192B]/20 mx-auto my-12" />

            {/* Section 5 — Two Column Layout (Show Sponsorship & Custom Content) */}
            <section className="w-full py-20 md:py-32 bg-white">
                <div className="w-[94%] md:w-[80%] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
                    {/* Column 1 — Show Sponsorship */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex-1 space-y-8 flex flex-col items-center md:items-start"
                    >
                        <motion.h3
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                            }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center md:text-left"
                        >
                            Show Sponsorship<span className="text-[#E4192B]">.</span>
                        </motion.h3>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                            }}
                            className="text-lg md:text-xl leading-relaxed text-center md:text-left text-black/80 font-light"
                            style={{ fontSize: '200%' }}
                        >
                            <p>
                                Become the presenting sponsor of an Adverbe show. Your brand is integrated into the opening, mid-point, and close of every episode — plus visibility across video, social, and event touchpoints. This is the deepest association with our content and audience.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Column 2 — Custom Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex-1 space-y-8 flex flex-col items-center md:items-start"
                    >
                        <motion.h3
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                            }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center md:text-left"
                        >
                            Custom Content<span className="text-[#E4192B]">.</span>
                        </motion.h3>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                            }}
                            className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-center md:text-left"
                            style={{ fontSize: '200%' }}
                        >
                            <p>
                                Commission bespoke episodes, branded segments, or mini-series produced by the Adverbe team. Your message, our editorial quality and production standards. Ideal for product launches, campaigns, or thought leadership positioning.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="w-[12%] h-[1px] bg-[#E4192B]/20 mx-auto my-12" />

            {/* Section 6 — Single Column Layout (Network Packages) */}
            <section className="w-full py-20 md:py-32 bg-white">
                <div className="w-[94%] md:w-[80%] mx-auto flex flex-col items-center md:items-start space-y-8">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                        }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center md:text-left"
                    >
                        Network Packages<span className="text-[#E4192B]">.</span>
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                        }}
                        className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-center md:text-left max-w-4xl"
                        style={{ fontSize: '200%' }}
                    >
                        <p>
                            Reach multiple audience segments through placements across two or more Adverbe shows. A financial services brand can reach C-suite executives through On Leadership and marketing professionals through MAD Conversations — all within one partnership.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="w-[12%] h-[1px] bg-[#E4192B]/20 mx-auto my-12" />

            {/* Section 7 — Why Adverbe (2x2 Grid) */}
            <section className="w-full py-20 md:py-32 bg-white relative">
                {/* Scroll-Revealed Top Gradient */}
                <motion.div
                    className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-[rgba(228,25,43,0.5)] to-transparent pointer-events-none z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isScrollingDown ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: isScrollingDown ? "easeIn" : "easeOut" }}
                />

                <div className="w-[94%] md:w-[80%] mx-auto space-y-16 relative z-10">
                    {/* Section Title */}
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black text-center md:text-left"
                    >
                        Why Adverbe<span className="text-[#E4192B]">.</span>
                    </motion.h2>

                    {/* 2x2 Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                        {/* Cell 1 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 } }
                            }}
                            className="border-t border-[#E4192B]/30 pt-8 flex flex-col items-center md:items-start space-y-4"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center md:text-left">
                                Video-first production
                            </h3>
                            <div
                                className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-center md:text-left"
                                style={{ fontSize: '200%' }}
                            >
                                <p>
                                    Every show is produced as both video and audio. Your brand appears across YouTube, Spotify, Apple Podcasts, and social — not just one platform.
                                </p>
                            </div>
                        </motion.div>

                        {/* Cell 2 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                            }}
                            className="border-t border-[#E4192B]/30 pt-8 flex flex-col items-center md:items-start space-y-4"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center md:text-left">
                                Audiences that stay
                            </h3>
                            <div
                                className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-center md:text-left"
                                style={{ fontSize: '200%' }}
                            >
                                <p>
                                    Long-form shows mean listeners spend thirty, sixty, ninety minutes with our content. That&apos;s a fundamentally different level of attention than a scroll-past impression.
                                </p>
                            </div>
                        </motion.div>

                        {/* Cell 3 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 } }
                            }}
                            className="border-t border-[#E4192B]/30 pt-8 flex flex-col items-center md:items-start space-y-4"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center md:text-left">
                                Distinct communities, one network
                            </h3>
                            <div
                                className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-center md:text-left"
                                style={{ fontSize: '200%' }}
                            >
                                <p>
                                    Each show serves a specific audience — marketers, leaders, faith communities, sport enthusiasts. You can target precisely or go broad across the network.
                                </p>
                            </div>
                        </motion.div>

                        {/* Cell 4 */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.4 } }
                            }}
                            className="border-t border-[#E4192B]/30 pt-8 flex flex-col items-center md:items-start space-y-4"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center md:text-left">
                                Content with shelf life
                            </h3>
                            <div
                                className="text-lg md:text-xl leading-relaxed text-black/80 font-light text-center md:text-left"
                                style={{ fontSize: '200%' }}
                            >
                                <p>
                                    Our episodes are archived and searchable. Your brand doesn&apos;t disappear after 24 hours — it lives inside content that people come back to.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="w-[12%] h-[1px] bg-[#E4192B]/20 mx-auto my-12" />

            {/* Section 8 — Let's talk (CTA) */}
            <section className="w-full py-20 md:py-32 bg-white">
                <div className="w-[94%] md:w-[80%] mx-auto flex flex-col items-center md:items-start space-y-8">
                    {/* Title */}
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black text-center md:text-left"
                    >
                        Let&apos;s talk<span className="text-[#E4192B]">.</span>
                    </motion.h2>

                    {/* Body Text */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 } }
                        }}
                        className="text-lg md:text-xl leading-relaxed text-[#E4192B] font-light text-center md:text-left max-w-4xl"
                        style={{ fontSize: '200%' }}
                    >
                        <p>
                            Whether you&apos;re a brand looking to reach Ghana&apos;s most engaged professionals or an agency exploring podcast as a channel, we want to hear from you. Get in touch and we&apos;ll share audience data, rate cards, and options tailored to your objectives.
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }
                        }}
                    >
                        <a
                            href="mailto:partnerships@adverbemedia.com"
                            className="inline-block bg-[#E4192B] text-white px-8 py-4 rounded-full font-medium hover:bg-[#c81626] transition-colors"
                        >
                            Get in Touch &rarr;
                        </a>
                    </motion.div>

                    {/* Email Link */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 } }
                        }}
                    >
                        <a
                            href="mailto:partnerships@adverbemedia.com"
                            className="text-black/60 hover:text-[#E4192B] transition-colors underline-offset-4 hover:underline"
                        >
                            partnerships@adverbemedia.com
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
