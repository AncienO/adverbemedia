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

    // Handle host
    const hostName = formData.get('hostName') as string;
    const hostRole = formData.get('hostRole') as string;
    const hostAvatarUrl = formData.get('hostAvatarUrl') as string;

    if (hostName) {
        const { data: host, error: hostError } = await supabase
            .from('hosts')
            .insert({ name: hostName, role: hostRole || 'Host', avatar_url: hostAvatarUrl })
            .select()
            .single();

        if (!hostError && host) {
            await supabase.from('show_hosts').insert({ show_id: show.id, host_id: host.id });
        }
    }

    // Handle co-hosts (comma-separated)
    const coHosts = formData.get('coHosts') as string;
    if (coHosts) {
        const names = coHosts.split(',').map(n => n.trim()).filter(Boolean);
        for (const name of names) {
            const { data: coHost } = await supabase
                .from('hosts')
                .insert({ name, role: 'Co-Host' })
                .select()
                .single();
            if (coHost) {
                await supabase.from('show_hosts').insert({ show_id: show.id, host_id: coHost.id });
            }
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

    // Handle host updates
    const hostName = formData.get('hostName') as string;
    const hostRole = formData.get('hostRole') as string;
    const hostAvatarUrl = formData.get('hostAvatarUrl') as string;

    if (hostName) {
        // Find existing primary host if any
        const { data: existingHosts } = await supabase
            .from('show_hosts')
            .select('host_id')
            .eq('show_id', id);

        const primaryHostId = existingHosts?.[0]?.host_id;

        if (primaryHostId) {
            // Update existing primary host
            await supabase
                .from('hosts')
                .update({ name: hostName, role: hostRole || 'Host', avatar_url: hostAvatarUrl })
                .eq('id', primaryHostId);
        } else {
            // Insert new primary host
            const { data: newHost } = await supabase
                .from('hosts')
                .insert({ name: hostName, role: hostRole || 'Host', avatar_url: hostAvatarUrl })
                .select()
                .single();
            if (newHost) {
                await supabase.from('show_hosts').insert({ show_id: id, host_id: newHost.id });
            }
        }
    }

    // Handle co-hosts update
    const coHosts = formData.get('coHosts') as string;
    if (coHosts !== null) {
        // Find all current show_hosts
        const { data: currentLinks } = await supabase
            .from('show_hosts')
            .select('host_id')
            .eq('show_id', id);

        const primaryHostId = currentLinks?.[0]?.host_id;

        // Remove all except the primary host relationship for now
        // This is a simplified approach to avoid complex matching
        if (primaryHostId) {
            await supabase.from('show_hosts').delete().eq('show_id', id).neq('host_id', primaryHostId);
        } else {
            await supabase.from('show_hosts').delete().eq('show_id', id);
        }

        const names = (coHosts || '').split(',').map(n => n.trim()).filter(Boolean);
        for (const name of names) {
            const { data: coHost } = await supabase
                .from('hosts')
                .insert({ name, role: 'Co-Host' })
                .select()
                .single();
            if (coHost) {
                await supabase.from('show_hosts').insert({ show_id: id, host_id: coHost.id });
            }
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
