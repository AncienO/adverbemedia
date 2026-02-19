'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createShow, updateShow } from '@/app/admin/_actions/shows';
import { FileUpload } from '@/components/admin/file-upload';
import { AdminSelect } from '@/components/admin/admin-select';

interface ShowFormProps {
    show?: any;
    categories: any[];
    hosts?: any[];
}

export function ShowForm({ show, categories, hosts }: ShowFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState(show?.cover_image_url || '');
    const [hostAvatarUrl, setHostAvatarUrl] = useState(hosts?.[0]?.avatar_url || '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.set('coverImageUrl', coverImageUrl);
        formData.set('hostAvatarUrl', hostAvatarUrl);
        const result = show ? await updateShow(show.id, formData) : await createShow(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    const primaryHost = hosts?.[0];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/shows">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4" /> Back to Shows
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">
                    {show ? 'Edit Show' : 'Create New Show'}
                </h1>
                <p className="text-gray-500 mt-1">
                    {show ? 'Update the details of your show below.' : 'Fill in the details to add a new show to your lineup.'}
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Information */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title <span className="text-[#E4192B]">*</span></label>
                            <input name="title" defaultValue={show?.title} required
                                placeholder="e.g. MAD Conversations"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug</label>
                            <input name="slug" defaultValue={show?.slug} placeholder="auto-generated from title"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                            <p className="text-xs text-gray-400">Leave blank to auto-generate from title</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Short Description</label>
                        <input name="shortDescription" defaultValue={show?.short_description}
                            placeholder="A brief one-line summary"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Description</label>
                        <textarea name="description" defaultValue={show?.description} rows={5}
                            placeholder="Describe the show, its themes, and what listeners can expect..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AdminSelect name="categoryId" label="Category" defaultValue={show?.category_id || ''}>
                            <option value="">Select a category</option>
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </AdminSelect>
                        <AdminSelect name="status" label="Status" required defaultValue={show?.status || 'coming-soon'}>
                            <option value="coming-soon">Coming Soon</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </AdminSelect>
                    </div>
                </section>

                {/* Cover Image */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Cover Image</h2>
                    <FileUpload
                        onUpload={(url) => setCoverImageUrl(url)}
                        accept="image/*"
                        bucket="uploads"
                        folder="shows"
                        currentUrl={coverImageUrl}
                        label="Show Cover Art"
                    />
                    <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
                </section>

                {/* Host Section */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Host & Team</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Host Name</label>
                            <input name="hostName" defaultValue={primaryHost?.name}
                                placeholder="e.g. John Doe"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Host Role</label>
                            <input name="hostRole" defaultValue={primaryHost?.role || 'Host'}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                    </div>

                    <FileUpload
                        onUpload={(url) => setHostAvatarUrl(url)}
                        accept="image/*"
                        bucket="uploads"
                        folder="hosts"
                        currentUrl={hostAvatarUrl}
                        label="Host Photo"
                    />
                    <input type="hidden" name="hostAvatarUrl" value={hostAvatarUrl} />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Co-Hosts</label>
                        <input name="coHosts" placeholder="Jane Doe, John Smith (comma-separated)"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        <p className="text-xs text-gray-400">Enter names separated by commas</p>
                    </div>
                </section>

                {/* Social Links */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Social & Streaming Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Spotify</label>
                            <input name="spotify" defaultValue={show?.social_links?.spotify} placeholder="https://open.spotify.com/..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">YouTube</label>
                            <input name="youtube" defaultValue={show?.social_links?.youtube} placeholder="https://youtube.com/..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Apple Podcasts</label>
                            <input name="applePodcasts" defaultValue={show?.social_links?.applePodcasts} placeholder="https://podcasts.apple.com/..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Twitter / X</label>
                            <input name="twitter" defaultValue={show?.social_links?.twitter} placeholder="https://x.com/..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Instagram</label>
                            <input name="instagram" defaultValue={show?.social_links?.instagram} placeholder="https://instagram.com/..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/shows">
                        <Button type="button" variant="ghost" className="px-6">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={loading}
                        className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2 px-8 py-3 text-sm font-semibold rounded-lg shadow-sm">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {show ? 'Update Show' : 'Create Show'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
