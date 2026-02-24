'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const baseMenuItems = [
        { name: 'Company', href: '/company' },
        { name: 'Our Network', href: '/shows' }, // Assuming 'Our Network' links to shows
        { name: 'News', href: '/news' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Brands & Advertising', href: '/for-brands-and-advertisers' }
    ];

    const menuItems = isHomePage ? baseMenuItems : [{ name: 'Home', href: '/' }, ...baseMenuItems];

    return (
        <header className="fixed top-6 left-0 right-0 z-50 bg-white w-[94%] lg:w-[85%] mx-auto shadow-xl">
            <div className="w-full pl-[5%] lg:pl-[10%] pr-[5%] lg:pr-[10%] py-3 md:py-4 flex justify-between items-center relative">
                {/* Logo - Top Left */}
                <Link href="/" className="flex items-center z-50">
                    <div className="relative w-[80px] h-auto header-logo">
                        <svg
                            viewBox="0 0 600 316"
                            className="w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <style>
                                {`
                                    @keyframes pure-dot-blink {
                                        0%, 49% { opacity: 1; }
                                        50%, 99% { opacity: 0; }
                                        100% { opacity: 1; }
                                    }
                                    .run-blink {
                                        animation: pure-dot-blink 1.5s linear infinite;
                                        transform-origin: center;
                                    }
                                `}
                            </style>
                            <g transform="translate(0.000000,316.000000) scale(0.100000,-0.100000)" stroke="none" fillRule="nonzero">
                                {/* Path 0: A body */}
                                <path fill="#E4192B" d="M925 3048 c-27 -27 -75 -61 -106 -75 -54 -26 -55 -28 -66 -84 -10 -52 -303 -847 -445 -1208 -82 -207 -108 -236 -228 -250 -54 -6 -55 -7 -58 -40 -2 -18 1 -38 6 -43 11 -11 566 -13 583 -2 13 8 11 60 -3 71 -7 5 -44 15 -82 22 -99 17 -110 25 -102 71 10 60 360 1126 375 1143 11 11 35 -55 167 -465 235 -729 231 -716 202 -735 -7 -4 -42 -12 -77 -18 -73 -12 -91 -29 -76 -71 6 -15 13 -27 18 -26 4 1 178 2 387 2 l380 0 0 39 0 40 -57 11 c-162 32 -148 10 -313 490 -48 140 -144 417 -213 615 -69 198 -137 401 -152 450 -15 50 -32 96 -37 103 -19 22 -52 9 -103 -40z" />
                                {/* Path 1: d */}
                                <path fill="#E4192B" d="M2790 3065 c-41 -19 -127 -51 -190 -72 -63 -20 -118 -42 -122 -48 -4 -5 -8 -20 -8 -33 0 -25 51 -62 88 -62 l22 0 -2 -217 -3 -218 -120 3 c-176 5 -303 -27 -418 -107 -99 -68 -178 -171 -217 -284 -30 -88 -38 -250 -16 -337 58 -229 244 -379 468 -380 77 0 144 22 232 75 32 19 65 35 72 35 16 0 16 -5 14 -73 -1 -37 2 -49 16 -54 10 -3 74 8 143 26 69 17 174 38 233 46 59 7 112 16 118 20 12 7 13 65 1 83 -6 11 -16 11 -47 3 -64 -18 -92 -14 -111 16 -17 25 -18 79 -19 818 l-2 790 -28 2 c-16 1 -63 -14 -104 -32z m-300 -785 c22 -11 51 -37 65 -58 l25 -38 -2 -329 -3 -328 -28 -20 c-19 -15 -47 -22 -92 -25 -55 -4 -73 0 -120 22 -114 56 -185 205 -185 391 0 279 171 471 340 385z" />
                                {/* Path 2: b */}
                                <path fill="#000000" d="M3470 1894 c-41 -19 -126 -50 -187 -70 l-113 -37 0 -33 c0 -26 7 -36 33 -53 75 -46 69 27 68 -811 -1 -846 -8 -781 80 -740 l49 23 83 -26 c119 -39 206 -51 317 -44 268 18 449 138 528 349 76 204 32 459 -102 593 -132 132 -338 167 -531 90 -75 -30 -82 -31 -90 -3 -4 11 -6 195 -4 407 l4 386 -30 2 c-16 1 -64 -14 -105 -33z m335 -891 c132 -44 215 -205 215 -413 0 -157 -35 -268 -105 -328 -42 -38 -70 -46 -135 -40 -65 7 -111 42 -147 115 l-28 58 -3 277 c-2 193 0 284 8 298 25 48 111 62 195 33z" />
                                {/* Path 3: e (first) */}
                                <path fill="#000000" d="M2595 1173 c-38 -20 -122 -55 -185 -77 -105 -38 -115 -44 -118 -68 -2 -14 3 -31 10 -37 7 -5 29 -23 48 -40 l35 -29 3 -254 c2 -139 1 -286 -3 -325 -9 -94 -24 -114 -93 -121 -44 -4 -53 -8 -58 -27 -3 -13 -4 -32 -2 -42 3 -17 21 -18 333 -18 l330 0 0 40 0 40 -62 7 c-76 8 -101 21 -110 56 -5 15 -8 164 -8 332 0 328 3 350 50 350 13 0 45 -16 71 -36 69 -53 106 -66 154 -55 84 19 121 67 122 158 1 39 -5 62 -19 81 -71 95 -165 89 -311 -21 -46 -35 -55 -38 -67 -26 -11 11 -12 27 -6 71 12 90 -6 97 -114 41z" />
                                {/* Path 4: v */}
                                <path fill="#000000" d="M1658 1170 c-117 -21 -209 -67 -287 -143 -260 -253 -213 -718 89 -865 250 -123 531 -54 669 164 38 59 39 88 5 110 -26 17 -26 17 -65 -28 -56 -67 -115 -92 -208 -91 -106 1 -177 30 -246 98 -67 67 -97 141 -99 240 l-1 70 296 5 c220 4 300 8 311 18 47 39 18 196 -56 295 -28 38 -110 91 -171 110 -63 20 -175 28 -237 17z m163 -148 c54 -60 51 -144 -6 -168 -41 -17 -236 -20 -266 -4 -56 30 16 159 111 199 14 6 49 9 79 7 46 -2 59 -8 82 -34z" />
                                {/* Path 5: e (second) */}
                                <path fill="#000000" d="M4950 1164 c-199 -43 -356 -200 -405 -405 -59 -253 43 -502 249 -602 242 -118 524 -46 663 170 38 60 40 76 13 103 -28 28 -41 25 -69 -16 -51 -74 -165 -113 -275 -93 -114 20 -200 84 -250 184 -28 56 -50 166 -42 201 l6 24 295 0 c287 0 296 1 316 21 19 19 21 30 17 93 -6 88 -33 150 -92 214 -96 103 -257 143 -426 106z m166 -120 c46 -22 66 -62 62 -127 -3 -50 -5 -53 -38 -64 -19 -7 -83 -12 -141 -12 -88 -1 -111 2 -128 17 -19 15 -20 21 -11 55 21 74 114 147 188 147 19 0 49 -7 68 -16z" />
                                {/* Path 6: cutout piece for A */}
                                <path fill="#000000" d="M23 1133 c-2 -6 -3 -24 -1 -40 3 -24 10 -30 57 -45 30 -10 63 -26 74 -35 32 -29 243 -479 363 -776 25 -61 53 -118 62 -124 20 -17 73 -17 95 0 9 6 59 113 112 236 106 247 232 521 272 591 42 73 71 98 130 111 44 10 55 17 60 37 13 54 5 56 -223 56 l-209 0 0 -39 c0 -38 1 -40 48 -53 27 -7 51 -20 54 -28 8 -22 -123 -367 -175 -461 -10 -16 -63 100 -142 311 -57 153 -56 166 12 180 29 7 43 34 34 69 l-5 22 -307 0 c-224 0 -308 -3 -311 -12z" />
                                {/* Path 7: Red Dot (Blinking) */}
                                <path fill="#E4192B" className="run-blink" d="M5708 496 c-134 -59 -161 -262 -46 -349 138 -104 328 -11 328 160 0 75 -50 155 -114 184 -46 21 -127 24 -168 5z" />
                            </g>
                        </svg>
                    </div>
                </Link>

                {/* Navigation Toggle - Top Right */}
                <div className="relative z-50">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 -mr-2 text-black hover:text-[#E4192B] transition-colors header-menu-toggle"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-8 h-8" />
                        ) : (
                            <motion.span
                                className="flex flex-col gap-[5px] w-7 py-1"
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                            >
                                <span className="block h-[2px] w-full bg-black rounded-full" />
                                <motion.span
                                    className="block h-[2px] bg-[#E4192B] rounded-full"
                                    variants={{ rest: { width: '60%' }, hover: { width: '100%' } }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                />
                                <span className="block h-[2px] w-full bg-black rounded-full" />
                            </motion.span>
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
                                    {/* Close Button - Mobile/Tablet only */}
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="absolute top-6 right-6 p-2 text-black hover:text-[#E4192B] transition-colors lg:hidden header-close-icon"
                                        aria-label="Close Menu"
                                    >
                                        <X className="w-8 h-8" />
                                    </motion.button>

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
                                                    className={`block w-full px-8 py-4 text-2xl md:text-3xl font-bold transition-colors duration-300 capitalize tracking-tight relative z-20 ${hoveredItem === item.name ? 'text-white' : 'text-black'
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
