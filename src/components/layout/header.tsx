'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const menuItems = [
        { name: 'Company', href: '/company' },
        { name: 'Our Network', href: '/shows' }, // Assuming 'Our Network' links to shows
        { name: 'News', href: '/news' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact Us', href: '/contact' }
    ];

    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-white">
            <div className="w-full pl-[5%] md:pl-[10%] pr-[5%] md:pr-[10%] py-3 md:py-4 flex justify-between items-center relative">
                {/* Logo - Top Left */}
                <Link href="/" className="flex items-center z-50">
                    <div className="relative w-[60px] h-auto">
                        <Image
                            src="/Adverbe Logo - 250px.png"
                            alt="The Adverbe Logo"
                            width={60}
                            height={31} // Aspect ratio approx 1.9:1
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Navigation Toggle - Top Right */}
                <div className="relative z-50">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 -mr-2 text-black hover:text-[#E4192B] transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-8 h-8" />
                        ) : (
                            <Menu className="w-8 h-8" />
                        )}
                    </button>

                    {/* Slide-in Menu Drawer */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="fixed inset-0 bg-black/20 z-40"
                                    onClick={() => setIsMenuOpen(false)}
                                />

                                {/* Drawer */}
                                <motion.div
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl z-50 flex flex-col pt-20"
                                >
                                    <nav className="flex flex-col">
                                        {menuItems.map((item) => (
                                            <div key={item.name} className="relative overflow-hidden group w-full">
                                                {hoveredItem === item.name && (
                                                    <motion.span
                                                        className="absolute inset-0 bg-[#E4192B] -z-10"
                                                        initial={{ x: '-100%' }}
                                                        animate={{ x: 0 }}
                                                        exit={{ x: '-100%' }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    />
                                                )}
                                                <Link
                                                    href={item.href}
                                                    className={`block w-full px-8 py-4 text-2xl md:text-3xl font-bold transition-colors duration-300 lowercase tracking-tight relative z-20 ${hoveredItem === item.name ? 'text-white' : 'text-black'
                                                        }`}
                                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    onMouseEnter={() => setHoveredItem(item.name)}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </nav>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
