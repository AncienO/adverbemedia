import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteEpisode } from '@/app/admin/_actions/episodes';

export default async function AdminEpisodesPage() {
    const supabase = await createClient();

    const { data: episodes } = await supabase
        .from('episodes')
        .select('*, shows(title)')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif text-gray-900">Episodes</h1>
                <Link href="/admin/episodes/new">
                    <Button className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2">
                        <Plus className="w-4 h-4" /> Add Episode
                    </Button>
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Show</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Published</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(episodes || []).map((ep: any) => (
                            <tr key={ep.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-medium text-gray-900">{ep.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{ep.shows?.title || '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{ep.duration || '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {ep.published_at ? new Date(ep.published_at).toLocaleDateString() : '—'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/admin/episodes/${ep.id}/edit`}>
                                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 h-8 w-8 p-0">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <DeleteButton onDelete={async () => { 'use server'; await deleteEpisode(ep.id); }} itemName="episode" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!episodes || episodes.length === 0) && (
                    <div className="p-12 text-center text-gray-400">No episodes yet.</div>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {(episodes || []).map((ep: any) => (
                    <div key={ep.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{ep.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{ep.shows?.title} • {ep.duration || '—'}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link href={`/admin/episodes/${ep.id}/edit`}>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button>
                                </Link>
                                <DeleteButton onDelete={async () => { 'use server'; await deleteEpisode(ep.id); }} itemName="episode" />
                            </div>
                        </div>
                    </div>
                ))}
                {(!episodes || episodes.length === 0) && (
                    <div className="bg-white rounded-lg p-8 text-center text-gray-400">No episodes yet.</div>
                )}
            </div>
        </div>
    );
}
