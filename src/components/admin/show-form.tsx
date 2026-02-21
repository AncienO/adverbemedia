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
    hosts?: any[]; // The hosts CURRENTLY assigned to the show
    allShows?: any[];
    allHosts?: any[];
}

export function ShowForm({ show, categories, hosts, allShows, allHosts }: ShowFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState(show?.status || 'coming-soon');
    const [coverImageUrl, setCoverImageUrl] = useState(show?.cover_image_url || '');

    const [selectedHostIds, setSelectedHostIds] = useState<string[]>(
        hosts?.map(h => h.id) || []
    );
    const [selectedRelatedShows, setSelectedRelatedShows] = useState<string[]>(show?.related_show_ids || []);

    const ALL_PLATFORMS = ['spotify', 'youtube', 'applePodcasts', 'twitter', 'instagram', 'facebook', 'tiktok', 'rss', 'website'];
    const prevOrder: string[] = show?.social_links?.order ?? [];
    const missingPlatforms = ALL_PLATFORMS.filter(p => !prevOrder.includes(p));
    const defaultOrder = [...prevOrder, ...missingPlatforms];
    const [linkOrder] = useState<string[]>(defaultOrder);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.set('coverImageUrl', coverImageUrl);
        formData.set('relatedShowIds', JSON.stringify(selectedRelatedShows));
        formData.set('hostIds', JSON.stringify(selectedHostIds));
        const result = show ? await updateShow(show.id, formData) : await createShow(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
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

                {/* Cover Image */}
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
                            </div>
                        )}
                    </div>
                </section>
                <input type="hidden" name="coverImageUrl" value={coverImageUrl} />

                {/* Host Section */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Team / Hosts</h2>
                        <Link href="/admin/hosts/new" target="_blank" className="text-sm text-[#E4192B] hover:text-[#c41525] font-medium">
                            + Add New Team Member
                        </Link>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">Select the team members connected to this show.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {allHosts?.map((h: any) => (
                                <label key={h.id} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${selectedHostIds.includes(h.id) ? 'border-[#E4192B] bg-[#E4192B]/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-[#E4192B] rounded focus:ring-[#E4192B]"
                                        checked={selectedHostIds.includes(h.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedHostIds([...selectedHostIds, h.id]);
                                            else setSelectedHostIds(selectedHostIds.filter(id => id !== h.id));
                                        }}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">{h.name}</span>
                                        <span className="text-xs text-gray-500">{h.role || 'Host'}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Social Links — Simplified */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Links & Streaming</h2>
                        <Link href={`/admin/links?show=${show?.id || ''}`}>
                            <Button type="button" variant="outline" size="sm" className="text-[#E4192B] border-[#E4192B] hover:bg-[#E4192B] hover:text-white">
                                Manage Links Advanced
                            </Button>
                        </Link>
                    </div>

                    <p className="text-sm text-gray-500">
                        Links and video previews are now managed in the central <Link href="/admin/links" className="text-[#E4192B] underline font-medium">Link Management</Link> page. This allows for reordering, duplication, and custom labels.
                    </p>
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
