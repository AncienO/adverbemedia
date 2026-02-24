import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Youtube, Facebook, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export async function Footer() {
    const navLinks = [
        { name: 'Shows', href: '/shows' },
        { name: 'About', href: '/company' },
        { name: 'For Brands and Advertisers', href: '/for-brands-and-advertisers' },
        { name: 'Contact', href: '/contact' }
    ];

    const supabase = await createClient();
    const { data: dbLinks } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

    const socialLinks = (dbLinks || []).map((link) => {
        let icon = null;
        let dbKey = link.icon_key?.toLowerCase() || '';

        // If the key is 'globe' or empty, fallback to the sanitized platform name
        if (!dbKey || dbKey === 'globe') {
            dbKey = link.platform.toLowerCase().replace(/[^a-z0-9]/g, '');
        }

        if (dbKey === 'instagram') icon = Instagram;
        else if (dbKey === 'twitter' || dbKey === 'x') icon = Twitter;
        else if (dbKey === 'youtube') icon = Youtube;
        else if (dbKey === 'facebook') icon = Facebook;
        else icon = Globe;

        return {
            name: link.platform,
            href: link.url,
            icon_key: dbKey,
            icon
        };
    });

    return (
        <footer className="w-full bg-black text-white py-12 md:py-16" data-cursor="invert">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-8">

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
                        {socialLinks.map((social) => {
                            const Icon = social.icon as any;
                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors"
                                    aria-label={social.name}
                                >
                                    {social.icon_key === 'twitter' || social.icon_key === 'x' ? (
                                        // X Logo
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    ) : social.icon_key === 'tiktok' ? (
                                        // TikTok Icon
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.04 8.76-.08 3.55-2.87 6.42-6.4 6.94-3.53.53-7.29-1.55-8.62-4.79-1.29-3.14.39-6.72 3.49-7.96 1.14-.49 2.51-.51 3.75-.15.01 1.48.01 2.96 0 4.45-.66-.27-1.47-.28-2.15.03-1.66.7-2.3 2.73-1.45 4.29.87 1.64 3.03 2.15 4.6 1.15.93-.57 1.54-1.57 1.6-2.67.07-4.22.02-8.43.02-12.65.37-.02.73-.02 1.1-.02z" />
                                        </svg>
                                    ) : social.icon_key === 'linkedin' ? (
                                        // LinkedIn Filled Icon
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    ) : social.icon_key === 'youtube' ? (
                                        // YouTube Icon
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    ) : social.icon_key === 'facebook' ? (
                                        // Facebook Icon
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    ) : (
                                        Icon && <Icon className="w-6 h-6" />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-gray-800 text-center">
                        <p className="text-sm text-gray-400">
                            &copy; 2026, Vermé Studios. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
