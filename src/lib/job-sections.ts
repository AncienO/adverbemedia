// ── Block types ───────────────────────────────────────────────────────────────

export interface TextBlock {
    type: 'text';
    id: string;
    content: string;
}

export interface SubsectionBlock {
    type: 'subsection';
    id: string;
    title: string;
    content: string;
    /** Optional bullet list shown beneath the body text */
    items?: string[];
}

export interface BulletsBlock {
    type: 'bullets';
    id: string;
    /** Optional heading shown above the list */
    title?: string;
    items: string[];
}

export type ContentBlock = TextBlock | SubsectionBlock | BulletsBlock;

// ── Section ───────────────────────────────────────────────────────────────────

export interface JobSection {
    id: string;
    title: string;
    blocks: ContentBlock[];
}

// ── Serialisation helpers ─────────────────────────────────────────────────────

/** Strip client-only `id` fields before writing to the DB. */
export function serializeSections(sections: JobSection[]): string {
    return JSON.stringify(
        sections.map(({ title, blocks }) => ({
            title,
            blocks: blocks.map(({ id: _id, ...rest }) => rest),
        }))
    );
}

/**
 * Parse a stored description/requirements value.
 * Handles three formats, newest first:
 *   1. New  — JSON array of { title, blocks[] }
 *   2. Old  — JSON array of { title, content } (upgraded to a single text block)
 *   3. Legacy — plain text string (single untitled text block)
 *
 * Safe to call from both server and client components (no 'use client').
 */
export function parseJobSections(raw: string | null | undefined): JobSection[] {
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            return parsed.map((s: any, i: number) => {
                // Format 1: already has blocks
                if (Array.isArray(s.blocks)) {
                    return {
                        id: String(i),
                        title: s.title ?? '',
                        blocks: (s.blocks as any[]).map((b: any, j: number) =>
                            normaliseBlock(b, `${i}-${j}`)
                        ),
                    };
                }
                // Format 2: old { title, content } — wrap content in a text block
                return {
                    id: String(i),
                    title: s.title ?? '',
                    blocks: [{ type: 'text' as const, id: `${i}-0`, content: s.content ?? '' }],
                };
            });
        }
    } catch {
        // Format 3: plain text
        return [{
            id: '0',
            title: '',
            blocks: [{ type: 'text', id: '0-0', content: raw }],
        }];
    }

    return [{
        id: '0',
        title: '',
        blocks: [{ type: 'text', id: '0-0', content: raw }],
    }];
}

function normaliseBlock(b: any, fallbackId: string): ContentBlock {
    const id = b.id ?? fallbackId;
    if (b.type === 'subsection') {
        return {
            type: 'subsection',
            id,
            title: b.title ?? '',
            content: b.content ?? '',
            items: Array.isArray(b.items) ? b.items : undefined,
        };
    }
    if (b.type === 'bullets') {
        return { type: 'bullets', id, title: b.title ?? undefined, items: Array.isArray(b.items) ? b.items : [] };
    }
    // default → text
    return { type: 'text', id, content: b.content ?? '' };
}
