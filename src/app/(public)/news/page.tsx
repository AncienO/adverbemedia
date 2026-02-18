'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock Data for News Items
const newsItems = [
    {
        id: 1,
        slug: "adverbe-expands-production",
        title: "Adverbe Expands Production to East Africa",
        date: "February 18, 2026",
        excerpt: "We're thrilled to announce our new studio in Nairobi, bringing local stories to a global audience.",
        image: "/coming-soon.png" // Placeholder
    },
    {
        id: 2,
        slug: "new-series-premiere",
        title: "New Series 'The Brief' Premieres Next Month",
        date: "March 10, 2026",
        excerpt: "An inside look at the campaigns that shaped African culture in the last decade.",
        image: "/coming-soon.png" // Placeholder
    },
    {
        id: 3,
        slug: "streaming-partnership",
        title: "Partnership with Major Streaming Platform",
        date: "April 05, 2026",
        excerpt: "Exclusive content distribution deal signed to bring our shows to millions of new viewers.",
        image: "/coming-soon.png" // Placeholder
    },
    {
        id: 4,
        slug: "digital-media-award",
        title: "Adverbe Wins Digital Media Award",
        date: "May 20, 2026",
        excerpt: "Recognized for excellence in digital storytelling and innovative format design.",
        image: "/coming-soon.png" // Placeholder
    }
];

export default function NewsPage() {
    return (
        <main className="w-full min-h-screen bg-white pt-24 pb-20 px-[5%] md:px-[10%]">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-16 md:mb-24"
            >
                <h1
                    className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-6"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    News & Updates
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl font-light">
                    The latest stories, announcements, and behind-the-scenes updates from the Adverbe team.
                </p>
            </motion.div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {newsItems.map((item, index) => (
                    <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group cursor-pointer flex flex-col h-full"
                    >
                        <Link href={`/news/${item.slug}`} className="flex flex-col h-full">
                            {/* Image Container */}
                            <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden bg-gray-100 round-none">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow">
                                {/* Date */}
                                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
                                    {item.date}
                                </span>

                                {/* Title */}
                                <h2
                                    className="text-3xl font-bold text-black mb-3 leading-tight group-hover:text-[#E4192B] transition-colors"
                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                >
                                    {item.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-lg text-gray-600 leading-relaxed font-light">
                                    {item.excerpt}
                                </p>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </main>
    );
}
