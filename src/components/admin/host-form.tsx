'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createHost, updateHost } from '@/app/admin/_actions/hosts';
import { FileUpload } from '@/components/admin/file-upload';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function HostForm({ host }: { host?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState(host?.avatar_url || '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        formData.set('avatar', avatarUrl);

        const result = host ? await updateHost(host.id, formData) : await createHost(formData);

        setLoading(false);

        if (result?.error) {
            setError(result.error);
            toast.error(result.error);
        } else {
            toast.success(host ? 'Team member updated' : 'Team member saved');
            router.push('/admin/hosts');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/hosts">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4" /> Back to Team
                    </Button>
                </Link>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-10">

                {/* Profile Information */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Profile Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name <span className="text-[#E4192B]">*</span></label>
                            <input name="name" defaultValue={host?.name} required placeholder="John Doe"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Role</label>
                            <select name="role" defaultValue={host?.role || 'Host'}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors bg-white">
                                <option value="Host">Host</option>
                                <option value="Co-Host">Co-Host</option>
                                <option value="Producer">Producer</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Biography</label>
                        <textarea name="bio" defaultValue={host?.bio} rows={4}
                            placeholder="A short bio about this person..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>
                </section>

                {/* Avatar / Photo */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Profile Photo</h2>
                    <p className="text-sm text-gray-500 mb-4">Upload a high-quality square image for best results.</p>
                    <FileUpload
                        onUpload={(url) => setAvatarUrl(url)}
                        accept="image/*"
                        bucket="uploads"
                        folder="hosts"
                        currentUrl={avatarUrl}
                        label="Upload Photo"
                    />
                    <input type="hidden" name="avatar" value={avatarUrl} />
                </section>

                {/* Social Links */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Social Links</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Twitter / X URL</label>
                            <input name="twitter" defaultValue={host?.social_links?.twitter} placeholder="https://x.com/username"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Instagram URL</label>
                            <input name="instagram" defaultValue={host?.social_links?.instagram} placeholder="https://instagram.com/username"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">LinkedIn URL</label>
                            <input name="linkedin" defaultValue={host?.social_links?.linkedin} placeholder="https://linkedin.com/in/username"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/hosts"><Button type="button" variant="ghost" className="px-6">Cancel</Button></Link>
                    <Button type="submit" disabled={loading}
                        className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2 px-8 py-3 text-sm font-semibold rounded-lg shadow-sm">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {host ? 'Update Team Member' : 'Save Team Member'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
