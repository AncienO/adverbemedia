'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Save,
    Trash2,
    Loader2,
    ChevronUp,
    ChevronDown,
    Copy,
    Link as LinkIcon,
    Radio,
    Music,
    Video,
    Globe,
    Instagram,
    Twitter,
    Facebook,
    Rss,
} from 'lucide-react';
import { updateShowLinks } from '@/app/admin/_actions/links';
import { updateSocialLink, createSocialLink, deleteSocialLink } from '@/app/admin/_actions/settings';
import { useRouter } from 'next/navigation';

const PLATFORMS = [
    { id: 'spotify', label: 'Spotify', icon: Radio },
    { id: 'applePodcasts', label: 'Apple Podcasts', icon: Music },
    { id: 'youtube', label: 'YouTube', icon: Video },
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'twitter', label: 'X (Twitter)', icon: Twitter },
    { id: 'facebook', label: 'Facebook', icon: Facebook },
    { id: 'tiktok', label: 'TikTok', icon: Music },
    { id: 'rss', label: 'RSS Feed', icon: Rss },
    { id: 'website', label: 'Website', icon: Globe },
];

interface LinkItem {
    id: string;
    platform: string;
    url: string;
    label?: string;
    isActive: boolean;
}

interface LinksManagementProps {
    shows: any[];
    globalLinks: any[];
}

