import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteShow } from '@/app/admin/_actions/shows';

export default async function AdminShowsPage() {
    const supabase = await createClient();

    const { data: shows } = await supabase
        .from('shows')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif text-gray-900">Shows</h1>
                <Link href="/admin/shows/new">
                    <Button className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2">
                        <Plus className="w-4 h-4" /> Add Show
                    </Button>
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(shows || []).map((show: any) => (
                            <tr key={show.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{show.title}</p>
                                        <p className="text-xs text-gray-400">/{show.slug}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{show.categories?.name || '—'}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${show.status === 'active' ? 'bg-green-100 text-green-700' :
                                            show.status === 'coming-soon' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {show.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/admin/shows/${show.id}/edit`}>
                                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 h-8 w-8 p-0">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <DeleteButton onDelete={async () => { 'use server'; await deleteShow(show.id); }} itemName="show" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!shows || shows.length === 0) && (
                    <div className="p-12 text-center text-gray-400">No shows yet. Create your first one!</div>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {(shows || []).map((show: any) => (
                    <div key={show.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{show.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{show.categories?.name || '—'}</p>
                                <span className={`inline-flex mt-2 px-2 py-1 text-xs font-semibold rounded-full ${show.status === 'active' ? 'bg-green-100 text-green-700' :
                                        show.status === 'coming-soon' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {show.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link href={`/admin/shows/${show.id}/edit`}>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button>
                                </Link>
                                <DeleteButton onDelete={async () => { 'use server'; await deleteShow(show.id); }} itemName="show" />
                            </div>
                        </div>
                    </div>
                ))}
                {(!shows || shows.length === 0) && (
                    <div className="bg-white rounded-lg p-8 text-center text-gray-400">No shows yet.</div>
                )}
            </div>
        </div>
    );
}
