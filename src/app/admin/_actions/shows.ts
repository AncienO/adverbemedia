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
    const facebook = formData.get('facebook') as string;
    const tiktok = formData.get('tiktok') as string;
    const rss = formData.get('rss') as string;
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
    if (facebook) socialLinks.facebook = facebook;
    if (tiktok) socialLinks.tiktok = tiktok;
    if (rss) socialLinks.rss = rss;

    const toggles: Record<string, boolean> = {};
    const ALL_PLATFORMS = ['spotify', 'youtube', 'applePodcasts', 'twitter', 'instagram', 'facebook', 'tiktok', 'rss', 'website'];
    ALL_PLATFORMS.forEach(p => {
        toggles[p] = formData.get(`${p}_active`) === 'true';
    });
    socialLinks.toggles = toggles;

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
    const facebook = formData.get('facebook') as string;
    const tiktok = formData.get('tiktok') as string;
    const rss = formData.get('rss') as string;
    const adContent = formData.get('adContent') as string;
    const youtubePreview = formData.get('youtubePreview') as string;
    const relatedShowIdsRaw = formData.get('relatedShowIds') as string;
    let relatedShowIds: string[] = [];
    if (relatedShowIdsRaw) {
        try { relatedShowIds = JSON.parse(relatedShowIdsRaw); } catch { }
    }

    // Fetch pre-populated links from hidden input
    const socialLinksRaw = formData.get('social_links') as string;
    let socialLinks = socialLinksRaw ? JSON.parse(socialLinksRaw) : null;
    let hasLinkUpdates = false;

    // We initialize an object to collect any new explicit link fields
    const explicitLinks: Record<string, any> = {};
    if (formData.has('spotify')) explicitLinks.spotify = spotify;
    if (formData.has('youtube')) explicitLinks.youtube = youtube;
    if (formData.has('youtubePreview')) explicitLinks.youtubePreview = youtubePreview;
    if (formData.has('applePodcasts')) explicitLinks.applePodcasts = applePodcasts;
    if (formData.has('twitter')) explicitLinks.twitter = twitter;
    if (formData.has('instagram')) explicitLinks.instagram = instagram;
    if (formData.has('facebook')) explicitLinks.facebook = facebook;
    if (formData.has('tiktok')) explicitLinks.tiktok = tiktok;
    if (formData.has('rss')) explicitLinks.rss = rss;

    if (Object.keys(explicitLinks).length > 0) {
        socialLinks = { ...(socialLinks || {}), ...explicitLinks };
        hasLinkUpdates = true;
    }

    const toggles: Record<string, boolean> = socialLinks?.toggles || {};
    let submittedToggles = false;
    const ALL_PLATFORMS = ['spotify', 'youtube', 'applePodcasts', 'twitter', 'instagram', 'facebook', 'tiktok', 'rss', 'website'];
    ALL_PLATFORMS.forEach(p => {
        if (formData.has(`${p}_active`)) {
            toggles[p] = formData.get(`${p}_active`) === 'true';
            submittedToggles = true;
        }
    });

    if (submittedToggles) {
        socialLinks = { ...(socialLinks || {}), toggles };
        hasLinkUpdates = true;
    }

    if (formData.has('linkOrder')) {
        const linkOrderRaw = formData.get('linkOrder') as string;
        try {
            socialLinks = { ...(socialLinks || {}), order: JSON.parse(linkOrderRaw) };
            hasLinkUpdates = true;
        } catch { }
    }

    // Safeguard: only override social_links if there was any form data (or existing data sent)
    // If socialLinksRaw was provided, we definitely update it. Otherwise, only update if new fields were sent.

    // Build update payload
    const updatePayload: any = {
        title,
        slug,
        description,
        short_description: shortDescription,
        summary,
        cover_image_url: coverImageUrl,
        category_id: categoryId || null,
        status,
        ad_content: adContent,
        related_show_ids: relatedShowIds,
        updated_at: new Date().toISOString(),
    };

    if (socialLinksRaw !== null || hasLinkUpdates) {
        updatePayload.social_links = socialLinks || {};
    }

    const { error } = await supabase
        .from('shows')
        .update(updatePayload)
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
