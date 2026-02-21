'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateShowLinks(showId: string, links: { listenWatch: any[]; listen: any[]; connect: any[]; youtubePreview?: string }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('shows')
        .update({
            social_links: links,
            updated_at: new Date().toISOString(),
        })
        .eq('id', showId);

    if (error) return { error: error.message };

    revalidatePath('/');
    revalidatePath('/admin/links');
    revalidatePath('/shows', 'layout');
    return { success: true };
}

export async function updateGlobalLinks(links: any[]) {
    const supabase = await createClient();

    // The footer uses the 'social_links' table. 
    // We should probably keep that table but allow the same UI to manage it.
    // For simplicity, let's assume we update the existing social_links table.

    // This is more complex because social_links table has individual rows.
    // We might need to delete and re-insert or update based on IDs.
}
