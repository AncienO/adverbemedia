'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { createShow, updateShow } from '@/app/admin/_actions/shows';
import { FileUpload } from '@/components/admin/file-upload';
import { AdminSelect } from '@/components/admin/admin-select';
import { ComingSoonVisual } from '@/components/shared/coming-soon-visual';

interface ShowFormProps {
    show?: any;
    categories: any[];
    hosts?: any[];
    allShows?: any[];
}

export function ShowForm({ show, categories, hosts, allShows }: ShowFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState(show?.status || 'coming-soon');
    const [coverImageUrl, setCoverImageUrl] = useState(show?.cover_image_url || '');
    const [hostAvatarUrl, setHostAvatarUrl] = useState(hosts?.[0]?.avatar_url || '');
    const [selectedRelatedShows, setSelectedRelatedShows] = useState<string[]>(show?.related_show_ids || []);

    const ALL_PLATFORMS = ['spotify', 'youtube', 'applePodcasts', 'twitter', 'instagram', 'website'];
    const defaultOrder: string[] = show?.social_links?.order ?? ALL_PLATFORMS;
    const [linkOrder, setLinkOrder] = useState<string[]>(defaultOrder);

    const movePlatform = (index: number, dir: 'up' | 'down') => {
        const next = [...linkOrder];
        const swap = dir === 'up' ? index - 1 : index + 1;
        if (swap < 0 || swap >= next.length) return;
        [next[index], next[swap]] = [next[swap], next[index]];
        setLinkOrder(next);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.set('coverImageUrl', coverImageUrl);
        formData.set('hostAvatarUrl', hostAvatarUrl);
        formData.set('relatedShowIds', JSON.stringify(selectedRelatedShows));
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
                        <label className="text-sm font-medium text-gray-700">Summary</label>
                        <textarea name="summary" defaultValue={show?.summary} rows={3}
                            placeholder="A concise summary displayed on the Network page"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
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
                        <AdminSelect
                            name="status"
                            label="Status"
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="coming-soon">Coming Soon</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </AdminSelect>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Advertising Content</label>
                            <textarea name="adContent" defaultValue={show?.ad_content} rows={3}
                                placeholder="Enter advertising text or copy here..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Related Shows</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {allShows?.filter(s => s.id !== show?.id).map((s: any) => (
                                    <label key={s.id} className="flex items-center gap-2 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-[#E4192B] rounded focus:ring-[#E4192B]"
                                            checked={selectedRelatedShows.includes(s.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedRelatedShows([...selectedRelatedShows, s.id]);
                                                } else {
                                                    setSelectedRelatedShows(selectedRelatedShows.filter(id => id !== s.id));
                                                }
                                            }}
                                        />
                                        <span className="text-sm text-gray-700 truncate">{s.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cover Image Preview / Upload */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Cover Image</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <FileUpload
                            onUpload={(url) => setCoverImageUrl(url)}
                            accept="image/*"
                            bucket="uploads"
                            folder="shows"
                            currentUrl={coverImageUrl}
                            label="Show Cover Art"
                        />

                        {status === 'coming-soon' && !coverImageUrl && (
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-700">Default Coming Soon Preview</label>
                                <div className="w-full aspect-square max-w-[200px] rounded-lg overflow-hidden border border-gray-100 shadow-sm relative">
                                    <ComingSoonVisual textSize="md" dotSize="md" />
                                </div>
                                <p className="text-xs text-gray-500">
                                    Since no image is uploaded, this standardized "Coming Soon" visual will be displayed on the public site.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
                <input type="hidden" name="coverImageUrl" value={coverImageUrl} />

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
                        objectFit="cover"
                        objectPosition="top"
                    />
                    <input type="hidden" name="hostAvatarUrl" value={hostAvatarUrl} />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Co-Hosts</label>
                        <input name="coHosts" placeholder="Jane Doe, John Smith (comma-separated)"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        <p className="text-xs text-gray-400">Enter names separated by commas</p>
                    </div>
                </section>

                {/* Social Links — with sortable order */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Social &amp; Streaming Links</h2>
                    <p className="text-xs text-gray-400">Use the arrows to set the display order of links on the public site.</p>
                    <div className="flex flex-col gap-4">
                        {linkOrder.map((platform, idx) => {
                            const labels: Record<string, string> = {
                                spotify: 'Spotify', youtube: 'YouTube', applePodcasts: 'Apple Podcasts',
                                twitter: 'Twitter / X', instagram: 'Instagram', website: 'Website',
                            };
                            const placeholders: Record<string, string> = {
                                spotify: 'https://open.spotify.com/...', youtube: 'https://youtube.com/...',
                                applePodcasts: 'https://podcasts.apple.com/...', twitter: 'https://x.com/...',
                                instagram: 'https://instagram.com/...', website: 'https://yoursite.com',
                            };
                            return (
                                <div key={platform} className="flex items-center gap-3">
                                    <div className="flex flex-col gap-1">
                                        <button type="button" onClick={() => movePlatform(idx, 'up')} disabled={idx === 0}
                                            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30">
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button type="button" onClick={() => movePlatform(idx, 'down')} disabled={idx === linkOrder.length - 1}
                                            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30">
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-sm font-medium text-gray-700">{labels[platform]}</label>
                                        <input
                                            name={platform}
                                            defaultValue={show?.social_links?.[platform]}
                                            placeholder={placeholders[platform]}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* YouTube Preview Field */}
                    <div className="pt-6 border-t border-gray-100 mt-6 flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Featured YouTube Video Preview</label>
                        <input
                            name="youtubePreview"
                            defaultValue={show?.social_links?.youtubePreview}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors"
                        />
                        <p className="text-xs text-gray-400">Add a direct link to a YouTube video to embed it natively on the show detail page under the Watch section.</p>
                    </div>
                    {/* Hidden field to pass link order to server */}
                    <input type="hidden" name="linkOrder" value={JSON.stringify(linkOrder)} />
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
