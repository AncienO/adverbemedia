'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { createSocialLink, updateSocialLink, deleteSocialLink } from '@/app/admin/_actions/settings';
import { useRouter } from 'next/navigation';

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon_key: string;
    is_active: boolean;
    sort_order: number;
}

export function SettingsEditor({ initialLinks }: { initialLinks: SocialLink[] }) {
    const [links, setLinks] = useState(initialLinks);
    const [saving, setSaving] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);
    const [newPlatform, setNewPlatform] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const router = useRouter();

    const handleSave = async (link: SocialLink) => {
        setSaving(link.id);
        const formData = new FormData();
        formData.set('platform', link.platform);
        formData.set('url', link.url);
        formData.set('iconKey', link.icon_key || link.platform.toLowerCase());
        formData.set('isActive', String(link.is_active));
        formData.set('sortOrder', String(link.sort_order));
        await updateSocialLink(link.id, formData);
        setSaving(null);
        router.refresh();
    };

    const handleAdd = async () => {
        if (!newPlatform || !newUrl) return;
        setAdding(true);
        const formData = new FormData();
        formData.set('platform', newPlatform);
        formData.set('url', newUrl);
        formData.set('iconKey', newPlatform.toLowerCase());
        formData.set('sortOrder', String(links.length));
        await createSocialLink(formData);
        setNewPlatform('');
        setNewUrl('');
        setAdding(false);
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        await deleteSocialLink(id);
        setLinks(links.filter(l => l.id !== id));
        router.refresh();
    };

    const updateLocal = (id: string, field: string, value: any) => {
        setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h2>
                <div className="space-y-3">
                    {links.map((link) => (
                        <div key={link.id} className="flex flex-col md:flex-row items-start md:items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <input
                                value={link.platform}
                                onChange={(e) => updateLocal(link.id, 'platform', e.target.value)}
                                className="w-full md:w-32 px-3 py-2 border border-gray-200 rounded-md text-sm"
                                placeholder="Platform"
                            />
                            <input
                                value={link.url}
                                onChange={(e) => updateLocal(link.id, 'url', e.target.value)}
                                className="w-full md:flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                                placeholder="https://..."
                            />
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={link.is_active}
                                        onChange={(e) => updateLocal(link.id, 'is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-[#E4192B] focus:ring-[#E4192B]" />
                                    Active
                                </label>
                                <Button size="sm" variant="ghost" onClick={() => handleSave(link)}
                                    disabled={saving === link.id}
                                    className="text-blue-500 hover:text-blue-700 h-8 w-8 p-0">
                                    {saving === link.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleDelete(link.id)}
                                    className="text-gray-300 hover:text-red-600 h-8 w-8 p-0">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {links.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">No social links configured yet.</p>
                    )}
                </div>

                {/* Add New Link */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col md:flex-row gap-3">
                    <input value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)}
                        placeholder="Platform name" className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="URL" className="w-full md:flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    <Button onClick={handleAdd} disabled={adding || !newPlatform || !newUrl}
                        className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2 whitespace-nowrap">
                        {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Add Link
                    </Button>
                </div>
            </div>
        </div>
    );
}