export function LinksManagement({ shows, globalLinks }: LinksManagementProps) {
    const [selectedTarget, setSelectedTarget] = useState<'global' | string>('global');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    // Local state for the current editing links
    const [youtubePreview, setYoutubePreview] = useState('');
    const [listenWatchLinks, setListenWatchLinks] = useState<LinkItem[]>([]);
    const [listenLinks, setListenLinks] = useState<LinkItem[]>([]);
    const [connectLinks, setConnectLinks] = useState<LinkItem[]>([]);
    const [footerLinks, setFooterLinks] = useState<any[]>([]);

    useEffect(() => {
        if (selectedTarget === 'global') {
            setFooterLinks(globalLinks);
        } else {
            const show = shows.find(s => s.id === selectedTarget);
            if (show) {
                // Migration logic: if social_links is strictly the old object-based structure, convert it
                const oldLinks = show.social_links || {};
                setYoutubePreview(oldLinks.youtubePreview || '');
                const listenWatch = oldLinks.listenWatch || [];
                const listen = oldLinks.listen || [];
                const connect = oldLinks.connect || [];

                // Detect old structure and migrate if needed
                if (listen.length === 0 && connect.length === 0 && Object.keys(oldLinks).length > 0) {
                    const migratedListenWatch: LinkItem[] = [];
                    const migratedListen: LinkItem[] = [];
                    const migratedConnect: LinkItem[] = [];
                    const order = oldLinks.order || [];
                    const toggles = oldLinks.toggles || {};

                    order.forEach((key: string) => {
                        if (oldLinks[key]) {
                            const item = {
                                id: Math.random().toString(36).substr(2, 9),
                                platform: key,
                                url: oldLinks[key],
                                isActive: toggles[key] !== false,
                            };
                            if (['spotify', 'applePodcasts', 'youtube'].includes(key)) {
                                migratedListenWatch.push(item);
                            } else if (['rss'].includes(key)) {
                                migratedListen.push(item);
                            } else {
                                migratedConnect.push(item);
                            }
                        }
                    });
                    setListenWatchLinks(migratedListenWatch);
                    setListenLinks(migratedListen);
                    setConnectLinks(migratedConnect);
                } else {
                    setListenWatchLinks(listenWatch);
                    setListenLinks(listen);
                    setConnectLinks(connect);
                }
            }
        }
    }, [selectedTarget, shows, globalLinks]);

    const addLink = (section: 'listenWatch' | 'listen' | 'connect') => {
        const newLink: LinkItem = {
            id: Math.random().toString(36).substr(2, 9),
            platform: 'spotify',
            url: '',
            isActive: true,
        };
        if (section === 'listenWatch') setListenWatchLinks([...listenWatchLinks, newLink]);
        else if (section === 'listen') setListenLinks([...listenLinks, newLink]);
        else setConnectLinks([...connectLinks, newLink]);
    };

    const duplicateLink = (section: 'listenWatch' | 'listen' | 'connect', link: LinkItem) => {
        const newLink: LinkItem = {
            ...link,
            id: Math.random().toString(36).substr(2, 9),
        };
        if (section === 'listenWatch') setListenWatchLinks([...listenWatchLinks, newLink]);
        else if (section === 'listen') setListenLinks([...listenLinks, newLink]);
        else setConnectLinks([...connectLinks, newLink]);
    };

    const removeLink = (section: 'listenWatch' | 'listen' | 'connect', id: string) => {
        if (section === 'listenWatch') setListenWatchLinks(listenWatchLinks.filter(l => l.id !== id));
        else if (section === 'listen') setListenLinks(listenLinks.filter(l => l.id !== id));
        else setConnectLinks(connectLinks.filter(l => l.id !== id));
    };

    const updateLink = (section: 'listenWatch' | 'listen' | 'connect', id: string, field: keyof LinkItem, value: any) => {
        const setterMap = {
            listenWatch: setListenWatchLinks,
            listen: setListenLinks,
            connect: setConnectLinks
        };
        const setter = setterMap[section];
        setter(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
    };

    const moveLink = (section: 'listenWatch' | 'listen' | 'connect', index: number, direction: 'up' | 'down') => {
        const linksMap = {
            listenWatch: listenWatchLinks,
            listen: listenLinks,
            connect: connectLinks
        };
        const setterMap = {
            listenWatch: setListenWatchLinks,
            listen: setListenLinks,
            connect: setConnectLinks
        };
        const links = linksMap[section];
        const setLinks = setterMap[section];
        const newLinks = [...links];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= newLinks.length) return;
        [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];
        setLinks(newLinks);
    };

    const handleSaveShow = async () => {
        setLoading(true);
        const result = await updateShowLinks(selectedTarget as string, {
            youtubePreview,
            listenWatch: listenWatchLinks,
            listen: listenLinks,
            connect: connectLinks,
        });
        setLoading(false);
        if (result.error) setMessage({ type: 'error', text: result.error });
        else setMessage({ type: 'success', text: 'Show links updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleSaveFooter = async (link: any) => {
        const formData = new FormData();
        formData.set('platform', link.platform);
        formData.set('url', link.url);
        formData.set('iconKey', link.icon_key);
        formData.set('isActive', String(link.is_active));
        formData.set('sortOrder', String(link.sort_order));
        await updateSocialLink(link.id, formData);
        router.refresh();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Link Management</h1>
                    <p className="text-gray-500 mt-1">Manage global footer links and show-specific streaming sections.</p>
                </div>

                <select
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm font-medium bg-white"
                >
                    <option value="global">Global Footer Links</option>
                    <optgroup label="Network Shows">
                        {shows.map(show => (
                            <option key={show.id} value={show.id}>{show.title}</option>
                        ))}
                    </optgroup>
                </select>
            </div>

            {message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {selectedTarget === 'global' ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Global Footer Links</h2>
                    <div className="space-y-4">
                        {globalLinks.map((link, idx) => (
                            <div key={link.id} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group">
                                <span className="text-gray-400 font-medium text-xs w-4">{idx + 1}</span>
                                <div className="w-full md:w-40">
                                    <input
                                        defaultValue={link.platform}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                                        onBlur={(e) => handleSaveFooter({ ...link, platform: e.target.value })}
                                    />
                                </div>
                                <div className="flex-1 w-full">
                                    <input
                                        defaultValue={link.url}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                                        onBlur={(e) => handleSaveFooter({ ...link, url: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="ghost" onClick={() => deleteSocialLink(link.id)} className="text-gray-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full border-dashed" onClick={async () => {
                            const formData = new FormData();
                            formData.set('platform', 'New Link');
                            formData.set('url', 'https://');
                            formData.set('iconKey', 'globe');
                            formData.set('sortOrder', String(globalLinks.length));
                            await createSocialLink(formData);
                            router.refresh();
                        }}>
                            <Plus className="w-4 h-4 mr-2" /> Add Footer Link
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-10">
                    {/* YouTube Preview Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900">Featured YouTube Preview</h2>
                            <p className="text-xs text-gray-400">The video that appears in the "Watch" section.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Video URL</label>
                                <input
                                    type="text"
                                    value={youtubePreview}
                                    onChange={(e) => setYoutubePreview(e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#E4192B]/10"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Listen & Watch Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900">"Listen & Watch" Section (Banner Badges)</h2>
                            <p className="text-xs text-gray-400">Prominent badges for YouTube, Spotify, Apple Podcasts.</p>
                        </div>

                        <div className="space-y-4">
                            {listenWatchLinks.map((link, idx) => (
                                <LinkEditorItem
                                    key={link.id}
                                    link={link}
                                    index={idx}
                                    total={listenWatchLinks.length}
                                    onUpdate={(field: keyof LinkItem, val: any) => updateLink('listenWatch', link.id, field, val)}
                                    onRemove={() => removeLink('listenWatch', link.id)}
                                    onDuplicate={() => duplicateLink('listenWatch', link)}
                                    onMove={(dir: 'up' | 'down') => moveLink('listenWatch', idx, dir)}
                                />
                            ))}
                            <Button variant="outline" className="w-full border-dashed" onClick={() => addLink('listenWatch')}>
                                <Plus className="w-4 h-4 mr-2" /> Add Link to Listen & Watch
                            </Button>
                        </div>
                    </section>

                    {/* Listen Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900">"Listen" Section</h2>
                            <p className="text-xs text-gray-400">Typically Spotify, Apple Podcasts, RSS.</p>
                        </div>

                        <div className="space-y-4">
                            {listenLinks.map((link, idx) => (
                                <LinkEditorItem
                                    key={link.id}
                                    link={link}
                                    index={idx}
                                    total={listenLinks.length}
                                    onUpdate={(field: keyof LinkItem, val: any) => updateLink('listen', link.id, field, val)}
                                    onRemove={() => removeLink('listen', link.id)}
                                    onDuplicate={() => duplicateLink('listen', link)}
                                    onMove={(dir: 'up' | 'down') => moveLink('listen', idx, dir)}
                                />
                            ))}
                            <Button variant="outline" className="w-full border-dashed" onClick={() => addLink('listen')}>
                                <Plus className="w-4 h-4 mr-2" /> Add Link to Listen
                            </Button>
                        </div>
                    </section>

                    {/* Connect Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900">"Connect" Section</h2>
                            <p className="text-xs text-gray-400">Social media links, YouTube watch links, etc.</p>
                        </div>

                        <div className="space-y-4">
                            {connectLinks.map((link, idx) => (
                                <LinkEditorItem
                                    key={link.id}
                                    link={link}
                                    index={idx}
                                    total={connectLinks.length}
                                    onUpdate={(field: keyof LinkItem, val: any) => updateLink('connect', link.id, field, val)}
                                    onRemove={() => removeLink('connect', link.id)}
                                    onDuplicate={() => duplicateLink('connect', link)}
                                    onMove={(dir: 'up' | 'down') => moveLink('connect', idx, dir)}
                                />
                            ))}
                            <Button variant="outline" className="w-full border-dashed" onClick={() => addLink('connect')}>
                                <Plus className="w-4 h-4 mr-2" /> Add Link to Connect
                            </Button>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex justify-end sticky bottom-8">
                        <Button
                            size="lg"
                            disabled={loading}
                            onClick={handleSaveShow}
                            className="bg-[#E4192B] hover:bg-[#c41525] text-white shadow-lg shadow-[#E4192B]/20 gap-2 px-10"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save All Changes
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function LinkEditorItem({ link, index, total, onUpdate, onRemove, onDuplicate, onMove }: any) {
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 group transition-all hover:border-gray-200">
            {/* Sort Controls */}
            <div className="flex flex-row md:flex-col gap-1 items-center justify-center">
                <button onClick={() => onMove('up')} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-20">
                    <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => onMove('down')} disabled={index === total - 1} className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-20">
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            {/* Platform Selector */}
            <div className="w-full md:w-48">
                <select
                    value={link.platform}
                    onChange={(e) => onUpdate('platform', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white font-medium shadow-sm focus:ring-2 focus:ring-[#E4192B]/10"
                >
                    {PLATFORMS.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                </select>
            </div>

            {/* URL Input */}
            <div className="flex-1">
                <input
                    type="text"
                    value={link.url}
                    onChange={(e) => onUpdate('url', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#E4192B]/10"
                />
            </div>

            {/* Active Toggle & Label */}
            <div className="flex items-center gap-4 min-w-[120px]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={link.isActive}
                        onChange={(e) => onUpdate('isActive', e.target.checked)}
                        className="w-4 h-4 rounded text-[#E4192B] focus:ring-[#E4192B] border-gray-300 transition-all"
                    />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-tight">Active</span>
                </label>
            </div>

            {/* Extra Actions */}
            <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                <Button variant="ghost" size="sm" onClick={onDuplicate} title="Duplicate" className="text-gray-400 hover:text-blue-600 h-8 w-8 p-0">
                    <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onRemove} title="Remove" className="text-gray-400 hover:text-red-600 h-8 w-8 p-0">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
