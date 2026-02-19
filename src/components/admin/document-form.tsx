'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createDocument, updateDocument } from '@/app/admin/_actions/documents';
import { FileUpload } from '@/components/admin/file-upload';

export function DocumentForm({ document }: { document?: any }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState(document?.file_url || '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        formData.set('fileUrl', fileUrl);
        const result = document ? await updateDocument(document.id, formData) : await createDocument(formData);
        if (result?.error) { setError(result.error); setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/documents">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4" /> Back to Documents
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">{document ? 'Edit Document' : 'Upload New Document'}</h1>
                <p className="text-gray-500 mt-1">{document ? 'Update document details below.' : 'Add a new company document.'}</p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-10">
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Document Details</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Title <span className="text-[#E4192B]">*</span></label>
                        <input name="title" defaultValue={document?.title} required placeholder="e.g. Company Overview 2026"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" defaultValue={document?.description} rows={3}
                            placeholder="Brief description of this document..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">File Size</label>
                            <input name="fileSize" defaultValue={document?.file_size} placeholder="e.g. 2.4 MB"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">File Format</label>
                            <input name="fileFormat" defaultValue={document?.file_format} placeholder="e.g. PDF"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <input name="category" defaultValue={document?.category} placeholder="e.g. Press, Reports"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Document File</h2>
                    <FileUpload
                        onUpload={(url) => setFileUrl(url)}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        bucket="uploads"
                        folder="documents"
                        currentUrl={fileUrl}
                        label="Upload Document"
                    />
                    <input type="hidden" name="fileUrl" value={fileUrl} />
                </section>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/documents"><Button type="button" variant="ghost" className="px-6">Cancel</Button></Link>
                    <Button type="submit" disabled={loading}
                        className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2 px-8 py-3 text-sm font-semibold rounded-lg shadow-sm">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {document ? 'Update Document' : 'Upload Document'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
