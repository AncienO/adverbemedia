'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

export function Footer() {
    const navLinks = [
        { name: 'Shows', href: '/shows' },
        { name: 'About', href: '/about' },
        { name: 'For Partners', href: '/contact' },
        { name: 'Contact', href: '/contact' }
    ];

    const socialLinks = [
        { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
        { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
        { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
        { name: 'TikTok', href: 'https://tiktok.com', icon: null } // TikTok icon not in lucide-react
    ];

    return (
        <footer className="w-full bg-black text-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-8">
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <p className="text-base md:text-lg text-gray-300">
                            Adverbe Media is a Vermé Studios company. Based in Accra, building Africa&apos;s most relevant podcast network.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm md:text-base">
                        {navLinks.map((link, index) => (
                            <React.Fragment key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                                {index < navLinks.length - 1 && (
                                    <span className="text-gray-600">|</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex justify-center md:justify-start gap-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white transition-colors"
                                aria-label={social.name}
                            >
                                {social.icon ? (
                                    <social.icon className="w-6 h-6" />
                                ) : (
                                    <span className="text-sm font-semibold">TT</span>
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Tagline */}
                    <div className="pt-8 border-t border-gray-800 text-center md:text-left">
                        <p className="text-lg md:text-xl font-medium text-white">
                            Stories must be told and heard.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
