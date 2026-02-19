'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2, Loader2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { createSection, updateSection, deleteSection } from '@/app/admin/_actions/company';
import { useRouter } from 'next/navigation';

interface Section {
    id: string;
    section_key: string;
    title: string;
    content: string;
    sort_order: number;
    is_visible: boolean;
}

export function CompanySectionEditor({ initialSections }: { initialSections: Section[] }) {
    const [sections, setSections] = useState(initialSections);
    const [saving, setSaving] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const router = useRouter();

    // Sync local state when server data refreshes
    useEffect(() => {
        setSections(initialSections);
    }, [initialSections]);

    const handleSave = async (section: Section) => {
        setSaving(section.id);
        const formData = new FormData();
        formData.set('title', section.title);
        formData.set('content', section.content);
        formData.set('sectionKey', section.section_key);
        formData.set('sortOrder', String(section.sort_order));
        formData.set('isVisible', String(section.is_visible));
        await updateSection(section.id, formData);
        setSaving(null);
        router.refresh();
    };

    const handleAdd = async () => {
        if (!newTitle) return;
        setAdding(true);
        const formData = new FormData();
        formData.set('title', newTitle);
        formData.set('content', newContent);
        formData.set('sortOrder', String(sections.length));
        await createSection(formData);
        setNewTitle('');
        setNewContent('');
        setAdding(false);
        router.refresh();
    };

    const handleDelete = async (id: string) => {
        await deleteSection(id);
        setSections(sections.filter(s => s.id !== id));
        router.refresh();
    };

    const updateLocal = (id: string, field: string, value: any) => {
        setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    return (
        <div className="space-y-4">
            {sections.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                                <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                <input
                                    value={section.title}
                                    onChange={(e) => updateLocal(section.id, 'title', e.target.value)}
                                    className="text-lg font-semibold text-gray-900 border-0 border-b border-transparent hover:border-gray-200 focus:border-[#E4192B] focus:ring-0 px-0 py-1 w-full bg-transparent"
                                />
                            </div>
                            <textarea
                                value={section.content || ''}
                                onChange={(e) => updateLocal(section.id, 'content', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-[#E4192B] focus:border-[#E4192B] resize-y"
                            />
                            <p className="text-xs text-gray-400">Key: {section.section_key}</p>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                            <Button
                                size="sm" variant="ghost"
                                onClick={() => updateLocal(section.id, 'is_visible', !section.is_visible)}
                                className={`h-8 w-8 p-0 ${section.is_visible ? 'text-green-600' : 'text-gray-300'}`}
                                title={section.is_visible ? 'Visible' : 'Hidden'}
                            >
                                {section.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleSave(section)}
                                disabled={saving === section.id}
                                className="text-blue-500 hover:text-blue-700 h-8 w-8 p-0">
                                {saving === section.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDelete(section.id)}
                                className="text-gray-300 hover:text-red-600 h-8 w-8 p-0">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add New Section */}
            <div className="bg-white rounded-lg shadow-sm border border-dashed border-gray-300 p-4 md:p-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Add New Section</h3>
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Section Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Section content..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <Button onClick={handleAdd} disabled={adding || !newTitle}
                    className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2">
                    {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Add Section
                </Button>
            </div>
        </div>
    );
}
