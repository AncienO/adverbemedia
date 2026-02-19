'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createArticle, updateArticle } from '@/app/admin/_actions/news';
import { FileUpload } from '@/components/admin/file-upload';
import { AdminSelect } from '@/components/admin/admin-select';

export function ArticleForm({ article }: { article?: any }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState(article?.cover_image_url || '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        formData.set('coverImageUrl', coverImageUrl);
        const result = article ? await updateArticle(article.id, formData) : await createArticle(formData);
        if (result?.error) { setError(result.error); setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/news">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4" /> Back to News
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">{article ? 'Edit Article' : 'Create New Article'}</h1>
                <p className="text-gray-500 mt-1">{article ? 'Update article details below.' : 'Write and publish a new news article.'}</p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Article Details */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Article Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title <span className="text-[#E4192B]">*</span></label>
                            <input name="title" defaultValue={article?.title} required placeholder="Article headline"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug</label>
                            <input name="slug" defaultValue={article?.slug} placeholder="auto-generated"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                            <p className="text-xs text-gray-400">Leave blank to auto-generate</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Writer&apos;s Name <span className="text-[#E4192B]">*</span></label>
                            <input name="authorName" defaultValue={article?.author_name} required placeholder="Who wrote this article?"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Publish Date</label>
                            <input name="publishedAt" type="datetime-local" defaultValue={article?.published_at?.slice(0, 16)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                    </div>

                    <AdminSelect name="isPublished" label="Status" defaultValue={article?.is_published ? 'true' : 'false'}>
                        <option value="false">Draft</option>
                        <option value="true">Published</option>
                    </AdminSelect>
                </section>

                {/* Cover Image */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Cover Photo</h2>
                    <FileUpload
                        onUpload={(url) => setCoverImageUrl(url)}
                        accept="image/*"
                        bucket="uploads"
                        folder="news"
                        currentUrl={coverImageUrl}
                        label="Article Cover Image"
                    />
                    <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
                </section>

                {/* Content */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Content</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Excerpt</label>
                        <textarea name="excerpt" defaultValue={article?.excerpt} rows={2}
                            placeholder="Short summary shown on the news listing page..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Article <span className="text-[#E4192B]">*</span></label>
                        <textarea name="content" defaultValue={article?.content} rows={20} required
                            placeholder="Write your article here..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>
                </section>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/news"><Button type="button" variant="ghost" className="px-6">Cancel</Button></Link>
                    <Button type="submit" disabled={loading}
                        className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2 px-8 py-3 text-sm font-semibold rounded-lg shadow-sm">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {article ? 'Update Article' : 'Publish Article'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
