'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Plus, Trash2, ArrowUp, ArrowDown, GripVertical,
    AlignLeft, List, Type,
} from 'lucide-react';
import {
    JobSection, ContentBlock, TextBlock, SubsectionBlock, BulletsBlock, TitleBlock,
    serializeSections,
} from '@/lib/job-sections';

export type { JobSection };
export { parseJobSections } from '@/lib/job-sections';

// ── helpers ───────────────────────────────────────────────────────────────────

function genId() { return Math.random().toString(36).slice(2, 10); }

function emptySection(): JobSection {
    return { id: genId(), title: '', blocks: [{ type: 'text', id: genId(), content: '' }] };
}

function emptyBlock(type: ContentBlock['type']): ContentBlock {
    if (type === 'subsection') return { type, id: genId(), title: '', content: '' };
    if (type === 'bullets')   return { type, id: genId(), items: [''] };
    return { type: 'text', id: genId(), content: '' };
}

// ── Block-level controls (shared) ─────────────────────────────────────────────

function BlockControls({ onDelete, onMove, isFirst, isLast }: {
    onDelete: () => void;
    onMove: (dir: 'up' | 'down') => void;
    isFirst: boolean;
    isLast: boolean;
}) {
    return (
        <div className="flex flex-col gap-0.5 flex-shrink-0 self-start pt-6">
            <button type="button" onClick={() => onMove('up')} disabled={isFirst}
                className="p-1 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors" title="Move up">
                <ArrowUp className="w-3 h-3" />
            </button>
            <button type="button" onClick={() => onMove('down')} disabled={isLast}
                className="p-1 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors" title="Move down">
                <ArrowDown className="w-3 h-3" />
            </button>
            <div className="h-px bg-gray-200 my-0.5" />
            <button type="button" onClick={onDelete}
                className="p-1 text-gray-200 hover:text-red-500 transition-colors" title="Remove block">
                <Trash2 className="w-3 h-3" />
            </button>
        </div>
    );
}

// ── Individual block editors ──────────────────────────────────────────────────

function TitleBlockEditor({ block, onChange, ...controls }: {
    block: TitleBlock;
    onChange: (b: TitleBlock) => void;
    onDelete: () => void;
    onMove: (dir: 'up' | 'down') => void;
    isFirst: boolean;
    isLast: boolean;
}) {
    return (
        <div className="flex gap-2 bg-purple-50/40 border border-purple-100 rounded-md p-3">
            <div className="flex-1 space-y-2">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 uppercase tracking-wide">
                    <Type className="w-3 h-3" /> Title
                </p>
                <input
                    value={block.text}
                    onChange={e => onChange({ ...block, text: e.target.value })}
                    placeholder="Standalone heading text…"
                    className="w-full px-2 py-1 text-sm font-semibold border border-transparent hover:border-purple-200 focus:border-[#E4192B] focus:ring-1 focus:ring-[#E4192B]/30 rounded focus:outline-none bg-white text-gray-900 placeholder:text-gray-300 transition-all"
                />
            </div>
            <BlockControls {...controls} />
        </div>
    );
}

