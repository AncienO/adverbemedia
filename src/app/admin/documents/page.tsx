import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/admin/delete-button';
import { deleteDocument } from '@/app/admin/_actions/documents';

export default async function AdminDocumentsPage() {
    const supabase = await createClient();
    const { data: docs } = await supabase.from('company_documents').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif text-gray-900">Documents</h1>
                <Link href="/admin/documents/new">
                    <Button className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2"><Plus className="w-4 h-4" /> Add Document</Button>
                </Link>
            </div>
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Format</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Size</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(docs || []).map((doc: any) => (
                            <tr key={doc.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-medium text-gray-900">{doc.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{doc.category || '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 uppercase">{doc.file_format || '—'}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{doc.file_size || '—'}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link href={`/admin/documents/${doc.id}/edit`}><Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button></Link>
                                        <DeleteButton onDelete={async () => { 'use server'; await deleteDocument(doc.id); }} itemName="document" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!docs || docs.length === 0) && <div className="p-12 text-center text-gray-400">No documents yet.</div>}
            </div>
            <div className="md:hidden space-y-3">
                {(docs || []).map((doc: any) => (
                    <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{doc.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{doc.category} • {doc.file_format?.toUpperCase()} • {doc.file_size}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link href={`/admin/documents/${doc.id}/edit`}><Button size="sm" variant="ghost" className="h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button></Link>
                                <DeleteButton onDelete={async () => { 'use server'; await deleteDocument(doc.id); }} itemName="document" />
                            </div>
                        </div>
                    </div>
                ))}
                {(!docs || docs.length === 0) && <div className="bg-white rounded-lg p-8 text-center text-gray-400">No documents yet.</div>}
            </div>
        </div>
    );
}
