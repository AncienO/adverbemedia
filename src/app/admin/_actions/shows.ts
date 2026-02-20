'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createShow(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const summary = formData.get('summary') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as string || 'coming-soon';
    const spotify = formData.get('spotify') as string;
    const youtube = formData.get('youtube') as string;
    const applePodcasts = formData.get('applePodcasts') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const adContent = formData.get('adContent') as string;
    const youtubePreview = formData.get('youtubePreview') as string;
    const relatedShowIdsRaw = formData.get('relatedShowIds') as string;
    let relatedShowIds: string[] = [];
    if (relatedShowIdsRaw) {
        try { relatedShowIds = JSON.parse(relatedShowIdsRaw); } catch { }
    }

    const socialLinks: Record<string, any> = {};
    if (spotify) socialLinks.spotify = spotify;
    if (youtube) socialLinks.youtube = youtube;
    if (youtubePreview) socialLinks.youtubePreview = youtubePreview;
    if (applePodcasts) socialLinks.applePodcasts = applePodcasts;
    if (twitter) socialLinks.twitter = twitter;
    if (instagram) socialLinks.instagram = instagram;
    const linkOrderRaw = formData.get('linkOrder') as string;
    if (linkOrderRaw) {
        try { socialLinks.order = JSON.parse(linkOrderRaw); } catch { }
    }

    const { data: show, error } = await supabase
        .from('shows')
        .insert({
            title,
            slug,
            description,
            short_description: shortDescription,
            summary,
            cover_image_url: coverImageUrl,
            category_id: categoryId || null,
            status,
            social_links: socialLinks,
            ad_content: adContent,
            related_show_ids: relatedShowIds,
        })
        .select()
        .single();

    if (error) {
        return { error: error.message };
    }

    // Handle hosts connection array
    const hostIdsRaw = formData.get('hostIds') as string;
    if (hostIdsRaw) {
        try {
            const hostIds = JSON.parse(hostIdsRaw) as string[];
            for (const hId of hostIds) {
                await supabase.from('show_hosts').insert({ show_id: show.id, host_id: hId });
            }
        } catch (e) {
            console.error('Failed to parse hostIds', e);
        }
    }

    revalidatePath('/admin/shows');
    revalidatePath('/shows');
    redirect('/admin/shows');
}

export async function updateShow(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const summary = formData.get('summary') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as string;
    const spotify = formData.get('spotify') as string;
    const youtube = formData.get('youtube') as string;
    const applePodcasts = formData.get('applePodcasts') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const adContent = formData.get('adContent') as string;
    const youtubePreview = formData.get('youtubePreview') as string;
    const relatedShowIdsRaw = formData.get('relatedShowIds') as string;
    let relatedShowIds: string[] = [];
    if (relatedShowIdsRaw) {
        try { relatedShowIds = JSON.parse(relatedShowIdsRaw); } catch { }
    }

    const socialLinks: Record<string, any> = {};
    if (spotify) socialLinks.spotify = spotify;
    if (youtube) socialLinks.youtube = youtube;
    if (youtubePreview) socialLinks.youtubePreview = youtubePreview;
    if (applePodcasts) socialLinks.applePodcasts = applePodcasts;
    if (twitter) socialLinks.twitter = twitter;
    if (instagram) socialLinks.instagram = instagram;
    const linkOrderRaw = formData.get('linkOrder') as string;
    if (linkOrderRaw) {
        try { socialLinks.order = JSON.parse(linkOrderRaw); } catch { }
    }

    const { error } = await supabase
        .from('shows')
        .update({
            title,
            slug,
            description,
            short_description: shortDescription,
            summary,
            cover_image_url: coverImageUrl,
            category_id: categoryId || null,
            status,
            social_links: socialLinks,
            ad_content: adContent,
            related_show_ids: relatedShowIds,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    // Handle hosts connection array
    const hostIdsRaw = formData.get('hostIds') as string;
    if (hostIdsRaw) {
        try {
            const hostIds = JSON.parse(hostIdsRaw) as string[];

            // Delete existing mappings
            await supabase.from('show_hosts').delete().eq('show_id', id);

            // Insert new mappings
            for (const hId of hostIds) {
                await supabase.from('show_hosts').insert({ show_id: id, host_id: hId });
            }
        } catch (e) {
            console.error('Failed to parse hostIds', e);
        }
    }

    revalidatePath('/admin/shows');
    revalidatePath('/shows');
    revalidatePath(`/shows/${slug}`);
    redirect('/admin/shows');
}

export async function deleteShow(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('shows').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/shows');
    redirect('/admin/shows');
}

export async function updateShowOrder(items: { id: string; sort_order: number }[]) {
    const supabase = await createClient();

    for (const item of items) {
        const { error } = await supabase
            .from('shows')
            .update({ sort_order: item.sort_order })
            .eq('id', item.id);

        if (error) {
            console.error('Error updating show order:', error);
            return { error: error.message };
        }
    }

    revalidatePath('/admin/shows');
    revalidatePath('/shows');
    return { success: true };
}
