'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createEpisode, updateEpisode } from '@/app/admin/_actions/episodes';
import { FileUpload } from '@/components/admin/file-upload';
import { AdminSelect } from '@/components/admin/admin-select';

interface EpisodeFormProps {
    episode?: any;
    shows: any[];
}

export function EpisodeForm({ episode, shows }: EpisodeFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState(episode?.audio_url || '');
    const [coverImageUrl, setCoverImageUrl] = useState(episode?.cover_image_url || '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.set('audioUrl', audioUrl);
        formData.set('coverImageUrl', coverImageUrl);
        const result = episode ? await updateEpisode(episode.id, formData) : await createEpisode(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/episodes">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4" /> Back to Episodes
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">{episode ? 'Edit Episode' : 'Create New Episode'}</h1>
                <p className="text-gray-500 mt-1">{episode ? 'Update episode details below.' : 'Add a new episode to one of your shows.'}</p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Info */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Episode Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title <span className="text-[#E4192B]">*</span></label>
                            <input name="title" defaultValue={episode?.title} required placeholder="Episode title"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <AdminSelect name="showId" label="Show" required defaultValue={episode?.show_id}>
                            <option value="">Select a show</option>
                            {shows.map((s: any) => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
                        </AdminSelect>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug</label>
                            <input name="slug" defaultValue={episode?.slug} placeholder="auto-generated"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                            <p className="text-xs text-gray-400">Leave blank to auto-generate</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Duration</label>
                            <input name="duration" defaultValue={episode?.duration} placeholder="e.g. 45:00"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" defaultValue={episode?.description} rows={4}
                            placeholder="What is this episode about?"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>
                </section>

                {/* Media */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Media</h2>

                    <FileUpload
                        onUpload={(url) => setAudioUrl(url)}
                        accept="audio/*"
                        bucket="uploads"
                        folder="audio"
                        currentUrl={audioUrl}
                        label="Audio File"
                    />
                    <input type="hidden" name="audioUrl" value={audioUrl} />

                    <FileUpload
                        onUpload={(url) => setCoverImageUrl(url)}
                        accept="image/*"
                        bucket="uploads"
                        folder="episodes"
                        currentUrl={coverImageUrl}
                        label="Episode Cover Image (optional)"
                    />
                    <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
                </section>

                {/* Publishing */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Publishing & Metadata</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Publish Date</label>
                            <input name="publishedAt" type="datetime-local" defaultValue={episode?.published_at?.slice(0, 16)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tags</label>
                            <input name="tags" defaultValue={episode?.tags?.join(', ')} placeholder="business, marketing (comma-separated)"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Show Notes</label>
                        <textarea name="showNotes" defaultValue={episode?.show_notes} rows={4}
                            placeholder="Links, references, and additional notes..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Transcript</label>
                        <textarea name="transcript" defaultValue={episode?.transcript} rows={5}
                            placeholder="Full episode transcript..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>
                </section>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/episodes"><Button type="button" variant="ghost" className="px-6">Cancel</Button></Link>
                    <Button type="submit" disabled={loading}
                        className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2 px-8 py-3 text-sm font-semibold rounded-lg shadow-sm">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {episode ? 'Update Episode' : 'Create Episode'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
