'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEpisode(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const showId = formData.get('showId') as string;
    const description = formData.get('description') as string;
    const duration = formData.get('duration') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const audioUrl = formData.get('audioUrl') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const transcript = formData.get('transcript') as string;
    const showNotes = formData.get('showNotes') as string;
    const tagsStr = formData.get('tags') as string;
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];

    const { error } = await supabase
        .from('episodes')
        .insert({
            title,
            slug,
            show_id: showId,
            description,
            duration,
            published_at: publishedAt || null,
            audio_url: audioUrl,
            cover_image_url: coverImageUrl || null,
            transcript: transcript || null,
            show_notes: showNotes || null,
            tags,
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/episodes');
    redirect('/admin/episodes');
}

export async function updateEpisode(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const showId = formData.get('showId') as string;
    const description = formData.get('description') as string;
    const duration = formData.get('duration') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const audioUrl = formData.get('audioUrl') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const transcript = formData.get('transcript') as string;
    const showNotes = formData.get('showNotes') as string;
    const tagsStr = formData.get('tags') as string;
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];

    const { error } = await supabase
        .from('episodes')
        .update({
            title,
            slug,
            show_id: showId,
            description,
            duration,
            published_at: publishedAt || null,
            audio_url: audioUrl,
            cover_image_url: coverImageUrl || null,
            transcript: transcript || null,
            show_notes: showNotes || null,
            tags,
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/episodes');
    redirect('/admin/episodes');
}

export async function deleteEpisode(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('episodes').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/episodes');
    redirect('/admin/episodes');
}
