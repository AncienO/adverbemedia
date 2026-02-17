'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Our Networks', href: '/shows' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-black text-white">
            <div className="container mx-auto px-4 md:px-6 flex h-20 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                        The Ad<span style={{ color: '#E4192B' }}>verbe</span><span className="text-white text-4xl leading-none">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-xl lg:text-2xl xl:text-3xl font-bold text-white transition-colors hover:text-gray-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-b border-white/10 bg-black">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-base font-medium text-white hover:text-gray-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
