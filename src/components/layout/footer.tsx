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
                                {social.name === 'Twitter' ? (
                                    // X Logo
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                ) : social.name === 'TikTok' ? (
                                    // TikTok Icon
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.04 8.76-.08 3.55-2.87 6.42-6.4 6.94-3.53.53-7.29-1.55-8.62-4.79-1.29-3.14.39-6.72 3.49-7.96 1.14-.49 2.51-.51 3.75-.15.01 1.48.01 2.96 0 4.45-.66-.27-1.47-.28-2.15.03-1.66.7-2.3 2.73-1.45 4.29.87 1.64 3.03 2.15 4.6 1.15.93-.57 1.54-1.57 1.6-2.67.07-4.22.02-8.43.02-12.65.37-.02.73-.02 1.1-.02z" />
                                    </svg>
                                ) : (
                                    <social.icon className="w-6 h-6" />
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
