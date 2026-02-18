import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, FileText, Briefcase, PlayCircle, Settings, LogOut, Globe } from 'lucide-react';
import { SignOutButton } from '@/components/admin/sign-out-button';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Shows', href: '/admin/shows', icon: PlayCircle },
        { name: 'Episodes', href: '/admin/episodes', icon: FileText },
        { name: 'Careers', href: '/admin/careers', icon: Briefcase },
        { name: 'Documents', href: '/admin/documents', icon: FileText },
        { name: 'Contacts', href: '/admin/contacts', icon: Users },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-xl font-serif text-[#E4192B]">Adverbe.</span>
                    <Link href="/" target="_blank" className="text-gray-400 hover:text-gray-600">
                        <Globe className="w-5 h-5" />
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-[#E4192B] transition-colors group"
                        >
                            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-[#E4192B]" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="mb-4 px-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-medium truncate" title={user.email}>{user.email}</p>
                    </div>
                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