function TextBlockEditor({ block, onChange, ...controls }: {
    block: TextBlock;
    onChange: (b: TextBlock) => void;
    onDelete: () => void;
    onMove: (dir: 'up' | 'down') => void;
    isFirst: boolean;
    isLast: boolean;
}) {
    return (
        <div className="flex gap-2 bg-gray-50 border border-gray-200 rounded-md p-3">
            <div className="flex-1 space-y-1.5">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                    <Type className="w-3 h-3" /> Text
                </p>
                <textarea
                    value={block.content}
                    onChange={e => onChange({ ...block, content: e.target.value })}
                    rows={2}
                    placeholder="Paragraph text…"
                    className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-[#E4192B]/30 focus:border-[#E4192B] resize-y text-gray-700 placeholder:text-gray-300 bg-white"
                />
            </div>
            <BlockControls {...controls} />
        </div>
    );
}

function SubsectionBlockEditor({ block, onChange, ...controls }: {
    block: SubsectionBlock;
    onChange: (b: SubsectionBlock) => void;
    onDelete: () => void;
    onMove: (dir: 'up' | 'down') => void;
    isFirst: boolean;
    isLast: boolean;
}) {
    const hasBullets = Array.isArray(block.items);
    const items = block.items ?? [];

    const enableBullets = () => onChange({ ...block, items: [''] });
    const disableBullets = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { items: _items, ...rest } = block;
        onChange(rest as SubsectionBlock);
    };
    const updateItem = (i: number, val: string) => {
        const next = [...items]; next[i] = val;
        onChange({ ...block, items: next });
    };
    const addItem    = () => onChange({ ...block, items: [...items, ''] });
    const removeItem = (i: number) => {
        if (items.length <= 1) { disableBullets(); return; }
        onChange({ ...block, items: items.filter((_, idx) => idx !== i) });
    };

    return (
        <div className="flex gap-2 bg-blue-50/50 border border-blue-100 rounded-md p-3">
            <div className="flex-1 space-y-2">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-500 uppercase tracking-wide">
                    <AlignLeft className="w-3 h-3" /> Subsection
                </p>
                <input
                    value={block.title}
                    onChange={e => onChange({ ...block, title: e.target.value })}
                    placeholder="Subsection heading…"
                    className="w-full px-2 py-1 text-sm font-semibold border-0 border-b border-gray-200 focus:border-[#E4192B] focus:ring-0 focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-300"
                />
                <textarea
                    value={block.content}
                    onChange={e => onChange({ ...block, content: e.target.value })}
                    rows={2}
                    placeholder="Body text for this subsection…"
                    className="w-full px-2 py-1.5 text-sm border border-blue-100 rounded focus:ring-1 focus:ring-[#E4192B]/30 focus:border-[#E4192B] resize-y text-gray-700 placeholder:text-gray-300 bg-white"
                />

                {/* Inline bullet list */}
                {hasBullets ? (
                    <div className="bg-emerald-50/40 border border-emerald-100 rounded p-2.5 space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
                                <List className="w-3 h-3" /> Bullet points
                            </p>
                            <button
                                type="button"
                                onClick={disableBullets}
                                className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove all bullets"
                            >
                                Remove bullets
                            </button>
                        </div>
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-[#E4192B] font-bold text-sm flex-shrink-0 leading-none">•</span>
                                <input
                                    value={item}
                                    onChange={e => updateItem(i, e.target.value)}
                                    placeholder={`Item ${i + 1}…`}
                                    className="flex-1 px-2 py-1 text-sm border border-emerald-100 rounded focus:ring-1 focus:ring-[#E4192B]/30 focus:border-[#E4192B] focus:outline-none bg-white placeholder:text-gray-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeItem(i)}
                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addItem}
                            className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 transition-colors mt-1"
                        >
                            <Plus className="w-3 h-3" /> Add bullet
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={enableBullets}
                        className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-600 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Add bullet points
                    </button>
                )}
            </div>
            <BlockControls {...controls} />
        </div>
    );
}

