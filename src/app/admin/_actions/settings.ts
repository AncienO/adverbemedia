'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createSocialLink(formData: FormData) {
    const supabase = await createClient();

    const platform = formData.get('platform') as string;
    const url = formData.get('url') as string;
    const iconKey = formData.get('iconKey') as string;
    const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

    const { error } = await supabase
        .from('social_links')
        .insert({ platform, url, icon_key: iconKey, sort_order: sortOrder });

    if (error) return { error: error.message };
    revalidatePath('/admin/settings');
}

export async function updateSocialLink(id: string, formData: FormData) {
    const supabase = await createClient();

    const platform = formData.get('platform') as string;
    const url = formData.get('url') as string;
    const iconKey = formData.get('iconKey') as string;
    const isActive = formData.get('isActive') === 'true';
    const sortOrder = parseInt(formData.get('sortOrder') as string) || 0;

    const { error } = await supabase
        .from('social_links')
        .update({ platform, url, icon_key: iconKey, is_active: isActive, sort_order: sortOrder })
        .eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/admin/settings');
}

export async function deleteSocialLink(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/settings');
}
