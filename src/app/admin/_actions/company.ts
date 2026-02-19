'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSection(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const sectionKey = formData.get('sectionKey') as string;
    const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;
    const isVisible = formData.get('isVisible') === 'true';

    const { error } = await supabase
        .from('company_sections')
        .update({
            title, content, section_key: sectionKey,
            sort_order: sortOrder, is_visible: isVisible,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/admin/company');
    revalidatePath('/company');
}

export async function createSection(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const sectionKey = formData.get('sectionKey') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;
    const isVisible = formData.get('isVisible') !== 'false';

    const { error } = await supabase
        .from('company_sections')
        .insert({ title, content, section_key: sectionKey, sort_order: sortOrder, is_visible: isVisible });

    if (error) return { error: error.message };
    revalidatePath('/admin/company');
    revalidatePath('/company');
}

export async function deleteSection(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('company_sections').delete().eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/company');
    revalidatePath('/company');
}