function BulletsBlockEditor({ block, onChange, ...controls }: {
    block: BulletsBlock;
    onChange: (b: BulletsBlock) => void;
    onDelete: () => void;
    onMove: (dir: 'up' | 'down') => void;
    isFirst: boolean;
    isLast: boolean;
}) {
    const updateItem = (i: number, val: string) => {
        const items = [...block.items];
        items[i] = val;
        onChange({ ...block, items });
    };
    const addItem    = () => onChange({ ...block, items: [...block.items, ''] });
    const removeItem = (i: number) => {
        if (block.items.length <= 1) return;
        onChange({ ...block, items: block.items.filter((_, idx) => idx !== i) });
    };

    return (
        <div className="flex gap-2 bg-emerald-50/40 border border-emerald-100 rounded-md p-3">
            <div className="flex-1 space-y-2">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
                    <List className="w-3 h-3" /> Bullet List
                </p>
                <input
                    value={block.title ?? ''}
                    onChange={e => onChange({ ...block, title: e.target.value || undefined })}
                    placeholder="List heading (optional)…"
                    className="w-full px-2 py-1 text-sm font-semibold border-0 border-b border-gray-200 focus:border-[#E4192B] focus:ring-0 focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-300"
                />
                {block.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-[#E4192B] font-bold text-sm flex-shrink-0 leading-none">•</span>
                        <input
                            value={item}
                            onChange={e => updateItem(i, e.target.value)}
                            placeholder={`Item ${i + 1}…`}
                            className="flex-1 px-2 py-1 text-sm border border-emerald-100 rounded focus:ring-1 focus:ring-[#E4192B]/30 focus:border-[#E4192B] focus:outline-none bg-white placeholder:text-gray-300"
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(i)}
                            disabled={block.items.length === 1}
                            className="text-gray-300 hover:text-red-500 disabled:opacity-20 transition-colors"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 transition-colors mt-1"
                >
                    <Plus className="w-3 h-3" /> Add item
                </button>
            </div>
            <BlockControls {...controls} />
        </div>
    );
}

// ── Per-section block list editor ─────────────────────────────────────────────

function SectionBlocksList({ section, onChange }: {
    section: JobSection;
    onChange: (s: JobSection) => void;
}) {
    const setBlocks = (blocks: ContentBlock[]) => onChange({ ...section, blocks });

    const updateBlock = (id: string, updated: ContentBlock) =>
        setBlocks(section.blocks.map(b => b.id === id ? updated : b));

    const removeBlock = (id: string) => {
        if (section.blocks.length <= 1) return;
        setBlocks(section.blocks.filter(b => b.id !== id));
    };

    const moveBlock = (index: number, dir: 'up' | 'down') => {
        if (dir === 'up' && index === 0) return;
        if (dir === 'down' && index === section.blocks.length - 1) return;
        const next = [...section.blocks];
        const ti = dir === 'up' ? index - 1 : index + 1;
        [next[index], next[ti]] = [next[ti], next[index]];
        setBlocks(next);
    };

    const addBlock = (type: ContentBlock['type']) =>
        setBlocks([...section.blocks, emptyBlock(type)]);

    const sharedProps = (block: ContentBlock, index: number) => ({
        onDelete: () => removeBlock(block.id),
        onMove:   (dir: 'up' | 'down') => moveBlock(index, dir),
        isFirst:  index === 0,
        isLast:   index === section.blocks.length - 1,
    });

    return (
        <div className="space-y-2 mt-3">
            {section.blocks.map((block, index) => {
                if (block.type === 'text') return (
                    <TextBlockEditor
                        key={block.id}
                        block={block}
                        onChange={b => updateBlock(block.id, b)}
                        {...sharedProps(block, index)}
                    />
                );
                if (block.type === 'title') return (
                    <TitleBlockEditor
                        key={block.id}
                        block={block}
                        onChange={b => updateBlock(block.id, b)}
                        {...sharedProps(block, index)}
                    />
                );
                if (block.type === 'subsection') return (
                    <SubsectionBlockEditor
                        key={block.id}
                        block={block}
                        onChange={b => updateBlock(block.id, b)}
                        {...sharedProps(block, index)}
                    />
                );
                if (block.type === 'bullets') return (
                    <BulletsBlockEditor
                        key={block.id}
                        block={block}
                        onChange={b => updateBlock(block.id, b)}
                        {...sharedProps(block, index)}
                    />
                );
                return null;
            })}

            {/* Add block row */}
            <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-gray-400 mr-1">Add block:</span>
                {([ ['text', 'Text', 'bg-gray-100 text-gray-600 hover:bg-gray-200'],
                    ['title', 'Title', 'bg-purple-50 text-purple-600 hover:bg-purple-100'],
                    ['subsection', 'Subsection', 'bg-blue-50 text-blue-600 hover:bg-blue-100'],
                    ['bullets', 'Bullets', 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'],
                ] as const).map(([type, label, cls]) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => addBlock(type)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${cls}`}
                    >
                        <Plus className="w-3 h-3" /> {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── Top-level section list editor ─────────────────────────────────────────────

interface JobSectionEditorProps {
    name: string;
    initialSections?: JobSection[];
    placeholder?: string;
}

export function JobSectionEditor({ name, initialSections, placeholder }: JobSectionEditorProps) {
    const [sections, setSections] = useState<JobSection[]>(
        initialSections && initialSections.length > 0 ? initialSections : [emptySection()]
    );

    const updateSection = (id: string, updated: JobSection) =>
        setSections(prev => prev.map(s => s.id === id ? updated : s));

    const addSection = () => setSections(prev => [...prev, emptySection()]);

    const removeSection = (id: string) =>
        setSections(prev => prev.length > 1 ? prev.filter(s => s.id !== id) : prev);

    const moveSection = (index: number, dir: 'up' | 'down') => {
        if (dir === 'up' && index === 0) return;
        if (dir === 'down' && index === sections.length - 1) return;
        const next = [...sections];
        const ti = dir === 'up' ? index - 1 : index + 1;
        [next[index], next[ti]] = [next[ti], next[index]];
        setSections(next);
    };

    return (
        <div className="space-y-3">
            <input type="hidden" name={name} value={serializeSections(sections)} />

            {sections.map((section, index) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-5">
                    {/* Section header row */}
                    <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        <input
                            value={section.title}
                            onChange={e => updateSection(section.id, { ...section, title: e.target.value })}
                            placeholder="Section title (e.g. About the Role)"
                            className="flex-1 text-sm font-semibold text-gray-900 border-0 border-b border-transparent hover:border-gray-200 focus:border-[#E4192B] focus:ring-0 focus:outline-none px-0 py-1 bg-transparent placeholder:text-gray-300"
                        />
                        {/* Section-level move / delete */}
                        <div className="flex items-center gap-0.5 ml-auto flex-shrink-0">
                            <button type="button" onClick={() => moveSection(index, 'up')} disabled={index === 0}
                                className="p-1 text-gray-300 hover:text-gray-700 disabled:opacity-20 transition-colors" title="Move section up">
                                <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button type="button" onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1}
                                className="p-1 text-gray-300 hover:text-gray-700 disabled:opacity-20 transition-colors" title="Move section down">
                                <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <div className="w-px h-4 bg-gray-200 mx-1" />
                            <button type="button" onClick={() => removeSection(section.id)} disabled={sections.length === 1}
                                className="p-1 text-gray-200 hover:text-red-500 disabled:opacity-20 transition-colors" title="Remove section">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Blocks inside this section */}
                    <SectionBlocksList
                        section={section}
                        onChange={updated => updateSection(section.id, updated)}
                    />
                </div>
            ))}

            {/* Add section */}
            <button type="button" onClick={addSection}
                className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-[#E4192B] hover:text-[#E4192B] rounded-lg py-3 text-sm text-gray-400 transition-colors">
                <Plus className="w-4 h-4" /> Add Section
            </button>
        </div>
    );
}
