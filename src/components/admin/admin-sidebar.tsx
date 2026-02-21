'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe, LayoutDashboard, PlayCircle, FileText, Newspaper, Briefcase, Building2, Users, Settings, Mail, Link as LinkIcon } from 'lucide-react';
import { SignOutButton } from '@/components/admin/sign-out-button';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Shows', href: '/admin/shows', icon: PlayCircle },
    { name: 'Links', href: '/admin/links', icon: LinkIcon },
    { name: 'Episodes', href: '/admin/episodes', icon: FileText },
    { name: 'News', href: '/admin/news', icon: Newspaper },
    { name: 'Careers', href: '/admin/careers', icon: Briefcase },
    { name: 'Documents', href: '/admin/documents', icon: FileText },
    { name: 'Company', href: '/admin/company', icon: Building2 },
    { name: 'Team', href: '/admin/hosts', icon: Users },
    { name: 'Contacts', href: '/admin/contacts', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
    userEmail: string;
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    const renderNavItem = (item: typeof navigation[number]) => (
        <div key={item.name} className="relative overflow-hidden rounded-lg mb-0.5">
            {hoveredItem === item.name && (
                <motion.span
                    className="absolute inset-0 bg-[#E4192B] -z-10 rounded-lg"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            )}
            <Link
                href={item.href}
                className={`relative z-10 flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.href) ? 'text-white bg-white/[0.08]' : ''}
                    ${hoveredItem === item.name ? 'text-white' : isActive(item.href) ? 'text-white' : 'text-white/50'}`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <item.icon className={`w-[18px] h-[18px] transition-colors duration-200
                    ${hoveredItem === item.name || isActive(item.href) ? 'text-white' : 'text-white/30'}`}
                />
                {item.name}
            </Link>
        </div>
    );

    return (
        <aside className="w-[260px] bg-[#111111] text-white hidden md:flex flex-col fixed h-full z-10" suppressHydrationWarning>
            {/* Brand */}
            <div className="px-7 pt-8 pb-6">
                <div className="flex items-center justify-between">
                    <span
                        className="text-2xl font-bold tracking-tight"
                        style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                    >
                        Adverbe<span className="text-[#E4192B]">.</span>
                    </span>
                    <Link
                        href="/"
                        target="_blank"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <Globe className="w-3.5 h-3.5 text-white/70" />
                    </Link>
                </div>
                <p className="text-[11px] text-white/30 mt-1 uppercase tracking-[0.15em] font-medium">Admin Console</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 overflow-y-auto">
                <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-semibold px-3 pt-2 pb-3">Content</p>
                {navigation.slice(0, 7).map(renderNavItem)}

                <div className="pt-4 pb-2">
                    <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-semibold px-3 pb-3">System</p>
                </div>
                {navigation.slice(7).map(renderNavItem)}
            </nav>

            {/* User Section */}
            <div className="px-4 py-5 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 px-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#E4192B] flex items-center justify-center text-white text-xs font-bold uppercase">
                        {userEmail?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-white/30 uppercase tracking-wider">Signed in</p>
                        <p className="text-xs text-white/60 truncate" title={userEmail}>{userEmail}</p>
                    </div>
                </div>
                <SignOutButton />
            </div>
        </aside>
    );
}
