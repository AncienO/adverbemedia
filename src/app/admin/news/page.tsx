import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteArticle } from '@/app/admin/_actions/news';

export default async function AdminNewsPage() {
    const supabase = await createClient();
    const { data: articles } = await supabase.from('news_articles').select('*').order('published_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">News</h1>
                    <p className="text-sm text-gray-500 mt-1">{articles?.length || 0} article{(articles?.length || 0) !== 1 ? 's' : ''}</p>
                </div>
                <Link href="/admin/news/new">
                    <Button className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2">
                        <Plus className="w-4 h-4" /> New Article
                    </Button>
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50/80 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Article</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(articles || []).map((a: any) => (
                            <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        {a.cover_image_url ? (
                                            <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                <Image src={a.cover_image_url} alt={a.title} fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs text-gray-400">No img</span>
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{a.title}</p>
                                            {a.excerpt && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{a.excerpt}</p>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{a.author_name || '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {a.published_at ? new Date(a.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${a.is_published ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'}`}>
                                        {a.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/admin/news/${a.id}/edit`}>
                                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 h-8 w-8 p-0">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <DeleteButton onDelete={async () => { 'use server'; await deleteArticle(a.id); }} itemName="article" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!articles || articles.length === 0) && (
                    <div className="p-16 text-center">
                        <p className="text-gray-400 mb-2">No articles yet</p>
                        <p className="text-xs text-gray-300">Create your first news article to get started</p>
                    </div>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {(articles || []).map((a: any) => (
                    <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {a.cover_image_url && (
                            <div className="relative w-full h-40">
                                <Image src={a.cover_image_url} alt={a.title} fill className="object-cover" />
                            </div>
                        )}
                        <div className="p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900">{a.title}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {a.author_name || 'Unknown'} • {a.published_at ? new Date(a.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date'}
                                    </p>
                                    {a.excerpt && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{a.excerpt}</p>}
                                    <span className={`inline-flex mt-3 px-2.5 py-1 text-xs font-semibold rounded-full ${a.is_published ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'}`}>
                                        {a.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <Link href={`/admin/news/${a.id}/edit`}>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button>
                                    </Link>
                                    <DeleteButton onDelete={async () => { 'use server'; await deleteArticle(a.id); }} itemName="article" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {(!articles || articles.length === 0) && (
                    <div className="bg-white rounded-xl p-12 text-center text-gray-400">No articles yet.</div>
                )}
            </div>
        </div>
    );
}
