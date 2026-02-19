import { createClient } from '@/lib/supabase/server';
import { PlayCircle, FileText, Briefcase, Users, Newspaper, Building2, FileText as DocIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // Fetch counts in parallel
    const [showsRes, episodesRes, jobsRes, contactsRes, newsRes, docsRes] = await Promise.all([
        supabase.from('shows').select('id', { count: 'exact', head: true }),
        supabase.from('episodes').select('id', { count: 'exact', head: true }),
        supabase.from('jobs').select('id', { count: 'exact', head: true }),
        supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('news_articles').select('id', { count: 'exact', head: true }),
        supabase.from('company_documents').select('id', { count: 'exact', head: true }),
    ]);

    const stats = [
        { name: 'Shows', count: showsRes.count || 0, href: '/admin/shows', icon: PlayCircle },
        { name: 'Episodes', count: episodesRes.count || 0, href: '/admin/episodes', icon: FileText },
        { name: 'News Articles', count: newsRes.count || 0, href: '/admin/news', icon: Newspaper },
        { name: 'Job Listings', count: jobsRes.count || 0, href: '/admin/careers', icon: Briefcase },
        { name: 'Documents', count: docsRes.count || 0, href: '/admin/documents', icon: DocIcon },
        { name: 'Unread Messages', count: contactsRes.count || 0, href: '/admin/contacts', icon: Users },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-semibold mb-2">Overview</p>
                <h1
                    className="text-4xl md:text-5xl font-bold text-[#111] tracking-tight"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    Dashboard
                </h1>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {stats.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="group relative bg-white rounded-2xl border border-gray-100 p-7
                            hover:border-gray-200 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.12em]">{stat.name}</p>
                                <p
                                    className="text-4xl font-bold text-[#111] mt-2 tracking-tight"
                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                >
                                    {stat.count}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#111]/[0.04] flex items-center justify-center
                                group-hover:bg-[#E4192B] transition-colors duration-300">
                                <stat.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                            </div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400 group-hover:text-[#E4192B] transition-colors">Manage →</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-semibold mb-4">Quick Actions</p>
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'New Show', href: '/admin/shows/new' },
                        { label: 'New Article', href: '/admin/news/new' },
                        { label: 'New Job', href: '/admin/careers/new' },
                        { label: 'Upload Document', href: '/admin/documents/new' },
                    ].map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="px-5 py-2.5 bg-white border border-gray-150 rounded-full text-sm font-medium text-gray-600
                                hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-200"
                        >
                            {action.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
